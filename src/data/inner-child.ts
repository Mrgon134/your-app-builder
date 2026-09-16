export type InnerChildLang = "en" | "id" | "de" | "fr" | "es";

export type InnerChildWoundType = "abandonment" | "achievement" | "guilt" | "invisibility";

export interface InnerChildQuestion {
  id: number;
  text: Record<InnerChildLang, string>;
  options: {
    text: Record<InnerChildLang, string>;
    wound: InnerChildWoundType;
    weight: number;
  }[];
}

export interface InnerChildProfile {
  id: InnerChildWoundType;
  title: Record<InnerChildLang, string>;
  archetype: Record<InnerChildLang, string>;
  emoji: string;
  tagline: Record<InnerChildLang, string>;
  origin: Record<InnerChildLang, string>;
  trigger: Record<InnerChildLang, string>;
  healingTruth: Record<InnerChildLang, string>;
  reparentingAction: Record<InnerChildLang, string>;
  journalPrompt: Record<InnerChildLang, string>;
}

export const INNER_CHILD_QUESTIONS: InnerChildQuestion[] = [
  {
    id: 1,
    text: {
      en: "When someone close to you suddenly seems distant or slow to reply, what is your immediate subconscious reaction?",
      id: "Ketika orang terdekatmu tiba-tiba bersikap dingin atau lama membalas pesan, apa reaksi spontan alam bawah sadarmu?",
      de: "Wenn jemand, der Ihnen nahesteht, plötzlich distanziert wirkt, was ist Ihre erste unbewusste Reaktion?",
      fr: "Quand un proche semble distant ou met du temps à répondre, quelle est votre première réaction inconsciente ?",
      es: "Cuando alguien cercano parece distante o tarda en responder, ¿cuál es su reacción inmediata inconsciente?",
    },
    options: [
      {
        wound: "abandonment",
        weight: 3,
        text: {
          en: "I panic and assume they are losing interest, getting angry, or planning to leave me.",
          id: "Aku langsung panik dan mengira mereka marah, mulai bosan, atau berniat meninggalkanku.",
          de: "Ich gerate in Panik und befürchte, die Person verliert das Interesse oder verlässt mich.",
          fr: "Je panique et imagine immédiatement qu'il/elle perd intérêt ou veut s'éloigner.",
          es: "Entro en pánico y asumo que está perdiendo el interés o alejándose de mí.",
        },
      },
      {
        wound: "guilt",
        weight: 3,
        text: {
          en: "I replay my recent actions in my head, frantically wondering what mistake I made to upset them.",
          id: "Aku memutar ulang percakapan sebelumnya di kepala, terus bertanya-tanya salah apa yang telah kuperbuat.",
          de: "Ich frage mich panisch, welchen Fehler ich gemacht haben könnte, um den anderen zu verstimmen.",
          fr: "Je ressasse mes derniers actes en me demandant quelle erreur j'ai commise.",
          es: "Repaso mis últimas palabras preguntándome qué error cometí para molestarle.",
        },
      },
      {
        wound: "achievement",
        weight: 3,
        text: {
          en: "I immediately try to be extra helpful, productive, or 'fix' their mood so I feel valuable again.",
          id: "Aku berusaha menjadi orang yang lebih berguna, menyenangkan mereka, atau memperbaiki situasi agar kembali dihargai.",
          de: "Ich versuche besonders hilfsbereit zu sein oder Probleme zu lösen, um meinen Wert zu beweisen.",
          fr: "J'essaie de me rendre indispensable et de résoudre ses problèmes pour prouver ma valeur.",
          es: "Intento ser súper útil o resolver cosas de inmediato para sentirme valorado.",
        },
      },
      {
        wound: "invisibility",
        weight: 3,
        text: {
          en: "I quietly retreat into my shell. I tell myself I don't need anyone and stay silent.",
          id: "Aku diam-diam menarik diri ke dalam cangkangku. Meyakinkan diri bahwa aku tidak butuh siapa pun dan memilih bungkam.",
          de: "Ich ziehe mich still zurück und sage mir, dass ich niemanden brauche.",
          fr: "Je me replie sur moi-même en silence en me persuadant que je n'ai besoin de personne.",
          es: "Me repliego en silencio y me convenzo de que no necesito a nadie.",
        },
      },
    ],
  },
  {
    id: 2,
    text: {
      en: "What kind of praise did you receive most often while growing up as a child?",
      id: "Pujian seperti apa yang paling sering kamu terima sewaktu masih kecil dulu?",
      de: "Welche Art von Lob haben Sie in Ihrer Kindheit am häufigsten erhalten?",
      fr: "Quel type de compliment receviez-vous le plus souvent enfant ?",
      es: "¿Qué tipo de elogio recibía con más frecuencia durante su infancia?",
    },
    options: [
      {
        wound: "achievement",
        weight: 3,
        text: {
          en: "'You got top grades! You are so smart, capable, and successful.'",
          id: "'Kamu ranking satu! Kamu pintar sekali, berprestasi, dan membanggakan.'",
          de: "'Tolle Noten! Du bist so klug, tüchtig und erfolgreich.'",
          fr: "'Tu as d'excellentes notes ! Tu es si intelligent(e) et brillant(e).'",
          es: "'¡Qué buenas notas! Eres muy inteligente, capaz y exitoso(a).'",
        },
      },
      {
        wound: "invisibility",
        weight: 3,
        text: {
          en: "'You are so quiet and well-behaved, you never cause any trouble or ask for anything.'",
          id: "'Kamu anak yang anteng dan penurut, tidak pernah merepotkan dan tidak banyak mau.'",
          de: "'Du bist so brav und pflegeleicht, du machst nie Ärger oder Umstände.'",
          fr: "'Tu es si calme et discret(ète), tu ne poses jamais de problème.'",
          es: "'Eres tan callado(a) y obediente, nunca causas problemas ni pides nada.'",
        },
      },
      {
        wound: "guilt",
        weight: 3,
        text: {
          en: "'Thank you for taking care of everyone and being the responsible little adult.'",
          id: "'Terima kasih sudah mengalah, menjaga adik-adik, dan menjadi anak yang dewasa sebelum waktunya.'",
          de: "'Danke, dass du auf alle aufpasst und so vernünftig bist.'",
          fr: "'Merci de t'occuper des autres et d'être si raisonnable.'",
          es: "'Gracias por cuidar de todos y comportarte como un adulto responsable.'",
        },
      },
      {
        wound: "abandonment",
        weight: 3,
        text: {
          en: "Praise was unpredictable or rarely given; I constantly feared not belonging or being left behind.",
          id: "Pujian jarang sekali kudapatkan atau tidak menentu; aku selalu cemas merasa tersisih atau tidak diinginkan.",
          de: "Lob war unberechenbar; ich hatte ständig Angst, nicht dazuzugehören.",
          fr: "Les éloges étaient rares ou imprévisibles ; je craignais constamment d'être délaissé(e).",
          es: "Los elogios eran escasos o erráticos; temía constantemente no encajar o ser abandonado(a).",
        },
      },
    ],
  },
  {
    id: 3,
    text: {
      en: "How do you honestly feel when you take an entire day to just rest and do absolutely nothing productive?",
      id: "Bagaimana perasaan jujurmu ketika mengambil satu hari penuh untuk rebahan dan tidak mengerjakan hal produktif?",
      de: "Wie fühlen Sie sich ehrlich, wenn Sie einen ganzen Tag lang faulenzen und absolut unproduktiv sind?",
      fr: "Que ressentez-vous sincèrement lorsque vous passez une journée entière sans rien faire de productif ?",
      es: "¿Cómo se siente realmente cuando pasa un día entero descansando sin hacer nada productivo?",
    },
    options: [
      {
        wound: "guilt",
        weight: 3,
        text: {
          en: "Overwhelming guilt. I feel like a lazy, bad person who doesn't deserve rest.",
          id: "Rasa bersalah yang luar biasa. Aku merasa jadi orang malas yang tidak pantas untuk beristirahat.",
          de: "Erdrückende Schuldgefühle. Ich fühle mich schlecht und unverdient faul.",
          fr: "Une culpabilité écrasante. J'ai l'impression d'être une mauvaise personne qui ne mérite pas de repos.",
          es: "Una culpa abrumadora. Siento que soy una persona perezosa que no merece descansar.",
        },
      },
      {
        wound: "achievement",
        weight: 3,
        text: {
          en: "Restless anxiety. I keep thinking about what other people are accomplishing while I fall behind.",
          id: "Gelisah dan cemas. Pikiranku terus memikirkan pencapaian orang lain sementara aku tertinggal di belakang.",
          de: "Rastlose Unruhe. Ich denke ständig daran, wie andere mich überholen.",
          fr: "Une anxiété agitée. Je pense constamment à ce que les autres accomplissent pendant que je stagne.",
          es: "Inquietud y ansiedad. Pienso en todo lo que otros avanzan mientras yo me quedo atrás.",
        },
      },
      {
        wound: "invisibility",
        weight: 3,
        text: {
          en: "I enjoy the solitude, but deep down I feel disconnected, invisible, and detached from the world.",
          id: "Aku menikmati kesendirian, tapi di lubuk hati terdalam merasa terasing, tak terlihat, dan hampa.",
          de: "Ich schätze die Stille, fühle mich aber innerlich isoliert und unsichtbar.",
          fr: "J'apprécie l'isolement, mais au fond je me sens invisible et coupé(e) du monde.",
          es: "Disfruto la soledad, pero en el fondo me siento invisible y desconectado(a) del mundo.",
        },
      },
      {
        wound: "abandonment",
        weight: 3,
        text: {
          en: "If I am alone with no one checking in on me, an unsettling ache of loneliness and emptiness creeps in.",
          id: "Jika seharian sendirian dan tidak ada yang mengabari, rasa sepi yang mengiris hati perlahan merayap masuk.",
          de: "Wenn sich niemand meldet, überkommt mich ein quälendes Gefühl tiefer Einsamkeit.",
          fr: "Si personne ne me donne de nouvelles, un vide angoissant de solitude m'envahit.",
          es: "Si nadie me escribe, me invade un vacío inquietante de soledad y abandono.",
        },
      },
    ],
  },
  {
    id: 4,
    text: {
      en: "When you are in genuine physical or emotional pain, what is your default behavior?",
      id: "Saat kamu sedang sakit fisik atau mengalami luka emosional berat, apa sikap alamiahmu?",
      de: "Wenn Sie körperliche oder seelische Schmerzen haben, wie verhalten Sie sich meistens?",
      fr: "Quand vous souffrez physiquement ou émotionnellement, quelle est votre attitude par défaut ?",
      es: "¿Cómo reacciona habitualmente cuando sufre dolor físico o emocional genuino?",
    },
    options: [
      {
        wound: "invisibility",
        weight: 3,
        text: {
          en: "I minimize it completely. 'I'm fine, it's nothing.' I handle everything alone and never ask for help.",
          id: "Aku mengecilkannya: 'Aku gapapa kok, santai aja.' Aku menanggung semuanya sendirian dan pantang minta bantuan.",
          de: "Ich spiele es herunter: 'Alles gut, ist nichts.' Ich frage niemals nach Hilfe.",
          fr: "Je minimise tout : 'Ça va, ce n'est rien.' Je garde tout pour moi sans jamais appeler à l'aide.",
          es: "Lo minimizo por completo: 'No pasa nada, estoy bien'. Lo afronto solo(a) y jamás pido ayuda.",
        },
      },
      {
        wound: "achievement",
        weight: 3,
        text: {
          en: "I force myself to push through and keep working. Showing weakness or slowing down feels intolerable.",
          id: "Aku memaksakan diri untuk terus bekerja. Menunjukkan kelemahan atau melambat terasa memalukan.",
          de: "Ich beiße die Zähne zusammen und arbeite weiter. Schwäche zu zeigen fühlt sich unerträglich an.",
          fr: "Je force et continue de travailler. Ralentir ou montrer de la faiblesse m'est insupportable.",
          es: "Me obligo a seguir adelante y trabajar. Mostrar debilidad me resulta intolerable.",
        },
      },
      {
        wound: "guilt",
        weight: 3,
        text: {
          en: "I apologize to others for being a burden, inconvenience, or bringing down the mood.",
          id: "Aku meminta maaf pada orang sekitar karena merasa telah merepotkan atau merusak suasana.",
          de: "Ich entschuldige mich bei anderen dafür, dass ich ihnen zur Last falle.",
          fr: "Je m'excuse auprès des autres d'être un fardeau ou de plomber l'ambiance.",
          es: "Pido disculpas a los demás por ser una molestia o arruinar el ambiente.",
        },
      },
      {
        wound: "abandonment",
        weight: 3,
        text: {
          en: "I crave someone to stay by my side and hold space, but I am terrified they will get exhausted and leave.",
          id: "Aku sangat mendambakan seseorang menemani, tapi di saat yang sama takut mereka jenuh lalu pergi.",
          de: "Ich sehne mich nach Beistand, fürchte aber, den anderen zu überfordern.",
          fr: "J'ai un besoin viscéral de présence, tout en craignant que l'autre se lasse et s'en aille.",
          es: "Anhelo que alguien me acompañe, pero temo que se canse y me deje.",
        },
      },
    ],
  },
  {
    id: 5,
    text: {
      en: "In close relationships, what is your deepest, most terrifying nightmare?",
      id: "Dalam hubungan dekat, apa mimpi buruk terdalam yang paling kamu takuti?",
      de: "Was ist in engen Beziehungen Ihre größte, tief sitzende Urangst?",
      fr: "Dans une relation intime, quelle est votre plus grande terreur ?",
      es: "¿Cuál es su mayor pesadilla inconsciente en las relaciones cercanas?",
    },
    options: [
      {
        wound: "abandonment",
        weight: 3,
        text: {
          en: "Waking up to find that the person I love has replaced me or decided I am completely disposable.",
          id: "Mendapati bahwa orang yang kusayangi telah menggantikanku dengan yang lain atau menganggapku mudah dibuang.",
          de: "Dass mein Partner mich austauscht oder beschließt, dass ich wertlos bin.",
          fr: "Découvrir que la personne que j'aime m'a remplacé(e) ou peut se passer de moi sans peine.",
          es: "Descubrir que la persona que amo me ha reemplazado o prescinde de mí con facilidad.",
        },
      },
      {
        wound: "achievement",
        weight: 3,
        text: {
          en: "Failing completely, losing all my accomplishments, and having people realize I was an imposter all along.",
          id: "Gagal total, kehilangan status atau prestasiku, dan orang-orang menyadari bahwa aku hanyalah penipu.",
          de: "Völlig zu versagen und als Betrüger ohne echten Wert entlarvt zu werden.",
          fr: "Échouer totalement et voir les autres réaliser que je ne valais rien en réalité.",
          es: "Fracasar por completo y que descubran que nunca fui tan capaz como creían.",
        },
      },
      {
        wound: "guilt",
        weight: 3,
        text: {
          en: "Causing irreversible harm or disappointment to someone I love and carrying that blame forever.",
          id: "Membuat orang yang kucintai kecewa berat atau terluka karena kesalahanku, lalu menanggung dosanya selamanya.",
          de: "Jemandem, den ich liebe, unumkehrbaren Schmerz oder Enttäuschung zuzufügen.",
          fr: "Décevoir profondément un être cher et porter cette faute pour toujours.",
          es: "Decepcionar o herir profundamente a un ser querido y cargar con la culpa siempre.",
        },
      },
      {
        wound: "invisibility",
        weight: 3,
        text: {
          en: "Being completely forgotten, speaking up only to be ignored, and dying without ever having been truly seen.",
          id: "Benar-benar dilupakan, bersuara tapi diabaikan, dan pergi tanpa pernah ada yang benar-benar mengenal jiwaku.",
          de: "Völlig übersehen zu werden und ungehört zu bleiben, als hätte ich nie existiert.",
          fr: "Être totalement ignoré(e) et disparaître sans que personne ne m'ait jamais réellement vu(e).",
          es: "Ser totalmente invisible, hablar y ser ignorado(a), sin que nadie me conozca de verdad.",
        },
      },
    ],
  },
  {
    id: 6,
    text: {
      en: "When you make a minor mistake in front of colleagues or friends, what is the voice inside your head saying?",
      id: "Saat kamu melakukan kesalahan kecil di depan rekan kerja atau teman, apa bisikan suara di dalam kepalamu?",
      de: "Wenn Sie vor Kollegen einen kleinen Fehler machen, was sagt die innere Stimme?",
      fr: "Quand vous faites une petite erreur en public, que vous dit votre voix intérieure ?",
      es: "¿Qué dice su voz interna cuando comete un pequeño error ante los demás?",
    },
    options: [
      {
        wound: "achievement",
        weight: 3,
        text: {
          en: "'How could you be so sloppy? You ruined everything. You must work twice as hard now.'",
          id: "'Kok bisa seceroboh itu? Semuanya rusak gara-gara kamu. Kamu harus kerja dua kali lebih keras sekarang.'",
          de: "'Wie konntest du nur so schlampig sein? Du musst jetzt doppelt so hart arbeiten.'",
          fr: "'Comment as-tu pu être si nul(le) ? Tu dois travailler deux fois plus maintenant.'",
          es: "'¿Cómo pudiste ser tan torpe? Lo arruinaste. Ahora tienes que compensarlo el doble.'",
        },
      },
      {
        wound: "guilt",
        weight: 3,
        text: {
          en: "'It's entirely your fault. Everyone is secretly judging you or suffering because of you.'",
          id: "'Ini semua murni salahmu. Semua orang diam-diam menghakimimu atau menderita karenamu.'",
          de: "'Das ist ganz deine Schuld. Alle leiden nun unter deiner Unachtsamkeit.'",
          fr: "'C'est entièrement de ta faute. Tout le monde te juge et subit ton incompétence.'",
          es: "'Es totalmente culpa tuya. Todos te juzgan en secreto por perjudicarles.'",
        },
      },
      {
        wound: "abandonment",
        weight: 3,
        text: {
          en: "'Now they will lose respect for you and find an excuse to push you away.'",
          id: "'Sekarang mereka pasti hilang respek padamu dan mencari alasan untuk menjauhimu.'",
          de: "'Jetzt werden sie dich meiden und den Respekt vor dir verlieren.'",
          fr: "'Maintenant ils vont perdre tout respect et chercher à t'exclure du groupe.'",
          es: "'Ahora perderán el respeto por ti y buscarán cualquier excusa para alejarte.'",
        },
      },
      {
        wound: "invisibility",
        weight: 3,
        text: {
          en: "'I wish I could disappear into thin air so nobody notices I even exist.'",
          id: "'Rasanya ingin langsung menghilang ditelan bumi agar tidak ada yang menyadari keberadaanku.'",
          de: "'Ich wünschte, ich könnte mich in Luft auflösen, damit mich niemand bemerkt.'",
          fr: "'J'aimerais disparaître sous terre pour que personne ne remarque mon existence.'",
          es: "'Ojalá pudiera desaparecer y que nadie recuerde que estuve aquí.'",
        },
      },
    ],
  },
];

export const INNER_CHILD_PROFILES: Record<InnerChildWoundType, InnerChildProfile> = {
  abandonment: {
    id: "abandonment",
    title: {
      en: "The Abandoned Child (Luka Pengabaian)",
      id: "Luka Pengabaian (The Abandoned Child)",
      de: "Das verlassene Kind (Abandonment Wound)",
      fr: "L'Enfant Abandonné (Blessure d'abandon)",
      es: "La Herida del Abandono (The Abandoned Child)",
    },
    archetype: {
      en: "The Hypervigilant Protector",
      id: "Penjaga yang Waspada",
      de: "Der überwachsame Beschützer",
      fr: "Le Protecteur Hypervigilant",
      es: "El Protector Hipervigilante",
    },
    emoji: "🌊",
    tagline: {
      en: "You learned to cling tightly because love once vanished without warning.",
      id: "Kamu belajar menggenggam erat karena cinta pernah menghilang tanpa aba-aba.",
      de: "Du hast gelernt festzuhalten, weil Zuneigung einst ohne Vorwarnung verschwand.",
      fr: "Tu as appris à t'accrocher car l'amour a déjà disparu sans prévenir.",
      es: "Aprendiste a aferrarte con fuerza porque el amor una vez desapareció sin aviso.",
    },
    origin: {
      en: "In your formative years, emotional presence was inconsistent, unpredictable, or abruptly withdrawn. You developed a chronic belief that people will eventually leave once they see your flaws.",
      id: "Di masa kecilmu, kehadiran emosional figur pengasuh tidak konsisten atau mendadak hilang. Kamu tumbuh dengan keyakinan bahwa pada akhirnya orang-orang pasti akan pergi jika mengenal kelemahanmu.",
      de: "In Ihrer Kindheit war emotionale Zuwendung unbeständig oder abrupt weggebrochen. Sie entwickelten die Überzeugung, dass Nähe stets von Verlust bedroht ist.",
      fr: "Durant votre enfance, l'attention affective était irrégulière ou imprévisible. Vous avez développé la conviction que les autres finiront toujours par partir.",
      es: "En su infancia, la presencia emocional fue inestable o ausente. Creció con el temor visceral a que las personas siempre se marchen.",
    },
    trigger: {
      en: "Unanswered messages, sudden emotional coldness, changes in vocal tone, or canceled plans.",
      id: "Pesan yang tidak dibalas, perubahan nada bicara yang dingin, atau rencana yang mendadak dibatalkan.",
      de: "Unbeantwortete Nachrichten, kühler Tonfall oder kurzfristig abgesagte Treffen.",
      fr: "Messages sans réponse, froideur soudaine ou annulation de rendez-vous.",
      es: "Mensajes sin responder, frialdad repentina o cancelación de planes.",
    },
    healingTruth: {
      en: "You are no longer that helpless child. If someone leaves your life today, you have the full power to hold, love, and care for yourself. You are not abandonable.",
      id: "Kamu bukan lagi anak kecil yang tak berdaya itu. Jika hari ini seseorang pergi, kamu memiliki kekuatan penuh untuk mencintai dan merawat dirimu sendiri. Kamu berharga seutuhnya.",
      de: "Sie sind kein hilfloses Kind mehr. Selbst wenn Menschen gehen, können Sie sich selbst Geborgenheit schenken.",
      fr: "Vous n'êtes plus cet enfant vulnérable. Vous avez désormais la force de vous soutenir pleinement.",
      es: "Ya no es aquel niño o niña indefenso(a). Si alguien se marcha, usted tiene la fuerza de amarse y protegerse.",
    },
    reparentingAction: {
      en: "Place both hands on your chest when anxious, breathe deeply, and whisper: 'I will never leave you. I am staying right here.'",
      id: "Dekap kedua tangan di dada saat cemas, tarik napas panjang, dan bisikkan: 'Aku tidak akan pernah meninggalkanmu. Aku selalu ada di sini bersamamu.'",
      de: "Legen Sie bei Angst beide Hände aufs Herz und sagen Sie sich: 'Ich lasse dich niemals im Stich.'",
      fr: "Posez vos mains sur votre cœur et répétez-vous : 'Je ne t'abandonnerai jamais, je suis là.'",
      es: "Ponga las manos sobre el pecho y susurre: 'Jamás te abandonaré. Yo estoy aquí contigo.'",
    },
    journalPrompt: {
      en: "What is one fear of abandonment I am projecting onto my current partner or friend that isn't actually happening?",
      id: "Kekhawatiran ditinggalkan apa yang saat ini sedang kuproyeksikan ke pasangan atau temanku padahal sebenarnya tidak nyata terjadi?",
      de: "Welche Verlustangst projiziere ich gerade auf meine Beziehungen, die gar nicht der Realität entspricht?",
      fr: "Quelle peur d'abandon suis-je en train de projeter sur mon entourage sans fondement réel ?",
      es: "¿Qué miedo al rechazo estoy proyectando en mi relación actual que no coincide con la realidad?",
    },
  },
  achievement: {
    id: "achievement",
    title: {
      en: "The Overburdened Achiever (Luka Tuntutan Sukses)",
      id: "Luka Tuntutan Sukses (The Overburdened Achiever)",
      de: "Das überforderte Leistungskind (Achievement Wound)",
      fr: "L'Enfant Performant (Blessure de la réussite conditionnelle)",
      es: "La Herida del Éxito Condicional (The Overburdened Achiever)",
    },
    archetype: {
      en: "The Relentless Striver",
      id: "Pengejar Prestasi Tiada Henti",
      de: "Der rastlose Perfektionist",
      fr: "Le Perfectionniste Infatigable",
      es: "El Perfeccionista Incansable",
    },
    emoji: "⚡",
    tagline: {
      en: "You learned that your worth only exists when you are winning or productive.",
      id: "Kamu belajar bahwa keberhargaan dirimu hanya diakui saat kamu sukses atau berprestasi.",
      de: "Du hast gelernt, dass dein Wert nur an Leistung und Perfektion gekoppelt ist.",
      fr: "Tu as appris que ta valeur ne dépend que de tes résultats et de ta performance.",
      es: "Aprendiste que tu valía solo existe cuando tienes éxito o eres productivo(a).",
    },
    origin: {
      en: "Love, praise, and warmth were conditional upon your performance, good grades, or obedience. You internalized that resting is dangerous and that failure equals worthlessness.",
      id: "Kasih sayang dan pujian di masa kecil bersyarat pada nilai rapor, piala, atau kepatuhanmu. Kamu menyerap keyakinan bahwa istirahat itu salah dan kegagalan berarti kamu tidak berharga.",
      de: "Zuneigung gab es vor allem für gute Noten und Erfolge. Ruhepausen wurden mit Faulheit gleichgesetzt.",
      fr: "L'amour et l'approbation dépendaient de vos notes et de vos succès. Le repos était perçu comme une faute.",
      es: "El afecto dependía de las notas altas o los logros. Interiorizó que descansar es una pérdida de tiempo.",
    },
    trigger: {
      en: "Criticism at work, falling behind a deadline, taking days off, or seeing peers succeed.",
      id: "Kritik dalam pekerjaan, tertinggal deadline, mengambil cuti libur, atau melihat pencapaian orang lain.",
      de: "Kritik im Beruf, Verzögerungen oder der berufliche Erfolg anderer.",
      fr: "Une critique au travail, un retard ou la réussite insolente d'un pair.",
      es: "Críticas profesionales, retrasos o ver el éxito deslumbrante de otros.",
    },
    healingTruth: {
      en: "You are a human being, not a human doing. Your existence has inherent dignity even on days you accomplish nothing.",
      id: "Kamu adalah manusia seutuhnya (human being), bukan mesin pencetak karya (human doing). Keberadaanmu berharga bahkan di hari kamu tidak menghasilkan apa-apa.",
      de: "Sie sind ein Mensch, keine Leistungsmaschine. Ihr Wert existiert unabhängig von To-Do-Listen.",
      fr: "Vous êtes un être humain, pas une machine à produire. Votre valeur est intrinsèque.",
      es: "Usted es un ser humano, no una máquina de resultados. Su valor es sagrado incluso sin producir.",
    },
    reparentingAction: {
      en: "Schedule 30 minutes of intentional 'Zero-Utility Play' today (sketching, listening to music, resting) with zero productivity goals.",
      id: "Jadwalkan 30 menit 'Zero-Utility Play' hari ini (mendengarkan musik, melamun, jalan santai) tanpa target produktivitas apa pun.",
      de: "Gönnen Sie sich heute 30 Minuten absichtslosen Müßiggang ohne jegliches Ziel.",
      fr: "Accordez-vous 30 minutes de détente pure sans aucun objectif d'efficacité.",
      es: "Dedíquese 30 minutos de descanso consciente sin ningún objetivo productivo.",
    },
    journalPrompt: {
      en: "Who am I when I strip away my job title, salary, and daily productivity?",
      id: "Siapa diriku yang sesungguhnya jika jabatan, prestasi, dan daftar pekerjaanku dilepaskan seluruhnya?",
      de: "Wer bin ich eigentlich, wenn ich Jobtitel, Status und Leistung komplett ablege?",
      fr: "Qui suis-je réellement lorsque je retire mon métier, mon statut et mes réussites ?",
      es: "¿Quién soy de verdad cuando me despojo de mis títulos, trabajo y lista de tareas?",
    },
  },
  guilt: {
    id: "guilt",
    title: {
      en: "The Guilt-Ridden Child (Luka Beban & Rasa Bersalah)",
      id: "Luka Rasa Bersalah (The Guilt-Ridden Child)",
      de: "Das schuldbehaftete Kind (Guilt Wound)",
      fr: "L'Enfant Coupable (Blessure de culpabilité)",
      es: "La Herida de la Culpa (The Guilt-Ridden Child)",
    },
    archetype: {
      en: "The Eternal Peacemaker",
      id: "Pendamai Abadi",
      de: "Der ewige Friedensstifter",
      fr: "Le Pacificateur Éternel",
      es: "El Pacificador Eterno",
    },
    emoji: "🕊️",
    tagline: {
      en: "You were forced to carry adult emotions before your shoulders were ready.",
      id: "Kamu dipaksa memikul beban emosi orang dewasa sebelum bahumu siap menopangnya.",
      de: "Du musstest erwachsene Lasten tragen, bevor deine Schultern bereit dafür waren.",
      fr: "Tu as dû porter des fardeaux d'adulte bien trop tôt dans ta vie.",
      es: "Tuviste que cargar con emociones de adultos mucho antes de estar preparado(a).",
    },
    origin: {
      en: "You were parentified—made to soothe an emotionally volatile caregiver or keep the peace at home. You learned that having your own needs causes conflict or pain to others.",
      id: "Kamu mengalami 'parentifikasi'—menjadi penenang bagi orang tua yang rapuh atau menjadi penengah konflik rumah. Kamu tumbuh dengan keyakinan bahwa memiliki kebutuhan pribadi akan menyakiti orang lain.",
      de: "Sie wurden früh zum Seelentröster der Eltern gemacht und lernten, eigene Bedürfnisse als egoistisch zu verdrängen.",
      fr: "Vous avez été parentifié(e) pour apaiser le foyer. Exprimer vos besoins vous semblait coupable.",
      es: "Asumió un rol protector demasiado pronto. Aprendió que tener necesidades propias dañaba a los demás.",
    },
    trigger: {
      en: "Saying 'no', setting a boundary, seeing someone upset, or taking money/care for yourself.",
      id: "Mengatakan 'tidak', memasang batasan diri, melihat orang lain sedih, atau mengeluarkan uang untuk kesenangan diri.",
      de: "Nein-Sagen, Grenzen setzen oder zu sehen, dass jemand unglücklich ist.",
      fr: "Dire non, poser une limite ou dépenser de l'argent pour son propre bien-être.",
      es: "Decir que no, poner límites o gastar tiempo y dinero en su propio bienestar.",
    },
    healingTruth: {
      en: "You are responsible to people, but not responsible for their emotions. Other adults are capable of holding their own discomfort.",
      id: "Kamu bertanggung jawab untuk bersikap santun, tapi kamu BUKAN penanggung jawab atas emosi orang lain. Orang dewasa lain mampu mengelola kekecewaan mereka sendiri.",
      de: "Sie sind nicht für die Gefühle anderer verantwortlich. Jeder Erwachsene trägt seine eigene Last.",
      fr: "Vous n'êtes pas responsable du bonheur émotionnel d'autrui. Vos limites sont saines.",
      es: "No es responsable de las emociones de los demás. Cada adulto debe gestionar su propio malestar.",
    },
    reparentingAction: {
      en: "Say an honest 'No' to one non-essential request this week without giving an over-apologetic excuse.",
      id: "Katakan 'Tidak' dengan sopan pada satu permintaan yang membebani minggu ini tanpa memberikan alasan berbelit-belit.",
      de: "Sagen Sie diese Woche einmal bewusst Nein zu einer Bitte, ohne sich langatmig zu rechtfertigen.",
      fr: "Dites un non ferme et poli cette semaine sans vous justifier excessivement.",
      es: "Diga un 'no' sincero y amable esta semana sin disculparse en exceso.",
    },
    journalPrompt: {
      en: "Whose emotional burden am I carrying right now that actually does not belong to me?",
      id: "Beban emosional siapa yang saat ini sedang kupikul padahal sebenarnya bukan tanggung jawabku?",
      de: "Wessen Sorgen trage ich gerade auf meinen Schultern, die gar nicht meine sind?",
      fr: "Quel fardeau émotionnel suis-je en train de porter qui n'est pas le mien ?",
      es: "¿La carga emocional de quién estoy llevando sobre mis espaldas que no me pertenece?",
    },
  },
  invisibility: {
    id: "invisibility",
    title: {
      en: "The Invisible Child (Luka Kebutuhan Terbungkam)",
      id: "Luka Terabaikan (The Invisible Child)",
      de: "Das unsichtbare Kind (Invisibility Wound)",
      fr: "L'Enfant Invisible (Blessure d'effacement)",
      es: "La Herida de la Invisibilidad (The Invisible Child)",
    },
    archetype: {
      en: "The Quiet Nomad",
      id: "Pengelana yang Hening",
      de: "Der stille Einzelgänger",
      fr: "Le Solitaire Discret",
      es: "El Observador Invisible",
    },
    emoji: "🌌",
    tagline: {
      en: "You learned to make yourself small so nobody would see you as a burden.",
      id: "Kamu belajar mengecilkan diri agar tidak dianggap sebagai beban oleh siapa pun.",
      de: "Du hast gelernt dich unsichtbar zu machen, um niemandem zur Last zu fallen.",
      fr: "Tu as appris à te faire tout(e) petit(e) pour ne déranger personne.",
      es: "Aprendiste a hacerte pequeño(a) para no ser una carga para nadie.",
    },
    origin: {
      en: "In a chaotic or neglectful environment, remaining quiet and invisible was your safest survival tactic. Your emotional needs were ignored, so you learned not to have any.",
      id: "Di lingkungan masa kecil yang kacau atau abai, bersikap pendiam dan tidak terlihat adalah cara teraman untuk bertahan hidup. Kebutuhanmu sering diabaikan sehingga kamu belajar untuk menekan semuanya.",
      de: "In einem chaotischen oder emotional kalten Umfeld war Unsichtbarkeit Ihr bester Schutz vor Ärger.",
      fr: "Dans un climat difficile, le silence était votre meilleur refuge. Vous avez appris à éteindre vos désirs.",
      es: "En un hogar caótico o distante, pasar desapercibido(a) fue su escudo protector.",
    },
    trigger: {
      en: "Being in large crowds, speaking in public, being ignored in group chats, or being talked over.",
      id: "Berada di kerumunan, berbicara di depan umum, diabaikan di grup chat, atau dipotong saat sedang berbicara.",
      de: "In Gruppen ignoriert zu werden oder im Mittelpunkt der Aufmerksamkeit zu stehen.",
      fr: "Être coupé(e) en réunion ou ignoré(e) dans une conversation de groupe.",
      es: "Ser interrumpido(a) o ignorado(a) en grupos sociales o de trabajo.",
    },
    healingTruth: {
      en: "You take up sacred space in this universe. Your voice matters, your preferences are important, and you deserve to be seen and celebrated.",
      id: "Kamu berhak memiliki ruang di dunia ini. Suaramu berharga, seleramu penting, dan kamu layak untuk dilihat serta dirayakan apa adanya.",
      de: "Sie haben das Recht auf Raum und Gehör. Ihre Stimme und Ihre Wünsche zählen.",
      fr: "Vous avez toute votre place ici. Votre voix et vos émotions méritent d'être entendues.",
      es: "Tiene derecho a ocupar espacio. Su voz importa y merece ser escuchado(a) y valorado(a).",
    },
    reparentingAction: {
      en: "Express one clear preference out loud today (e.g. choose the restaurant, pick the movie, or share an opinion) without backpedaling.",
      id: "Nyatakan satu preferensimu secara lantang hari ini (misal memilih menu makanan atau mengutarakan pendapat) tanpa menariknya kembali.",
      de: "Äußern Sie heute eine klare persönliche Vorliebe, ohne sofort klein beizugeben.",
      fr: "Exprimez une préférence claire aujourd'hui sans vous excuser de choisir.",
      es: "Exprese una preferencia propia hoy en voz alta sin retractarse.",
    },
    journalPrompt: {
      en: "What is a true desire of mine that I have kept hidden from everyone because I thought it was 'too much'?",
      id: "Keinginan tulus apa yang selama ini kusimpan sendirian karena takut dianggap 'terlalu merepotkan' atau 'berlebihan'?",
      de: "Welchen echten Wunsch habe ich bisher verheimlicht, aus Angst, als 'anstrengend' zu gelten?",
      fr: "Quel désir profond ai-je enfoui par peur de paraître 'trop exigeant(e)' ?",
      es: "¿Qué deseo auténtico he mantenido oculto por miedo a parecer una molestia?",
    },
  },
};

export const calculateInnerChildResult = (answers: Record<number, InnerChildWoundType>) => {
  const tally: Record<InnerChildWoundType, number> = {
    abandonment: 0,
    achievement: 0,
    guilt: 0,
    invisibility: 0,
  };

  Object.values(answers).forEach((wound) => {
    tally[wound] = (tally[wound] || 0) + 1;
  });

  const total = Object.values(tally).reduce((a, b) => a + b, 0) || 1;

  // Find primary and secondary
  const sorted = (Object.keys(tally) as InnerChildWoundType[]).sort((a, b) => tally[b] - tally[a]);
  const primaryKey = sorted[0];
  const secondaryKey = sorted[1];

  return {
    primary: INNER_CHILD_PROFILES[primaryKey],
    secondary: INNER_CHILD_PROFILES[secondaryKey],
    scores: {
      abandonment: Math.round((tally.abandonment / total) * 100),
      achievement: Math.round((tally.achievement / total) * 100),
      guilt: Math.round((tally.guilt / total) * 100),
      invisibility: Math.round((tally.invisibility / total) * 100),
    },
  };
};
