export type EchoismCardLang = "en" | "id" | "de" | "fr" | "es";

export interface EchoismQuestion {
  id: number;
  subscale: "self_erasure" | "praise_aversion" | "narcissist_magnet";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface EchoismResultLevel {
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

export const ECHOISM_QUESTIONS: EchoismQuestion[] = [
  {
    id: 1,
    subscale: "self_erasure",
    text: {
      en: "I feel an intense, visceral dread of ever seeming 'narcissistic', self-centered, demanding, or entitled.",
      id: "Saya merasakan ketakutan mendalam yang luar biasa jika sampai dianggap 'narsis', egois, banyak menuntut, atau sombong.",
      de: "Ich habe panische Angst davor, jemals als egoistisch, narzisstisch, fordernd oder arrogant wahrgenommen zu werden.",
      fr: "J'éprouve une terreur viscérale à l'idée d'être perçu(e) comme narcissique, égoïste, exigeant(e) ou vaniteux(se).",
      es: "Siento un pavor visceral e intenso ante la sola idea de parecer narcisista, egoísta, exigente o engreído."
    }
  },
  {
    id: 2,
    subscale: "praise_aversion",
    text: {
      en: "When someone offers me a compliment, gift, or recognition, I feel uncomfortable, embarrassed, or desperate to deflect attention away from myself.",
      id: "Ketika seseorang memberi saya pujian tulus, hadiah, atau penghargaan, saya merasa sangat risih, malu, dan buru-buru mengalihkan perhatian ke orang lain.",
      de: "Wenn mir jemand ein Kompliment, Geschenk oder Anerkennung schenkt, fühle ich mich unwohl, beschämt und lenke die Aufmerksamkeit sofort ab.",
      fr: "Quand on me fait un compliment sincère, un cadeau ou un éloge, je me sens gêné(e), indigne et m'empresse de détourner l'attention.",
      es: "Cuando alguien me hace un cumplido, me da un regalo o me reconoce un mérito, siento incomodidad, vergüenza y desvío el foco hacia otros."
    }
  },
  {
    id: 3,
    subscale: "self_erasure",
    text: {
      en: "When asked what restaurant, movie, or activity I prefer, I genuinely go blank or automatically say: 'Anything is fine with me, whatever you want.'",
      id: "Saat ditanya ingin makan di mana, nonton apa, atau memilih apa, pikiran saya mendadak kosong dan otomatis menjawab: 'Terserah kamu saja, aku ikut apa pun.'",
      de: "Wenn man mich nach meinen Vorlieben (Restaurant, Film, Urlaub) fragt, habe ich ein Blackout und sage automatisch: 'Mir ist alles recht, entscheide du.'",
      fr: "Quand on me demande ce que je préfère (restaurant, film, sortie), mon esprit se vide et je réponds machinalement : 'Peu importe, choisis toi.'",
      es: "Cuando me preguntan qué prefiero (restaurante, película o plan), me quedo en blanco y digo automáticamente: 'Lo que tú quieras me parece bien.'"
    }
  },
  {
    id: 4,
    subscale: "narcissist_magnet",
    text: {
      en: "I am repeatedly drawn to charismatic, strong-willed, or self-absorbed partners who take up all the emotional space in the room.",
      id: "Saya sering kali tertarik pada pasangan atau teman yang sangat dominan, karismatik, atau berpusat pada diri sendiri yang mendominasi seluruh ruang emosi.",
      de: "Ich fühle mich immer wieder magisch von charismatischen, dominanten oder selbstbezogenen Menschen angezogen, die den ganzen Raum einnehmen.",
      fr: "Je suis systématiquement attiré(e) par des personnalités fortes, charismatiques ou égocentriques qui occupent tout l'espace relationnel.",
      es: "Suelo sentirme atraído por personas carismáticas, dominantes o egocéntricas que absorben todo el protagonismo de la relación."
    }
  },
  {
    id: 5,
    subscale: "self_erasure",
    text: {
      en: "I feel that having basic emotional or physical needs makes me a burden to the people I love.",
      id: "Saya merasa bahwa memiliki kebutuhan emosional atau fisik dasar membuat saya menjadi beban yang merepotkan bagi orang-orang terdekat.",
      de: "Ich habe das Gefühl, dass meine grundlegenden seelischen oder körperlichen Bedürfnisse mich zu einer Last für andere machen.",
      fr: "J'ai l'impression profonde que le simple fait d'avoir des besoins affectifs ou physiques fait de moi un fardeau pour mes proches.",
      es: "Siento que tener necesidades emocionales o físicas básicas me convierte en una carga pesada e insoportable para mis seres queridos."
    }
  },
  {
    id: 6,
    subscale: "praise_aversion",
    text: {
      en: "I dread birthdays, celebrations, or events where the spotlight is focused exclusively on me, wishing I could become invisible.",
      id: "Saya merasa cemas saat hari ulang tahun atau perayaan di mana sorotan lampu tertuju penuh pada saya; saya lebih memilih menghilang atau tak terlihat.",
      de: "Ich fürchte Geburtstage oder Ehrungen, bei denen das Rampenlicht auf mich gerichtet ist, und wünschte, ich wäre einfach unsichtbar.",
      fr: "Je redoute les anniversaires ou les moments où je suis au centre de l'attention, souhaitant ardemment pouvoir devenir invisible.",
      es: "Me horrorizan los cumpleaños o eventos donde el centro de atención soy yo, deseando poder volverme completamente invisible."
    }
  },
  {
    id: 7,
    subscale: "narcissist_magnet",
    text: {
      en: "I feel safest and most valued when I am serving as a silent, supportive mirror to someone else's talent, brilliance, or success.",
      id: "Saya merasa paling aman dan berharga ketika menjadi cermin pendukung yang tak bersuara bagi bakat, kehebatan, atau kesuksesan orang lain.",
      de: "Ich fühle mich am sichersten und wertvollsten, wenn ich als stiller Spiegel diene, der den Glanz und Erfolg anderer reflektiert.",
      fr: "Je me sens le plus en sécurité et utile lorsque je sers de miroir silencieux et bienveillant au talent ou aux succès d'autrui.",
      es: "Me siento más seguro y valioso cuando actúo como un espejo silencioso que refleja el éxito, talento o brillo de otra persona."
    }
  },
  {
    id: 8,
    subscale: "self_erasure",
    text: {
      en: "If I ever express a boundary or ask for something I want, I spend the rest of the day agonized by guilt, worrying I was rude or selfish.",
      id: "Jika saya sesekali berani menetapkan batasan atau meminta apa yang saya inginkan, saya menghabiskan sisa hari disiksa rasa bersalah dan cemas dicap egois.",
      de: "Wenn ich einmal eine Grenze setze oder etwas fordere, quälen mich den ganzen Tag Schuldgefühle, ich sei unverschämt oder unhöflich gewesen.",
      fr: "Si j'ose exprimer une limite ou demander ce que je désire, je passe le reste de la journée rongé(e) par la culpabilité d'avoir été égoïste.",
      es: "Si alguna vez pongo un límite o pido algo para mí, paso el resto del día carcomido por la culpa, temiendo haber sido grosero o desconsiderado."
    }
  },
  {
    id: 9,
    subscale: "praise_aversion",
    text: {
      en: "When I achieve something remarkable, I instantly minimize it, attributing my success entirely to luck, timing, or other people's help.",
      id: "Saat berhasil meraih pencapaian hebat, saya langsung mengecilkannya dan menganggap itu murni faktor keberuntungan, kebetulan, atau bantuan orang lain.",
      de: "Wenn mir etwas Außergewöhnliches gelingt, spiele ich es sofort herunter und schiebe den Erfolg ausschließlich auf Glück oder andere Menschen.",
      fr: "Quand je réussis quelque chose d'important, je le minimise aussitôt en attribuant tout à la chance, aux circonstances ou à l'aide des autres.",
      es: "Cuando logro algo extraordinario, lo minimizo al instante, atribuyendo mi éxito puramente a la suerte, casualidad o ayuda ajena."
    }
  },
  {
    id: 10,
    subscale: "narcissist_magnet",
    text: {
      en: "I tolerate chronic emotional neglect, mood swings, or condescension in relationships because I believe that loving someone means asking for nothing in return.",
      id: "Saya memaklumi pengabaian emosional, perubahan mood drastis, atau sikap merendahkan dari pasangan karena meyakini cinta sejati adalah pengorbanan tanpa pamrih.",
      de: "Ich ertrage emotionale Kälte oder Herablassung in Beziehungen, weil ich glaube, dass wahre Liebe bedeutet, keinerlei Gegenleistung zu erwarten.",
      fr: "Je tolère la négligence affective ou le mépris d'un partenaire car je me suis convaincu(e) qu'aimer signifie ne rien demander en retour.",
      es: "Tolero el desapego emocional, desplantes o superioridad en una pareja porque creo erróneamente que amar de verdad es no pedir nada a cambio."
    }
  },
  {
    id: 11,
    subscale: "self_erasure",
    text: {
      en: "I instinctively suppress my own anger or frustration, convinced that my feelings are invalid, irrational, or dangerous to express.",
      id: "Secara naluriah saya langsung membungkam rasa marah atau kesal saya sendiri, yakin bahwa emosi saya tidak penting, berlebihan, atau berbahaya.",
      de: "Ich unterdrücke Wut und Frust instinktiv, weil ich fest davon überzeugt bin, dass meine Gefühle unwichtig, unberechtigt oder bedrohlich sind.",
      fr: "J'étouffe instinctivement ma colère ou ma frustration, persuadé(e) que mes ressentis sont illégitimes, excessifs ou dangereux.",
      es: "Reprimo instintivamente mi enfado o frustración, convencido de que mis sentimientos carecen de validez o son peligrosos de manifestar."
    }
  },
  {
    id: 12,
    subscale: "praise_aversion",
    text: {
      en: "I feel a strange sense of comfort in staying in the background, out of sight, and not existing too loudly in any room.",
      id: "Saya merasakan rasa nyaman yang aneh saat berada di sudut belakang, tidak terlihat, dan tidak bernapas terlalu keras di ruangan mana pun.",
      de: "Ich empfinde eine seltsame Beruhigung darin, im Schatten zu bleiben, unbemerkt zu sein und bloß keinen spürbaren Raum einzunehmen.",
      fr: "Je trouve un réconfort étrange à rester dans l'ombre, en retrait, sans faire de bruit et sans encombrer l'espace des autres.",
      es: "Encuentro un extraño alivio en quedarme en segundo plano, pasar inadvertido y no ocupar demasiado espacio en ningún lugar."
    }
  }
];

export const ECHOISM_OPTIONS = [
  {
    score: 0,
    label: {
      en: "Not like me at all (0%)",
      id: "Sangat Tidak Menggambarkan Saya (0%)",
      de: "Trifft überhaupt nicht auf mich zu (0%)",
      fr: "Pas du tout moi (0%)",
      es: "No me describe en absoluto (0%)"
    }
  },
  {
    score: 1,
    label: {
      en: "Mildly like me (25%)",
      id: "Sedikit Menggambarkan Saya (25%)",
      de: "Trifft eher selten zu (25%)",
      fr: "Un peu comme moi (25%)",
      es: "Me describe un poco (25%)"
    }
  },
  {
    score: 2,
    label: {
      en: "Moderately like me (70%)",
      id: "Cukup Menggambarkan Saya (70%)",
      de: "Trifft weitgehend zu (70%)",
      fr: "Assez comme moi (70%)",
      es: "Me describe bastante (70%)"
    }
  },
  {
    score: 3,
    label: {
      en: "Deeply, painfully true (100%)",
      id: "Sangat Tepat & Menyakitkan (100%)",
      de: "Trifft vollkommen und schmerzhaft zu (100%)",
      fr: "Totalement et douloureusement vrai (100%)",
      es: "Total y dolorosamente cierto (100%)"
    }
  }
];

export const ECHOISM_RESULTS: EchoismResultLevel[] = [
  {
    level: "healthy_autonomy",
    scoreRange: [0, 8],
    title: {
      en: "Healthy Relational Voice & Sovereign Space",
      id: "Suara Relasional Sehat & Berdaulat Penuh",
      de: "Gesunde Selbstbehauptung & Souveränität",
      fr: "Affirmation saine & espace souverain",
      es: "Voz relacional saludable y soberanía propia"
    },
    summary: {
      en: "You maintain a balanced relationship between honoring others and claiming your own space. You can accept compliments gracefully and express desires without toxic guilt.",
      id: "Anda memiliki keseimbangan sehat antara menghargai orang lain dan menjaga ruang diri Anda sendiri. Anda bisa menerima pujian dengan hangat dan menyuarakan keinginan tanpa rasa bersalah.",
      de: "Sie wahren eine gesunde Balance zwischen Empathie und eigener Raumannahme. Sie können Lob annehmen und Wünsche ohne Schuldgefühle äußern.",
      fr: "Vous équilibrez avec justesse l'attention portée aux autres et la prise en compte de vos désirs. Vous acceptez les compliments avec gratitude.",
      es: "Mantienes un equilibrio sano entre cuidar a los demás y ocupar tu propio espacio. Aceptas elogios y expresas tus deseos con naturalidad."
    },
    neurobiology: {
      en: "Your social safety circuits (ventral vagal complex) allow you to tolerate visibility and status without triggering shame-based threat responses.",
      id: "Sirkuit keamanan sosial ventral vagal Anda berfungsi optimal, memungkinkan Anda merasa aman saat menjadi sorotan tanpa memicu alarm rasa malu.",
      de: "Ihr ventrales Vagus-System erlaubt Ihnen Sichtbarkeit und Beachtung, ohne dass Bedrohungs- oder Schamreaktionen ausgelöst werden.",
      fr: "Votre complexe vagal ventral vous permet d'être vu(e) et valorisé(e) sans déclencher d'angoisse archaïque de rejet.",
      es: "Tu sistema vagal ventral te permite experimentar visibilidad y reconocimiento sin activar alarmas de amenaza o culpa."
    },
    actionProtocol: {
      en: [
        "Continue celebrating personal victories openly without reflexively deflecting praise.",
        "Practice naming your specific preferences first in group decision-making.",
        "Use Nuju's voice journal to record gratitude for your personal gifts and talents."
      ],
      id: [
        "Teruslah merayakan keberhasilan pribadi secara terbuka tanpa buru-buru mengalihkan pujian.",
        "Biasakan menyebutkan preferensi spesifik Anda terlebih dahulu saat berdiskusi santai.",
        "Gunakan jurnal suara Nuju untuk merekam rasa syukur atas bakat dan keunikan diri Anda."
      ],
      de: [
        "Feiern Sie eigene Erfolge weiterhin offen, ohne Lob reflexartig abzuwehren.",
        "Äußern Sie persönliche Präferenzen in Gruppenentscheidungen als Erster.",
        "Nutzen Sie Nuju, um Dankbarkeit für Ihre Fähigkeiten zu verbalisieren."
      ],
      fr: [
        "Célébrez vos réussites sans minimiser vos mérites.",
        "Exprimez vos préférences en premier lors des décisions collectives.",
        "Utilisez Nuju pour nommer à voix haute votre gratitude envers vos talents."
      ],
      es: [
        "Celebra tus logros personales abiertamente sin desviar los reconocimientos.",
        "Expresa tus preferencias en primer lugar cuando tomes decisiones en grupo.",
        "Registra en Nuju tu agradecimiento por tus fortalezas y capacidades."
      ]
    },
    badge: {
      en: "Sovereign Voice",
      id: "Suara Berdaulat",
      de: "Souveräne Stimme",
      fr: "Voix Souveraine",
      es: "Voz Soberana"
    }
  },
  {
    level: "mild_accommodator",
    scoreRange: [9, 16],
    title: {
      en: "Mild Accommodator & Spotlight Shyness",
      id: "Penyesuai Ramah & Keengganan Sorotan",
      de: "Leichte Selbstzurücknahme & Rampenlicht-Scheu",
      fr: "Accommodement bienveillant & timidité d'éclat",
      es: "Acomodación leve y timidez al protagonismo"
    },
    summary: {
      en: "You have subtle echoistic tendencies. You feel more comfortable listening than being heard, and you instinctively downplay your achievements to keep relationships harmonious.",
      id: "Anda memiliki kecenderungan echoism halus. Anda merasa jauh lebih nyaman mendengarkan daripada didengar, dan sering mengecilkan prestasi demi menjaga keharmonisan.",
      de: "Sie neigen subtil dazu, sich zurückzuhalten. Es fällt Ihnen leichter zuzuhören als gehört zu werden, und Sie spielen Erfolge gerne herunter.",
      fr: "Vous préférez rester à l'écoute plutôt que de prendre la parole, et minimisez parfois vos succès par pudeur ou peur de déranger.",
      es: "Tienes una leve inclinación a ponerte en segundo plano. Te resulta más cómodo escuchar que hablar y restas importancia a tus triunfos."
    },
    neurobiology: {
      en: "Mild conditioned inhibition of assertive motor speech pathways; mild social anxiety flares when praise threatens to make you the center of attention.",
      id: "Sedikit hambatan pada sirkuit ketegasan vokal motorik; kecemasan sosial ringan muncul saat pujian membuat Anda menjadi pusat perhatian.",
      de: "Leichte Konditionierung zur Hemmung selbstsicherer Sprache; Unruhe bei plötzlicher sozialer Exposition.",
      fr: "Légère inhibition motrice vocale : une timide alerte d'anxiété sociale survient lorsque vous êtes mis(e) en valeur.",
      es: "Inhibición leve en la corteza motora del habla; cierta inquietud al recibir elogios directos."
    },
    actionProtocol: {
      en: [
        "The Simple 'Thank You' Drill: When praised, say ONLY 'Thank you, that means a lot'—do not add excuses or deflect.",
        "Pick the movie or meal once a week without offering alternatives.",
        "Speak your authentic opinion in Nuju before attending social dinners."
      ],
      id: [
        "Latihan 'Terima Kasih Saja': Saat dipuji, katakan HANYA 'Terima kasih banyak'—jangan menambahkan alasan atau merendahkan diri.",
        "Pilihkan menu makan atau tempat nongkrong seminggu sekali tanpa menawarkan opsi lain.",
        "Suarakan opini jujur Anda di jurnal Nuju sebelum menghadiri acara kumpul sosial."
      ],
      de: [
        "Die 'Einfach Danke'-Übung: Sagen Sie bei Lob nur 'Danke, das freut mich' – ohne Ausreden.",
        "Bestimmen Sie einmal wöchentlich das Restaurant oder den Film ohne Wenn und Aber.",
        "Formulieren Sie eigene Gedanken vorab in Nuju, um sie mutiger auszusprechen."
      ],
      fr: [
        "Exercice du 'Merci' pur : face à un compliment, dites simplement 'Merci, cela me touche', sans rien ajouter.",
        "Choisissez le repas ou le film une fois par semaine sans demander d'avis.",
        "Enregistrez vos opinions réelles dans Nuju avant de rejoindre une réunion sociale."
      ],
      es: [
        "Ejercicio de gratitud pura: ante un elogio, responde únicamente 'Muchas gracias' sin disculparte ni minimizarte.",
        "Elige el restaurante o la película una vez por semana sin pedir confirmación previa.",
        "Verbaliza tus puntos de vista en Nuju para ganar seguridad antes de hablar en público."
      ]
    },
    badge: {
      en: "Gentle Accommodator",
      id: "Penyesuai Lembut",
      de: "Sanfter Vermittler",
      fr: "Médiateur Discret",
      es: "Acomodador Sensible"
    }
  },
  {
    level: "moderate_echoist",
    scoreRange: [17, 25],
    title: {
      en: "Moderate Echoism (The Fear of Taking Up Space)",
      id: "Echoism Sedang (Ketakutan Mengambil Ruang)",
      de: "Moderater Echoismus (Angst vor Raumannahme)",
      fr: "Échoïsme modéré (La peur d'exister et d'encombrer)",
      es: "Ecoísmo moderado (Miedo a ocupar espacio)"
    },
    summary: {
      en: "You are actively living in the psychological shadow of others. Dr. Craig Malkin defines this as an intense dread of seeming narcissistic, leading to compulsive self-erasure and silencing of needs.",
      id: "Anda hidup dalam bayang-bayang psikologis orang lain. Dr. Craig Malkin mendefinisikan ini sebagai ketakutan mendalam dianggap narsistik, berujung pada pembungkaman kebutuhan sendiri.",
      de: "Sie leben im Schatten anderer. Dr. Craig Malkin beschreibt dies als tiefe Furcht, egoistisch zu wirken, was zur Auslöschung eigener Bedürfnisse führt.",
      fr: "Vous vous effacez activement. Comme défini par le Dr Craig Malkin, la peur panique de paraître égoïste vous pousse à taire systématiquement vos désirs.",
      es: "Vives bajo la sombra ajena. Según el Dr. Craig Malkin, el miedo aterrador a parecer narcisista te lleva a borrar tus propias necesidades."
    },
    neurobiology: {
      en: "The brain equates asserting personal desires with social abandonment and narcissistic danger, triggering immediate dorsal inhibitory freezing whenever you consider asking for help.",
      id: "Otak menyamakan menyuarakan kebutuhan pribadi dengan bahaya ditolak atau dicap jahat, memicu respons pembekuan (freezing) saat hendak meminta tolong.",
      de: "Das Nervensystem verknüpft eigene Wünsche mit Liebesentzug; es droht eine dorsale Schutzstarre, sobald Hilfe erbeten werden soll.",
      fr: "Le cerveau associe l'affirmation de soi au risque d'abandon, déclenchant une sidération émotionnelle dès que vous tentez de demander de l'aide.",
      es: "Tu sistema nervioso vincula expresar necesidades con el castigo del rechazo, provocando parálisis cada vez que necesitas apoyo."
    },
    actionProtocol: {
      en: [
        "Unpack the Echo Myth: Having needs is not narcissism; it is biological humanity.",
        "Practice 'Micro-Demands': Ask a friend for a small favor (borrow a book, pick a time that suits you) and sit with the temporary guilt.",
        "Voice Journaling Sanctuary in Nuju: Speak the forbidden sentence aloud in private: 'I want ___, and I deserve to have it.'"
      ],
      id: [
        "Bongkar Mitos Echoism: Memiliki kebutuhan dasar bukanlah sifat narsis; itu adalah fitrah biologis manusia.",
        "Latihan 'Permintaan Mikro': Mintalah bantuan kecil pada sahabat (pinjam buku, tentukan jam yang pas buat Anda) dan tahan rasa bersalah sesaat itu.",
        "Gunakan Jurnal Suara Nuju: Ucapkan kalimat terlarang ini dengan lantang di tempat privat: 'Aku menginginkan ___, dan aku berhak mendapatkannya.'"
      ],
      de: [
        "Den Echoismus-Mythos brechen: Eigene Bedürfnisse zu haben ist kein Narzissmus, sondern menschlich.",
        "Mikro-Bitten üben: Bitten Sie Freunde um kleine Gefallen und halten Sie das kurze Schuldgefühl bewusst aus.",
        "Nuju-Sprachübung: Sprechen Sie den befreienden Satz laut aus: 'Ich wünsche mir ___, und ich darf das haben.'"
      ],
      fr: [
        "Désamorcez la croyance : avoir des besoins n'est pas du narcissisme, c'est être humain.",
        "Micro-demandes : demandez un petit service à un ami et tolérez l'inconfort passager de la culpabilité.",
        "Affirmation vocale dans Nuju : prononcez à voix haute : 'J'ai le droit d'avoir besoin de ___.'"
      ],
      es: [
        "Rompe el mito del ecoísmo: tener necesidades no es narcisismo, es una condición biológica humana.",
        "Micro-peticiones: pide un pequeño favor a alguien cercano y tolera la culpa pasajera sin disculparte.",
        "Práctica de voz en Nuju: verbaliza en privado: 'Tengo derecho a desear ___ y merezco recibirlo.'"
      ]
    },
    badge: {
      en: "Selfless Mirror",
      id: "Cermin Tanpa Suara",
      de: "Selbstloser Spiegel",
      fr: "Miroir Oublié",
      es: "Espejo Abnegado"
    }
  },
  {
    level: "elevated_self_erasure",
    scoreRange: [26, 31],
    title: {
      en: "Elevated Echoistic Self-Erasure & Ghosting",
      id: "Penghapusan Diri Ekstrem & Sindrom Bayangan",
      de: "Ausgeprägte echoistische Selbstauslöschung",
      fr: "Effacement de soi sévère & invisibilité défensive",
      es: "Auto-anulación ecoísta severa e invisibilidad"
    },
    summary: {
      en: "You have systematically trained yourself to take up zero emotional space. You attract narcissistic, self-absorbed figures who exploit your boundless empathy, leaving you drained and invisible.",
      id: "Anda secara sistematis melatih diri untuk tidak mengambil ruang emosi sama sekali. Anda menjadi magnet bagi sosok narsis yang memanfaatkan empati Anda tanpa henti.",
      de: "Sie haben sich antrainiert, unsichtbar zu sein. Sie ziehen dominante Narzissten an, die Ihre grenzenlose Empathie ausbeuten und Sie leer zurücklassen.",
      fr: "Vous avez appris à disparaître. Vous attirez des personnalités narcissiques qui absorbent votre empathie sans jamais rien vous rendre.",
      es: "Te has entrenado para no existir. Atraes a personas narcisistas que consumen tu empatía infinita, dejándote exhausto e invisible."
    },
    neurobiology: {
      en: "Chronic shutdown of self-referential ventral medial prefrontal circuits; hyper-activated mirror neuron systems cause you to feel others' feelings while remaining numb to your own.",
      id: "Korteks prefrontal medial Anda membeku saat memikirkan diri sendiri; sistem cermin saraf (mirror neurons) hiperaktif membuat Anda merasakan emosi orang lain namun mati rasa terhadap diri sendiri.",
      de: "Hyperaktive Spiegelneuronen lassen Sie die Gefühle anderer überdeutlich spüren, während der Zugang zu eigenen Empfindungen blockiert ist.",
      fr: "Hyperactivité des neurones miroirs : vous absorbez les états d'autrui au détriment de vos propres circuits d'intéroception.",
      es: "Neuronas espejo hiperactivas: experimentas el dolor o caprichos ajenos mientras desconectas de tus propias señales corporales."
    },
    actionProtocol: {
      en: [
        "Audit Parasitic Connections: Identify relationships where you do 95% of the listening and 0% of the sharing.",
        "Somatic Re-Embodiment: Practice sitting in a chair, taking up physical space with wide arms, and vocalizing: 'I am here.'",
        "Daily Need Logging in Nuju: Record one honest desire every morning before interacting with the world."
      ],
      id: [
        "Audit Hubungan Parasitik: Kenali pertemanan di mana Anda mendengarkan 95% waktu dan tidak pernah diberi ruang untuk bercerita.",
        "Re-Embodiment Fisik: Duduklah di kursi dengan merentangkan kedua tangan lebar-lebar, dan katakan dengan lantang: 'Aku ada di sini.'",
        "Catat Kebutuhan Harian di Nuju: Rekam satu keinginan jujur Anda setiap pagi sebelum mulai mengurus kebutuhan orang lain."
      ],
      de: [
        "Parasitäre Beziehungen prüfen: Erkennen Sie Dynamiken, in denen Sie zu 95 % zuhören und nichts teilen dürfen.",
        "Körperliche Raumannahme: Setzen Sie sich aufrecht hin, breiten Sie die Arme aus und sprechen Sie: 'Ich bin hier.'",
        "Tägliches Bedürfnis-Log in Nuju: Sprechen Sie jeden Morgen einen echten eigenen Wunsch laut ein."
      ],
      fr: [
        "Auditez vos relations : repérez les liens où vous écoutez 95% du temps sans jamais pouvoir vous confier.",
        "Réappropriation corporelle : ouvrez grand les bras et verbalisez : 'Je suis ici et j'ai le droit d'exister.'",
        "Journal matinal Nuju : enregistrez chaque matin un souhait personnel avant de vous occuper des autres."
      ],
      es: [
        "Audita tus vínculos vampíricos: detecta amistades donde escuchas el 95% del tiempo y no puedes desahogarte.",
        "Apropiación corporal: abre los brazos en una silla amplia y pronuncia con firmeza: 'Estoy aquí y ocupo mi lugar.'",
        "Registro de necesidades en Nuju: graba cada mañana un deseo propio antes de complacer al mundo."
      ]
    },
    badge: {
      en: "Invisible Echo",
      id: "Gema yang Tak Terlihat",
      de: "Unsichtbares Echo",
      fr: "Écho Invisible",
      es: "Eco Invisible"
    }
  },
  {
    level: "severe_chronic_echoism",
    scoreRange: [32, 36],
    title: {
      en: "Severe Chronic Echoism & Identity Obliteration",
      id: "Echoism Kronis Berat & Pemusnahan Jati Diri",
      de: "Schwerer chronischer Echoismus & Identitätsverlust",
      fr: "Échoïsme chronique sévère & anéantissement identitaire",
      es: "Ecoísmo crónico severo y anulación identitaria"
    },
    summary: {
      en: "You have completely renounced your right to exist as an individual. You believe you only have value when serving as an instrument for others, suffering deep psychosomatic exhaustion.",
      id: "Anda telah sepenuhnya melepaskan hak Anda untuk hidup sebagai individu berdaulat. Anda merasa hanya berharga jika menjadi alat pemuas orang lain, menanggung kelelahan psikososial akut.",
      de: "Sie haben Ihr Recht auf eine eigene Existenz aufgegeben. Sie fühlen sich nur als nützliches Werkzeug anderer wertvoll und leiden unter chronischer Erschöpfung.",
      fr: "Vous avez abdiqué votre droit d'exister par vous-même. Vous ne vous sentez digne d'amour que comme serviteur sacrificiel d'autrui.",
      es: "Has renunciado totalmente a tu derecho de existir como individuo autónomo. Solo te sientes válido siendo útil a otros, viviendo en agotamiento crónico."
    },
    neurobiology: {
      en: "Profound trauma-induced fawning collapse; complete suppression of the dorsal anterior cingulate cortex self-advocacy networks to protect against childhood narcissistic rage.",
      id: "Respons trauma fawning collapse tingkat akut; penekanan total pada sirkuit pembelaan diri otak demi menghindari kemarahan narsistik orang tua atau figur otoritas di masa lalu.",
      de: "Tiefer traumatischer Fawn-Kollaps; vollständige Unterdrückung der Selbstbehauptungsnetzwerke zum Schutz vor früher elterlicher Wut.",
      fr: "Sidération de soumission (fawn response) traumatique profonde : vos réseaux cérébraux d'auto-défense ont été éteints durant l'enfance.",
      es: "Colapso traumático de sumisión (fawn response); desconexión de los circuitos de defensa propia aprendida en la infancia."
    },
    actionProtocol: {
      en: [
        "Trauma-Informed Psychotherapy: Work with an IFS (Internal Family Systems) or somatic therapist to heal the terrified child part that learned to become Echo.",
        "Radical Boundary Experimentation: Say 'No' to one demand this week, turn off your phone, and breathe through the panic attack.",
        "Nuju Vocal Sanctuary: Rebuild your voice from scratch. Read poetry or speak stream-of-consciousness into Nuju to hear yourself exist."
      ],
      id: [
        "Psikoterapi Khusus Trauma: Konsultasikan dengan psikolog klinis berpendekatan IFS atau terapi somatik untuk memulihkan luka anak batin yang terpaksa menjadi gema.",
        "Eksperimen Batasan Radikal: Katakan 'Tidak' pada satu permintaan minggu ini, matikan ponsel, dan atur napas melewati lonjakan kepanikan.",
        "Bangun Kembali Suara Anda di Nuju: Bicaralah bebas tanpa naskah di jurnal suara Nuju untuk melatih otak Anda terbiasa mendengar suara Anda sendiri."
      ],
      de: [
        "Trauma-Therapie: Arbeiten Sie mit IFS (Internal Family Systems) an dem inneren Kind, das lernen musste, sich unsichtbar zu machen.",
        "Radikale Grenze setzen: Sagen Sie diese Woche einmal klar 'Nein', schalten Sie das Handy aus und atmen Sie durch die Angst.",
        "Stimm-Rettung in Nuju: Lesen Sie Texte laut in Ihr Nuju-Journal ein, um das Nervensystem wieder an Ihre eigene Stimme zu gewöhnen."
      ],
      fr: [
        "Thérapie du trauma (IFS / EMDR) : réparez la part enfantine terrorisée qui a appris à s'effacer pour survivre.",
        "Expérimentation radicale : osez un refus catégorique cette semaine, coupez votre téléphone et respirez à travers l'angoisse.",
        "Sanctuaire vocal Nuju : parlez à voix haute dans Nuju pour réhabituer votre esprit au timbre de votre propre voix."
      ],
      es: [
        "Terapia especializada en trauma (IFS / Somatic Experiencing): sana la parte infantil que aprendió a borrarse para sobrevivir.",
        "Límite radical: di 'No' a una petición esta semana, apaga las notificaciones y respira durante el ataque de culpa.",
        "Santuario de voz en Nuju: graba tu voz libremente en Nuju para que tu sistema nervioso se acostumbre a oírte existir."
      ]
    },
    badge: {
      en: "Submerged Echo",
      id: "Gema yang Tenggelam",
      de: "Erloschenes Echo",
      fr: "Écho Submergé",
      es: "Eco Anulado"
    }
  }
];

export const ECHOISM_SUBSCALE_INFO = {
  self_erasure: {
    name: {
      en: "Self-Erasure & Fear of Having Needs",
      id: "Penghapusan Diri & Takut Memiliki Kebutuhan",
      de: "Selbstauslöschung & Angst vor Bedürfnissen",
      fr: "Effacement de Soi & Peur d'Avoir des Besoins",
      es: "Auto-anulación y Miedo a Tener Necesidades"
    },
    description: {
      en: "Believing basic needs make you a burden; automatic compliance and dread of being seen as selfish.",
      id: "Meyakini kebutuhan dasar membuat Anda jadi beban; selalu mengalah dan takut dicap egois.",
      de: "Der Glaube, eine Last zu sein; automatisches Nachgeben aus Angst vor Vorwürfen.",
      fr: "Conviction d'être un fardeau; soumission automatique par peur d'être jugé(e) égoïste.",
      es: "Creer que tus necesidades molestan; ceder siempre por pánico a parecer egoísta."
    }
  },
  praise_aversion: {
    name: {
      en: "Praise Aversion & Spotlight Dread",
      id: "Keengganan Dipuji & Takut Jadi Pusat Perhatian",
      de: "Lob-Abwehr & Angst vor dem Rampenlicht",
      fr: "Aversion pour les Éloges & Peur de l'Éclat",
      es: "Rechazo a los Elogios y Pánico al Protagonismo"
    },
    description: {
      en: "Visceral discomfort with compliments, downplaying accomplishments, and dreading celebrations.",
      id: "Rasa sangat risih saat dipuji, meremehkan pencapaian diri, dan takut pada perayaan ulang tahun.",
      de: "Starkes Unbehagen bei Komplimenten, Herunterspielen von Erfolgen und Angst vor Ehrungen.",
      fr: "Malaise viscéral face aux compliments, minimisation des réussites et rejet des célébrations.",
      es: "Incomodidad extrema ante halagos, desprecio de los propios logros y pánico a las celebraciones."
    }
  },
  narcissist_magnet: {
    name: {
      en: "Narcissist Attraction & Mirroring Dynamic",
      id: "Daya Tarik Pasangan Narsis & Dinamika Cermin",
      de: "Anziehung zu Narzissten & Spiegel-Dynamik",
      fr: "Attraction pour les Narcissiques & Rôle de Miroir",
      es: "Atracción por Narcisistas y Dinámica de Espejo"
    },
    description: {
      en: "Attraction to dominant personalities; feeling valued only when reflecting and serving someone else.",
      id: "Tertarik pada sosok dominan; merasa hanya berharga saat menjadi cermin dan pelayan orang lain.",
      de: "Faszination für dominante Partner; Wertgefühl nur durch Dienst am Glanz anderer.",
      fr: "Attirance pour les personnalités dominantes; sentiment de valeur uniquement au service d'autrui.",
      es: "Atracción por personas dominantes; sentir que solo vales sirviendo de soporte al brillo ajeno."
    }
  }
};

export function getEchoismResult(totalScore: number): EchoismResultLevel {
  const matched = ECHOISM_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || ECHOISM_RESULTS[ECHOISM_RESULTS.length - 1];
}

export function calculateEchoismSubscales(answers: Record<number, number>): {
  self_erasure: number;
  praise_aversion: number;
  narcissist_magnet: number;
} {
  let self_erasure = 0;
  let praise_aversion = 0;
  let narcissist_magnet = 0;

  ECHOISM_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "self_erasure") self_erasure += val;
    if (q.subscale === "praise_aversion") praise_aversion += val;
    if (q.subscale === "narcissist_magnet") narcissist_magnet += val;
  });

  return { self_erasure, praise_aversion, narcissist_magnet };
}
