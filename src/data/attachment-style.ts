import juGreat from "@/assets/ju-great.webp";
import juGood from "@/assets/ju-good.webp";
import juOkay from "@/assets/ju-okay.webp";
import juRough from "@/assets/ju-rough.webp";
import juLow from "@/assets/ju-low.webp";
import { SupportedLang } from "@/data/dass21";

export type AttachmentStyleId = "secure" | "anxious" | "avoidant" | "disorganized";

export interface AttachmentQuestion {
  id: number;
  prompt: Record<SupportedLang, string>;
  subprompt: Record<SupportedLang, string>;
  options: {
    id: string;
    label: Record<SupportedLang, string>;
    anxietyDelta: number; // contribution to attachment anxiety (0-10)
    avoidanceDelta: number; // contribution to attachment avoidance (0-10)
    icon: string;
  }[];
}

export interface AttachmentResult {
  id: AttachmentStyleId;
  title: Record<SupportedLang, string>;
  badge: Record<SupportedLang, string>;
  subtitle: Record<SupportedLang, string>;
  coreTrait: Record<SupportedLang, string>;
  description: Record<SupportedLang, string>;
  triggerText: Record<SupportedLang, string>;
  nervousSystemInsight: Record<SupportedLang, string>;
  communicationScript: Record<SupportedLang, string>;
  actionSteps: Record<SupportedLang, string[]>;
  recommendedJournalPrompt: Record<SupportedLang, string>;
  mascotImage: string;
  mascotMood: "great" | "good" | "okay" | "rough" | "low";
}

export const ATTACHMENT_QUESTIONS: AttachmentQuestion[] = [
  {
    id: 1,
    prompt: {
      en: "When your partner or close friend takes hours to reply to a text, what happens inside you?",
      de: "Wenn dein Partner oder ein enger Freund stundenlang nicht auf eine Nachricht antwortet, was passiert in dir?",
      fr: "Lorsque votre partenaire ou un ami proche met des heures à répondre à un message, que se passe-t-il en vous ?",
      es: "Cuando tu pareja o un amigo cercano tarda horas en responder a un mensaje, ¿qué ocurre dentro de ti?",
      id: "Ketika pasangan atau teman dekat butuh waktu berjam-jam untuk membalas pesan, apa reaksi pertamamu?",
    },
    subprompt: {
      en: "Your baseline reaction to temporary emotional absence.",
      de: "Deine intuitive Reaktion auf vorübergehende Funkstille.",
      fr: "Votre réaction spontanée à l'absence temporaire.",
      es: "Tu reacción instintiva ante la desconexión temporal.",
      id: "Reaksi spontan tubuh dan pikiranmu saat terjadi jeda komunikasi.",
    },
    options: [
      {
        id: "1a",
        label: {
          en: "Assume they are busy; continue your day peacefully without overthinking.",
          de: "Gehe davon aus, dass sie beschäftigt sind; lebe deinen Tag entspannt weiter.",
          fr: "Vous supposez qu'ils sont occupés ; vous continuez votre journée calmement.",
          es: "Asumes que están ocupados; sigues con tu día tranquilamente.",
          id: "Biasa saja dan anggap mereka sedang sibuk; melanjutkan hari dengan tenang.",
        },
        anxietyDelta: 1,
        avoidanceDelta: 1,
        icon: "☕",
      },
      {
        id: "1b",
        label: {
          en: "Re-read your previous message frantically, wondering if you said something wrong.",
          de: "Liest deine letzte Nachricht mehrfach und fragst dich, was du falsch gemacht hast.",
          fr: "Vous relisez votre dernier message avec angoisse, craignant d'avoir fait une erreur.",
          es: "Relees tu último mensaje con inquietud, temiendo haberte equivocado.",
          id: "Membaca ulang pesan sebelumnya dan takut apakah kamu salah bicara.",
        },
        anxietyDelta: 9,
        avoidanceDelta: 2,
        icon: "💭",
      },
      {
        id: "1c",
        label: {
          en: "Feel relieved by the space and decide you won't reply immediately when they do.",
          de: "Bist erleichtert über den Freiraum und nimmst dir vor, später auch spät zu antworten.",
          fr: "Vous appréciez cet espace et décidez que vous tarderez aussi à répondre.",
          es: "Agradeces el espacio y decides que tardarás en contestar cuando escriban.",
          id: "Merasa lega ada ruang sendiri dan berniat balas lama juga nanti.",
        },
        anxietyDelta: 2,
        avoidanceDelta: 9,
        icon: "🛡️",
      },
      {
        id: "1d",
        label: {
          en: "Oscillate between anger ('How dare they') and panic ('They are going to leave me').",
          de: "Schwankst zwischen Wut ('Wie können sie nur') und Panik ('Sie verlassen mich').",
          fr: "Vous hésitez entre colère ('C'est inadmissible') et panique ('Ils vont m'abandonner').",
          es: "Oscilas entre enfado ('Cómo se atreve') y pánico ('Me va a abandonar').",
          id: "Bergantian antara marah ('Kok tega') dan panik ('Jangan-jangan dia mau pergi').",
        },
        anxietyDelta: 9,
        avoidanceDelta: 8,
        icon: "⚡",
      },
    ],
  },
  {
    id: 2,
    prompt: {
      en: "How comfortable are you depending on others for emotional support when you are overwhelmed?",
      de: "Wie leicht fällt es dir, dich bei seelischer Überlastung auf andere zu stützen?",
      fr: "À quel point êtes-vous à l'aise pour demander du soutien émotionnel quand tout déborde ?",
      es: "¿Qué tan cómodo(a) te sientes apoyándote en otros cuando te sientes abrumado(a)?",
      id: "Seberapa nyaman kamu bergantung pada orang lain saat sedang terpuruk atau kewalahan?",
    },
    subprompt: {
      en: "Your internal relationship with vulnerability and mutual dependency.",
      de: "Dein inneres Verhältnis zu Verletzlichkeit und Nähe.",
      fr: "Votre relation intérieure à la vulnérabilité.",
      es: "Tu relación interna con la vulnerabilidad.",
      id: "Kenyamananmu dalam menunjukkan kerapuhan diri.",
    },
    options: [
      {
        id: "2a",
        label: {
          en: "Very comfortable: I can express vulnerability without fear of losing myself.",
          de: "Sehr leicht: Ich kann mich verletzlich zeigen, ohne Angst vor Kontrollverlust.",
          fr: "Très à l'aise : j'exprime ma vulnérabilité sans craindre d'être jugé(e).",
          es: "Muy cómodo(a): puedo mostrarme vulnerable sin miedo a perder mi identidad.",
          id: "Sangat nyaman: saya bisa bercerita tanpa takut dianggap lemah atau kehilangan jati diri.",
        },
        anxietyDelta: 1,
        avoidanceDelta: 1,
        icon: "🌱",
      },
      {
        id: "2b",
        label: {
          en: "I crave support intensely, but constantly worry I am burdening or annoying them.",
          de: "Ich sehne mich sehr danach, fürchte aber ständig, eine Last zu sein.",
          fr: "J'ai un besoin vital de soutien, mais j'ai peur d'être un fardeau étouffant.",
          es: "Deseo mucho apoyo, pero temo constantemente ser una molestia o carga.",
          id: "Sangat butuh ditemani, tapi selalu dihantui rasa bersalah takut merepotkan mereka.",
        },
        anxietyDelta: 9,
        avoidanceDelta: 2,
        icon: "🥺",
      },
      {
        id: "2c",
        label: {
          en: "Uncomfortable: I prefer handling everything alone. Relying on people is unsafe.",
          de: "Unbehaglich: Ich löse alles allein. Sich auf andere zu verlassen ist riskant.",
          fr: "Inconfortable : je préfère tout régler seul(e). Compter sur autrui est risqué.",
          es: "Incómodo(a): prefiero resolver todo a solas. Depender de otros no es seguro.",
          id: "Tidak nyaman: saya lebih memilih mengurus semuanya sendiri. Bergantung itu tidak aman.",
        },
        anxietyDelta: 1,
        avoidanceDelta: 10,
        icon: "🏔️",
      },
      {
        id: "2d",
        label: {
          en: "I want them close, but as soon as they offer help, I feel suffocated and push them away.",
          de: "Ich wünsche mir Nähe, ziehe mich aber sofort zurück, sobald jemand hilft.",
          fr: "Je veux de la proximité, mais dès qu'on m'aide, j'étouffe et je fuis.",
          es: "Quiero cercanía, pero en cuanto me ofrecen ayuda, me agobio y me alejo.",
          id: "Ingin dipeluk, tapi begitu mereka mendekat, saya merasa sesak dan langsung menjauh.",
        },
        anxietyDelta: 8,
        avoidanceDelta: 9,
        icon: "🌪️",
      },
    ],
  },
  {
    id: 3,
    prompt: {
      en: "When a relationship begins to feel deeply intimate and close, what is your involuntary reflex?",
      de: "Wenn eine Beziehung besonders innig und tief wird, was ist dein unwillkürlicher Reflex?",
      fr: "Quand une relation devient profondément intime, quel est votre réflexe inconscient ?",
      es: "Cuando una relación empieza a ser profundamente íntima, ¿cuál es tu reflejo involuntario?",
      id: "Ketika sebuah hubungan mulai terasa sangat intim dan dekat, apa refleks batinmu?",
    },
    subprompt: {
      en: "Your nervous system's threshold for emotional intimacy.",
      de: "Die Schwelle deines Nervensystems für emotionale Nähe.",
      fr: "Le seuil de tolérance de votre système nerveux à la proximité.",
      es: "El umbral de tu sistema nervioso ante la cercanía.",
      id: "Sensitivitas batas keintiman emosimu.",
    },
    options: [
      {
        id: "3a",
        label: {
          en: "Warmth and appreciation; intimacy feels nourishing and safe.",
          de: "Wärme und Freude; Nähe fühlt sich nährend und geborgen an.",
          fr: "Chaleur et reconnaissance ; l'intimité est un havre réconfortant.",
          es: "Cálida gratitud; la intimidad se siente reconfortante y segura.",
          id: "Hangat dan bersyukur; keintiman terasa menenangkan dan aman.",
        },
        anxietyDelta: 1,
        avoidanceDelta: 1,
        icon: "🌿",
      },
      {
        id: "3b",
        label: {
          en: "Fear that they will eventually see my flaws and stop loving me.",
          de: "Angst, dass sie meine Makel sehen und mich eines Tages verlassen.",
          fr: "Peur qu'ils découvrent mes failles et cessent soudain de m'aimer.",
          es: "Miedo a que vean mis imperfecciones y dejen de quererme.",
          id: "Takut bahwa kelak mereka akan melihat kekurangan saya dan berhenti menyayangi saya.",
        },
        anxietyDelta: 10,
        avoidanceDelta: 1,
        icon: "💔",
      },
      {
        id: "3c",
        label: {
          en: "A sudden urge to withdraw, find flaws in them, or reclaim my independence.",
          de: "Der Impuls, mich zurückzuziehen, Fehler am anderen zu suchen und Freiraum zu fordern.",
          fr: "Une envie soudaine de prendre du recul, de trouver des défauts pour fuir.",
          es: "Un impulso repentino de alejarme, buscar defectos y recuperar mi espacio.",
          id: "Dorongan mendadak untuk menjaga jarak, mencari-cari kesalahan mereka, atau menyendiri.",
        },
        anxietyDelta: 2,
        avoidanceDelta: 10,
        icon: "🚪",
      },
      {
        id: "3d",
        label: {
          en: "Intense emotional turbulence: craving merging one day, wanting to vanish the next.",
          de: "Heftige Zerrissenheit: an einem Tag totale Verschmelzung, am nächsten Flucht.",
          fr: "Turbulences intenses : vouloir fusionner un jour, disparaître le lendemain.",
          es: "Turbulencia extrema: desear fusionarse un día y desaparecer al siguiente.",
          id: "Gejolak batin tinggi: hari ini ingin menempel terus, besoknya ingin menghilang.",
        },
        anxietyDelta: 8,
        avoidanceDelta: 8,
        icon: "🎭",
      },
    ],
  },
  {
    id: 4,
    prompt: {
      en: "During a disagreement or emotional conflict, your automatic default strategy is:",
      de: "Bei einem Streit oder emotionalen Konflikt ist deine automatische Reaktion:",
      fr: "Lors d'une dispute ou d'un désaccord émotionnel, votre réflexe par défaut est :",
      es: "Durante un conflicto o discusión emocional, tu estrategia automática es:",
      id: "Saat terjadi pertengkaran atau ketegangan emosional, strategi spontanmu adalah:",
    },
    subprompt: {
      en: "Your biological fight, flight, or freeze instinct in relationships.",
      de: "Dein Beziehungs-Instinkt bei interpersonalem Stress.",
      fr: "Votre réflexe de survie relationnel sous tension.",
      es: "Tu instinto de respuesta interpersonal bajo estrés.",
      id: "Insting bertahan emosionalmu saat menghadapi konflik.",
    },
    options: [
      {
        id: "4a",
        label: {
          en: "Listen calmly, pause if heated, and talk through the issue collaboratively.",
          de: "Ruhig zuhören, bei Bedarf kurz durchatmen und gemeinsam eine Lösung suchen.",
          fr: "Écouter sereinement, faire une pause si besoin et chercher une solution ensemble.",
          es: "Escuchar con calma, hacer una pausa si sube el tono y dialogar constructivamente.",
          id: "Mendengarkan dengan tenang, mengambil jeda sejenak, lalu mendiskusikan solusi bersama.",
        },
        anxietyDelta: 1,
        avoidanceDelta: 1,
        icon: "🤝",
      },
      {
        id: "4b",
        label: {
          en: "Demand immediate resolution; unable to sleep or focus until everything is settled.",
          de: "Sofortige Klärung verlangen; kann weder schlafen noch denken, bis alles gut ist.",
          fr: "Exiger une résolution immédiate ; incapable de dormir tant que ce n'est pas réglé.",
          es: "Exigir resolverlo ya; incapaz de dormir o concentrarme hasta arreglarlo.",
          id: "Menuntut penyelesaian detik itu juga; tidak bisa tidur atau tenang sebelum beres.",
        },
        anxietyDelta: 10,
        avoidanceDelta: 1,
        icon: "🔥",
      },
      {
        id: "4c",
        label: {
          en: "Shut down, go silent (stonewall), and physically leave the room.",
          de: "Dichtmachen, schweigen (Stonewalling) und mich innerlich oder räumlich entziehen.",
          fr: "Me fermer, garder le silence (stonewalling) et quitter la pièce.",
          es: "Cerrarme, guardar silencio absoluto y marcharme físicamente del lugar.",
          id: "Membisu (stonewalling), mati rasa, dan memilih pergi atau mengurung diri.",
        },
        anxietyDelta: 1,
        avoidanceDelta: 10,
        icon: "🧊",
      },
      {
        id: "4d",
        label: {
          en: "Explode with hurtful accusations, then suddenly collapse into desperate pleading.",
          de: "Wütend Vorwürfe machen, um kurz darauf verzweifelt um Verzeihung zu flehen.",
          fr: "Exploser en reproches blessants, puis s'effondrer en supplications désespérées.",
          es: "Explotar con reproches y luego derrumbarme suplicando que no me dejen.",
          id: "Meledak dengan kata-kata tajam, lalu tiba-tiba runtuh memohon agar tidak ditinggalkan.",
        },
        anxietyDelta: 9,
        avoidanceDelta: 8,
        icon: "💥",
      },
    ],
  },
  {
    id: 5,
    prompt: {
      en: "How do you feel about setting and respecting personal boundaries?",
      de: "Wie stehst du dazu, persönliche Grenzen zu setzen und zu respektieren?",
      fr: "Comment vivez-vous le fait de poser et de respecter des limites personnelles ?",
      es: "¿Cómo vives el poner y respetar límites personales?",
      id: "Bagaimana caramu memandang batasan pribadi (boundaries) dalam hubungan?",
    },
    subprompt: {
      en: "The structural architecture of your self-differentiation.",
      de: "Die Architektur deiner gesunden Selbstabgrenzung.",
      fr: "Votre capacité de différenciation de soi.",
      es: "La claridad de tus límites saludables.",
      id: "Kemandirian emosionalmu saat menjalin ikatan.",
    },
    options: [
      {
        id: "5a",
        label: {
          en: "Boundaries are healthy and protective; saying 'no' does not damage love.",
          de: "Grenzen sind gesund; ein 'Nein' zerstört echte Verbundenheit nicht.",
          fr: "Les limites sont saines ; dire 'non' ne détruit pas l'amour authentique.",
          es: "Los límites son saludables; decir 'no' no destruye el afecto genuino.",
          id: "Batasan itu sehat; berkata 'tidak' tidak akan merusak cinta yang tulus.",
        },
        anxietyDelta: 1,
        avoidanceDelta: 1,
        icon: "🛡️",
      },
      {
        id: "5b",
        label: {
          en: "I struggle to say 'no' because I fear rejection, and when they set boundaries, I feel unloved.",
          de: "Ich traue mich kaum 'Nein' zu sagen, und ihre Grenzen fühlen sich wie Ablehnung an.",
          fr: "J'ai du mal à dire 'non' par peur du rejet, et leurs limites me font sentir rejeté(e).",
          es: "Me cuesta decir 'no' por miedo al rechazo, y sus límites me hacen sentir poco amado(a).",
          id: "Saya sulit berkata 'tidak' karena takut ditolak, dan saat mereka pasang batasan, saya merasa dijauhi.",
        },
        anxietyDelta: 9,
        avoidanceDelta: 1,
        icon: "🥀",
      },
      {
        id: "5c",
        label: {
          en: "My boundaries are rigid stone walls; I fiercely guard my privacy and autonomy.",
          de: "Meine Grenzen sind massive Mauern; meine Privatsphäre gebe ich niemals auf.",
          fr: "Mes limites sont des forteresses ; je protège farouchement mon autonomie.",
          es: "Mis límites son murallas de piedra; defiendo mi autonomía a toda costa.",
          id: "Batasan saya sangat kaku seperti tembok batu; ruang privasi saya tidak boleh diganggu.",
        },
        anxietyDelta: 1,
        avoidanceDelta: 10,
        icon: "🏰",
      },
      {
        id: "5d",
        label: {
          en: "My boundaries shift erratically from nonexistent to completely impenetrable.",
          de: "Meine Grenzen schwanken unberechenbar zwischen grenzenlos und unüberwindbar.",
          fr: "Mes limites oscillent : parfois inexistantes, parfois infranchissables.",
          es: "Mis límites cambian drásticamente: de no existir a ser impenetrables.",
          id: "Batasan saya tidak menentu: kadang terlalu terbuka tanpa batas, kadang seketika menutup rapat.",
        },
        anxietyDelta: 8,
        avoidanceDelta: 8,
        icon: "⚖️",
      },
    ],
  },
  {
    id: 6,
    prompt: {
      en: "What is your deep, subconscious narrative about whether people are trustworthy?",
      de: "Was ist deine unbewusste Grundüberzeugung darüber, ob Menschen vertrauenswürdig sind?",
      fr: "Quelle est votre croyance fondamentale inconsciente sur la fiabilité des autres ?",
      es: "¿Cuál es tu creencia inconsciente sobre si las personas son de fiar?",
      id: "Keyakinan bawah sadar apa yang kamu miliki tentang apakah orang lain bisa dipercaya?",
    },
    subprompt: {
      en: "The core foundational schema formed in early life.",
      de: "Das fundamentale Vertrauensmuster deiner Kindheitsprägung.",
      fr: "Le schéma fondamental façonné au fil des ans.",
      es: "El esquema fundamental sobre la confiabilidad humana.",
      id: "Pondasi rasa percaya yang terbentuk dari pengalaman masa lalu.",
    },
    options: [
      {
        id: "6a",
        label: {
          en: "Most people are good-willed, though imperfect; trust can be built safely.",
          de: "Die meisten Menschen meinen es gut; Vertrauen lässt sich behutsam aufbauen.",
          fr: "La plupart des gens sont bienveillants ; la confiance se construit pas à pas.",
          es: "La mayoría de las personas tienen buena voluntad; la confianza se construye.",
          id: "Sebagian besar orang beritikad baik; rasa percaya bisa dibangun secara bertahap.",
        },
        anxietyDelta: 1,
        avoidanceDelta: 1,
        icon: "🌻",
      },
      {
        id: "6b",
        label: {
          en: "People leave unless I prove myself indispensable, helpful, and constantly agreeable.",
          de: "Menschen gehen, wenn ich mich nicht unentbehrlich mache und allen gefalle.",
          fr: "Les gens partent si je ne me rends pas indispensable et toujours agréable.",
          es: "La gente se va a menos que demuestre ser indispensable y complaciente.",
          id: "Orang akan pergi kecuali jika saya selalu berguna, membahagiakan mereka, dan menyenangkan.",
        },
        anxietyDelta: 10,
        avoidanceDelta: 2,
        icon: "🤲",
      },
      {
        id: "6c",
        label: {
          en: "At the end of the day, you can only rely on yourself. People inevitably disappoint.",
          de: "Am Ende kann man sich nur auf sich selbst verlassen. Andere enttäuschen immer.",
          fr: "En fin de compte, on ne peut compter que sur soi. Les autres déçoivent toujours.",
          es: "Al final, solo puedes confiar en ti mismo(a). La gente siempre termina fallando.",
          id: "Pada akhirnya, cuma diri sendiri yang bisa diandalkan. Orang lain pasti mengecewakan.",
        },
        anxietyDelta: 2,
        avoidanceDelta: 10,
        icon: "🐺",
      },
      {
        id: "6d",
        label: {
          en: "I desperately want to trust, but I am terrified that closeness will lead to betrayal.",
          de: "Ich will vertrauen, habe aber panische Angst, dass Nähe in Verrat endet.",
          fr: "Je veux faire confiance, mais je suis terrifié(e) à l'idée d'être trahi(e).",
          es: "Deseo confiar con el alma, pero me aterra que la cercanía termine en traición.",
          id: "Saya sangat ingin percaya, tapi takut luar biasa bahwa kedekatan akan berakhir dengan pengkhianatan.",
        },
        anxietyDelta: 8,
        avoidanceDelta: 8,
        icon: "💔",
      },
    ],
  },
];

export const ATTACHMENT_RESULTS: Record<AttachmentStyleId, AttachmentResult> = {
  secure: {
    id: "secure",
    title: {
      en: "Secure Explorer 🛡️🌿",
      de: "Sicher Gebundener Entdecker 🛡️🌿",
      fr: "Explorateur Sécurisant 🛡️🌿",
      es: "Explorador Seguro 🛡️🌿",
      id: "Sang Penjelajah Aman (Secure) 🛡️🌿",
    },
    badge: {
      en: "High Vitality • Low Anxiety • Low Avoidance",
      de: "Hohe Balance • Geringe Angst • Geringe Vermeidung",
      fr: "Équilibre élevé • Faible anxiété • Faible évitement",
      es: "Alta estabilidad • Baja ansiedad • Bajo aislamiento",
      id: "Keseimbangan Tinggi • Cemas Rendah • Menghindar Rendah",
    },
    subtitle: {
      en: "Comfortable with intimacy, capable of setting clear boundaries, and grounded in emotional safety.",
      de: "Souverän mit Nähe und Distanz, fähig zu klaren Grenzen und emotionaler Geborgenheit.",
      fr: "À l'aise avec la proximité, capable de poser des limites et ancré(e) dans la sécurité.",
      es: "Cómodo(a) con la intimidad, capaz de poner límites y anclado(a) en la seguridad emocional.",
      id: "Nyaman dengan keintiman, mampu membuat batasan sehat, dan memiliki rasa aman emosional yang kokoh.",
    },
    coreTrait: {
      en: "You view relationships as collaborative spaces rather than threat zones. You can express vulnerability without fear of losing yourself.",
      de: "Du siehst Beziehungen als partnerschaftlichen Raum. Du kannst verletzlich sein, ohne dich selbst zu verlieren.",
      fr: "Vous voyez les relations comme un espace complice. Vous pouvez être vulnérable sans vous perdre.",
      es: "Ves las relaciones como un espacio de equipo. Sabes ser vulnerable sin perderte a ti mismo(a).",
      id: "Kamu memandang hubungan sebagai ruang kolaborasi yang aman, bukan medan perang atau jebakan ketergantungan.",
    },
    description: {
      en: "Your nervous system has developed healthy neuroception: you accurately distinguish between real relationship friction and abandonment. You communicate directly rather than playing guessing games.",
      de: "Dein Nervensystem verfügt über eine gesunde Neurozeption: Du unterscheidest zwischen alltäglicher Reibung und echtem Verlassenwerden. Du kommunizierst direkt.",
      fr: "Votre système nerveux sait distinguer les tensions ordinaires d'un véritable danger d'abandon. Vous communiquez avec clarté.",
      es: "Tu sistema nervioso distingue las fricciones cotidianas del abandono real. Te comunicas con claridad y empatía.",
      id: "Sistem sarafmu memiliki kepekaan sehat: kamu bisa membedakan perselisihan wajar dengan ancaman ditinggalkan. Kamu berkomunikasi secara jujur dan lugas.",
    },
    triggerText: {
      en: "Partners who refuse communication or repeatedly display dishonest behavior.",
      de: "Partner, die jegliche Kommunikation verweigern oder unaufrichtig handeln.",
      fr: "Les partenaires qui fuient tout dialogue ou manquent d'honnêteté.",
      es: "Personas que evitan el diálogo sincero o muestran deshonestidad.",
      id: "Pasangan yang menutup komunikasi sama sekali atau berulang kali manipulatif.",
    },
    nervousSystemInsight: {
      en: "Your parasympathetic ventral vagal complex is strong, allowing you to co-regulate with others without chronic hypervigilance.",
      de: "Dein ventraler Vagusnerv ist aktiv, wodurch du dich gemeinsam mit anderen regulieren kannst, ohne in Dauerangst zu verfallen.",
      fr: "Votre nerf vague ventral favorise la co-régulation sans hypervigilance chronique.",
      es: "Tu sistema nervioso parasimpático te permite regularte con otros sin alerta constante.",
      id: "Sistem saraf ventral vagusmu terlatih baik, memampukanmu merasa tenang bersama orang lain tanpa alarm panik kronis.",
    },
    communicationScript: {
      en: "'I feel disconnected when we don't talk. Can we set aside 20 minutes tonight to sync up calmly?'",
      de: "'Ich fühle mich distanziert, wenn wir nicht sprechen. Können wir uns heute Abend 20 Minuten Zeit nehmen, um uns ruhig auszutauschen?'",
      fr: "'Je ressens une distance quand nous ne parlons pas. Pouvons-nous prendre 20 minutes ce soir pour échanger calmement ?'",
      es: "'Siento cierta desconexión cuando no hablamos. ¿Podemos tomarnos 20 minutos esta noche para conversar con calma?'",
      id: "'Aku merasa ada jarak saat kita jarang mengobrol. Bisa kita luangkan waktu 20 menit malam ini untuk ngobrol santai?'",
    },
    actionSteps: {
      en: [
        "Continue holding space for partners with insecure styles while maintaining your compassionate boundaries.",
        "Reflect on how your role models nurtured your sense of self-worth.",
        "Use Nuju journaling to celebrate emotional moments that felt effortless and loving.",
      ],
      de: [
        "Halte den Raum für Partner mit unsicherem Bindungsstil, ohne deine gesunden Grenzen aufzugeben.",
        "Reflektiere darüber, welche Vorbilder deinen Selbstwert gestärkt haben.",
        "Nutze dein Nuju-Tagebuch, um harmonische Verbindungsmomente festzuhalten.",
      ],
      fr: [
        "Offrez un espace sécurisant aux personnes plus anxieuses tout en gardant vos limites.",
        "Identifiez les figures qui ont façonné votre sécurité intérieure.",
        "Écrivez dans Nuju pour ancrer vos moments de complicité sereine.",
      ],
      es: [
        "Brinda seguridad a personas con apego inseguro sin descuidar tus límites sanos.",
        "Agradece los modelos de vida que construyeron tu autoestima.",
        "Escribe en Nuju para saborear y agradecer los vínculos saludables que tienes.",
      ],
      id: [
        "Tetap menjadi ruang aman bagi pasangan, sambil tetap memegang teguh batasan sehatmu.",
        "Refleksikan sosok-sosok yang berjasa menanamkan rasa berharga dalam dirimu sejak kecil.",
        "Gunakan jurnal Nuju untuk mendokumentasikan momen kehangatan yang memperkuat syukurmu.",
      ],
    },
    recommendedJournalPrompt: {
      en: "What makes me feel truly respected and seen in my relationships, and how can I offer that same safety to others today?",
      de: "Was gibt mir in Beziehungen das Gefühl, wirklich respektiert zu werden, und wie kann ich diese Geborgenheit heute weitergeben?",
      fr: "Qu'est-ce qui me fait me sentir réellement vu(e) et respecté(e), et comment puis-je offrir cette même sécurité aujourd'hui ?",
      es: "¿Qué me hace sentir verdaderamente respetado(a) y comprendido(a), y cómo puedo ofrecer esa seguridad a los demás hoy?",
      id: "Hal apa yang membuat saya merasa benar-benar dihargai dalam hubungan, dan bagaimana saya bisa memberikan rasa aman yang sama hari ini?",
    },
    mascotImage: juGreat,
    mascotMood: "great",
  },
  anxious: {
    id: "anxious",
    title: {
      en: "Anxious-Preoccupied Sentinel 🌊💙",
      de: "Ängstlich-Besorgter Wächter 🌊💙",
      fr: "Sentinelle Anxieuse-Préoccupée 🌊💙",
      es: "Centinela Ansioso-Preocupado 🌊💙",
      id: "Sang Penjaga Cemas (Anxious-Preoccupied) 🌊💙",
    },
    badge: {
      en: "High Attachment Anxiety • Deep Loyalty • Overthinking Radar",
      de: "Hohe Bindungsangst • Tiefe Loyalität • Alarmbereitschaft",
      fr: "Forte anxiété d'attachement • Grande loyauté • Hypervigilance",
      es: "Alta ansiedad de apego • Gran lealtad • Miedo al abandono",
      id: "Kecemasan Kelekatan Tinggi • Sangat Setia • Radar Overthinking",
    },
    subtitle: {
      en: "You love deeply and fiercely, but your internal threat sensor is chronically on edge, dreading abandonment.",
      de: "Du liebst intensiv und aufrichtig, doch dein inneres Alarmsystem fürchtet ständig Ablehnung.",
      fr: "Vous aimez avec intensité, mais votre alerte interne craint perpétuellement l'abandon.",
      es: "Amas con intensidad y entrega, pero tu alarma interna teme el abandono constante.",
      id: "Kamu mencintai dengan sangat tulus dan setia, tetapi alarm batinmu selalu cemas akan penolakan atau ditinggalkan.",
    },
    coreTrait: {
      en: "You equate emotional silence with impending loss. When connection flickers, your heart races and you engage in 'protest behavior' to force reassurance.",
      de: "Stille fühlt sich für dich wie Trennung an. Wenn Distanz entsteht, versuchst du krampfhaft, Bestätigung zu erzwingen.",
      fr: "Le silence équivaut pour vous à une rupture imminente. Vous multipliez les signaux pour être rassuré(e).",
      es: "El silencio se siente como peligro. Cuando surge distancia, buscas confirmación urgente.",
      id: "Ketiadaan kabar kamu artikan sebagai tanda bahaya. Kamu sering melakukan 'protest behavior' (menelepon berulang, menguji kesetiaan) demi kepastian.",
    },
    description: {
      en: "Anxious attachment is an adaptive survival response: in the past, love was inconsistent, so your brain learned to stay hypervigilant. Healing involves building self-soothing capacity so you don't outsource your entire nervous system to another person.",
      de: "Deine Bindungsangst war einst eine Überlebensstrategie: Zuneigung war unberechenbar. Heilung bedeutet, dich selbst zu beruhigen, statt deinen Selbstwert extern zu suchen.",
      fr: "Cette anxiété est une adaptation passée face à une affection imprévisible. La clé est d'apprendre l'auto-apaisement.",
      es: "Tu ansiedad fue una respuesta adaptativa ante afecto inconstante. Sanar consiste en aprender a autorregularte.",
      id: "Gaya cemas adalah mekanisme bertahan hidup dari masa lalu di mana kasih sayang terasa tidak konsisten. Pemulihan dimulai dengan belajar menenangkan diri sendiri (self-soothing).",
    },
    triggerText: {
      en: "Delayed text replies, unreadable facial expressions, or sudden emotional withdrawal.",
      de: "Verzögerte Antworten, unlesbare Blicke oder plötzlicher Rückzug des Partners.",
      fr: "Réponses tardives, visages fermés ou retrait émotionnel soudain.",
      es: "Tardanza en responder, caras serias o distanciamiento imprevisto.",
      id: "Balasan chat lama, ekspresi wajah dingin, atau pasangan yang tiba-tiba mendiamkanmu.",
    },
    nervousSystemInsight: {
      en: "Sympathetic hyper-arousal: your amygdala floods your system with cortisol at the slightest hint of distance, misinterpreting solitude as mortal danger.",
      de: "Sympathische Übererregung: Deine Amygdala schüttet bei geringster Distanz Stresshormone aus.",
      fr: "Hyperactivation du système sympathique : votre amygdale interprète l'éloignement comme un péril vital.",
      es: "Sobrecarga simpática: tu amígdala interpreta cualquier silencio como una amenaza real de abandono.",
      id: "Hiperaktivitas saraf simpatis: amigdala membanjiri tubuh dengan hormon stres begitu ada sedikit jarak, menganggap kesendirian sebagai ancaman eksistensial.",
    },
    communicationScript: {
      en: "'I notice a familiar anxious story starting in my mind because of the silence. Can you give me a quick hug or word of reassurance when you have a moment?'",
      de: "'Ich merke, dass mein Kopf wegen der Stille ein Katastrophenszenario spinnt. Kannst du mich kurz in den Arm nehmen, wenn du Zeit hast?'",
      fr: "'Je remarque qu'une histoire anxiogène commence dans ma tête à cause du silence. Peux-tu me rassurer quelques secondes ?'",
      es: "'Noto que mi mente empieza a inventar historias de miedo por el silencio. ¿Me das un abrazo o una palabra cariñosa cuando puedas?'",
      id: "'Kepalaku mulai overthinking karena belum ada kabar. Kalau kamu senggang, bolehkah beri kabar singkat atau pelukan hangat?'",
    },
    actionSteps: {
      en: [
        "Implement a '10-Minute Waiting Rule' before sending follow-up texts or emotionally charged messages.",
        "Practice somatic self-holding: place your right hand on your chest and left hand on your belly while breathing deeply.",
        "Vent into your Nuju AI journal first to separate objective facts from fear-based catastrophic narratives.",
      ],
      de: [
        "Wende die '10-Minuten-Regel' an, bevor du panische Nachfragen oder Vorwürfe verschickst.",
        "Lege eine Hand auf dein Herz und die andere auf den Bauch; atme langsam durch.",
        "Schreibe deine Sorgen zuerst unzensiert in dein Nuju-Tagebuch, um Fakten von Angstfantasien zu trennen.",
      ],
      fr: [
        "Appliquez la règle des 10 minutes avant d'envoyer un message sous le coup de la panique.",
        "Posez une main sur le cœur et l'autre sur le ventre pour calmer physiquement votre système nerveux.",
        "Écrivez dans Nuju pour dissocier les faits réels des suppositions nées de la peur.",
      ],
      es: [
        "Aplica la regla de los 10 minutos antes de enviar mensajes impulsivos cargados de reclamo.",
        "Coloca una mano en tu pecho y otra en tu abdomen respirando lento para calmar el cuerpo.",
        "Vuelca tu miedo primero en Nuju para distinguir los hechos de las historias de pánico.",
      ],
      id: [
        "Terapkan aturan jeda 10 menit sebelum mengirim chat bertubi-tubi saat emosi sedang meluap.",
        "Letakkan tangan kanan di dada dan tangan kiri di perut, lalu tarik napas panjang untuk menenangkan saraf.",
        "Tuliskan ketakutanmu ke dalam jurnal Nuju terlebih dahulu untuk membedakan fakta nyata dari ilusi overthinking.",
      ],
    },
    recommendedJournalPrompt: {
      en: "What is my inner child desperately afraid will happen if someone takes space from me, and how can I be the protective adult they need today?",
      de: "Wovor hat mein inneres Kind panische Angst, wenn jemand Abstand nimmt, und wie kann ich heute der beschützende Erwachsene für mich sein?",
      fr: "Quelle est la peur profonde de mon enfant intérieur face à la distance, et comment puis-je être l'adulte sécurisant aujourd'hui ?",
      es: "¿Qué teme mi niño(a) interior si alguien toma distancia, y cómo puedo ser el adulto que me dé seguridad hoy?",
      id: "Ketakutan masa kecil apa yang muncul saat seseorang mengambil jarak dariku, dan bagaimana saya bisa menjadi sosok pelindung dewasa bagi diri saya sendiri?",
    },
    mascotImage: juRough,
    mascotMood: "rough",
  },
  avoidant: {
    id: "avoidant",
    title: {
      en: "Dismissive-Avoidant Fortress 🏔️🧊",
      de: "Abweisend-Vermeidende Festung 🏔️🧊",
      fr: "Forteresse Évitante-Détachée 🏔️🧊",
      es: "Fortaleza Evitativa-Independiente 🏔️🧊",
      id: "Sang Benteng Mandiri (Dismissive-Avoidant) 🏔️🧊",
    },
    badge: {
      en: "High Avoidance • Hyper-Independence • Emotional Deactivation",
      de: "Hohe Vermeidung • Hyper-Unabhängigkeit • Rückzug",
      fr: "Fort évitement • Hyper-indépendance • Désactivation émotionnelle",
      es: "Alto aislamiento • Hiperindependencia • Desconexión afectiva",
      id: "Penghindaran Tinggi • Sangat Mandiri • Deaktivasi Emosi",
    },
    subtitle: {
      en: "Self-reliant to a fault, you view vulnerability as a liability and instinctively retreat when others lean in.",
      de: "Extrem selbstgenügsam. Du empfindest emotionale Nähe als Bedrohung deiner Freiheit.",
      fr: "D'une autonomie farouche, vous voyez la vulnérabilité comme un risque et fuyez l'étouffement.",
      es: "Ferozmente independiente, ves la intimidad como una amenaza a tu libertad y te aíslas.",
      id: "Sangat mandiri dan enggan merepotkan siapa pun, kamu memandang kerapuhan sebagai bahaya dan refleks menjaga jarak saat orang lain mendekat.",
    },
    coreTrait: {
      en: "You pride yourself on not needing anyone. Underneath the fortress, however, is a nervous system that learned early on that people will fail you if you depend on them.",
      de: "Du bist stolz darauf, niemanden zu brauchen. Doch tief im Inneren hast du gelernt, dass Abhängigkeit unweigerlich zu Schmerz führt.",
      fr: "Vous êtes fier(e) de ne dépendre de personne. Au fond, vous avez appris que s'attacher mène à la déception.",
      es: "Te enorgulleces de tu autosuficiencia, pero aprendiste que confiar en otros termina en dolor.",
      id: "Kamu bangga karena merasa tidak membutuhkan siapa pun. Namun di balik benteng itu, ada pengalaman masa lalu bahwa bergantung pada orang lain selalu berujung kecewa.",
    },
    description: {
      en: "When intimacy deepens, your 'deactivating strategies' kick in: you suddenly notice flaws in the other person, obsess over freedom, or bury yourself in work and hobbies to escape emotional demands.",
      de: "Bei zunehmender Nähe greifen deine 'Deaktivierungsstrategien': Du suchst Makel am Partner, betonst deine Freiheit oder stürzt dich in die Arbeit.",
      fr: "Quand le lien se resserre, vous désactivez vos sentiments : trouver des défauts ou vous réfugier dans le travail.",
      es: "Cuando la cercanía aumenta, activas tus barreras: buscas defectos, priorizas el trabajo o huyes.",
      id: "Saat hubungan semakin intim, strategi deaktivasi aktif: kamu tiba-tiba merasa ilfeel, mencari kelemahan pasangan, atau menenggelamkan diri dalam pekerjaan.",
    },
    triggerText: {
      en: "Emotional confrontations, high demands for affection, guilt-tripping, or feeling cornered.",
      de: "Emotionale Konfrontationen, permanente Näheforderungen oder das Gefühl, eingeengt zu werden.",
      fr: "Les reproches émotionnels, les demandes pressantes ou la sensation d'être pris au piège.",
      es: "Exigencias constantes de cariño, reproches dramáticos o sentirse acorralado(a).",
      id: "Tuntutan afeksi yang terus-menerus, drama emosional, atau perasaan kebebasan pribadimu terancam terkekang.",
    },
    nervousSystemInsight: {
      en: "Hypo-arousal & dorsal vagal shutdown: when emotional pressure mounts, your brain numbs your emotional awareness to protect against perceived engulfment.",
      de: "Hypo-Aktivierung und dorsaler Rückzug: Bei emotionalem Druck betäubt dein Gehirn Gefühle, um Autonomie zu wahren.",
      fr: "Hypo-activation et engourdissement dorsal : l'esprit coupe les émotions pour se protéger de l'étouffement.",
      es: "Desconexión dorsal: ante la presión afectiva, la mente se apaga y anestesia las emociones.",
      id: "Hipo-arousal & penutupan saraf dorsal: saat tekanan emosi memuncak, otakmu mematikan akses ke rasa (numbness) agar tidak merasa terjebak.",
    },
    communicationScript: {
      en: "'I care about this relationship, but I am feeling overstimulated right now. I need 45 minutes of quiet time, and then I will come back to talk.'",
      de: "'Du bist mir wichtig, aber ich fühle mich gerade überfordert. Ich brauche 45 Minuten Ruhe und komme danach wieder zu dir.'",
      fr: "'Je tiens à nous, mais je me sens saturé(e). J'ai besoin de 45 minutes de calme, puis je reviens vers toi.'",
      es: "'Me importas mucho, pero ahora me siento sobrepasado(a). Necesito 45 minutos a solas y luego retomo la charla.'",
      id: "'Aku peduli sama hubungan ini, tapi kepalaku lagi overstimulated. Aku butuh jeda 45 menit untuk sendiri, setelah itu kita lanjut ngobrol ya.'",
    },
    actionSteps: {
      en: [
        "Replace vanishing (ghosting) with an explicit time-bounded pause statement so your partner doesn't panic.",
        "Notice when you are 'phantom exing' or finding fake flaws to sabotage intimacy.",
        "Use private journaling in Nuju to practice identifying one vulnerable emotion you felt today without judging it.",
      ],
      de: [
        "Ersetze wortlosen Rückzug durch eine klare Zeitansage, damit dein Gegenüber nicht in Panik gerät.",
        "Erkenne, wann du absichtlich nach Makeln suchst, um die aufkommende Nähe zu sabotieren.",
        "Benenne in deinem Nuju-Tagebuch täglich ein echtes Gefühl, ohne es als Schwäche abzutun.",
      ],
      fr: [
        "Remplacez le silence radio par une pause définie dans le temps pour rassurer l'autre.",
        "Prenez conscience du moment où vous cherchez des défauts pour saboter la relation.",
        "Nommez chaque jour dans Nuju une émotion vulnérable sans la censurer.",
      ],
      es: [
        "En lugar de desaparecer en silencio, avisa cuánto tiempo necesitas a solas.",
        "Detecta cuándo estás buscando defectos ficticios para sabotear la cercanía.",
        "Anota en Nuju una emoción honesta al día sin catalogarla como debilidad.",
      ],
      id: [
        "Ganti kebiasaan menghilang tiba-tiba dengan komitmen waktu jeda yang jelas agar pasangan tidak panik.",
        "Sadarilah saat kamu mulai mencari-cari kekurangan sepele pasangan demi melarikan diri dari keintiman.",
        "Latih dirimu menuliskan satu emosi rentan yang kamu rasakan hari ini ke dalam jurnal Nuju tanpa menghakimi.",
      ],
    },
    recommendedJournalPrompt: {
      en: "What is the worst thing I believe would happen if I truly let someone see all of me, and is that belief still serving me?",
      de: "Was befürchte ich im Schlimmsten, wenn mich jemand wirklich ganz sieht – und dient mir diese Angst heute noch?",
      fr: "Quel est le pire scénario que j'imagine si quelqu'un me découvrait sans masque, et cette peur est-elle encore utile ?",
      es: "¿Qué es lo peor que creo que pasaría si dejo que alguien me conozca de verdad, y me sigue sirviendo esa coraza?",
      id: "Hal terburuk apa yang saya takuti jika seseorang benar-benar melihat seluruh kerapuhan saya, dan apakah rasa takut itu masih relevan hari ini?",
    },
    mascotImage: juOkay,
    mascotMood: "okay",
  },
  disorganized: {
    id: "disorganized",
    title: {
      en: "Fearful-Avoidant Storm ⚡🌪️",
      de: "Ängstlich-Vermeidender Sturm ⚡🌪️",
      fr: "Tempête Désorganisée-Craintive ⚡🌪️",
      es: "Tormenta Temerosa-Desorganizada ⚡🌪️",
      id: "Sang Badai Ambivalen (Fearful-Avoidant) ⚡🌪️",
    },
    badge: {
      en: "High Anxiety • High Avoidance • Push-Pull Dynamic",
      de: "Hohe Angst • Hohe Vermeidung • Push-Pull-Dynamik",
      fr: "Forte anxiété • Fort évitement • Dynamique attraction-rejet",
      es: "Alta ansiedad • Alto aislamiento • Tira y afloja emocional",
      id: "Kecemasan Tinggi • Penghindaran Tinggi • Dinamika Tarik-Ulur",
    },
    subtitle: {
      en: "You desperately crave closeness, yet intimate connection triggers profound panic: 'I want you near, but you are not safe.'",
      de: "Du sehnst dich nach Liebe, doch echte Nähe löst Panik aus: 'Komm mir nah, aber geh nicht zu weit.'",
      fr: "Vous rêvez d'intimité, mais l'amour déclenche une peur panique : 'Viens près de moi, mais tu es un danger.'",
      es: "Deseas intimidad con fervor, pero la cercanía despierta alarma: 'Te necesito cerca, pero me das miedo.'",
      id: "Kamu sangat mendambakan keintiman cinta, tetapi kedekatan emosional justru memicu rasa panik: 'Aku butuh kamu dekat, tapi kamu terasa menakutkan.'",
    },
    coreTrait: {
      en: "The classic 'I hate you, don't leave me' paradox. When distant, you yearn for love; when close, you feel trapped and expect inevitable betrayal.",
      de: "Das Paradox von Anziehung und Flucht. Bist du allein, sehnst du dich nach Liebe; bist du nah, fühlst du dich gefangen.",
      fr: "Le paradoxe classique du va-et-vient. Seul(e), vous aspirez à aimer ; en couple, vous anticipez la trahison.",
      es: "La paradoja del tira y afloja. En la lejanía anhelas unión; en la cercanía esperas la traición.",
      id: "Paradoks tarik-ulur: saat jauh kamu sangat merindukan kehangatan, tetapi begitu mereka mendekat, kamu merasa terancam dan siap-siap disakiti.",
    },
    description: {
      en: "Rooted in developmental experiences where the primary source of safety was also a source of fear or instability. Your nervous system is caught between simultaneous impulses to sprint toward connection and flee from threat.",
      de: "Entsteht oft, wenn Bezugspersonen zugleich Quelle von Schutz und Angst waren. Das Nervensystem will gleichzeitig rennen und fliehen.",
      fr: "Prend racine là où la figure d'attachement était aussi source d'insécurité. Le système oscille entre fusion et fuite.",
      es: "Nace de vínculos tempranos donde la fuente de afecto también causaba miedo o inestabilidad.",
      id: "Berakar dari pengalaman masa lalu di mana sosok pengasuh adalah sumber kasih sayang sekaligus sumber rasa takut. Sistem sarafmu terjebak antara dorongan mendekat dan lari ketakutan secara bersamaan.",
    },
    triggerText: {
      en: "Shifting emotional tones, feeling misunderstood, or intense displays of devotion that feel too good to be true.",
      de: "Stimmungswechsel, Missverständnisse oder zu viel Zuneigung, die 'unheimlich' wirkt.",
      fr: "Les revirements d'humeur, les incompréhensions ou les déclarations d'amour trop intenses.",
      es: "Cambios de tono, sentirse incomprendido(a) o muestras de amor que parecen 'demasiado buenas para ser verdad'.",
      id: "Perubahan nada bicara yang tiba-tiba, merasa tidak dipahami, atau saat pasangan terlalu baik hingga kamu merasa curiga.",
    },
    nervousSystemInsight: {
      en: "Simultaneous accelerator and brake: sympathetic arousal (panic, rage) and dorsal shutdown (paralysis, numbness) fire at the same moment.",
      de: "Vollgas und Handbremse zugleich: Das Nervensystem feuert Panik und Erstarrung im selben Augenblick ab.",
      fr: "Accélérateur et frein enclenchés en même temps : alerte maximale et sidération simultanée.",
      es: "Pisar el acelerador y el freno a la vez: pánico y parálisis emocional conviven al mismo tiempo.",
      id: "Injak gas dan rem secara bersamaan: alarm panik (simpatis) dan respon beku mati rasa (dorsal) menyala bersamaan, menguras energi psikologis.",
    },
    communicationScript: {
      en: "'Part of me wants to run away, and part of me wants to be held right now. I need a moment of silent presence to help my body ground.'",
      de: "'Ein Teil von mir will weglaufen, ein anderer will gehalten werden. Ich brauche einen Moment stilles Dasein, um mich zu erden.'",
      fr: "'Une partie de moi veut fuir, et une autre veut être prise dans les bras. J'ai juste besoin d'une présence silencieuse pour m'ancrer.'",
      es: "'Una parte de mí quiere huir y otra necesita un abrazo. Solo necesito tu presencia en silencio para enraizarme.'",
      id: "'Sebagian dari diriku ingin lari menjauh, tapi sebagian lain sangat butuh dipeluk. Boleh kita duduk hening sejenak sampai nafasku tenang?'",
    },
    actionSteps: {
      en: [
        "Learn somatic grounding cues (feel your feet on the floor, count slow exhales) before making any relationship decisions.",
        "Recognize that stability can feel 'boring' or 'suspicious' to a nervous system accustomed to chaos.",
        "Use Nuju's guided journal to write down the conflicting voices in your head without acting impulsively on either.",
      ],
      de: [
        "Erde dich körperlich (Füße auf den Boden, langsam ausatmen), bevor du Trennungsentscheidungen triffst.",
        "Verstehe, dass gesunde Stabilität sich für dein Nervensystem anfangs 'langweilig' oder 'verdächtig' anfühlt.",
        "Nutze dein Nuju-Tagebuch, um beide inneren Stimmen festzuhalten, ohne voreilig zu handeln.",
      ],
      fr: [
        "Ancrez-vous physiquement avant de prendre toute décision impulsive de rupture.",
        "Reconnaissez que la sérénité peut sembler 'ennuyeuse' ou 'louche' à un esprit habitué au chaos.",
        "Écrivez dans Nuju pour dialoguer avec vos deux voix intérieures sans céder à la panique.",
      ],
      es: [
        "Enraízate físicamente (pies en el suelo, respirar lento) antes de tomar decisiones de ruptura.",
        "Comprende que la paz puede parecerte 'aburrida' o 'sospechosa' si te criaste en el caos.",
        "Escribe en Nuju para dejar hablar a tus dos voces internas sin actuar con impulso destructivo.",
      ],
      id: [
        "Lakukan grounding fisik (rasakan telapak kaki menyentuh lantai, atur napas) sebelum mengambil keputusan besar dalam hubungan.",
        "Pahami bahwa hubungan yang tenang dan stabil mungkin awalnya terasa 'membosankan' atau 'mencurigakan' bagi saraf yang terbiasa dengan drama masa lalu.",
        "Tuangkan dialog batinmu yang saling bertentangan ke dalam jurnal Nuju sebelum mengambil tindakan impulsif.",
      ],
    },
    recommendedJournalPrompt: {
      en: "Can I allow myself to receive calm, safe love today without waiting for the other shoe to drop?",
      de: "Kann ich es mir heute erlauben, ruhige, sichere Zuneigung anzunehmen, ohne auf die nächste Katastrophe zu warten?",
      fr: "Puis-je m'autoriser à recevoir un amour calme et sécurisant aujourd'hui, sans redouter le pire ?",
      es: "¿Puedo permitirme recibir un amor en calma hoy, sin estar esperando el golpe?",
      id: "Bisakah saya mengizinkan diri saya menerima cinta yang tenang dan aman hari ini tanpa terus-menerus menunggu badai datang?",
    },
    mascotImage: juLow,
    mascotMood: "low",
  },
};

export function evaluateAttachmentStyle(
  answers: Record<number, string>
): {
  style: AttachmentResult;
  anxietyScore: number;
  avoidanceScore: number;
} {
  let totalAnxiety = 0;
  let totalAvoidance = 0;
  let answeredCount = 0;

  ATTACHMENT_QUESTIONS.forEach((q) => {
    const selectedOptId = answers[q.id];
    if (selectedOptId) {
      const opt = q.options.find((o) => o.id === selectedOptId);
      if (opt) {
        totalAnxiety += opt.anxietyDelta;
        totalAvoidance += opt.avoidanceDelta;
        answeredCount++;
      }
    }
  });

  const maxPossible = Math.max(1, answeredCount * 10);
  const anxietyScore = Math.round((totalAnxiety / maxPossible) * 100);
  const avoidanceScore = Math.round((totalAvoidance / maxPossible) * 100);

  // Quadrant categorization:
  // Low Anx, Low Avoid -> Secure
  // High Anx, Low Avoid -> Anxious
  // Low Anx, High Avoid -> Avoidant
  // High Anx, High Avoid -> Disorganized
  let styleId: AttachmentStyleId = "secure";

  if (anxietyScore >= 45 && avoidanceScore >= 45) {
    styleId = "disorganized";
  } else if (anxietyScore >= 45 && avoidanceScore < 45) {
    styleId = "anxious";
  } else if (anxietyScore < 45 && avoidanceScore >= 45) {
    styleId = "avoidant";
  } else {
    styleId = "secure";
  }

  return {
    style: ATTACHMENT_RESULTS[styleId],
    anxietyScore,
    avoidanceScore,
  };
}
