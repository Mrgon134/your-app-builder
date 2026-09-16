export type ShadowLang = "en" | "id" | "de" | "fr" | "es";

export type ShadowArchetype = "tyrant" | "martyr" | "ice_wall" | "chaos_rebel";

export interface ShadowQuestion {
  id: number;
  text: Record<ShadowLang, string>;
  options: {
    archetype: ShadowArchetype;
    text: Record<ShadowLang, string>;
    weight: number;
  }[];
}

export interface ShadowProfile {
  id: ShadowArchetype;
  name: Record<ShadowLang, string>;
  archetypeBadge: Record<ShadowLang, string>;
  tagline: Record<ShadowLang, string>;
  description: Record<ShadowLang, string>;
  disownedTrait: Record<ShadowLang, string>;
  goldInTheShadow: Record<ShadowLang, string>;
  projectionTrigger: Record<ShadowLang, string>;
  shadowJournalPrompts: Record<ShadowLang, string[]>;
  integrationRitual: Record<ShadowLang, string>;
}

export const SHADOW_PROFILES: Record<ShadowArchetype, ShadowProfile> = {
  tyrant: {
    id: "tyrant",
    name: {
      en: "The Perfectionist / The Inner Tyrant",
      id: "Sang Perfeksionis / The Inner Tyrant",
      de: "Der Perfektionist / Der innere Tyrann",
      fr: "Le Perfectionniste / Le Tyran Intérieur",
      es: "El Perfeccionista / El Tirano Interior",
    },
    archetypeBadge: {
      en: "The Hyper-Critic Shadow",
      id: "Bayangan Sang Kritikus",
      de: "Der Hyper-Kritiker Schatten",
      fr: "L'Ombre de l'Hyper-Critique",
      es: "La Sombra del Hipercrítico",
    },
    tagline: {
      en: "Behind your impeccable standards lies a terror of being flawed, ordinary, or out of control.",
      id: "Di balik standar kesempurnaan Anda tersimpan ketakutan luar biasa akan cela, kegagalan, atau kehilangan kendali.",
      de: "Hinter deinen makellosen Standards verbirgt sich die tiefe Furcht vor Schwäche und Kontrollverlust.",
      fr: "Derrière vos exigences irréprochables se cache la terreur d'être imparfait, ordinaire ou vulnérable.",
      es: "Detrás de tus estándares implacables se oculta el pánico a fallar, ser ordinario o perder el control.",
    },
    description: {
      en: "You project an aura of immaculate competence, order, and high moral standards. In your subconscious shadow lives 'The Tyrant': a hyper-critical voice that judges both yourself and others with severe ruthlessness. When others are sloppy, tardy, or undisciplined, you feel an irrational surge of contempt, because you secretly resent that they give themselves permission to be messy while you strangle your own desires for relaxation.",
      id: "Anda memancarkan aura kompetensi tinggi, keteraturan, dan standar moral yang ketat. Di balik alam bawah sadar Anda hidup 'The Tyrant': suara super-kritis yang menghakimi diri sendiri dan orang lain tanpa ampun. Saat melihat orang lain ceroboh atau santai, Anda merasakan kekesalan terpendam karena iri mereka bisa bersantai sementara Anda menuntut diri sendiri bekerja tanpa henti.",
      de: "Du strahlst tadellose Kompetenz und Disziplin aus. In deinem Schatten haust der innere Tyrann: eine unbarmherzige Stimme, die Fehler verurteilt. Wenn andere unpünktlich oder sorglos sind, empfindest du heimliche Verachtung – unbewusster Neid darauf, dass sie sich erlauben, unvollkommen zu sein.",
      fr: "Vous incarnez la compétence et la maîtrise. Dans votre ombre réside le Tyran intérieur: une voix intransigeante qui méprise l'erreur. Lorsque d'autres manquent de rigueur, votre irritation reflète une jalousie inconsciente envers ceux qui s'autorisent à lâcher prise.",
      es: "Proyectas excelencia y disciplina férrea. En tu sombra habita el Tirano: una voz punitiva que condena el error. Cuando otros se relajan o cometen fallos, tu desprecio enmascara la envidia de no permitirte descansar jamás.",
    },
    disownedTrait: {
      en: "Humanness, messiness, playfulness, and vulnerability without purpose.",
      id: "Ketidaksempurnaan manusiawi, kekacauan, bermain santai, dan kerentanan tanpa target.",
      de: "Menschliche Fehlerhaftigkeit, zweckfreies Spiel und bedingungslose Verletzlichkeit.",
      fr: "L'imperfection, le désordre spontané et la vulnérabilité sans but productif.",
      es: "La imperfección humana, el juego sin objetivos y la vulnerabilidad sin culpa.",
    },
    goldInTheShadow: {
      en: "The Gold in your Shadow is true self-compassion and organic mastery that does not require anxiety-fueled perfection.",
      id: "Harta emas bayangan Anda adalah belas kasih diri sejati dan ketenangan yang tidak lagi bergantung pada tuntutan sempurna.",
      de: "Das Gold in deinem Schatten ist echte Selbstliebe und Gelassenheit, die keine Panik vor Fehlern mehr braucht.",
      fr: "L'or de votre ombre est une compassion sincère envers vous-même et une puissance sereine sans obsession du contrôle.",
      es: "El oro en tu sombra es la autocompasión genuina y una maestría tranquila despojada de exigencias punitivas.",
    },
    projectionTrigger: {
      en: "You feel visceral irritation towards people who are careless, procrastinate, or leave tasks half-finished.",
      id: "Anda merasa sangat jengkel melihat orang yang ceroboh, suka menunda pekerjaan, atau bekerja asal-asalan.",
      de: "Starke Gereiztheit gegenüber Menschen, die faulenzen, unzuverlässig sind oder Unordnung hinterlassen.",
      fr: "Une irritation viscérale envers ceux qui procrastinent, bâclent leur travail ou se complaisent dans le désordre.",
      es: "Irritación profunda ante personas que procrastinan, se desentienden o dejan tareas a medias.",
    },
    shadowJournalPrompts: {
      en: [
        "If I was completely average and made mistakes in public, what is the worst consequence my inner critic screams would happen?",
        "Whom do I judge most harshly in my family or workplace, and what part of myself am I punishing through them?",
        "What pleasure, hobby, or rest have I denied myself this month because it wasn't 'productive' or 'perfect'?",
      ],
      id: [
        "Jika aku berbuat salah atau bersikap biasa saja di depan umum, apa ketakutan terdalam yang dibisikkan oleh kritikus batinku?",
        "Siapakah orang yang paling sering kuhakimi diam-diam, dan bagian diri mana yang sebenarnya sedang kuhukum lewat mereka?",
        "Kesenangan atau istirahat apa yang terus kutolak bulan ini hanya karena dianggap 'tidak produktif'?",
      ],
      de: [
        "Wenn ich in aller Öffentlichkeit scheitern würde: Welches schlimmste Urteil fällt meine innere Stimme dann über mich?",
        "Wen verurteile ich heimlich am schärfsten, und welchen eigenen verdrängten Anteil bekämpfe ich in dieser Person?",
        "Welche Freude oder Erholung habe ich mir zuletzt verwehrt, weil sie nicht 'nützlich' oder 'perfekt' war?",
      ],
      fr: [
        "Si je me montrais faillible en public, quelle condamnation terrifiante mon critique intérieur prononcerait-il ?",
        "Qui est-ce que je juge le plus durement, et quelle part refoulée de moi-même punis-je à travers cette personne ?",
        "Quel plaisir ou temps de repos me suis-je interdit ce mois-ci sous prétexte de ne pas être assez 'productif' ?",
      ],
      es: [
        "Si cometiera un error visible en público, ¿cuál es la peor condena que me grita mi voz crítica interna?",
        "¿A quién juzgo con mayor severidad y qué parte de mi propia humanidad estoy castigando a través de esa persona?",
        "¿Qué descanso o placer me he negado este mes por no considerarlo 'útil' o 'perfecto'?",
      ],
    },
    integrationRitual: {
      en: "Deliberately do one trivial thing imperfectly each day (leave a book crooked, send a casual 1-sentence reply) without apologizing.",
      id: "Sengaja lakukan satu hal sepele secara tidak sempurna setiap hari (biarkan barang sedikit miring, balas chat santai pendek) tanpa meminta maaf.",
      de: "Mache täglich bewusst eine Kleinigkeit unvollkommen (eine unordentliche Schublade, eine kurze E-Mail), ohne dich zu rechtfertigen.",
      fr: "Faites délibérément une chose imparfaite chaque jour (laisser un objet en désordre, un e-mail bref) sans vous excuser.",
      es: "Haz a propósito una acción imperfecta al día (dejar un libro torcido, responder con una frase breve) sin disculparte.",
    },
  },

  martyr: {
    id: "martyr",
    name: {
      en: "The Fawn / The Sacrificial Martyr",
      id: "Sang Penyenang / The Sacrificial Martyr",
      de: "Der Gefällige / Der Märtyrer",
      fr: "Le Complaisant / Le Martyr Sacrificiel",
      es: "El Complaciente / El Mártir Sacrificado",
    },
    archetypeBadge: {
      en: "The Hidden Resentment Shadow",
      id: "Bayangan Dendam Tersembunyi",
      de: "Der verborgene Groll Schatten",
      fr: "L'Ombre du Ressentiment Caché",
      es: "La Sombra del Rencor Reprimido",
    },
    tagline: {
      en: "Behind your sweet compliance and tireless selflessness lies a volcano of suppressed rage and unmet needs.",
      id: "Di balik kebaikan tanpa batas dan kepatuhan Anda tersimpan kemarahan besar dan kebutuhan batin yang terabaikan.",
      de: "Hinter deiner grenzenlosen Hilfsbereitschaft schlummert ein Vulkan aus unterdrückter Wut und unerfüllten Bedürfnissen.",
      fr: "Derrière votre infinie gentillesse et dévouement couve un volcan de colère refoulée et de besoins ignorés.",
      es: "Detrás de tu entrega incondicional y docilidad duerme un volcán de rabia reprimida y necesidades desatendidas.",
    },
    description: {
      en: "You have built an identity on being the 'good one': empathetic, endlessly accommodating, and low-maintenance. In your shadow lies 'The Martyr': deep-seated resentment that nobody anticipates your needs the way you anticipate theirs. You disown your healthy aggression and boundaries, turning unexpressed anger into passive-aggression, emotional exhaustion, or sudden guilt-tripping.",
      id: "Anda membangun identitas sebagai sosok yang 'selalu baik': penurut, rela berkorban, dan tidak merepotkan. Di dalam bayangan bawah sadar Anda hidup 'The Martyr': rasa kecewa mendalam karena tidak ada yang peka memikirkan kebutuhan Anda seperti Anda memikirkan mereka. Anda memendam kemarahan sehat, yang akhirnya berubah menjadi kelelahan emosional atau rasa kesal terselubung.",
      de: "Du definierst dich über Aufopferung und Sanftmut. In deinem Schatten sammelt sich der Groll des Märtyrers: die Bitterkeit darüber, dass niemand deine Wünsche erahnt, so wie du es für andere tust. Du verleugnest gesunde Aggression und Grenzen, was sich in Erschöpfung oder passiver Feindseligkeit entlädt.",
      fr: "Vous vous identifiez comme la personne dévouée qui ne dérange jamais. Dans votre ombre bouillonne le Martyr: une amertume profonde que nul ne prenne soin de vous comme vous le faites pour eux. Votre agressivité saine étant refoulée, elle se transforme en fatigue chronique.",
      es: "Te defines por ser servicial, paciente e incondicional. En tu sombra late el Mártir: la amargura de que nadie adivine tus necesidades como tú adivinas las de los demás. Al reprimir tu asertividad, la rabia se convierte en agotamiento crónico.",
    },
    disownedTrait: {
      en: "Healthy anger, self-advocacy, refusal to please, and unapologetic desires.",
      id: "Kemarahan sehat, ketegasan membela diri, menolak menyenangkan orang lain, dan keinginan pribadi tanpa rasa bersalah.",
      de: "Gesunde Wut, Durchsetzungsvermögen, Neinsagen und kompromisslose Selbstfürsorge.",
      fr: "La saine colère, l'auto-affirmation, le refus de plaire et le désir assumé.",
      es: "La rabia constructiva, la firmeza para poner límites, el 'no' directo y los deseos propios.",
    },
    goldInTheShadow: {
      en: "The Gold in your Shadow is sovereign self-worth: giving from true overflow rather than paying for love through self-sacrifice.",
      id: "Harta emas bayangan Anda adalah martabat diri yang berdaulat: memberi dari kelebihan energi, bukan menumbalkan diri demi diterima.",
      de: "Das Gold in deinem Schatten ist souveräner Selbstwert: Geben aus Fülle statt Selbstaufgabe aus Angst vor Verlassenheit.",
      fr: "L'or de votre ombre est une souveraineté authentique: donner par générosité réelle et non par peur du rejet.",
      es: "El oro en tu sombra es la dignidad soberana: entregar desde la plenitud y no sacrificar tu vida para mendigar afecto.",
    },
    projectionTrigger: {
      en: "You feel intense moral indignation towards people who set firm boundaries, take what they want, or prioritize themselves.",
      id: "Anda merasa kesal melihat orang yang berani memasang batasan tegas, mementingkan diri sendiri, atau menolak permintaan dengan lugas.",
      de: "Heftige moralische Empörung über Menschen, die fordernd auftreten oder kompromisslos Grenzen setzen.",
      fr: "Une indignation morale envers les personnes qui osent dire non fermement ou privilégient leur intérêt personnel.",
      es: "Indignación moral ante personas que dicen 'no' sin titubear o defienden sus prioridades con firmeza.",
    },
    shadowJournalPrompts: {
      en: [
        "What am I currently doing for others that secretly fills me with bitterness and exhaustion?",
        "If I was guaranteed nobody would leave me, what boundary would I declare loudly today?",
        "How do I covertly punish people when they don't appreciate my sacrifices?",
      ],
      id: [
        "Bantuan atau pengorbanan apa yang saat ini kulakukan untuk orang lain yang sebenarnya diam-diam membuatku muak dan lelah?",
        "Jika dijamin tidak ada yang akan meninggalkanku, batasan apa yang akan kuucapkan dengan lantang hari ini?",
        "Bagaimana caraku secara diam-diam menghukum orang lain saat mereka tidak menghargai pengorbananku?",
      ],
      de: [
        "Was tue ich aktuell für andere, das mich im Stillen mit Bitterkeit und Erschöpfung erfüllt?",
        "Wenn garantiert wäre, dass mich niemand verlässt: Welches klare 'Nein' würde ich heute aussprechen?",
        "Wie bestrafe ich Mitmenschen unbewusst, wenn meine Aufopferung nicht gewürdigt wird?",
      ],
      fr: [
        "Qu'est-ce que j'accomplis actuellement pour autrui qui me remplit secrètement d'amertume ?",
        "Si j'étais certain(e) de n'être jamais abandonné(e), quelle limite infranchissable poserais-je dès aujourd'hui ?",
        "De quelle façon subtile ou boudeuse punis-je les autres lorsqu'ils ignorent mes sacrifices ?",
      ],
      es: [
        "¿Qué estoy haciendo por los demás que en secreto me carcome de resentimiento y cansancio?",
        "Si supiera con certeza que nadie me rechazará, ¿qué límite firme pondría hoy mismo?",
        "¿De qué manera encubierta o distante castigo a quienes no reconocen mis sacrificios?",
      ],
    },
    integrationRitual: {
      en: "Practice one immediate 'No' this week to an invitation or favor without providing a lengthy excuse or apology.",
      id: "Katakan satu 'Tidak' tegas minggu ini terhadap ajakan atau permintaan tanpa memberikan alasan panjang atau meminta maaf berulang kali.",
      de: "Sage diese Woche einmal ohne Ausrede und ohne Entschuldigung klar 'Nein' zu einer Bitte.",
      fr: "Prononcez un 'Non' franc cette semaine à une sollicitation sans fournir de justification élaborée.",
      es: "Di un 'No' rotundo esta semana a una petición sin inventar excusas ni disculparte.",
    },
  },

  ice_wall: {
    id: "ice_wall",
    name: {
      en: "The Lone Wolf / The Ice Wall",
      id: "Serigala Penyendiri / The Ice Wall",
      de: "Der einsame Wolf / Die Eiswand",
      fr: "Le Loup Solitaire / Le Mur de Glace",
      es: "El Lobo Solitario / El Muro de Hielo",
    },
    archetypeBadge: {
      en: "The Detachment Shadow",
      id: "Bayangan Dingin & Detasemen",
      de: "Der Distanzierungs-Schatten",
      fr: "L'Ombre du Détachement Défensif",
      es: "La Sombra del Aislamiento Defensivo",
    },
    tagline: {
      en: "Behind your hyper-independence and emotional detachment lies a terrified child yearning to be held and understood.",
      id: "Di balik kemandirian ekstrem dan sikap dingin Anda tersimpan kerinduan mendalam untuk didekap dan dipahami seutuhnya.",
      de: "Hinter deiner extremen Unabhängigkeit verbirgt sich die verdrängte Sehnsucht nach Nähe und Geborgenheit.",
      fr: "Derrière votre fière indépendance et détachement émotionnel se dissimule une soif intense de tendresse et de lien.",
      es: "Detrás de tu autosuficiencia radical y frialdad se esconde un anhelo profundo de intimidad y acogida.",
    },
    description: {
      en: "You take pride in needing nobody. You solve problems alone, dismiss emotional messiness, and pull away the moment someone steps into your emotional perimeter. In your shadow lies 'The Starved Child': profound loneliness and a terror that if you rely on anyone, they will betray, suffocate, or abandon you. You disown your soft emotions, pretending you are bulletproof while secretly feeling unseen.",
      id: "Anda bangga tidak pernah merepotkan orang lain. Anda mengatasi semua masalah sendiri dan spontan menarik diri begitu seseorang mencoba mendekat secara intim. Di balik bayangan Anda tersimpan rasa kesepian mendalam dan ketakutan bahwa jika Anda bergantung pada orang lain, Anda akan dikhianati atau ditinggalkan. Anda menekan sisi rapuh Anda.",
      de: "Du bist stolz darauf, niemanden zu brauchen. Sobald Beziehungen emotional fordernd werden, schaltest du auf stur oder ziehst dich zurück. Im Schatten liegt die verdrängte Angst vor Zurückweisung und Kontrollverlust, getarnt als kühle Überlegenheit.",
      fr: "Vous vous enorgueillissez de ne compter que sur vous-même. Dès qu'une relation devient intime, vous prenez la fuite. Dans votre ombre gît la peur viscérale de la trahison et de la dépendance, masquée par une indifférence de façade.",
      es: "Te enorgulleces de no pedir ayuda a nadie. En cuanto una relación exige vulnerabilidad, te distancias. En tu sombra late el miedo al abandono y a la asfixia, disfrazado de superioridad e independencia absoluta.",
    },
    disownedTrait: {
      en: "Neediness, yearning for closeness, crying in front of others, and receiving comfort.",
      id: "Kebutuhan akan kasih sayang, menangis di depan orang lain, meminta bantuan, dan menerima dekapan hangat.",
      de: "Bedürftigkeit, Sehnsucht nach Umarmung, Schwäche zeigen und Hilfe annehmen.",
      fr: "Le besoin d'affection, les larmes partagées, la dépendance saine et l'accueil du réconfort.",
      es: "La necesidad de afecto, el llanto compartido, la dependencia sana y el dejarse cuidar.",
    },
    goldInTheShadow: {
      en: "The Gold in your Shadow is relational courage: the raw power to let yourself be seen and loved without armour.",
      id: "Harta emas bayangan Anda adalah keberanian relasional: kekuatan untuk membiarkan diri dicintai apa adanya tanpa topeng besi.",
      de: "Das Gold in deinem Schatten ist Beziehungs-Mut: Die Freiheit, sich ohne Panzer verletzlich und liebenswert zu zeigen.",
      fr: "L'or de votre ombre est le courage du lien: la force d'être aimé(e) à nu sans armure défensive.",
      es: "El oro en tu sombra es la valentía vincular: el poder de dejarte amar en tu fragilidad sin escudos.",
    },
    projectionTrigger: {
      en: "You feel sudden disgust or irritation when someone cries dramatically, clings to you, or shows emotional desperation.",
      id: "Anda merasa tidak nyaman atau jengkel saat melihat orang menangis histeris, manja berlebihan, atau memohon perhatian.",
      de: "Abneigung und Spott gegenüber Menschen, die emotional anhänglich, weinerlich oder bedürftig wirken.",
      fr: "Un agacement ou dégoût réflexe face aux démonstrations de détresse affective ou de dépendance.",
      es: "Incomodidad o rechazo instantáneo hacia personas que se muestran excesivamente dependientes o vulnerables.",
    },
    shadowJournalPrompts: {
      en: [
        "What is the oldest memory I have of needing comfort and receiving coldness, criticism, or silence instead?",
        "If I allowed myself to depend on someone I care about, what is the catastrophe I dread would occur?",
        "What tender truth about my current sadness or fear am I hiding behind my stoic poker face?",
      ],
      id: [
        "Apa ingatan tertua saat aku membutuhkan pelukan atau penghiburan, namun justru disambut dingin, kritik, atau diabaikan?",
        "Jika aku membiarkan diriku bersandar pada seseorang yang kusayangi, malapetaka apa yang paling kutakuti akan terjadi?",
        "Kebenaran lembut apa tentang kesedihan atau ketakutanku saat ini yang kusembunyikan di balik wajah tegar?",
      ],
      de: [
        "Was ist meine früheste Erinnerung an einen Moment, in dem ich Trost suchte und Kälte oder Kritik erfuhr?",
        "Wenn ich mich wirklich anlehnen würde: Welche Katastrophe befürchtet mein innerer Beschützer?",
        "Welche Traurigkeit verberge ich hinter meiner scheinbar unerschütterlichen Fassade?",
      ],
      fr: [
        "Quel est mon souvenir le plus lointain où j'ai cherché du réconfort pour ne recevoir que silence ou rejet ?",
        "Si je m'autorisais à compter sur quelqu'un, quelle trahison insupportable mon esprit anticipe-t-il ?",
        "Quelle vulnérabilité ou peine secrète dissimulé-je actuellement derrière mon masque d'impassibilité ?",
      ],
      es: [
        "¿Cuál es mi recuerdo más temprano de haber necesitado consuelo y haber recibido frialdad o juicio?",
        "Si me permitiera apoyarme de verdad en alguien, ¿qué desastre teme mi sistema defensivo?",
        "¿Qué tristeza profunda estoy callando detrás de mi máscara de invulnerabilidad?",
      ],
    },
    integrationRitual: {
      en: "Initiate one honest vulnerable share this week: tell a friend or partner, 'I felt overwhelmed today and just needed to hear your voice.'",
      id: "Katakan satu kejujuran rapuh minggu ini kepada teman atau pasangan: 'Hari ini mentalku cukup lelah dan aku cuma butuh mendengar suaramu.'",
      de: "Teile diese Woche einen echten Schwächemoment: 'Ich hatte heute einen schweren Tag und brauchte einfach kurz deine Nähe.'",
      fr: "Exprimez une vérité vulnérable cette semaine: 'J'ai eu une journée rude, j'avais juste besoin de t'entendre.'",
      es: "Comparte una verdad vulnerable esta semana: 'Hoy me he sentido sobrepasado(a) y solo necesitaba escuchar tu voz.'",
    },
  },

  chaos_rebel: {
    id: "chaos_rebel",
    name: {
      en: "The Rebel / The Chaotic Agitator",
      id: "Sang Pemberontak / The Chaotic Agitator",
      de: "Der Rebell / Der Provokateur",
      fr: "Le Rebelle / L'Agitateur Chaotique",
      es: "El Rebelde / El Provocador Caótico",
    },
    archetypeBadge: {
      en: "The Defiance Shadow",
      id: "Bayangan Pembangkang",
      de: "Der Trotz-Schatten",
      fr: "L'Ombre de la Provocation",
      es: "La Sombra del Desafío Rebelde",
    },
    tagline: {
      en: "Behind your chronic skepticism and resistance to authority lies an unspoken terror of being trapped, molded, or made invisible.",
      id: "Di balik sikap kritis dan perlawanan Anda terhadap aturan tersimpan ketakutan luar biasa akan dikendalikan atau diinjak.",
      de: "Hinter deinem ständigen Widerstand gegen Regeln verbirgt sich die Urangst vor Ohnmacht und Bevormundung.",
      fr: "Derrière votre méfiance permanente envers les règles se cache la peur panique d'être contrôlé(e) ou effacé(e).",
      es: "Detrás de tu desconfianza hacia la autoridad duerme el pánico a ser manipulado, enjaulado o anulado.",
    },
    description: {
      en: "You instinctively mistrust hierarchy, corporate dogma, and institutional rules. You champion freedom, disrupt stale routines, and challenge authority figures. In your shadow lies 'The Terrified Rebel': a soul that experienced early environments as suffocating or untrustworthy. By constantly provoking, self-sabotaging consistency, or staying an outsider, you protect yourself from the vulnerability of belonging and genuine devotion.",
      id: "Secara naluriah Anda meragukan hierarki, aturan kaku, atau figur otoritas. Anda membanggakan kebebasan berpikir dan gemar membongkar kepalsuan. Di balik bayangan bawah sadar Anda tersimpan ketakutan masa lalu di mana lingkungan terasa mengekang atau mengkhianati kepercayaan Anda. Dengan selalu menjadi pemberontak, Anda melindungi diri dari rasa takut berkomitmen atau terikat.",
      de: "Du hinterfragst reflexartig jede Autorität und verabscheust Anpassung. Im Schatten haust die Angst vor Bindung und Verbindlichkeit: Aus Sorge, dominiert oder eingeengt zu werden, sabotierst du gesunde Strukturen und bleibst lieber der unberechenbare Außenseiter.",
      fr: "Vous rejetez d'instinct les conventions et hiérarchies. Dans votre ombre sommeille la hantise de l'emprisonnement: par peur d'être manipulé(e) ou rejeté(e), vous sabotez la constance et préférez vous exclure avant que l'on ne vous exclue.",
      es: "Desconfías por instinto de las jerarquías y lo convencional. En tu sombra habita el miedo al encierro: por temor a perder tu libertad o ser moldeado, saboteas la estabilidad y prefieres permanecer al margen.",
    },
    disownedTrait: {
      en: "Surrender, trusting leadership, accepting gentle boundaries, and the peace of routine.",
      id: "Kepasrahan, mempercayai bimbingan yang tulus, menerima batasan yang aman, dan kedamaian dalam rutinitas.",
      de: "Hingabe, Vertrauen in wohlwollende Führung, Akzeptanz von Halt und ruhige Routine.",
      fr: "L'abandon confiant, l'acceptation d'un cadre bienveillant et la sérénité des habitudes.",
      es: "La entrega serena, la confianza en el apoyo ajeno y el sosiego de la rutina constructiva.",
    },
    goldInTheShadow: {
      en: "The Gold in your Shadow is true creative transformation: using your fierce autonomy to build enduring sanctuaries rather than just burning down fences.",
      id: "Harta emas bayangan Anda adalah transformasi kreatif sejati: menggunakan keberanian Anda untuk membangun karya abadi, bukan sekadar merusak pagar.",
      de: "Das Gold in deinem Schatten ist schöpferische Kraft: Deine unbändige Energie für den Aufbau von Sinn zu nutzen statt nur Mauern einzureißen.",
      fr: "L'or de votre ombre est la puissance bâtisseuse: transformer votre esprit contestataire en force de création pérenne.",
      es: "El oro en tu sombra es la rebeldía sabia: usar tu fuerza para edificar proyectos duraderos en lugar de quemar puentes.",
    },
    projectionTrigger: {
      en: "You feel immediate mockery or anger towards people who follow rules dutifully, respect hierarchy, or speak conservatively.",
      id: "Anda merasa sinis atau muak melihat orang yang patuh buta pada aturan, penjilat atasan, atau hidup terlalu konvensional.",
      de: "Zynismus und Verachtung gegenüber Menschen, die brav Befehlen folgen oder sich dem Mainstream anpassen.",
      fr: "Un mépris ou cynisme immédiat envers les personnes conformistes, dociles ou respectueuses des hiérarchies.",
      es: "Desdén o cinismo ante personas conformistas que acatan directrices sin cuestionar la autoridad.",
    },
    shadowJournalPrompts: {
      en: [
        "Where in my life am I resisting consistency or healthy commitments just to prove that 'nobody owns me'?",
        "What childhood figure made me feel so powerless that I vowed never to surrender my control again?",
        "What beautiful goal could I accomplish if I stopped fighting imaginary adversaries and disciplined my genius?",
      ],
      id: [
        "Di bagian hidup mana aku sedang menolak komitmen sehat hanya demi membuktikan bahwa 'tidak ada yang bisa mengatorku'?",
        "Siapa sosok masa kecil yang dulu membuatku merasa begitu tak berdaya hingga aku bersumpah tidak akan pernah mau diatur lagi?",
        "Karya indah apa yang bisa kuwujudkan jika aku berhenti melawan musuh khayalan dan mulai mendisiplinkan potensiku?",
      ],
      de: [
        "In welchen Lebensbereichen sabotiere ich Beständigkeit, nur um zu beweisen, dass mich niemand kontrolliert?",
        "Welche frühere Ohnmachtserfahrung veranlasste mich zum Schwur, mich nie wieder jemandem zu beugen?",
        "Welches große Ziel könnte ich verwirklichen, wenn ich aufhöre gegen Windmühlen zu kämpfen?",
      ],
      fr: [
        "Dans quel domaine de ma vie sabote-je la régularité simplement pour prouver que 'nul ne me possède' ?",
        "Quelle blessure d'impuissance ancienne m'a conduit(e) à refuser toute forme de soumission ?",
        "Quel projet grandiose pourrais-je concrétiser si je canalisais mon énergie rebelle au lieu de défier les cadres ?",
      ],
      es: [
        "¿En qué área de mi vida saboteo la disciplina solo para demostrar que 'nadie manda sobre mí'?",
        "¿Qué experiencia infantil de impotencia me hizo jurar que jamás volvería a ceder el control?",
        "¿Qué meta extraordinaria lograría si canalizara mi rebeldía en construir en lugar de confrontar?",
      ],
    },
    integrationRitual: {
      en: "Pick one tiny daily routine (e.g. making your bed or a 5-minute morning meditation) and stick to it for 7 days without rebellion.",
      id: "Pilih satu rutinitas kecil (merapikan kasur atau 5 menit journaling pagi) dan jalani selama 7 hari berturut-turut tanpa mangkir.",
      de: "Pflege eine Woche lang diszipliniert eine kleine Gewohnheit (z.B. morgens 5 Minuten stiller Tee), ohne dagegen aufzubegehren.",
      fr: "Adoptez une micro-routine (faire son lit ou 5 minutes de respiration matinale) pendant 7 jours sans déroger.",
      es: "Mantén una pequeña rutina durante 7 días consecutivos (hacer la cama o respirar 5 minutos al despertar) sin boicotearte.",
    },
  },
};

export const SHADOW_QUESTIONS: ShadowQuestion[] = [
  {
    id: 1,
    text: {
      en: "When a colleague or friend publicly points out a flaw or factual error in your work, your immediate gut reaction is:",
      id: "Saat rekan kerja atau teman menunjukkan kesalahan Anda di depan umum, reaksi batin spontan Anda adalah:",
      de: "Wenn ein Kollege oder Freund öffentlich einen Fehler in deiner Arbeit aufdeckt, reagierst du innerlich mit:",
      fr: "Lorsqu'un collègue souligne publiquement une erreur dans votre travail, votre réaction viscérale est :",
      es: "Cuando un colega señala públicamente un fallo en tu trabajo, tu primera reacción interna es:",
    },
    options: [
      {
        archetype: "tyrant",
        weight: 3,
        text: {
          en: "Intense humiliation masked by sharp defensiveness; I immediately obsess over proving them wrong.",
          id: "Rasa malu yang sangat tajam; batin saya langsung terobsesi mencari bukti untuk membalikkan argumen mereka.",
          de: "Tiefe Beschämung und schneidende Verteidigung; ich will sofort beweisen, dass ich doch recht habe.",
          fr: "Une vive humiliation masquée par une riposte technique pour prouver que j'avais raison.",
          es: "Humillación aguda y contraataque defensivo para demostrar que estaban equivocados.",
        },
      },
      {
        archetype: "martyr",
        weight: 3,
        text: {
          en: "Profuse apologies and self-deprecation, smiling while silently dying of anxiety on the inside.",
          id: "Meminta maaf berulang kali sambil tersenyum canggung, meski di dalam hati cemas setengah mati.",
          de: "Überschwängliche Entschuldigungen mit verlegenem Lächeln, während ich innerlich panisch vergehe.",
          fr: "Des excuses répétées en souriant poliment, tout en tremblant d'angoisse intérieurement.",
          es: "Disculpas inmediatas y sumisas, sonriendo por fuera mientras me carcome la culpa por dentro.",
        },
      },
      {
        archetype: "ice_wall",
        weight: 3,
        text: {
          en: "Cold, icy silence; I shrug dismissively and emotionally shut them out as irrelevant.",
          id: "Diam dingin; saya mengangkat bahu acuh tak acuh dan menganggap mereka tidak pantas didengar.",
          de: "Kühle, distanzierte Ignoranz; ich zucke mit den Achseln und stufe die Person als irrelevant ab.",
          fr: "Un silence glacial; je hausse les épaules avec mépris et coupe tout contact émotionnel.",
          es: "Silencio gélido; me encojo de hombros con desdén y catalogo a esa persona como insignificante.",
        },
      },
      {
        archetype: "chaos_rebel",
        weight: 3,
        text: {
          en: "Sarcastic contempt; I question the entire validity of their stupid rules or petty metric.",
          id: "Sarkasme; saya mempertanyakan relevansi aturan konyol mereka yang sok pintar.",
          de: "Sarkastische Provokation; ich stelle die Sinnhaftigkeit ihrer kleinlichen Maßstäbe in Frage.",
          fr: "Sarcasme direct; je remets en cause la légitimité de leurs règles stupides.",
          es: "Sarcasmo mordaz; cuestiono la validez de sus ridículas normas o métricas.",
        },
      },
    ],
  },
  {
    id: 2,
    text: {
      en: "What trait in other people provokes your quickest, most visceral silent contempt?",
      id: "Sifat orang lain apa yang paling cepat memicu rasa muak atau jijik terselubung di batin Anda?",
      de: "Welche Eigenschaft an anderen löst bei dir die unmittelbarste heimliche Verachtung aus?",
      fr: "Quel trait chez autrui déclenche votre mépris silencieux le plus immédiat ?",
      es: "¿Qué rasgo ajeno despierta tu desprecio o rechazo más visceral e instantáneo?",
    },
    options: [
      {
        archetype: "tyrant",
        weight: 3,
        text: {
          en: "Carelessness, laziness, disorganization, and making clumsy preventable mistakes.",
          id: "Kecerobohan, kemalasan, tidak disiplin, dan membuat kesalahan bodoh berulang.",
          de: "Schlampigkeit, Faulheit, Unpünktlichkeit und vermeidbare dumme Fehler.",
          fr: "Le laxisme, la paresse, la désorganisation et les fautes d'inattention grossières.",
          es: "La dejadez, la holgazanería, la incompetencia y los errores evitables.",
        },
      },
      {
        archetype: "martyr",
        weight: 3,
        text: {
          en: "Entitlement, selfishness, demanding demands, and never saying thank you.",
          id: "Egois, selalu menuntut dilayani, mementingkan diri sendiri, dan tidak tahu berterima kasih.",
          de: "Egoismus, Unverschämtheit, Selbstbezogenheit und mangelnde Dankbarkeit.",
          fr: "L'égoïsme assumé, l'ingratitude et ceux qui exigent sans jamais remercier.",
          es: "El egoísmo descarado, la exigencia constante y la falta de gratitud.",
        },
      },
      {
        archetype: "ice_wall",
        weight: 3,
        text: {
          en: "Clinginess, dramatic crying, oversharing intimate details, and needy helplessness.",
          id: "Manja berlebihan, drama emosional, merengek minta perhatian, dan mengeluh tanpa solusi.",
          de: "Dramatisches Weinen, emotionale Anhänglichkeit und wehleidige Hilflosigkeit.",
          fr: "Les effusions dramatiques, la dépendance plaintive et l'étalage d'états d'âme.",
          es: "El dramatismo sensiblero, el apego pegajoso y la victimización constante.",
        },
      },
      {
        archetype: "chaos_rebel",
        weight: 3,
        text: {
          en: "Blind conformity, brown-nosing bosses, preaching corporate dogma, and playing it safe.",
          id: "Penjilat atasan, kepatuhan buta pada aturan kantor, dan kepalsuan pencitraan.",
          de: "Biedere Anpassung, Unterwürfigkeit gegenüber Vorgesetzten und spießiges Phrasengedresche.",
          fr: "La docilité aveugle, le fayotage institutionnel et le conformisme peureux.",
          es: "El servilismo con los jefes, la sumisión ciega a las reglas y la mediocridad cobarde.",
        },
      },
    ],
  },
  {
    id: 3,
    text: {
      en: "When you feel completely exhausted and unappreciated by those around you, you tend to:",
      id: "Saat Anda merasa sangat lelah dan pengorbanan Anda tidak dihargai orang sekitar, Anda cenderung:",
      de: "Wenn du dich völlig erschöpft und von deinem Umfeld verkannt fühlst, neigst du dazu:",
      fr: "Quand vous êtes épuisé(e) et que vos efforts ne sont pas reconnus, vous avez tendance à :",
      es: "Cuando te sientes exhausto(a) y poco valorado(a) por tu entorno, sueles:",
    },
    options: [
      {
        archetype: "tyrant",
        weight: 3,
        text: {
          en: "Double down on control, snapping aggressively at everyone's minor infractions.",
          id: "Makin kaku mengontrol segalanya dan mudah marah membentak kesalahan sepele orang lain.",
          de: "Noch härter zu arbeiten und gereizt jeden kleinen Fehler anderer anzubellen.",
          fr: "Durcir votre contrôle et aboyer contre la moindre négligence autour de vous.",
          es: "Redoblar la exigencia y estallar con furia ante cualquier pequeño descuido ajeno.",
        },
      },
      {
        archetype: "martyr",
        weight: 3,
        text: {
          en: "Sigh loudly, give the silent treatment, and silently seethe: 'After everything I sacrificed...'",
          id: "Menghela napas panjang, mendiamkan mereka, dan membatin dendam: 'Kurang apa lagi aku berkorban...'",
          de: "Tief seufzen, mich schmollend zurückziehen und innerlich grollen: 'Nach allem, was ich getan habe...'",
          fr: "Soupirer lourdement, bouder en silence et ruminer: 'Après tout ce que j'ai fait pour eux...'",
          es: "Suspirar con pesadez, aplicar la ley del hielo y lamentarte: 'Con todo lo que me he sacrificado...'",
        },
      },
      {
        archetype: "ice_wall",
        weight: 3,
        text: {
          en: "Disappear completely into your cave, ignoring messages and deciding humans are exhausting.",
          id: "Menghilang total, mematikan notifikasi chat, dan meyakini bahwa bergaul dengan manusia hanya buang energi.",
          de: "Völlig abtauchen, das Telefon stummschalten und feststellen: Menschen sind anstrengend.",
          fr: "Disparaître dans votre bulle, ignorer les textos et décréter que les gens sont une perte d'énergie.",
          es: "Desaparecer por completo, apagar el móvil y convencerte de que nadie merece tu compañía.",
        },
      },
      {
        archetype: "chaos_rebel",
        weight: 3,
        text: {
          en: "Blow things up, abandon commitments abruptly, or do something shockingly unpredictable.",
          id: "Meninggalkan komitmen mendadak, mengacaukan rencana bersama, atau bertindak ugal-ugalan.",
          de: "Verpflichtungen spontan hinwerfen, provozieren oder etwas radikal Unvernünftiges tun.",
          fr: "Tout plaquer brutalement, saboter les plans convenus ou créer un scandale imprévu.",
          es: "Mandar todo al diablo, abandonar compromisos de golpe o hacer algo impulsivo y disruptivo.",
        },
      },
    ],
  },
  {
    id: 4,
    text: {
      en: "What do you guard most fiercely and hide from partners or close friends?",
      id: "Hal apa yang paling Anda jaga rapat-rapat dan sembunyikan dari pasangan atau sahabat?",
      de: "Was schützt und verbirgst du am hartnäckigsten vor deinen engsten Bezugspersonen?",
      fr: "Que protégez-vous et dissimulez-vous le plus férocement devant vos proches ?",
      es: "¿Qué proteges y ocultas con mayor hermetismo ante tu pareja o amigos íntimos?",
    },
    options: [
      {
        archetype: "tyrant",
        weight: 3,
        text: {
          en: "My moments of confusion, physical frailty, or when I don't know what to do.",
          id: "Momen saat saya bingung, rapuh secara fisik, atau tidak tahu harus berbuat apa.",
          de: "Momente von Orientierungslosigkeit, körperlicher Schwäche oder Ratlosigkeit.",
          fr: "Mes doutes profonds, mes faiblesses physiques et les fois où je ne maîtrise rien.",
          es: "Mis momentos de confusión, vulnerabilidad física o no saber qué hacer.",
        },
      },
      {
        archetype: "martyr",
        weight: 3,
        text: {
          en: "My dark, angry thoughts and how deeply resentful I sometimes feel towards them.",
          id: "Pikiran gelap saya yang penuh amarah dan betapa kesalnya saya terkadang pada mereka.",
          de: "Meine finsteren Wutgedanken und wie viel heimlichen Groll ich manchmal hege.",
          fr: "Mes pensées de colère noire et l'amertume que j'éprouve parfois envers eux.",
          es: "Mis pensamientos de rabia y el resentimiento oscuro que a veces les guardo.",
        },
      },
      {
        archetype: "ice_wall",
        weight: 3,
        text: {
          en: "My aching longing for unconditional tenderness, affection, and gentle reassurance.",
          id: "Kerinduan hati saya yang paling dalam akan kelembutan, pelukan, dan rasa aman.",
          de: "Meine tiefe, verletzliche Sehnsucht nach bedingungsloser Zärtlichkeit und Halt.",
          fr: "Mon besoin éperdu de douceur, de câlins et d'être rassuré(e) comme un enfant.",
          es: "Mi anhelo secreto de ternura incondicional, consuelo y ser sostenido(a).",
        },
      },
      {
        archetype: "chaos_rebel",
        weight: 3,
        text: {
          en: "My secret craving for steady routine, traditional stability, and belonging to a tribe.",
          id: "Keinginan rahasia saya akan rutinitas stabil, ketenangan hidup wajar, dan diterima dalam kelompok.",
          de: "Mein geheimer Wunsch nach Geborgenheit, berechenbarer Routine und Zugehörigkeit.",
          fr: "Mon envie secrète de stabilité rassurante, de routine douce et d'appartenance à un groupe.",
          es: "Mi anhelo oculto de calma, rutina apacible y la seguridad de pertenecer a una comunidad.",
        },
      },
    ],
  },
  {
    id: 5,
    text: {
      en: "If you were completely honest, what gives you a secret sense of personal superiority?",
      id: "Jika jujur pada diri sendiri, apa yang diam-diam memberi Anda rasa superioritas di atas orang lain?",
      de: "Wenn du ehrlich bist: Was verleiht dir heimlich ein Gefühl von Überlegenheit?",
      fr: "En toute honnêteté, qu'est-ce qui vous procure un sentiment secret de supériorité ?",
      es: "Siendo sincero(a), ¿qué te produce una secreta sensación de superioridad moral o personal?",
    },
    options: [
      {
        archetype: "tyrant",
        weight: 3,
        text: {
          en: "My unbending work ethic, attention to detail, and ability to out-discipline anyone.",
          id: "Etos kerja baja saya, ketelitian, dan kemampuan mendisiplinkan diri jauh melampaui siapa pun.",
          de: "Meine eiserne Disziplin, Detailgenauigkeit und Leistungsfähigkeit.",
          fr: "Mon éthique de travail irréprochable et ma discipline que nul n'égale.",
          es: "Mi disciplina implacable, rigor técnico y capacidad de sobreexigirme más que nadie.",
        },
      },
      {
        archetype: "martyr",
        weight: 3,
        text: {
          en: "My moral purity, capacity to endure suffering, and how much more selfless I am than others.",
          id: "Kemuliaan moral saya, ketahanan menanggung derita, dan betapa saya jauh lebih rela berkorban.",
          de: "Meine moralische Integrität, Leidensfähigkeit und selbstlose Aufopferung.",
          fr: "Ma grandeur d'âme, mon endurance à la peine et mon altruisme bien plus noble.",
          es: "Mi generosidad incansable, mi capacidad de aguantar dolor y ser más noble que el resto.",
        },
      },
      {
        archetype: "ice_wall",
        weight: 3,
        text: {
          en: "My emotional detachment; while others cry and panic, I am cold, objective, and unflappable.",
          id: "Ketidakterikatan emosi saya; saat orang lain menangis panik, saya tetap dingin dan tak tersentuh.",
          de: "Meine emotionale Unantastbarkeit; während andere weinen, bleibe ich kühl und unabhängig.",
          fr: "Mon impassibilité; pendant que les autres s'affolent, je demeure calme et invulnérable.",
          es: "Mi frialdad imperturbable; mientras otros colapsan en dramas, yo me mantengo intocable.",
        },
      },
      {
        archetype: "chaos_rebel",
        weight: 3,
        text: {
          en: "My refusal to be brainwashed by society, corporate propaganda, or bourgeois illusions.",
          id: "Penolakan saya untuk dicuci otak oleh dogma masyarakat, tren dangkal, atau kepalsuan norma.",
          de: "Dass ich mich von der Masse, Konsumzwang und Obrigkeiten nicht einlullen lasse.",
          fr: "Mon refus d'être manipulé(e) par le système, les conventions bourgeoises et les moutons.",
          es: "El no dejarme adoctrinar por el rebaño, las normas burguesas ni las apariencias sociales.",
        },
      },
    ],
  },
  {
    id: 6,
    text: {
      en: "How do you subconsciously react when someone showers you with genuine, unconditional praise?",
      id: "Bagaimana reaksi alam bawah sadar Anda saat seseorang memberikan pujian tulus tanpa pamrih?",
      de: "Wie reagierst du innerlich, wenn dir jemand aufrichtiges, überschwängliches Lob schenkt?",
      fr: "Comment réagissez-vous inconsciemment quand quelqu'un vous félicite chaleureusement ?",
      es: "¿Cómo reaccionas por dentro cuando alguien te colma de elogios sinceros e incondicionales?",
    },
    options: [
      {
        archetype: "tyrant",
        weight: 3,
        text: {
          en: "I dissect it immediately: 'They only saw the good part; if they knew my real flaws, they wouldn't say that.'",
          id: "Langsung mencurigainya: 'Mereka cuma melihat permukaannya; andai tahu cacat asliku, mereka takkan memujiku.'",
          de: "Ich zerlege es misstrauisch: 'Wenn die wüssten, welche Mängel ich habe, würden sie das nicht sagen.'",
          fr: "Je le minimise aussitôt: 'S'ils connaissaient mes vraies failles, ils déchanteraient vite.'",
          es: "Lo saboteo mentalmente: 'Solo vieron la fachada; si conocieran mis fallos no dirían eso.'",
        },
      },
      {
        archetype: "martyr",
        weight: 3,
        text: {
          en: "Deflect it immediately to other people: 'Oh no, it was all team effort, I barely did anything!'",
          id: "Mengalihkannya ke orang lain: 'Ah tidak kok, ini kerja keras tim, aku cuma bantu sedikit saja!'",
          de: "Sofort auf andere abwälzen: 'Ach was, das war das ganze Team, ich habe kaum etwas beigetragen!'",
          fr: "Renvoyer le mérite sur les autres: 'Oh ce n'est rien, c'est grâce à l'équipe entière !'",
          es: "Desviar el mérito: '¡Qué va, fue mérito de todos, yo no hice casi nada!'",
        },
      },
      {
        archetype: "ice_wall",
        weight: 3,
        text: {
          en: "Feel intensely awkward and suspicious: 'What are they trying to get out of me by buttering me up?'",
          id: "Merasa sangat canggung dan waspada: 'Mau ada maunya apa nih orang sampai memuji-muji begini?'",
          de: "Unbehaglich und misstrauisch werden: 'Was will diese Person von mir erschleichen?'",
          fr: "Gêne et méfiance immédiates: 'Qu'est-ce qu'on cherche à obtenir de moi en me flattant ?'",
          es: "Incomodidad y sospecha: '¿Qué interés oculto tiene para adularme de esa manera?'",
        },
      },
      {
        archetype: "chaos_rebel",
        weight: 3,
        text: {
          en: "Feel uncomfortable with the pedestal; tempted to say something provocative just to ruin the saintly image.",
          id: "Tidak nyaman dianggap sosok panutan; timbul godaan untuk sengaja berbuat onar agar citra suci itu runtuh.",
          de: "Unbehagen über das Podest; Lust, etwas Unpassendes zu sagen, um das Heiligengewand zu zerreißen.",
          fr: "Mal à l'aise sur un piédestal; envie de lâcher une provocation pour casser cette image lisse.",
          es: "Inquietud al ser idealizado(a); tentación de provocar o soltar una impertinencia para romper el molde.",
        },
      },
    ],
  },
  {
    id: 7,
    text: {
      en: "When a major crisis or sudden disaster strikes your group, your default survival instinct is:",
      id: "Saat krisis besar atau kekacauan mendadak melanda kelompok Anda, naluri bertahan hidup Anda adalah:",
      de: "Wenn eine plötzliche Krise deine Familie oder dein Team erschüttert, reagierst du instinktiv mit:",
      fr: "Lorsqu'une crise majeure frappe votre groupe ou entourage, votre premier réflexe est de :",
      es: "Cuando estalla una crisis grave en tu grupo o familia, tu instinto automático es:",
    },
    options: [
      {
        archetype: "tyrant",
        weight: 3,
        text: {
          en: "Seize the steering wheel, issue barking commands, and micro-manage every moving piece.",
          id: "Mengambil alih komando, membagi tugas dengan tegas, dan mengontrol setiap detail pergerakan.",
          de: "Das Steuer an mich reißen, Befehle erteilen und jede Einzelheit akribisch kontrollieren.",
          fr: "Prendre le contrôle absolu, distribuer les ordres et tout régenter avec autorité.",
          es: "Tomar el timón con mano dura, dar instrucciones y fiscalizar cada movimiento.",
        },
      },
      {
        archetype: "martyr",
        weight: 3,
        text: {
          en: "Absorb all panic, offer to take the blame, and work yourself to exhaustion to protect everyone.",
          id: "Menyerap semua kepanikan, siap menanggung beban kesalahan, dan berkorban habis-habisan melindungi mereka.",
          de: "Alle Panik aufsaugen, die Last auf meine Schultern laden und bis zum Zusammenbruch schuften.",
          fr: "Éponger l'angoisse collective, porter le blâme et s'épuiser jusqu'au bout pour les sauver.",
          es: "Absorber la angustia colectiva, asumir la culpa y matarte a trabajar para que nadie sufra.",
        },
      },
      {
        archetype: "ice_wall",
        weight: 3,
        text: {
          en: "Detach emotionally, secure your own perimeter first, and observe the hysterics with cool logic.",
          id: "Menjaga jarak emosional, memastikan posisi diri sendiri aman dulu, dan mengamati drama dari jauh.",
          de: "Mich emotional entkoppeln, meine eigene Deckung sichern und das Chaos nüchtern analysieren.",
          fr: "Vous détacher affectivement, sécuriser votre périmètre et observer l'agitation froidement.",
          es: "Desconectar tus emociones, blindar tu espacio personal y evaluar el caos con frialdad lógica.",
        },
      },
      {
        archetype: "chaos_rebel",
        weight: 3,
        text: {
          en: "Feel an electric rush of adrenaline; you thrive in the wreckage and want to dismantle the old system.",
          id: "Merasakan lonjakan adrenalin; Anda justru bersemangat di tengah puing kekacauan untuk merombak sistem lama.",
          de: "Einen Rausch von Adrenalin spüren; im Zusammenbruch alter Strukturen fühlst du dich lebendig.",
          fr: "Ressentir une décharge d'adrénaline stimulante; le chaos vous galvanise pour briser le statu quo.",
          es: "Sentir un subidón de adrenalina; te creces en el desorden y disfrutas dinamitando lo caduco.",
        },
      },
    ],
  },
  {
    id: 8,
    text: {
      en: "What subconscious core fear governs your deepest life decisions?",
      id: "Ketakutan alam bawah sadar terdalam apa yang paling mengatur keputusan-keputusan hidup Anda?",
      de: "Welche unbewusste Urangst lenkt insgeheim deine wichtigsten Lebensentscheidungen?",
      fr: "Quelle peur archaïque gouverne en sous-main vos choix de vie les plus cruciaux ?",
      es: "¿Qué terror inconsciente rige en el fondo tus decisiones vitales más cruciales?",
    },
    options: [
      {
        archetype: "tyrant",
        weight: 3,
        text: {
          en: "Being exposed as incompetent, fraudulent, undisciplined, or worthless.",
          id: "Terbongkar sebagai sosok yang tidak kompeten, lalai, gagal, atau tak berharga.",
          de: "Als inkompetent, wertlos, disziplinlos oder Hochstapler enttarnt zu werden.",
          fr: "Être démasqué(e) comme incompétent(e), faillible, sans valeur ou médiocre.",
          es: "Ser descubierto(a) como un fraude, incompetente, indisciplinado(a) o inútil.",
        },
      },
      {
        archetype: "martyr",
        weight: 3,
        text: {
          en: "Being cast out, disliked, called selfish, or abandoned because I had boundaries.",
          id: "Dibuang, dibenci, dicap egois, atau ditinggalkan hanya karena berani menolak.",
          de: "Verstoßen, als egoistisch verurteilt oder verlassen zu werden, weil ich 'Nein' sage.",
          fr: "Être exclu(e), qualifié(e) d'égoïste et abandonné(e) pour avoir osé poser une limite.",
          es: "Ser rechazado(a), tachado(a) de egoísta y abandonado(a) por haber dicho 'no'.",
        },
      },
      {
        archetype: "ice_wall",
        weight: 3,
        text: {
          en: "Being suffocated, controlled, made helpless, or having someone break my heart completely.",
          id: "Dikekang, dikendalikan, dibuat tak berdaya, atau dibuat hancur berkeping-keping oleh cinta.",
          de: "Vereinnahmt, erdrückt, hilflos gemacht oder im Innersten vernichtend verletzt zu werden.",
          fr: "Être étouffé(e), dominé(e), rendu(e) impuissant(e) ou brisé(e) net par une trahison intime.",
          es: "Ser asfixiado(a), manipulado(a), sometido(a) o que destrocen mi corazón sin piedad.",
        },
      },
      {
        archetype: "chaos_rebel",
        weight: 3,
        text: {
          en: "Becoming a soulless corporate drone living a safe, boring, obedient, conformist life.",
          id: "Menjadi robot masyarakat yang membosankan, penurut, dan kehilangan kebebasan jiwa.",
          de: "Als seelenlose Schablone in einem langweiligen, konformen Rädchen-Dasein zu enden.",
          fr: "Finir comme un pion conformiste et docile dans un quotidien terne et sans éclat.",
          es: "Convertirme en un engranaje obediente y domesticado atrapado en una vida gris y sumisa.",
        },
      },
    ],
  },
  {
    id: 9,
    text: {
      en: "When you look at your own flaws or moral hypocrisies in the mirror, your defensive maneuver is:",
      id: "Saat Anda menyadari cela atau kemunafikan moral Anda sendiri, trik pertahanan batin Anda adalah:",
      de: "Wenn du mit deinen eigenen Widersprüchen und Schwächen konfrontiert wirst, flüchtest du in:",
      fr: "Face à vos propres hypocrisies ou contradictions morales, votre mécanisme d'esquive est :",
      es: "Al mirar tus propias incongruencias morales o debilidades en el espejo, tu escape es:",
    },
    options: [
      {
        archetype: "tyrant",
        weight: 3,
        text: {
          en: "Ruthless self-punishment: working harder, restricting comfort, and demanding extreme penance.",
          id: "Menghukum diri sendiri: bekerja lebih keras, menolak kenyamanan, dan mendisiplinkan diri ekstrem.",
          de: "Harte Selbstbestrafung: noch mehr leisten, Genuss entziehen und absolute Buße fordern.",
          fr: "L'auto-punition implacable: redoubler d'efforts, se priver de douceur et expier la faute.",
          es: "El autocastigo severo: trabajar el doble, privarme de descanso y purgar el fallo con exigencia.",
        },
      },
      {
        archetype: "martyr",
        weight: 3,
        text: {
          en: "Guilt spiral: weeping, over-apologizing, and putting on a tragic display of self-pity.",
          id: "Spiral rasa bersalah: menangis tersedu, memohon maaf berlebihan, dan tenggelam dalam ratapan diri.",
          de: "Schuldgefühls-Spirale: mich klein machen, weinen und in Reue und Selbstmitleid versinken.",
          fr: "La spirale culpabilisante: fondre en larmes, se confondre en regrets et s'apitoyer sur son sort.",
          es: "El bucle de culpa: lamentarme con desconsuelo, pedir perdón sin parar y hundirme en autocompasión.",
        },
      },
      {
        archetype: "ice_wall",
        weight: 3,
        text: {
          en: "Intellectualization: rationalizing it as cold evolutionary biology or pragmatic necessity.",
          id: "Intelektualisasi: merasionalisasikannya dengan logika dingin, teori sains, atau kebutuhan realistis.",
          de: "Intellektualisierung: kühl mit psychologischen Theorien oder Notwendigkeiten wegerklären.",
          fr: "L'intellectualisation: analyser froidement le comportement sous un angle logique ou abstrait.",
          es: "La intelectualización: justificarlo con frialdad analítica, psicología o pragmatismo desapegado.",
        },
      },
      {
        archetype: "chaos_rebel",
        weight: 3,
        text: {
          en: "Defiant shrug: 'I never claimed to be a saint. The whole moral system is corrupt anyway.'",
          id: "Masa bodoh: 'Aku kan memang bukan orang suci. Standar moral zaman sekarang juga penuh kemunafikan.'",
          de: "Trotzige Abwehr: 'Ich habe nie behauptet, heilig zu sein. Das ganze Moralsystem ist ohnehin verlogen.'",
          fr: "Défiance narquoise: 'Je n'ai jamais prétendu être un saint, leur morale est pourrie de toute façon.'",
          es: "Encogerme de hombros con chulería: 'Jamás dije ser un santo; toda su moral es una farsa.'",
        },
      },
    ],
  },
  {
    id: 10,
    text: {
      en: "In your private fantasy life when nobody is watching, what secret craving occasionally surfaces?",
      id: "Dalam fantasi rahasia Anda saat tidak ada yang melihat, keinginan apa yang sesekali muncul?",
      de: "Welcher geheime Wunsch taucht in deinen einsamsten Tagträumen gelegentlich auf?",
      fr: "Dans vos rêveries les plus intimes et secrètes, quel désir inavoué affleure parfois ?",
      es: "¿Qué anhelo prohibido surge a veces en tus fantasías más íntimas e inconfesables?",
    },
    options: [
      {
        archetype: "tyrant",
        weight: 3,
        text: {
          en: "Letting everything rot for a week: eating junk food in bed, being messy, and not caring at all.",
          id: "Membiarkan segalanya berantakan selama seminggu: bermalas-malasan, jajan sembarangan, dan abai.",
          de: "Eine Woche alles verfallen lassen: faul im Bett liegen, Chaos tolerieren und nichts leisten.",
          fr: "Tout laisser tomber pendant une semaine: manger n'importe quoi au lit et s'en moquer éperdument.",
          es: "Mandar el orden al diablo una semana: comer chatarra en la cama, desordenar y no hacer nada.",
        },
      },
      {
        archetype: "martyr",
        weight: 3,
        text: {
          en: "Screaming at everyone at the top of your lungs: 'Do it yourself, I am NOT your servant!'",
          id: "Berteriak sekencang-kencangnya di depan semua orang: 'Kerjakan sendiri, aku bukan pembantu kalian!'",
          de: "Jedem ins Gesicht brüllen: 'Macht euren Mist alleine, ich bin nicht euer Fußabtreter!'",
          fr: "Hurler à la face du monde: 'Débrouillez-vous, je ne suis pas votre bonniche à tout faire !'",
          es: "Gritarles a todos a pleno pulmón: '¡Apáñenselas solos, no soy el esclavo de nadie!'",
        },
      },
      {
        archetype: "ice_wall",
        weight: 3,
        text: {
          en: "Sobbing uncontrollably in the arms of someone who holds you tightly and whispers: 'You are safe now.'",
          id: "Menangis tersedu di pelukan seseorang yang mendekap erat dan berbisik: 'Kamu sudah aman sekarang.'",
          de: "Heftig in den Armen eines Menschen weinen, der dich festhält und sagt: 'Du bist vollkommen sicher.'",
          fr: "Sangloter sans retenue dans les bras de quelqu'un qui vous serre fort en murmurant: 'Tu es en sécurité.'",
          es: "Romper a llorar en los brazos de alguien que te abrace fuerte y te susurre: 'Ya estás a salvo.'",
        },
      },
      {
        archetype: "chaos_rebel",
        weight: 3,
        text: {
          en: "Surrendering completely to a loving mentor or partner who takes the lead and makes you feel truly held.",
          id: "Pasrah seutuhnya pada pasangan atau mentor bijak yang memimpin jalan dan membuat Anda merasa tenang.",
          de: "Mich vollkommen vertrauensvoll fallen lassen und jemandem erlauben, die Führung zu übernehmen.",
          fr: "Abandonner tout combat auprès d'un guide bienveillant qui prend les rênes et vous protège.",
          es: "Ceder el control por completo a alguien sabio y protector que guíe el camino con ternura.",
        },
      },
    ],
  },
  {
    id: 11,
    text: {
      en: "How do you handle authentic intimate relationships over the long term?",
      id: "Bagaimana Anda menjalani hubungan intim atau asmara dalam jangka panjang?",
      de: "Wie verhältst du dich in langfristigen Liebesbeziehungen, wenn es wirklich tief wird?",
      fr: "Comment vivez-vous les relations amoureuses durables sur le long terme ?",
      es: "¿Cómo gestionas las relaciones íntimas de pareja a largo plazo cuando la cercanía es real?",
    },
    options: [
      {
        archetype: "tyrant",
        weight: 3,
        text: {
          en: "I try to 'improve' or fix my partner, turning romance into a high-standard development project.",
          id: "Saya cenderung mencoba 'memperbaiki' pasangan, mengubah hubungan menjadi proyek perbaikan diri.",
          de: "Ich versuche meinen Partner zu 'optimieren' und mache die Beziehung zum Leistungsprojekt.",
          fr: "Je cherche à corriger ou coacher mon partenaire, transformant le couple en projet d'amélioration.",
          es: "Intento 'corregir' o mejorar a mi pareja, convirtiendo la relación en un proyecto de superación.",
        },
      },
      {
        archetype: "martyr",
        weight: 3,
        text: {
          en: "I over-give until I feel drained, secretly waiting for them to balance the scales on their own.",
          id: "Saya memberi terlalu banyak hingga kehabisan energi, lalu memendam kecewa saat mereka tak membalasnya.",
          de: "Ich gebe alles, bis ich innerlich ausgebrannt bin, und warte bitter darauf, dass sie es ausgleichen.",
          fr: "Je donne tout jusqu'à l'épuisement, en attendant avec amertume qu'ils rendent la pareille.",
          es: "Me desvivo hasta vaciarme, esperando con tristeza y rencor que tengan la misma iniciativa.",
        },
      },
      {
        archetype: "ice_wall",
        weight: 3,
        text: {
          en: "I keep a private room in my mind they can never enter; I panic if they want 100% emotional merging.",
          id: "Saya selalu menyisakan sudut rahasia di batin yang tak boleh disentuh; saya panik jika terlalu dekat.",
          de: "Ich behalte stets ein geheimes Refugium; wenn Nähe zu eng wird, bekomme ich Beklemmungen.",
          fr: "Je garde une forteresse secrète impénétrable; la fusion affective totale me provoque des sueurs froides.",
          es: "Mantengo una parcela hermética donde jamás entran; la intimidad sofocante me da claustrofobia.",
        },
      },
      {
        archetype: "chaos_rebel",
        weight: 3,
        text: {
          en: "Whenever things get comfortable and calm, I stir up conflict or boredom-induced drama.",
          id: "Saat hubungan mulai damai dan stabil, saya justru terpicu memancing keributan atau drama.",
          de: "Sobald Harmonie und Routine einkehren, provoziere ich unbewusst Streit oder Drama.",
          fr: "Dès que le quotidien devient doux et prévisible, je provoque une dispute pour raviver la flamme.",
          es: "En cuanto la relación se vuelve estable y pacífica, provoco discusiones por aburrimiento o miedo.",
        },
      },
    ],
  },
  {
    id: 12,
    text: {
      en: "What is the single most terrifying thing that would happen if your shadow took full control of you for 24 hours?",
      id: "Apa hal paling menakutkan yang akan terjadi jika bayangan bawah sadar Anda mengambil kendali penuh selama 24 jam?",
      de: "Was wäre das Beängstigendste, wenn dein Schatten für 24 Stunden ungefiltert das Ruder übernähme?",
      fr: "Quelle serait la conséquence la plus terrifiante si votre ombre prenait les commandes pendant 24 heures ?",
      es: "¿Qué sería lo más aterrador que ocurriría si tu sombra tomara el control total durante 24 horas?",
    },
    options: [
      {
        archetype: "tyrant",
        weight: 3,
        text: {
          en: "I would coldly fire, dismiss, or ruthlessly cut down everyone who has ever disappointed me.",
          id: "Saya akan memecat, mempermalukan, atau memutus hubungan dengan semua orang yang mengecewakan saya.",
          de: "Ich würde unbarmherzig abrechnen und jeden vernichten, der meine Erwartungen enttäuscht hat.",
          fr: "Je détruirais verbalement et sans pitié tous ceux qui ont failli à mes attentes.",
          es: "Humillaría y cortaría la cabeza sin piedad a todos los que me han fallado o decepcionado.",
        },
      },
      {
        archetype: "martyr",
        weight: 3,
        text: {
          en: "I would smash plates, scream all my hidden hatred, and walk out leaving everyone to fend for themselves.",
          id: "Saya akan membanting piring, meneriakkan semua dendam terpendam, dan pergi membiarkan mereka kesusahan.",
          de: "Ich würde Teller an die Wand werfen, all meine Wut herausschreien und alle im Stich lassen.",
          fr: "Je briserais la vaisselle, cracherais toute ma haine accumulée et claquerais la porte pour toujours.",
          es: "Rompería los platos, vomitaría toda mi rabia acumulada y los dejaría desamparados a su suerte.",
        },
      },
      {
        archetype: "ice_wall",
        weight: 3,
        text: {
          en: "I would pack a bag, change my phone number, and vanish into another country without saying goodbye.",
          id: "Saya akan mengemas koper, ganti nomor ponsel, dan menghilang ke negara lain tanpa berpamitan.",
          de: "Ich würde meinen Koffer packen, meine Nummer löschen und spurlos im Ausland verschwinden.",
          fr: "Je ferais ma valise, changerais de numéro et m'évaporerais à l'étranger sans un mot d'adieu.",
          es: "Haría las maletas, cambiaría de número y desaparecería en otro país sin despedirme de nadie.",
        },
      },
      {
        archetype: "chaos_rebel",
        weight: 3,
        text: {
          en: "I would burn down my career, blow all my savings on wild hedonism, and break every social law.",
          id: "Saya akan membakar karier saya, menghamburkan tabungan untuk kesenangan liar, dan melanggar semua aturan.",
          de: "Ich würde meinen Job kündigen, mein Erspartes verprassen und alle gesellschaftlichen Regeln brechen.",
          fr: "Je démissionnerais avec éclat, dépenserais tout mon argent dans des excès et braverais la loi.",
          es: "Dinamitaría mi carrera, gastaría mis ahorros en placeres salvajes y quebrantaría toda norma social.",
        },
      },
    ],
  },
];

export interface ShadowResult {
  primary: ShadowProfile;
  secondary: ShadowProfile;
  scores: Record<ShadowArchetype, number>;
  totalScore: number;
  percentages: Record<ShadowArchetype, number>;
}

export function calculateShadowScore(answers: Record<number, ShadowArchetype>): ShadowResult {
  const scores: Record<ShadowArchetype, number> = {
    tyrant: 0,
    martyr: 0,
    ice_wall: 0,
    chaos_rebel: 0,
  };

  let totalWeight = 0;
  SHADOW_QUESTIONS.forEach((q) => {
    const chosen = answers[q.id];
    if (chosen && scores[chosen] !== undefined) {
      scores[chosen] += 3;
      totalWeight += 3;
    }
  });

  const sorted = (Object.keys(scores) as ShadowArchetype[]).sort(
    (a, b) => scores[b] - scores[a]
  );

  const primaryId = sorted[0];
  const secondaryId = sorted[1];

  const divisor = totalWeight || 1;
  const percentages: Record<ShadowArchetype, number> = {
    tyrant: Math.round((scores.tyrant / divisor) * 100),
    martyr: Math.round((scores.martyr / divisor) * 100),
    ice_wall: Math.round((scores.ice_wall / divisor) * 100),
    chaos_rebel: Math.round((scores.chaos_rebel / divisor) * 100),
  };

  return {
    primary: SHADOW_PROFILES[primaryId],
    secondary: SHADOW_PROFILES[secondaryId],
    scores,
    totalScore: totalWeight,
    percentages,
  };
}
