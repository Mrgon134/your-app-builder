export type GaslightingLang = "en" | "id" | "de" | "fr" | "es";

export interface GaslightingQuestion {
  id: number;
  subscale: "reality_distortion" | "hyper_vigilance" | "apology_reflex";
  prompt: Record<GaslightingLang, string>;
  options: Array<{
    score: number;
    label: Record<GaslightingLang, string>;
  }>;
}

export interface GaslightingProfile {
  level: "severe_manipulation" | "covert_control" | "subtle_friction" | "secure_autonomy";
  badge: Record<GaslightingLang, string>;
  title: Record<GaslightingLang, string>;
  tagline: Record<GaslightingLang, string>;
  description: Record<GaslightingLang, string>;
  psychologyInsight: Record<GaslightingLang, string>;
  empowermentProtocols: Record<GaslightingLang, string[]>;
  dailyAffirmation: Record<GaslightingLang, string>;
}

export interface GaslightingScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: "severe_manipulation" | "covert_control" | "subtle_friction" | "secure_autonomy";
  profile: GaslightingProfile;
  subscales: {
    reality_distortion: { score: number; max: number; percentage: number };
    hyper_vigilance: { score: number; max: number; percentage: number };
    apology_reflex: { score: number; max: number; percentage: number };
  };
}

export const GASLIGHTING_QUESTIONS: GaslightingQuestion[] = [
  // Subscale 1: Reality Distortion & Memory Invalidation
  {
    id: 1,
    subscale: "reality_distortion",
    prompt: {
      en: "When you bring up an hurtful incident or broken agreement, how often are you told 'That never happened' or 'You are imagining things'?",
      id: "Saat kamu membahas kejadian yang melukai atau janji yang dilanggar, seberapa sering kamu dibilang 'Itu gak pernah terjadi' atau 'Kamu cuma mengada-ada'?",
      de: "Wie oft hörst du 'Das ist nie passiert' oder 'Das bildest du dir nur ein', wenn du verletzendes Verhalten ansprichst?",
      fr: "À quelle fréquence vous dit-on 'Ce n'est jamais arrivé' ou 'Tu te fais des films' quand vous évoquez un incident blessant ?",
      es: "¿Con qué frecuencia te dicen 'Eso nunca pasó' o 'Te lo estás inventando' al recordar un hecho doloroso o un acuerdo roto?",
    },
    options: [
      { score: 0, label: { en: "Never; our conversations are grounded in shared factual reality", id: "Tidak pernah; obrolan kami berdasarkan fakta yang jelas", de: "Nie; wir stützen uns auf gemeinsame Fakten", fr: "Jamais; nos échanges restent ancrés dans les faits", es: "Nunca; nuestras conversaciones se basan en hechos claros" } },
      { score: 1, label: { en: "Rarely; occasional minor memory discrepancies", id: "Jarang; sekadar beda ingat detail kecil yang wajar", de: "Selten; normale kleine Erinnerungslücken", fr: "Rarement; de simples désaccords de mémoire", es: "Raramente; pequeñas diferencias normales de memoria" } },
      { score: 2, label: { en: "Frequently; I often feel bewildered about what actually occurred", id: "Sering; aku sering bingung apa yang sebenarnya terjadi", de: "Häufig; ich fühle mich oft verwirrt über den Ablauf", fr: "Souvent; je me sens troublé sur la réalité des faits", es: "Frecuentemente; me siento confundido sobre lo que ocurrió" } },
      { score: 3, label: { en: "Constantly; I find myself secretly recording conversations or saving screenshots just to prove my own sanity", id: "Selalu; sampai diam-diam merekam obrolan atau simpan tangkapan layar demi membuktikan aku tidak gila", de: "Ständig; mache heimlich Notizen/Screenshots, um meinen Verstand zu beweisen", fr: "Constamment; je garde des captures d'écran pour prouver ma santé mentale", es: "Constantemente; guardo capturas o grabo audios solo para probar mi cordura" } },
    ],
  },
  {
    id: 2,
    subscale: "reality_distortion",
    prompt: {
      en: "When you express legitimate sadness, pain, or frustration, are you dismissed as being 'too sensitive', 'crazy', or 'dramatic'?",
      id: "Saat kamu mengungkapkan rasa sedih atau kecewa, apakah kamu dianggap 'terlalu sensitif', 'baperan', 'gila', atau 'dramatis'?",
      de: "Wirst du als 'zu empfindlich', 'verrückt' oder 'überdramatisch' abgetan, wenn du Kummer äußerst?",
      fr: "Êtes-vous qualifié de 'trop sensible', 'folle/fou' ou 'dramatique' quand vous exprimez votre peine ?",
      es: "¿Te descalifican diciendo que eres 'demasiado sensible', 'exagerado' o 'loco' cuando muestras dolor?",
    },
    options: [
      { score: 0, label: { en: "Never; my emotions are respected and validated", id: "Tidak pernah; perasaanku dihargai dan divalidasi", de: "Nie; meine Gefühle werden ernst genommen", fr: "Jamais; mes émotions sont accueillies avec respect", es: "Nunca; mis emociones son respetadas y validadas" } },
      { score: 1, label: { en: "Occasionally in heated arguments, but they apologize later", id: "Sesekali saat emosi memuncak, tapi minta maaf setelahnya", de: "Selten im Streit, gefolgt von aufrichtiger Entschuldigung", fr: "Parfois sous le coup de la colère, mais avec des excuses ensuite", es: "A veces en discusiones acaloradas, pero luego piden disculpas" } },
      { score: 2, label: { en: "Often; my feelings are routinely labeled as irrational overreactions", id: "Sering; emosiku sering dicap berlebihan dan tidak masuk akal", de: "Oft; meine Gefühle gelten routinemäßig als 'irrational'", fr: "Souvent; mes ressentis sont traités de réactions disproportionnées", es: "A menudo; mis sentimientos son calificados de irracionales o desmedidos" } },
      { score: 3, label: { en: "Every single time; I have begun questioning whether I actually am emotionally unstable", id: "Hampir setiap saat; sampai aku mulai meragukan apakah diriku yang benar-benar tidak waras", de: "Jedes Mal; ich zweifle ernsthaft an meiner eigenen mentalen Gesundheit", fr: "Systématiquement; j'en viens à douter de mon propre équilibre psychologique", es: "Siempre; he empezado a dudar de si realmente estoy perdiendo la cordura" } },
    ],
  },
  {
    id: 3,
    subscale: "reality_distortion",
    prompt: {
      en: "Do conversations mysteriously flip so that YOU end up comforting them or apologizing for bringing up something they did wrong?",
      id: "Apakah obrolan sering terbalik secara aneh sehingga KAMU yang akhirnya menenangkan mereka atau minta maaf atas kesalahan yang MEREKA perbuat?",
      de: "Kippen Gespräche so, dass am Ende DU tröstest oder dich entschuldigst, obwohl SIE den Fehler begingen?",
      fr: "Les discussions s'inversent-elles au point que VOUS finissez par les consoler ou vous excuser pour une faute QU'ILS ont commise ?",
      es: "¿Las conversaciones se invierten misteriosamente y terminas TÚ consolándoles o pidiendo perdón por un error SUYO?",
    },
    options: [
      { score: 0, label: { en: "No; accountability is mutual and mature", id: "Tidak; tanggung jawab selalu dewasa dan seimbang", de: "Nein; Verantwortungsübernahme ist erwachsen und beidseitig", fr: "Non; la responsabilité est partagée et mature", es: "No; la responsabilidad es mutua y madura" } },
      { score: 1, label: { en: "Rarely, if emotions get momentarily messy", id: "Jarang, hanya jika situasi sempat membingungkan", de: "Selten, wenn Emotionen kurzzeitig hochkochen", fr: "Rarement, si la situation devient confuse", es: "Raramente, si la conversación se vuelve confusa" } },
      { score: 2, label: { en: "Frequently; they play the victim and I end up soothing them", id: "Sering; mereka memutar keadaan jadi korban dan aku yang merawat mereka", de: "Häufig; die Opferrolle wird getauscht und ich muss trösten", fr: "Souvent; ils jouent les victimes et je me retrouve à les apaiser", es: "A menudo; adoptan el papel de víctima y termino reconfortándoles" } },
      { score: 3, label: { en: "A predictable formula; I walk in hurt and leave feeling like an abusive monster", id: "Pola pasti; aku masuk membawa rasa sakit, lalu keluar serasa aku monster yang jahat", de: "Feste Masche; ich gehe verletzt hinein und fühle mich danach wie ein Monster", fr: "Un schéma systématique; j'arrive blessé et je repars en me sentant comme un tyran", es: "Un guión fijo; entro con dolor y salgo sintiéndome el peor de los culpables" } },
    ],
  },
  {
    id: 4,
    subscale: "reality_distortion",
    prompt: {
      en: "Do they rewrite past history (e.g. 'I never promised that', 'You forced me to do that') with absolute conviction?",
      id: "Apakah mereka mengubah narasi masa lalu (misal: 'Aku gak pernah janji gitu', 'Kamu yang maksa aku bersikap gitu') dengan keyakinan mutlak?",
      de: "Schreiben sie die Vergangenheit mit absoluter Überzeugung um ('Das habe ich nie versprochen')?",
      fr: "Réécrivent-ils le passé avec une certitude absolue ('Je n'ai jamais dit ça', 'C'est toi qui m'y as forcé') ?",
      es: "¿Reescriben el pasado con total convencimiento ('Yo nunca prometí eso', 'Tú me obligaste a hacerlo')?",
    },
    options: [
      { score: 0, label: { en: "Never; agreements and memories are honored", id: "Tidak pernah; kesepakatan dan memori dihormati", de: "Nie; Vereinbarungen und Worte werden respektiert", fr: "Jamais; les engagements et souvenirs sont honorés", es: "Nunca; los acuerdos y recuerdos se respetan" } },
      { score: 1, label: { en: "Rarely; typical human miscommunication", id: "Jarang; sekadar miskomunikasi manusiawi", de: "Selten; normale Missverständnisse", fr: "Rarement; de simples malentendus ponctuels", es: "Raramente; malentendidos normales" } },
      { score: 2, label: { en: "Often; promises evaporate the moment they become inconvenient", id: "Sering; janji menguap begitu terasa merepotkan bagi mereka", de: "Oft; Versprechen lösen sich in Luft auf, sobald sie unbequem sind", fr: "Souvent; les promesses disparaissent dès qu'elles dérangent", es: "A menudo; las promesas se esfuman cuando dejan de convenirles" } },
      { score: 3, label: { en: "Constant historical revisionism; I feel like I live in an Orwellian nightmare", id: "Manipulasi narasi terus-menerus; serasa hidup di dunia yang kenyataannya terus diputarbalikkan", de: "Dauerhafte Geschichtsfälschung; ich fühle mich wie in einem Albtraum", fr: "Réécriture permanente; j'ai l'impression de vivre dans une réalité parallèle", es: "Revisión constante del pasado; siento que vivo en una pesadilla distorsionada" } },
    ],
  },

  // Subscale 2: Walking on Eggshells & Hyper-Vigilance
  {
    id: 5,
    subscale: "hyper_vigilance",
    prompt: {
      en: "How often do you find yourself 'walking on eggshells'—meticulously calculating your tone, facial expression, and words to avoid triggering an explosion or silent treatment?",
      id: "Seberapa sering kamu merasa harus 'berjalan di atas pecahan kaca'—sangat berhati-hati mengatur nada bicara dan ekspresi agar tidak memicu ledakan atau aksi tutup mulut?",
      de: "Wie oft läufst du 'auf Eierschalen' – modulierst Tonfall und Worte peinlichst genau, um Ausbrüche oder Schweigen zu vermeiden?",
      fr: "À quelle fréquence marchez-vous 'sur des œufs', en pesant chaque mot et regard pour éviter une crise ou un silence pesant ?",
      es: "¿Con qué frecuencia sientes que caminas 'sobre cristales rotos', midiendo cada palabra para no provocar explosiones o castigo de silencio?",
    },
    options: [
      { score: 0, label: { en: "Never; I express myself freely and safely", id: "Tidak pernah; aku berekspresi bebas dan merasa aman", de: "Nie; ich äußere mich frei, sicher und entspannt", fr: "Jamais; je m'exprime en toute liberté et sécurité", es: "Nunca; me expreso con libertad y seguridad" } },
      { score: 1, label: { en: "Only when they are under genuine extreme life stress", id: "Hanya sesekali saat mereka sedang stres berat", de: "Nur bei extremem äußerem Stress der Person", fr: "Uniquement lors de grosses périodes de stress avéré", es: "Solo ante un estrés extremo evidente en su vida" } },
      { score: 2, label: { en: "Frequently; I constantly scan their mood before sharing news", id: "Sering; aku selalu memantau mood mereka sebelum berani bicara", de: "Häufig; scanne ihre Laune, bevor ich etwas sage", fr: "Souvent; je scrute leur humeur avant d'oser parler", es: "A menudo; escaneo su humor antes de decir cualquier cosa" } },
      { score: 3, label: { en: "Constantly; living with them feels like defusing an active bomb 24/7", id: "Setiap saat; hidup serasa menjinakkan bom aktif 24 jam sehari", de: "Ständig; das Zusammenleben gleicht dem Entschärfen einer Zeitbombe", fr: "Constamment; vivre avec eux ressemble à désamorcer une bombe permanente", es: "Constantemente; convivir se siente como desactivar una bomba activa a todas horas" } },
    ],
  },
  {
    id: 6,
    subscale: "hyper_vigilance",
    prompt: {
      en: "Do they use the 'Silent Treatment' (stonewalling) or abrupt withdrawal of affection as a weapon to punish you until you plead for forgiveness?",
      id: "Apakah mereka menggunakan 'Silent Treatment' (mendiamkan/mengabaikan) sebagai senjata untuk menghukummu sampai kamu memohon ampun?",
      de: "Nutzen sie 'Stonewalling' (eisiges Schweigen) oder Liebesentzug als Waffe, bis du um Vergebung bettelst?",
      fr: "Utilisent-ils le silence punitif ou le retrait d'affection pour vous punir jusqu'à ce que vous suppliiez leur pardon ?",
      es: "¿Utilizan la ley del hielo (silencio punitivo) o la retirada de afecto como castigo hasta que pides perdón?",
    },
    options: [
      { score: 0, label: { en: "No; we discuss conflict constructively or take healthy cooling-off pauses", id: "Tidak; kami berdiskusi sehat atau saling menenangkan diri dengan baik", de: "Nein; wir sprechen konstruktiv oder machen faire Pausen", fr: "Non; nous communiquons sainement ou faisons des pauses claires", es: "No; dialogamos de forma constructiva o hacemos pausas acordadas" } },
      { score: 1, label: { en: "A brief pouting episode, but resolved within hours", id: "Merajuk sebentar, tapi beres dalam beberapa jam", de: "Kurzes Schmollen, aber innerhalb von Stunden gelöst", fr: "Une bouderie passagère résolue en quelques heures", es: "Un enfado breve pero resuelto en pocas horas" } },
      { score: 2, label: { en: "Days of cold hostility and refusal to make eye contact", id: "Berhari-hari sikap dingin menusuk dan menolak kontak mata", de: "Tage eisige Kälte und Verweigerung von Blickkontakt", fr: "Plusieurs jours d'hostilité glaciale et refus de tout regard", es: "Días de frialdad hostil y negativa a mirarme a los ojos" } },
      { score: 3, label: { en: "Agonizing prolonged stonewalling that drives me to panic attacks and desperate begging", id: "Silent treatment berkepanjangan yang menyiksa hingga memicu serangan panik dan membuatku mengemis maaf", de: "Wochenlanges Schweigen, das mich in Panik und Verzweiflung stürzt", fr: "Un silence punitif interminable qui me plonge dans la panique et la supplication", es: "Castigos de silencio prolongados que me provocan ataques de pánico y súplicas desesperadas" } },
    ],
  },
  {
    id: 7,
    subscale: "hyper_vigilance",
    prompt: {
      en: "Do they triangulate or isolate you—telling you 'Your friends/family are toxic and don't care about you like I do'?",
      id: "Apakah mereka mengisolasi atau mengadu domba—bilang bahwa 'Teman/keluargamu itu toksik dan gak peduli sama kamu seperti aku'?",
      de: "Versuchen sie dich zu isolieren ('Deine Freunde/Familie meinen es nicht gut mit dir')?",
      fr: "Tentent-ils de vous isoler en affirmant : 'Tes amis et ta famille sont toxiques, je suis le seul à t'aimer vraiment' ?",
      es: "¿Intentan aislarte o crear desconfianza diciendo que 'Tus amigos o familia son tóxicos y no te quieren como yo'?",
    },
    options: [
      { score: 0, label: { en: "Never; they actively support my friendships and external community", id: "Tidak pernah; mereka mendukung pertemanan dan relasi luarku", de: "Nie; sie fördern meine Freundschaften und Familie aktiv", fr: "Jamais; ils encouragent mes amitiés et mon cercle extérieur", es: "Nunca; apoyan activamente mis amistades y mi red social" } },
      { score: 1, label: { en: "Occasionally critical of a specific acquaintance with good reason", id: "Kadang mengkritik teman tertentu dengan alasan yang masuk akal", de: "Kritisieren vereinzelt jemanden mit nachvollziehbarem Grund", fr: "Des réserves ponctuelles et argumentées sur un proche", es: "Críticas puntuales con fundamentos razonables hacia alguien" } },
      { score: 2, label: { en: "Frequently planting seeds of doubt about everyone in my support network", id: "Sering menanam rasa curiga terhadap teman-teman dekatku", de: "Säen oft Misstrauen gegenüber meinen Bezugspersonen", fr: "Semis réguliers de doutes sur la loyauté de mes proches", es: "Suelen sembrar dudas sobre la lealtad de la gente que me apoya" } },
      { score: 3, label: { en: "Severe isolation; I have lost nearly all my close relationships out of fear of their wrath", id: "Isolasi parah; aku kehilangan hampir seluruh teman karena takut mereka murka", de: "Totale Isolation; habe aus Furcht fast alle Bindungen gekappt", fr: "Isolement sévère; j'ai coupé presque tous mes liens par peur de leurs colères", es: "Aislamiento severo; he perdido casi todos mis vínculos por miedo a su furia" } },
    ],
  },
  {
    id: 8,
    subscale: "hyper_vigilance",
    prompt: {
      en: "Do they cycle between extreme love-bombing (lavish affection, declaring you soulmates) and abrupt devaluing/cruelty?",
      id: "Apakah mereka berputar antara love-bombing ekstrem (pujian meluap-luap, menganggapmu belahan jiwa) lalu tiba-tiba berubah kejam dan merendahkanmu?",
      de: "Wechseln sie extrem zwischen 'Love-Bombing' (überbordende Zuneigung) und plötzlicher Härte/Entwertung?",
      fr: "Alternent-ils entre un 'love-bombing' intense (déclarations passionnées) et une cruauté ou un mépris soudain ?",
      es: "¿Alternan entre 'love-bombing' desmedido (afecto arrollador) y desprecio o crueldad repentina?",
    },
    options: [
      { score: 0, label: { en: "No; their affection is steady, grounded, and consistent", id: "Tidak; kasih sayang mereka stabil, tenang, dan konsisten", de: "Nein; Zuneigung ist beständig und vorhersehbar", fr: "Non; leur affection est stable, prévisible et constante", es: "No; su afecto es estable, sereno y predecible" } },
      { score: 1, label: { en: "Natural honeymoon phases that mellowed into normal intimacy", id: "Fase bulan madu wajar yang berangsur jadi kehangatan normal", de: "Normale Verliebtheit, die zu stabiler Nähe wurde", fr: "Une phase de lune de miel normale devenue tendresse sereine", es: "Fase de enamoramiento normal que evolucionó a intimidad tranquila" } },
      { score: 2, label: { en: "Noticeable whiplash; one day I am on a pedestal, the next I am treated like dirt", id: "Sangat kontras; hari ini dipuja bak raja/ratu, besok diperlakukan seperti sampah", de: "Spürbares Schleudertrauma; heute auf dem Thron, morgen im Dreck", fr: "Violentes montagnes russes; un jour sur un piédestal, le lendemain jeté à terre", es: "Montaña rusa agotadora; hoy en un pedestal, mañana con desprecio absoluto" } },
      { score: 3, label: { en: "Extreme traumatic whiplash; the unpredictability keeps me in a state of chemical addiction and terror", id: "Siklus trauma ekstrem; ketidaktentuannya membuatku kecanduan emosional sekaligus ketakutan konstan", de: "Extremes Trauma-Bonding; die Unberechenbarkeit macht mich suchtartig hörig", fr: "Trauma-bonding aigu; l'imprévisibilité totale me maintient sous emprise addictive et terrifiée", es: "Trauma-bonding extremo; la total imprevisibilidad me mantiene en adicción y terror continuos" } },
    ],
  },

  // Subscale 3: Apology Reflex & Autonomy Loss
  {
    id: 9,
    subscale: "apology_reflex",
    prompt: {
      en: "Do you catch yourself preemptively apologizing for things that are not your fault (or even for just existing and speaking)?",
      id: "Apakah kamu sering refleks meminta maaf lebih dulu atas hal-hal yang bukan salahmu (bahkan cuma karena berbicara atau sekadar hadir)?",
      de: "Entschuldigst du dich reflexartig für Dinge, die gar nicht deine Schuld sind?",
      fr: "Vous surprenez-vous à vous excuser par réflexe pour des choses qui ne sont pas de votre faute ?",
      es: "¿Te descubres pidiendo perdón por reflejo por cosas que no son culpa tuya o por el simple hecho de hablar?",
    },
    options: [
      { score: 0, label: { en: "Never; I apologize only when I have genuinely erred", id: "Tidak pernah; aku minta maaf hanya jika benar-benar berbuat salah", de: "Nie; ich entschuldige mich nur bei echtem Fehlverhalten", fr: "Jamais; je m'excuse uniquement en cas d'erreur avérée", es: "Nunca; me disculpo únicamente si he cometido un error real" } },
      { score: 1, label: { en: "Casual polite social apologies", id: "Basa-basi sopan santun biasa", de: "Normale Höflichkeitsfloskeln", fr: "Politesse sociale d'usage", es: "Mera cortesía social habitual" } },
      { score: 2, label: { en: "Frequently; I say 'I'm sorry' constantly as an emotional defense shield", id: "Sering; kata 'maaf' keluar terus-menerus sebagai tameng pertahanan", de: "Häufig; 'Entschuldigung' ist mein automatischer Schutzschild", fr: "Souvent; 'je suis désolé' est devenu mon bouclier de défense", es: "A menudo; el 'lo siento' se ha vuelto mi escudo automático" } },
      { score: 3, label: { en: "Chronic apology reflex; I apologize for breathing, crying, or having physical needs", id: "Refleks minta maaf kronis; sampai minta maaf karena bernapas, menangis, atau punya kebutuhan dasar", de: "Chronischer Reflex; entschuldige mich fürs Atmen, Weinen und Existieren", fr: "Réflexe chronique; je m'excuse d'exister, de pleurer ou d'avoir des besoins", es: "Reflejo crónico; pido perdón por llorar, respirar o tener necesidades básicas" } },
    ],
  },
  {
    id: 10,
    subscale: "apology_reflex",
    prompt: {
      en: "Do you find yourself making elaborate excuses to friends or family to justify their dismissive or abusive behavior?",
      id: "Apakah kamu sering mencari-cari alasan rumit ke teman/keluarga demi membela atau membenarkan perlakuan buruk mereka?",
      de: "Erfindest du vor Freunden Ausreden, um ihr verletzendes Verhalten zu rechtfertigen?",
      fr: "Inventez-vous des excuses complexes auprès de vos proches pour justifier leur comportement toxique ?",
      es: "¿Buscas excusas constantes ante tus amigos o familia para justificar el maltrato o frialdad de esa persona?",
    },
    options: [
      { score: 0, label: { en: "No; I speak honestly and transparently about my relationship", id: "Tidak; aku berbicara jujur dan terbuka tentang hubunganku", de: "Nein; ich spreche ehrlich und ungeschminkt", fr: "Non; je parle de ma relation avec sincérité et lucidité", es: "No; hablo de mi relación con total honestidad" } },
      { score: 1, label: { en: "Occasionally giving them the benefit of the doubt on a stressful day", id: "Sesekali memaklumi jika mereka sedang hari yang buruk", de: "Gewähre gelegentlich Vertrauensvorschuss an schlechten Tagen", fr: "Je leur accorde le bénéfice du doute lors d'une journée difficile", es: "A veces concedo el beneficio de la duda ante un mal día" } },
      { score: 2, label: { en: "Often; I hide arguments because I feel ashamed of what they said to me", id: "Sering; aku menyembunyikan pertengkaran karena malu atas apa yang mereka katakan padaku", de: "Oft; verschweige Streitigkeiten aus Scham über ihre Worte", fr: "Souvent; je cache nos disputes par honte de ce qu'ils m'ont dit", es: "A menudo; oculto los conflictos por vergüenza de cómo me hablan" } },
      { score: 3, label: { en: "Constantly running PR for them; I am their full-time apologist while suffering in silence", id: "Terus-menerus jadi jubir pembela mereka; membelanya di depan semua orang padahal aku menderita di dalam", de: "Ständige PR-Arbeit; verteidige sie nach außen, während ich innerlich zerbreche", fr: "Un rôle d'avocat à temps plein; je les défends devant tous alors que je me détruis en silence", es: "Relaciones públicas constantes; les defiendo ante todos mientras sufro en silencio" } },
    ],
  },
  {
    id: 11,
    subscale: "apology_reflex",
    prompt: {
      en: "How confident do you feel in your ability to make independent decisions without their approval or micro-management?",
      id: "Seberapa percaya diri kamu mampu mengambil keputusan mandiri tanpa persetujuan atau campur tangan mereka?",
      de: "Wie sicher fühlst du dich bei eigenständigen Entscheidungen ohne ihre Genehmigung?",
      fr: "Quelle est votre confiance dans votre capacité à décider par vous-même sans leur aval ou contrôle ?",
      es: "¿Qué tan seguro te sientes tomando decisiones importantes sin pedir su aprobación o permiso previo?",
    },
    options: [
      { score: 0, label: { en: "100% confident; my autonomy and self-trust are strong", id: "100% yakin; otonomi dan kepercayaan diriku sangat kuat", de: "Vollkommen sicher; meine Autonomie ist unberührt", fr: "Confiance totale; mon autonomie et mon jugement sont solides", es: "Totalmente seguro; mi autonomía y criterio son sólidos" } },
      { score: 1, label: { en: "I like getting their input, but make the final call myself", id: "Suka mendengar masukannya, tapi keputusan akhir tetap di tanganku", de: "Höre gerne ihre Meinung, entscheide aber selbst", fr: "J'aime avoir leur avis, mais je décide seul", es: "Agradezco su opinión, pero la decisión final es mía" } },
      { score: 2, label: { en: "Crippling self-doubt; even simple choices (groceries, outfits) cause anxiety", id: "Sering ragu parah; bahkan pilihan sederhana (pakaian/belanja) memicu cemas", de: "Große Selbstzweifel; schon banale Dinge erzeugen Angst", fr: "Doutes intenses; même des choix du quotidien provoquent de l'angoisse", es: "Dudas paralizantes; hasta compras o ropa me generan ansiedad" } },
      { score: 3, label: { en: "Total erosion of agency; I literally feel incapable of surviving or functioning without their directive", id: "Hilang kendali diri mutlak; merasa tidak mampu hidup atau berfungsi tanpa instruksi mereka", de: "Vollständiger Kontrollverlust; fühle mich ohne ihre Anweisung lebensunfähig", fr: "Perte totale d'autonomie; j'ai l'impression de ne plus savoir fonctionner sans eux", es: "Pérdida absoluta de autonomía; siento que no sé funcionar ni vivir sin su aprobación" } },
    ],
  },
  {
    id: 12,
    subscale: "apology_reflex",
    prompt: {
      en: "Looking back at who you were before this relationship or dynamic, do you recognize yourself?",
      id: "Melihat kembali dirimu sebelum terjebak dalam hubungan atau dinamika ini, apakah kamu masih mengenali dirimu yang dulu?",
      de: "Wenn du darauf blickst, wer du vor dieser Beziehung warst – erkennst du dich noch wieder?",
      fr: "En repensant à la personne que vous étiez avant cette relation, vous reconnaissez-vous encore ?",
      es: "¿Al mirar a la persona que eras antes de esta relación o dinámica, te reconoces todavía?",
    },
    options: [
      { score: 0, label: { en: "Yes; I have grown and remain fully aligned with my core self", id: "Ya; aku berkembang dan tetap selaras dengan jati diriku", de: "Ja; ich bin gewachsen und mir selbst treu geblieben", fr: "Oui; j'ai mûri tout en restant profondément fidèle à moi-même", es: "Sí; he crecido manteniéndome fiel a mi esencia" } },
      { score: 1, label: { en: "Mostly, with normal life maturity shifts", id: "Sebagian besar iya, dengan kedewasaan hidup yang wajar", de: "Weitgehend, mit normaler persönlicher Reifung", fr: "En grande partie, avec l'évolution normale de l'âge", es: "Casi siempre, con la madurez habitual de la vida" } },
      { score: 2, label: { en: "I feel significantly diminished, anxious, and smaller than I used to be", id: "Aku merasa jauh lebih ciut, cemas, dan kehilangan percaya diri dibanding dulu", de: "Fühle mich deutlich kleiner, ängstlicher und verblasst", fr: "Je me sens nettement plus terne, effacé et angoissé qu'avant", es: "Me siento mucho más pequeño, apagado y temeroso que antes" } },
      { score: 3, label: { en: "A ghost of my former self; my vitality, joy, and boundaries have been entirely erased", id: "Tinggal bayangan dari diriku yang dulu; keceriaan dan batasanku terkuras habis tanpa sisa", de: "Ein Schatten meiner selbst; Lebensfreude und Identität wurden ausgelöscht", fr: "L'ombre de moi-même; ma joie de vivre et mes limites ont été anéanties", es: "Una sombra de lo que fui; mi alegría, vitalidad y límites han quedado destruidos" } },
    ],
  },
];

export const GASLIGHTING_PROFILES: Record<string, GaslightingProfile> = {
  severe_manipulation: {
    level: "severe_manipulation",
    badge: {
      en: "CODE CRITICAL: SEVERE REALITY EROSION",
      id: "KODE KRITIS: EROSI REALITAS & MANIPULASI TINGGI",
      de: "CODE KRITISCH: SCHWERE REALITÄTSVERZERRUNG",
      fr: "CODE CRITIQUE : ÉROSION GRAVE DE LA RÉALITÉ",
      es: "CÓDIGO CRÍTICO: EROSIÓN GRAVE DE LA REALIDAD",
    },
    title: {
      en: "Severe Gaslighting & Coercive Control",
      id: "Gaslighting Berat & Kontrol Koersif Akut",
      de: "Schweres Gaslighting & toxische Kontrolle",
      fr: "Gaslighting sévère & emprise psychologique",
      es: "Gaslighting severo y control coercitivo",
    },
    tagline: {
      en: "Your intuition is not broken. You are subjected to systematic psychological destabilization.",
      id: "Instingmu tidak rusak. Kamu sedang mengalami destabilisasi psikologis yang disengaja.",
      de: "Deine Wahrnehmung täuscht dich nicht. Du bist systematischer Manipulation ausgesetzt.",
      fr: "Votre intuition n'est pas brisée. Vous subissez une déstabilisation psychologique systématique.",
      es: "Tu intuición no falla. Estás sometido a una desestabilización psicológica continua.",
    },
    description: {
      en: "Your screener indicates profound reality erosion, persistent cognitive invalidation, and severe walking-on-eggshells hyper-vigilance. Gaslighting is a form of psychological abuse where the manipulator forces you to doubt your memory, sanity, and perceptions so that they hold sovereign control over truth. You are not 'crazy' or 'too sensitive'—your nervous system is in acute chronic fight-or-flight survival mode.",
      id: "Hasil tesmu menunjukkan erosi realitas yang parah, pembatalan kenyataan berulang, dan ketegangan berjalan di atas pecahan kaca. Gaslighting adalah kekerasan psikologis di mana manipulator memaksamu meragukan ingatan dan kewarasanmu sendiri agar mereka memegang kendali mutlak atas kebenaran. Kamu tidak gila atau baperan—sistem sarafmu sedang dalam mode darurat bertahan hidup.",
      de: "Dein Profil zeigt massive Realitätszweifel und ständige Alarmbereitschaft. Gaslighting ist seelische Manipulation: Der Partner bringt dich gezielt dazu, deinem Verstand zu misstrauen, um die Deutungshoheit zu behalten. Du bist weder verrückt noch hysterisch – dein Körper kämpft im Notfallmodus.",
      fr: "Ce profil traduit une profonde déstabilisation mentale. Le gaslighting est une violence insidieuse où l'autre réécrit les faits pour vous faire douter de votre bon sens et asseoir son emprise. Vous n'êtes ni fou ni paranoïaque : vous êtes en état de survie permanent.",
      es: "Tus resultados indican una grave distorsión de la realidad impuesta desde fuera. El gaslighting busca que dudes de tu propia memoria para arrebatarte el criterio. No estás loco ni eres exagerado: tu sistema nervioso vive en alerta defensiva continua.",
    },
    psychologyInsight: {
      en: "Gaslighting induces 'Cognitive Dissonance' and activates the Anterior Midcingulate Cortex (aMCC) in conflict loops. Over time, the victim experiences learned helplessness, where the brain stops trusting its own sensory feedback.",
      id: "Gaslighting memicu 'Disonansi Kognitif' dan membebani sirkuit aMCC. Lama-kelamaan muncul kondisi 'Learned Helplessness' di mana otak berhenti mempercayai data indranya sendiri.",
      de: "Gaslighting erzeugt kognitive Dissonanz und lähmt das Urteilsvermögen. Das Gehirn verlernt durch ständige Abwertung, den eigenen Sinnen zu vertrauen (erlernte Hilflosigkeit).",
      fr: "Le gaslighting provoque une dissonance cognitive aiguë et épuise le cortex préfrontal. La victime finit par désactiver ses propres signaux d'alerte sensoriels.",
      es: "El gaslighting genera disonancia cognitiva y una indefensión aprendida donde el cerebro renuncia a confiar en sus propios sentidos.",
    },
    empowermentProtocols: {
      en: [
        "The Reality Anchor Ledger: Never argue about what happened verbally. Write down verifiable facts, dates, and direct quotes in a secure private journal immediately after interactions.",
        "Stop JADE-ing (Don't Justify, Argue, Defend, or Explain): When gaslighted, disengage with neutral scripts: 'I hear your perspective, but I remember it differently and won't debate my memory.'",
        "External Sanity Tether: Confide in a licensed therapist or a grounded friend outside the relationship's sphere of influence to benchmark objective reality.",
      ],
      id: [
        "Jurnal Jangkar Realitas: Jangan berdebat ingatan secara lisan. Catat fakta objektif, tanggal, dan kalimat langsung di jurnal privat aman (seperti Nuju) segera setelah percakapan.",
        "Berhenti JADE (Jangan Justifikasi, Debat, Bela Diri, atau Jelaskan): Gunakan kalimat netral: 'Aku dengar sudut pandangmu, tapi ingatanku berbeda dan aku tidak akan mendebat apa yang kurasakan.'",
        "Tali Jangkar Eksternal: Ceritakan apa yang terjadi kepada psikolog berlisensi atau sahabat terpercaya di luar lingkaran manipulasi untuk memvalidasi realitas objektif.",
      ],
      de: [
        "Das Realitäts-Tagebuch: Diskutiere den Ablauf nicht mündlich. Notiere Daten, Fakten und Zitate sofort in einem sicheren privaten Notizbuch.",
        "Nicht mehr rechtfertigen (Stop JADE): 'Ich nehme deine Sicht zur Kenntnis, erinnere mich aber anders und werde mein Gedächtnis nicht verteidigen.'",
        "Externe Verankerung: Tausche dich mit einer Therapeutin oder neutralen Vertrauensperson aus, um dein Gespür für Wahrheit wiederzufinden.",
      ],
      fr: [
        "Le carnet d'ancrage du réel : ne débattez plus oralement. Notez faits, dates et propos exacts dans un journal intime sécurisé.",
        "Cesser d'argumenter : 'J'entends ta version, mais mes souvenirs sont différents et je ne débats pas de ce que j'ai vécu'.",
        "Point d'ancrage extérieur : confiez-vous à un thérapeute ou ami de confiance extérieur pour valider objectivement les faits.",
      ],
      es: [
        "Cuaderno de anclaje de la realidad: no discutas los hechos verbalmente. Escribe fechas, hechos y frases textuales en un diario seguro.",
        "No te justifiques ni discutas: 'Escucho tu punto de vista, pero recuerdo las cosas de otro modo y no voy a debatir mi memoria'.",
        "Vínculo de cordura exterior: apóyate en un profesional o amigo cercano fuera del círculo de esa persona para calibrar la realidad.",
      ],
    },
    dailyAffirmation: {
      en: "My memory is sound. My feelings are valid. I am the sole author and sovereign authority of my reality.",
      id: "Ingatanku sehat dan jernih. Perasaanku sah dan nyata. Aku adalah pemegang otoritas tunggal atas kenyataan hidupku.",
      de: "Mein Verstand ist klar. Meine Gefühle sind wahrhaftig. Ich besitze die unantastbare Hoheit über meine Realität.",
      fr: "Ma mémoire est fiable. Mes ressentis sont légitimes. Je suis la seule autorité souveraine de ma réalité.",
      es: "Mi memoria es lúcida. Mis emociones son válidas. Soy la máxima y única autoridad de mi propia realidad.",
    },
  },

  covert_control: {
    level: "covert_control",
    badge: {
      en: "COVERT BOUNDARY EROSION",
      id: "EROSI BATASAN TERSAMBUNG (COVERT CONTROL)",
      de: "SUBTILE GRENZVERLETZUNG & KONTROLLE",
      fr: "ÉROSION INSIDIEUSE DES LIMITES",
      es: "EROSIÓN SUBJETIVA DE LÍMITES",
    },
    title: {
      en: "Covert Manipulation & Boundary Invalidation",
      id: "Manipulasi Terselubung & Pelecehan Batasan",
      de: "Subtile Manipulation & Grenzübertritte",
      fr: "Manipulation insidieuse & frontières bafouées",
      es: "Manipulación encubierta e invalidación",
    },
    tagline: {
      en: "The control is subtle, masked by faux-concern and guilt trips that slowly hollow out your confidence.",
      id: "Kontrolnya halus, dibungkus pura-pura peduli dan rasa bersalah yang perlahan mengikis rasa percayamu.",
      de: "Die Einflussnahme ist subtil, getarnt als 'Sorge' und Schuldgefühle, die dein Selbstvertrauen aushöhlen.",
      fr: "L'emprise est feutrée, déguisée en fausse sollicitude et culpabilisation qui rongent votre assurance.",
      es: "El control es sutil, disfrazado de preocupación y culpa que van minando tu autoconfianza.",
    },
    description: {
      en: "You are dealing with insidious psychological pressure. They rarely scream or use overt cruelty; instead, they employ guilt trips, selective memory loss, victim-flipping, and subtle patronizing comments ('I'm only telling you this because I care about you'). Over time, you have become hyper-agreeable, hesitant to voice discontent, and constantly second-guessing your worth.",
      id: "Kamu sedang berhadapan dengan manipulasi psikologis terselubung. Mereka jarang membentak secara terbuka; sebaliknya, mereka memakai rasa bersalah, pura-pura lupa, memutarbalikkan posisi korban, dan komentar merendahkan ('Aku ngomong gini karena sayang kamu'). Perlahan, kamu jadi terlalu penurut dan takut menyuarakan ketidaknyamanan.",
      de: "Du erlebst versteckte Einflussnahme. Es gibt selten laute Wutausbrüche; stattdessen regieren Passiv-Aggressivität, Schuldzuweisungen und scheinheilige Fürsorge ('Ich sage das doch nur zu deinem Besten'). Du passt dich immer mehr an und zweifelst an deinem Wert.",
      fr: "Vous faites face à une pression insidieuse : peu d'éclats de voix, mais des remarques condescendantes, des silences boudeurs et un renversement des rôles ('C'est pour ton bien'). Vous vous effacez pour maintenir une paix fragile.",
      es: "Vives una manipulación de baja intensidad: sin grandes gritos, pero con reproches velados, amnesia selectiva y victimismo ('Te lo digo por tu bien'). Te has vuelto hipercomplaciente para evitar roces.",
    },
    psychologyInsight: {
      en: "Covert manipulation exploits interpersonal guilt and empathy. The manipulator uses intermittent reinforcement to keep you striving for their approval while subtly lowering your boundary threshold.",
      id: "Manipulasi terselubung memanfaatkan rasa empati dan rasa bersalahmu. Manipulator memakai penguatan intermiten agar kamu terus haus akan pengakuan mereka sambil diam-diam melucuti batasanmu.",
      de: "Versteckte Manipulation nutzt dein Mitgefühl aus. Durch wechselhafte Bestätigung wirst du abhängig von ihrem Wohlwollen gehalten.",
      fr: "Cette manipulation instrumente votre empathie. Le renforcement intermittent vous pousse à chercher leur validation tout en cédant du terrain.",
      es: "Este perfil explota tu culpa y empatía, administrando aprobación a cuentagotas para que toleres invasiones a tu intimidad.",
    },
    empowermentProtocols: {
      en: [
        "The Fog-Clearing Pause: When you feel guilted or pressured, say: 'I need some time to sit with this. I'll share my decision tomorrow.' Do not commit in the heat of emotional tension.",
        "Name the Dynamic (Gently): Practice pointing out the conversational flip: 'Notice how when I shared my hurt about X, the conversation immediately shifted to your feelings about Y.'",
        "Reclaim Low-Stakes Decisions: Intentionally make 3 personal choices this week without consulting them (food, route, weekend reading).",
      ],
      id: [
        "Jeda Penjernih Pikiran: Saat ditekan rasa bersalah, katakan: 'Aku butuh waktu untuk memikirkannya. Besok aku kabari keputusanku.' Jangan pernah buat komitmen di bawah tekanan emosional.",
        "Tunjukkan Polanya Secara Santai: Sorot saat topik diputarbalikkan: 'Perhatikan deh, pas aku cerita luka soal hal A, obrolannya langsung diputar jadi soal perasaanmu tentang hal B.'",
        "Rebut Keputusan Kecil: Ambil 3 keputusan personal minggu ini tanpa meminta persetujuan mereka (makanan, pakaian, hobi).",
      ],
      de: [
        "Die Bedenkpause: 'Ich brauche etwas Zeit, um das sacken zu lassen. Ich gebe dir morgen Bescheid.' Triff keine Abmachungen unter Druck.",
        "Das Muster spiegeln: 'Fällt dir auf, dass es plötzlich um dich geht, obwohl ich gerade mein Unbehagen angesprochen habe?'",
        "Kleine Freiräume zurückholen: Triff diese Woche bewusst 3 Alltagsentscheidungen ganz ohne Rücksprache.",
      ],
      fr: [
        "La pause de décantation : 'J'ai besoin de temps pour y réfléchir, je te donnerai ma réponse demain'. Ne cédez jamais sous la pression immédiate.",
        "Nommer la manœuvre : 'Remarque comme la discussion a dérivé sur tes besoins dès que j'ai exprimé ma blessure'.",
        "Reprendre la main sur l'ordinaire : tranchez 3 choix personnels cette semaine sans leur demander leur avis.",
      ],
      es: [
        "Pausa de claridad: 'Necesito tiempo para pensarlo con calma; mañana te comento mi postura'. No pactes bajo chantaje emocional.",
        "Señalar el giro: 'Fíjate en cómo al hablar de lo que me dolió, la conversación ha terminado girando en torno a tus quejas'.",
        "Recuperar decisiones propias: toma 3 decisiones cotidianas esta semana sin consultarles absolutamente nada.",
      ],
    },
    dailyAffirmation: {
      en: "I do not have to explain away bad treatment to maintain peace. My boundaries are clean, non-negotiable, and worthy of respect.",
      id: "Aku tidak perlu mencari pembenaran atas perlakuan buruk demi menjaga kedamaian semu. Batasanku bersih, tegas, dan layak dihormati.",
      de: "Ich muss schlechtes Benehmen nicht schönreden, um Frieden zu wahren. Meine Grenzen sind unantastbar.",
      fr: "Je n'ai pas à excuser l'inacceptable pour préserver la paix. Mes limites sont légitimes et non négociables.",
      es: "No tengo por qué disculpar malos tratos para mantener una falsa paz. Mis límites son firmes y respetables.",
    },
  },

  subtle_friction: {
    level: "subtle_friction",
    badge: {
      en: "MILD RELATIONAL FRICTION",
      id: "FRIKSI KOMUNIKASI RINGAN",
      de: "LEICHTE KOMMUNIKATIONSKONFLIKTE",
      fr: "FRICTIONS RELATIONNELLES MINEURES",
      es: "FRICCIÓN COMUNICATIVA LEVE",
    },
    title: {
      en: "Miscommunication & Defensive Friction",
      id: "Miskomunikasi & Friksi Defensif Biasa",
      de: "Missverständnisse & defensive Reaktionen",
      fr: "Malentendus & maladresses de communication",
      es: "Malentendidos y fricciones defensivas",
    },
    tagline: {
      en: "Occasional defensiveness and human disagreements, but with underlying capacity for repair and shared reality.",
      id: "Ada sikap defensif sesekali, namun masih punya kapasitas sehat untuk saling memaafkan dan berpijak pada kenyataan.",
      de: "Gelegentliche Streitigkeiten und Schutzhaltungen, aber eine solide Basis für Versöhnung.",
      fr: "Des maladresses et réactions défensives passagères, mais un ancrage dans le réel et le dialogue.",
      es: "Desencuentros y defensas ocasionales, pero con voluntad de reparación y respeto mutuo.",
    },
    description: {
      en: "Your results do not suggest severe systemic gaslighting. You likely experience common relationship friction: emotional clumsiness during high stress, defensive reactions to criticism, or conflicting memories of emotional arguments. The crucial distinction is that accountability and empathy still exist, even if difficult conversations require patience.",
      id: "Hasil tesmu tidak menunjukkan gaslighting sistemik yang berbahaya. Kemungkinan ini adalah friksi hubungan biasa: kekakuan emosional saat stres, sikap defensif saat dikritik, atau perbedaan memori saat emosi panas. Yang terpenting, empati dan tanggung jawab masih ada.",
      de: "Deine Antworten deuten nicht auf bösartiges Gaslighting hin. Es handelt sich eher um klassische Beziehungskonflikte: Überforderung bei Stress oder verletzte Egos. Der Unterschied: Ein ehrliches Gespräch führt meist zu Einsicht.",
      fr: "Vos réponses n'indiquent pas de gaslighting pathologique. Il s'agit plutôt de maladresses courantes : ego piqué lors d'une dispute ou fatigue. La nuance clé réside dans la capacité à s'excuser sincèrement.",
      es: "Tus resultados no reflejan una manipulación patológica, sino tensiones comunicativas habituales: defensas al sentirse criticado o roces por cansancio. Existe capacidad de disculpa y escucha.",
    },
    psychologyInsight: {
      en: "Defensiveness (one of Gottman's 'Four Horsemen') can mimic gaslighting when someone feels flooded. However, non-abusive partners show remorse once physiological calm returns.",
      id: "Sikap defensif bisa menyerupai gaslighting saat seseorang emosi meluap. Namun pasangan yang sehat akan menunjukkan rasa bersalah dan minta maaf begitu kepalanya dingin.",
      de: "Defensivverhalten kann wie Gaslighting wirken. Gesunde Partner zeigen jedoch Reue, sobald sich das Nervensystem beruhigt hat.",
      fr: "La défensive peut ressembler à de la mauvaise foi sous le coup de la colère, mais un partenaire équilibré sait reconnaître ses torts à froid.",
      es: "La actitud defensiva puede parecer manipulación puntual, pero una persona sana es capaz de reflexionar y reparar a posteriori.",
    },
    empowermentProtocols: {
      en: [
        "The 20-Minute Conflict Timeout: When arguments get repetitive or defensive, agree on a mutual 20-minute cooling-off window before continuing.",
        "Use 'I' Statements: Frame concerns around your somatic experience rather than accusations ('I felt hurt when...' instead of 'You always...').",
        "Reflective Listening Check: Paraphrase each other's words before answering: 'What I hear you saying is X, is that accurate?'",
      ],
      id: [
        "Jeda Konflik 20 Menit: Saat adu argumen mulai muter-muter, sepakati rehat 20 menit agar detak jantung turun sebelum lanjut bicara.",
        "Gunakan Kalimat 'Aku': Mulai obrolan dari perasaanmu, bukan tuduhan ('Aku merasa sedih pas...' bukan 'Kamu selalu...').",
        "Uji Pendengaran Reflektif: Ulangi apa yang kamu dengar sebelum membantah: 'Yang aku tangkap dari omonganmu itu X, benar gak?'",
      ],
      de: [
        "20-Minuten-Pause: Wenn der Puls rast, unterbrecht den Streit für 20 Minuten zur Beruhigung.",
        "Ich-Botschaften: Sprich über dein Erleben statt Vorwürfe zu schleudern ('Ich fühlte mich verletzt, als...').",
        "Aktives Zuhören: Wiederhole in eigenen Worten, was beim anderen ankam, bevor du antwortest.",
      ],
      fr: [
        "Time-out de 20 minutes : convenez d'une trêve pour faire baisser la tension artérielle dès que le ton monte.",
        "Messages en 'Je' : exprimez votre ressenti plutôt que des reproches accusateurs ('Je me suis senti blessé quand...').",
        "Écoute en miroir : reformulez les propos de l'autre avant de réagir pour désamorcer les malentendus.",
      ],
      es: [
        "Pausa de 20 minutos: acordad detener la discusión 20 minutos cuando los pulsos se aceleren para evitar descalificaciones.",
        "Habla en primera persona: enfoca tus sentimientos sin atacar ('Me sentí ignorado cuando...' en vez de 'Tú nunca...').",
        "Reformulación activa: resume lo que has entendido antes de replicar para asegurar una base común.",
      ],
    },
    dailyAffirmation: {
      en: "I navigate conflict with grace and clear boundaries. Honest communication deepens love and mutual respect.",
      id: "Aku menghadapi konflik dengan bijak dan batasan yang sehat. Komunikasi jujur memperdalam cinta dan rasa saling menghargai.",
      de: "Ich begegne Konflikten mit Gelassenheit und Klarheit. Wahrhaftiger Dialog stärkt Respekt und Nähe.",
      fr: "J'aborde les désaccords avec clarté et bienveillance. La franchise nourrit le respect mutuel.",
      es: "Gestiono los desacuerdos con serenidad y límites sanos. El diálogo sincero refuerza el respeto y la cercanía.",
    },
  },

  secure_autonomy: {
    level: "secure_autonomy",
    badge: {
      en: "CLEAR BOUNDARIES & SOVEREIGN AUTONOMY",
      id: "BATASAN KOKOH & OTONOMI BERDAULAT",
      de: "KLARE GRENZEN & SOUVERÄNE AUTONOMIE",
      fr: "LIMITES CLAIRES & AUTONOMIE SOUVERAINE",
      es: "LÍMITES FIRMES Y AUTONOMÍA SOBERANA",
    },
    title: {
      en: "High Sovereign Autonomy & Relational Safety",
      id: "Otonomi Diri Kuat & Rasa Aman Relasional",
      de: "Souveräne Autonomie & psychologische Sicherheit",
      fr: "Autonomie souveraine & sécurité relationnelle",
      es: "Alta autonomía y seguridad vincular",
    },
    tagline: {
      en: "Your relationship dynamic is grounded in truth, accountability, mutual respect, and unshakeable self-trust.",
      id: "Dinamika hubunganmu berakar pada kejujuran, tanggung jawab, saling menghargai, dan kepercayaan diri yang kokoh.",
      de: "Deine Beziehungen gründen auf Aufrichtigkeit, Verantwortung, Augenhöhe und starkem Selbstvertrauen.",
      fr: "Vos relations s'appuient sur la vérité, la réciprocité, le respect et une saine confiance en vous.",
      es: "Tus vínculos se asientan en la verdad, el respeto mutuo, la responsabilidad y una sólida autoconfianza.",
    },
    description: {
      en: "Outstanding. You demonstrate high psychological sovereignty. Your shared interactions honor reality, admit mistakes without manipulation, and value mutual vulnerability. When disagreements arise, there is no urge to distort facts, stonewall, or destroy each other's self-worth. You trust your own senses and maintain robust, healthy boundaries.",
      id: "Luar biasa. Kamu menunjukkan kedaulatan psikologis yang sangat tinggi. Hubunganmu menghargai kenyataan, mengakui kesalahan tanpa manipulasi, dan menghormati kerentanan. Saat ada perbedaan pendapat, tidak ada upaya memutarbalikkan fakta atau merusak harga diri. Kamu percaya pada dirimu sendiri dan memiliki batasan yang kuat.",
      de: "Hervorragend. Du genießt psychologische Sicherheit. Fehler werden offen zugegeben, Tatsachen nicht verdreht. Meinungsverschiedenheiten werden auf Augenhöhe ausgetragen, ohne die Integrität des anderen zu verletzen.",
      fr: "Remarquable. Vous bénéficiez d'une belle sécurité relationnelle. La réalité est respectée, les torts sont reconnus sans détour et les désaccords se résolvent sans humiliation ni manipulation.",
      es: "Excelente. Gozas de una gran soberanía psicológica. Los errores se admiten con naturalidad, se respeta la realidad compartida y las discrepancias se abordan sin chantajes ni descalificaciones.",
    },
    psychologyInsight: {
      en: "Relational safety fosters optimal ventral vagal tone and neurochemical co-regulation. Without threat detection overload, both partners retain full access to prefrontal executive logic and emotional warmth.",
      id: "Rasa aman dalam hubungan menstimulasi tonus ventral vagal dan regulasi emosi yang seimbang. Tanpa rasa terancam, otak bebas berpikir jernih dan saling mengasihi secara tulus.",
      de: "Psychologische Sicherheit stärkt den ventralen Vagusnerv. Ohne Bedrohungsstress bleiben Empathie, Humor und logisches Denken voll verfügbar.",
      fr: "La sécurité affective favorise un fonctionnement vagal harmonieux. Libéré de la peur, le cerveau reste ouvert à l'empathie et à la tendresse.",
      es: "La seguridad vincular optimiza el tono vagal ventral. Sin alarmas defensivas continuas, florecen la empatía sincera y la intimidad.",
    },
    empowermentProtocols: {
      en: [
        "Continue Modeling Healthy Boundary Setting: Your self-trust is a beacon; inspire peers struggling with toxic relational dynamics.",
        "Deepen Vulnerable Intimacy: Celebrate shared transparency and express gratitude for honest accountability in your relationship.",
        "Reflective Voice Journaling: Use Nuju to record your thoughts and celebrate the peace of emotional sovereignty.",
      ],
      id: [
        "Terus Jadi Teladan Batasan Sehat: Kepercayaan dirimu bisa menginspirasi teman-teman yang sedang terjebak hubungan toksik.",
        "Pererat Kedekatan yang Sehat: Rayakan keterbukaan dan ungkapkan terima kasih atas kedewasaan pasangan atau rekanmu.",
        "Jurnal Suara Reflektif: Gunakan Nuju untuk mendokumentasikan rasa syukur atas kedamaian batin dan kedaulatan dirimu.",
      ],
      de: [
        "Vorbild für gesunde Grenzen bleiben: Deine Klarheit kann anderen helfen, die unter toxischen Bindungen leiden.",
        "Dankbarkeit für Augenhöhe: Würdige die ehrliche Kommunikation in deiner Partnerschaft bewusst.",
        "Reflexion im Journal: Nutze Nuju, um deinen inneren Frieden festzuhalten und zu feiern.",
      ],
      fr: [
        "Restez un repère bienveillant : votre équilibre peut inspirer des proches aux prises avec des relations toxiques.",
        "Cultivez la gratitude partagée : remerciez votre entourage pour cette communication saine et transparente.",
        "Journal de bord serein : ancrez cette paix intérieure dans votre journal Nuju.",
      ],
      es: [
        "Sigue siendo ejemplo de límites claros: tu serenidad puede servir de guía a quienes sufren relaciones tóxicas.",
        "Cultiva la gratitud vincular: agradece y valora la honestidad y madurez con la que os comunicáis.",
        "Registro de bienestar: escribe en Nuju para saborear la tranquilidad de vivir en autenticidad.",
      ],
    },
    dailyAffirmation: {
      en: "I am anchored in truth, protected by love, and secure in my unshakable self-trust.",
      id: "Aku berakar pada kebenaran, terlindungi oleh cinta yang sehat, dan kokoh dalam kepercayaan diriku.",
      de: "Ich bin in der Wahrheit verwurzelt, von Liebe geschützt und ruhe in starkem Selbstvertrauen.",
      fr: "Je suis ancré dans la vérité, protégé par la bienveillance et fort d'une confiance inébranlable.",
      es: "Estoy anclado en la verdad, cuidado por el respeto mutuo y seguro en mi firme autoconfianza.",
    },
  },
};

export function calculateGaslightingScore(answers: Record<number, number>): GaslightingScoreResult {
  let totalScore = 0;
  let realityScore = 0;
  let realityMax = 0;
  let vigilanceScore = 0;
  let vigilanceMax = 0;
  let apologyScore = 0;
  let apologyMax = 0;

  GASLIGHTING_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    totalScore += score;

    if (q.subscale === "reality_distortion") {
      realityScore += score;
      realityMax += 3;
    } else if (q.subscale === "hyper_vigilance") {
      vigilanceScore += score;
      vigilanceMax += 3;
    } else if (q.subscale === "apology_reflex") {
      apologyScore += score;
      apologyMax += 3;
    }
  });

  const maxScore = GASLIGHTING_QUESTIONS.length * 3; // 36
  const percentage = Math.round((totalScore / maxScore) * 100);

  const realityPct = realityMax > 0 ? Math.round((realityScore / realityMax) * 100) : 0;
  const vigilancePct = vigilanceMax > 0 ? Math.round((vigilanceScore / vigilanceMax) * 100) : 0;
  const apologyPct = apologyMax > 0 ? Math.round((apologyScore / apologyMax) * 100) : 0;

  let level: "severe_manipulation" | "covert_control" | "subtle_friction" | "secure_autonomy";

  if (totalScore <= 8 && percentage <= 22) {
    level = "secure_autonomy";
  } else if (totalScore <= 16) {
    level = "subtle_friction";
  } else if (totalScore >= 26 || realityPct >= 75) {
    level = "severe_manipulation";
  } else {
    level = "covert_control";
  }

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    profile: GASLIGHTING_PROFILES[level],
    subscales: {
      reality_distortion: { score: realityScore, max: realityMax, percentage: realityPct },
      hyper_vigilance: { score: vigilanceScore, max: vigilanceMax, percentage: vigilancePct },
      apology_reflex: { score: apologyScore, max: apologyMax, percentage: apologyPct },
    },
  };
}
