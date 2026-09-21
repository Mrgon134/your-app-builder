export type NomophobiaCardLang = "en" | "id" | "de" | "fr" | "es";

export interface NomophobiaQuestion {
  id: number;
  subscale:
    | "device_separation_panic_disconnect"
    | "compulsive_checking_phantom_vibrations"
    | "interpersonal_disconnection_fomo";
  text: Record<NomophobiaCardLang, string>;
}

export interface NomophobiaResultLevel {
  level:
    | "digital_autonomy_healthy_boundaries"
    | "mild_habitual_device_attachment"
    | "moderate_nomophobic_dependency"
    | "high_clinical_nomophobia_nmpq"
    | "severe_digital_separation_panic_crisis";
  scoreRange: [number, number];
  title: Record<NomophobiaCardLang, string>;
  badge: Record<NomophobiaCardLang, string>;
  summary: Record<NomophobiaCardLang, string>;
  psychology: Record<NomophobiaCardLang, string>;
  actionProtocol: Record<NomophobiaCardLang, string[]>;
}

export const NOMOPHOBIA_QUESTIONS: NomophobiaQuestion[] = [
  // 1. Device Separation Panic & Disconnect
  {
    id: 1,
    subscale: "device_separation_panic_disconnect",
    text: {
      en: "You feel acute panic, vulnerability, or disorientation if your smartphone battery drops below 15% and you do not have a charger or power bank with you.",
      id: "Kamu merasa panik hebat, rentan, atau cemas tak menentu jika baterai ponselmu di bawah 15% dan kamu tidak membawa charger atau power bank.",
      de: "Sie empfinden akute Panik oder Hilflosigkeit, wenn Ihr Smartphone-Akku unter 15 % fällt und kein Ladekabel oder keine Powerbank greifbar ist.",
      fr: "Vous ressentez une panique vive ou un désarroi intense lorsque la batterie de votre smartphone passe sous les 15 % sans chargeur à portée.",
      es: "Sientes angustia o indefensión aguda si la batería de tu móvil baja del 15% y no llevas cargador o batería externa contigo.",
    },
  },
  // 2. Compulsive Checking & Phantom Vibrations
  {
    id: 2,
    subscale: "compulsive_checking_phantom_vibrations",
    text: {
      en: "You reach into your pocket or look at your screen compulsively every 3 to 5 minutes, even when no notifications, ringtones, or vibrations have occurred.",
      id: "Kamu secara otomatis merogoh kantong atau menyalakan layar ponsel setiap 3 hingga 5 menit sekali, bahkan saat tidak ada notifikasi atau nada dering sama sekali.",
      de: "Sie greifen alle paar Minuten reflexartig zum Smartphone und entsperren den Bildschirm, selbst wenn weder Töne noch Benachrichtigungen eingegangen sind.",
      fr: "Vous sortez machinalement votre téléphone ou allumez l'écran toutes les 3 à 5 minutes, même en l'absence de sonnerie ou de notification.",
      es: "Miras compulsivamente la pantalla o metes la mano en el bolsillo cada pocos minutos, incluso cuando no ha sonado ni vibrado ninguna notificación.",
    },
  },
  // 3. Interpersonal Disconnection & FOMO
  {
    id: 3,
    subscale: "interpersonal_disconnection_fomo",
    text: {
      en: "You feel deeply unsettled and excluded if you cannot immediately check incoming messages, team pings, or social media stories the moment they arrive.",
      id: "Kamu merasa sangat gelisah dan tertinggal (FOMO) jika tidak bisa langsung memeriksa pesan masuk, chat grup, atau update media sosial saat itu juga.",
      de: "Sie fühlen sich isoliert und unruhig, wenn Sie eingehende Nachrichten, Team-Chats oder Social-Media-Stories nicht sofort abrufen können.",
      fr: "Vous ressentez un profond malaise ou la peur d'être exclu(e) si vous ne pouvez pas consulter instantanément vos messages et réseaux sociaux.",
      es: "Te invade una molesta sensación de exclusión o desasosiego si no puedes revisar de inmediato los mensajes o historias que acaban de llegar.",
    },
  },
  // 4. Device Separation Panic & Disconnect
  {
    id: 4,
    subscale: "device_separation_panic_disconnect",
    text: {
      en: "If you accidentally leave your phone at home, you experience persistent physiological anxiety, sweating, or an overpowering urge to turn around and retrieve it.",
      id: "Jika ponselmu tertinggal di rumah, kamu merasakan kecemasan fisik yang terus-menerus, keringat dingin, atau dorongan kuat untuk putar balik mengambilnya.",
      de: "Haben Sie Ihr Smartphone zu Hause vergessen, verspüren Sie anhaltende körperliche Unruhe, Schweißausbrüche oder den Zwang umzukehren.",
      fr: "Si vous oubliez votre téléphone chez vous, vous éprouvez une anxiété physique permanente, des sueurs ou le besoin impérieux de faire demi-tour.",
      es: "Si olvidas el móvil en casa, sufres una inquietud física constante, taquicardia o la necesidad imperiosa de volver a buscarlo.",
    },
  },
  // 5. Compulsive Checking & Phantom Vibrations
  {
    id: 5,
    subscale: "compulsive_checking_phantom_vibrations",
    text: {
      en: "You frequently experience 'phantom vibrations'—feeling your phone vibrate against your leg or hearing imaginary notification chimes when nothing happened.",
      id: "Kamu sering mengalami 'getaran hantu' (phantom vibration)—merasa ponselmu bergetar di saku paha atau mendengar nada pesan padahal tidak ada apa-apa.",
      de: "Sie erleben regelmäßig 'Phantom-Vibrationen' – Sie spüren ein Vibrieren in der Hosentasche oder hören Signaltöne, obwohl keine Nachricht eingegangen ist.",
      fr: "Vous ressentez fréquemment des 'vibrations fantômes' dans votre poche ou croyez entendre une sonnerie alors que rien ne s'est produit.",
      es: "Experimentas a menudo 'vibraciones fantasma': sientes que el móvil vibra en el bolsillo o crees oír timbres imaginarios sin que haya nada.",
    },
  },
  // 6. Interpersonal Disconnection & FOMO
  {
    id: 6,
    subscale: "interpersonal_disconnection_fomo",
    text: {
      en: "You worry excessively that your loved ones, partner, or employer will think something terrible happened to you if you do not reply within 10–15 minutes.",
      id: "Kamu sangat cemas pasangan, keluarga, atau atasan kantormu akan mengira terjadi musibah besar padamu jika kamu tidak membalas pesan dalam 10–15 menit.",
      de: "Sie fürchten übermäßig, dass Partner, Familie oder Vorgesetzte ein Unglück vermuten, wenn Sie nicht innerhalb von 10–15 Minuten antworten.",
      fr: "Vous craignez excessivement que vos proches ou votre employeur ne s'alarment d'un drame si vous ne répondez pas dans les 10 à 15 minutes.",
      es: "Te preocupa en exceso que tu pareja, familia o jefe piensen que te ha ocurrido una tragedia si tardas más de 10 o 15 minutos en responder.",
    },
  },
  // 7. Device Separation Panic & Disconnect
  {
    id: 7,
    subscale: "device_separation_panic_disconnect",
    text: {
      en: "Being in an area with zero cellular service or dead Wi-Fi (e.g., remote camping, underground metro, airplane cabin) makes you feel suffocated or irritable.",
      id: "Berada di tempat tanpa sinyal seluler atau tanpa Wi-Fi (seperti di pesawat, lantai bawah tanah, atau pedalaman) membuatmu merasa tercekik atau kesal.",
      de: "Funklöcher ohne Netz oder fehlendes WLAN (z. B. im Flugzeug, Tunnel oder Wald) lösen bei Ihnen Engegefühl, Gereiztheit oder Beklemmung aus.",
      fr: "Être dans une zone blanche sans réseau ni Wi-Fi (métro souterrain, avion, forêt) vous fait vous sentir étouffé(e) ou très irritable.",
      es: "Estar en una zona sin cobertura ni wifi (avión, metro o parajes naturales) te genera una sensación de asfixia, claustrofobia o irritabilidad.",
    },
  },
  // 8. Compulsive Checking & Phantom Vibrations
  {
    id: 8,
    subscale: "compulsive_checking_phantom_vibrations",
    text: {
      en: "Your smartphone is the very first thing you look at upon waking in the morning and the very last thing your eyes see before falling asleep at night.",
      id: "Ponsel adalah benda pertama yang kamu lihat saat membuka mata di pagi hari dan benda terakhir yang kamu pandang persis sebelum tertidur di malam hari.",
      de: "Ihr Smartphone ist das Allererste, worauf Sie morgens blicken, und das Allerletzte, was Sie vor dem Einschlafen noch in der Hand halten.",
      fr: "Votre smartphone est la toute première chose que vous regardez au réveil et la dernière que vos yeux fixent avant de vous endormir.",
      es: "Tu móvil es lo primero que miras al abrir los ojos por la mañana y lo último que ven tus pupilas antes de cerrar los ojos para dormir.",
    },
  },
  // 9. Interpersonal Disconnection & FOMO
  {
    id: 9,
    subscale: "interpersonal_disconnection_fomo",
    text: {
      en: "During in-person conversations or dining with friends/partner, you keep your phone face-up on the table and regularly check it (phubbing), dividing your presence.",
      id: "Saat mengobrol langsung atau makan bersama pasangan/teman, kamu meletakkan ponsel menghadap ke atas di meja dan terus mengeceknya (phubbing).",
      de: "Bei persönlichen Treffen oder beim Essen mit Freunden legen Sie das Handy mit dem Display nach oben auf den Tisch und blicken ständig darauf (Phubbing).",
      fr: "Lors de dîners ou de discussions en tête-à-tête, vous gardez l'écran tourné vers le haut et le regardez fréquemment (phubbing), morcelant votre écoute.",
      es: "Durante comidas o charlas cara a cara dejas el móvil sobre la mesa con la pantalla hacia arriba y lo consultas a cada rato (phubbing).",
    },
  },
  // 10. Device Separation Panic & Disconnect
  {
    id: 10,
    subscale: "device_separation_panic_disconnect",
    text: {
      en: "You take your smartphone into the bathroom, shower, or even when walking from one room to another in your own home, unable to endure moments of unplugged silence.",
      id: "Kamu membawa ponsel ke kamar mandi, toilet, bahkan saat berpindah ruangan di dalam rumahmu sendiri karena tidak tahan berada dalam keheningan tanpa layar.",
      de: "Sie nehmen das Smartphone selbst auf die Toilette, ins Badezimmer oder beim Gang in die Küche mit, unfähig, kurze Stille ohne Bildschirm auszuhalten.",
      fr: "Vous emportez votre smartphone aux toilettes, sous la douche ou d'une pièce à l'autre chez vous, incapable de vivre un court instant sans écran.",
      es: "Te llevas el móvil al baño, a la ducha o de una habitación a otra en tu propia casa, incapaz de tolerar unos minutos de silencio sin estímulos.",
    },
  },
  // 11. Compulsive Checking & Phantom Vibrations
  {
    id: 11,
    subscale: "compulsive_checking_phantom_vibrations",
    text: {
      en: "Whenever you feel a momentary pause, boredom in an elevator, a red traffic light, or standing in line, you reflexively pull out your phone to numb the stillness.",
      id: "Kapan pun ada jeda sejenak, bosan di lift, lampu merah, atau antre di kasir, kamu secara refleks mengeluarkan ponsel untuk membunuh keheningan itu.",
      de: "Jeder kleinste Moment von Leerlauf – an der roten Ampel, im Fahrstuhl oder in einer Schlange – wird sofort reflexartig durch den Griff zum Handy überbrückt.",
      fr: "À la moindre seconde de temps mort (feu rouge, ascenseur, file d'attente), vous dégainez machinalement votre téléphone pour meubler le vide.",
      es: "En cuanto surge una pausa mínima (un ascensor, un semáforo en rojo, una cola), sacas el móvil de forma refleja para tapar el vacío.",
    },
  },
  // 12. Interpersonal Disconnection & FOMO
  {
    id: 12,
    subscale: "interpersonal_disconnection_fomo",
    text: {
      en: "Your reliance on your phone has noticeably degraded your attention span, sleep quality, reading ability, or intimacy with loved ones over the past year.",
      id: "Ketergantunganmu pada ponsel telah menurunkan rentang konsentrasi, merusak kualitas tidur, mengikis kemampuan membaca buku, atau mengurangi kemesraan dengan pasangan.",
      de: "Ihre Bindung an das Gerät hat Ihre Aufmerksamkeitsspanne, Schlafqualität, Lesefähigkeit oder die Nähe zu Ihren Liebsten spürbar beeinträchtigt.",
      fr: "Votre dépendance au smartphone a nettement dégradé votre capacité d'attention, votre sommeil, votre concentration de lecture ou vos liens affectifs.",
      es: "Tu apego al móvil ha erosionado de forma evidente tu capacidad de atención, tu descanso nocturno, la lectura o la cercanía con tus seres queridos.",
    },
  },
];

export const NOMOPHOBIA_RESULT_LEVELS: NomophobiaResultLevel[] = [
  {
    level: "digital_autonomy_healthy_boundaries",
    scoreRange: [0, 7],
    title: {
      en: "Digital Autonomy & Grounded Device Sovereignty",
      id: "Otonomi Digital & Kedaulatan Diri atas Gadget",
      de: "Digitale Autonomie & gesunde Gerätesouveränität",
      fr: "Autonomie numérique & souveraineté technologique saine",
      es: "Autonomía digital y soberanía tecnológica equilibrada",
    },
    badge: {
      en: "DIGITAL SOVEREIGNTY (LOW NMP-Q)",
      id: "KEDAULATAN DIGITAL SEHAT",
      de: "DIGITALE SOUVERÄNITÄT",
      fr: "SOUVERAINETÉ NUMÉRIQUE",
      es: "SOBERANÍA DIGITAL EQUILIBRADA",
    },
    summary: {
      en: "You maintain an exceptionally healthy, sovereign relationship with your smartphone. You view your device as a useful tool rather than a biological extension of yourself, feeling peaceful during unplugged hours or dead-battery scenarios.",
      id: "Kamu memiliki hubungan yang sangat sehat dan berdaulat dengan ponsel pintarmu. Kamu memandang gawai sebagai alat bantu, bukan perpanjangan tubuh biologismu, serta merasa damai saat baterai habis atau tanpa koneksi internet.",
      de: "Sie pflegen ein bemerkenswert freies, bewusstes Verhältnis zu Ihrem Smartphone. Sie betrachten das Gerät als praktisches Werkzeug, nicht als seelische Nabelschnur.",
      fr: "Vous entretenez une relation très saine et souveraine avec votre smartphone. Il reste un outil fonctionnel et non une extension vitale de votre identité.",
      es: "Mantienes una relación madura y dueña de ti mismo con tu móvil. Es una herramienta útil, no un cordón umbilical psicológico.",
    },
    psychology: {
      en: "Your dopamine reward pathways are not captured by micro-anticipation algorithms. The prefrontal cortex easily maintains executive attention without autonomic separation distress.",
      id: "Jalur dopamin otakmu tidak terjebak dalam algoritma notifikasi adiktif. Korteks prefrontalmu mempertahankan fokus dengan mudah tanpa rasa panik saat jauh dari ponsel.",
      de: "Ihre Dopaminschleifen sind nicht an intermittierende Smartphone-Reize gekoppelt. Der präfrontale Kortex behält die volle Regie.",
      fr: "Vos circuits de récompense ne sont pas asservis aux alertes intermittentes. Votre cortex préfrontal préserve son attention sans angoisse de séparation.",
      es: "Tus vías dopaminérgicas no están secuestradas por las notificaciones intermitentes. La corteza prefrontal modula la atención con serenidad.",
    },
    actionProtocol: {
      en: [
        "Continue preserving phone-free sanctuary zones (e.g., dining table, bedroom nightstand).",
        "Practice intentional technology sabbaticals (e.g., leaving phone behind during Sunday morning walks).",
        "Maintain non-digital hobbies that cultivate deep flow states.",
      ],
      id: [
        "Pertahankan zona bebas ponsel (seperti meja makan dan meja samping tempat tidur).",
        "Lakukan jeda digital berkala (seperti jalan santai di hari Minggu pagi tanpa membawa ponsel).",
        "Kembangkan hobi non-digital yang menumbuhkan konsentrasi mendalam.",
      ],
      de: [
        "Bewahren Sie handyfreie Zonen wie den Esstisch oder den Nachttisch.",
        "Gönnen Sie sich bewusste Digital-Detox-Spaziergänge am Wochenende.",
        "Pflegen Sie analoge Freizeitaktivitäten mit hohem Flow-Potenzial.",
      ],
      fr: [
        "Préservez vos sanctuaires sans écran (table des repas, table de nuit).",
        "Pratiquez des micro-déconnexions délibérées en fin de semaine.",
        "Entretenez des passions créatives non virtuelles favorisant la pleine présence.",
      ],
      es: [
        "Mantén espacios libres de móvil (la mesa de comer, el cabecero de la cama).",
        "Haz salidas breves de fin de semana sin llevar el teléfono encima.",
        "Cultiva aficiones analógicas que alimenten estados de presencia y fluidez.",
      ],
    },
  },
  {
    level: "mild_habitual_device_attachment",
    scoreRange: [8, 14],
    title: {
      en: "Mild Habitual Device Attachment & Reflexive Checking",
      id: "Keterikatan Gawai Ringan & Kebiasaan Mengecek Refleks",
      de: "Leichte Smartphone-Gewöhnung & reflexhaftes Nachschauen",
      fr: "Attachement numérique léger & réflexe d'allumage d'écran",
      es: "Apego digital leve y comprobación refleja",
    },
    badge: {
      en: "MILD DIGITAL DEPENDENCE HABIT",
      id: "KETERGANTUNGAN GADGET RINGAN",
      de: "LEICHTE GEWÖHNUNG",
      fr: "ATTACHEMENT LÉGER",
      es: "HÁBITO DE VIGILANCIA LEVE",
    },
    summary: {
      en: "You have normal modern smartphone habits, with occasional moments of reflexive checking during elevator rides or red lights. You notice mild annoyance if battery life drops low, but it does not trigger acute panic or impair relationships.",
      id: "Kamu memiliki kebiasaan ponsel modern yang wajar, sesekali mengecek layar saat bosan atau antre. Kamu merasa sedikit terganggu jika baterai lemah, namun belum sampai memicu serangan panik atau merusak hubungan.",
      de: "Sie zeigen typische moderne Smartphone-Muster mit gelegentlichen Leerlauf-Blicken. Schwacher Akku erzeugt leichte Nervosität, beeinträchtigt Sie aber nicht nachhaltig.",
      fr: "Vous présentez des habitudes contemporaines banales avec quelques réflexes dans les temps morts. Une batterie faible vous agace un peu, sans panique aiguë.",
      es: "Tus pautas de uso son las habituales hoy en día, con miradas reflejas en momentos de aburrimiento. Una batería baja te inquieta ligeramente sin desbordarte.",
    },
    psychology: {
      en: "Conditioned motor habits prompt screen-checking when cognitive stimulation dips. Dopaminergic loops are mild and easily overwritten by engaging real-world activities.",
      id: "Kebiasaan motorik terlatih memicu tangan merogoh ponsel saat stimulasi pikiran menurun sejenak. Jalur dopamin ini masih ringan dan mudah dialihkan oleh aktivitas nyata.",
      de: "Konditionierte motorische Muster verleiten bei Unterstimulation zum Handygreifen, lassen sich aber leicht durch reale Aufgaben umlenken.",
      fr: "Des automatismes moteurs réveillent l'écran dès que la stimulation baisse, sans dépendance neurochimique lourde.",
      es: "Automatismos motores te llevan a desbloquear la pantalla cuando baja el estímulo ambiental, fácilmente reconducibles hacia el presente.",
    },
    actionProtocol: {
      en: [
        "Turn off non-essential notifications (social media likes, promotional alerts).",
        "Place your phone screen-down and out of arm's reach during deep focus sessions.",
        "Tolerate 60 seconds of stillness in elevators or lines without reaching into your pocket.",
      ],
      id: [
        "Matikan notifikasi yang tidak penting (like media sosial, promo belanja).",
        "Letakkan ponsel dengan layar menghadap ke bawah di luar jangkauan tangan saat bekerja fokus.",
        "Latih diri menahan 60 detik keheningan saat di lift atau antrean tanpa merogoh saku.",
      ],
      de: [
        "Deaktivieren Sie unwichtige Push-Mitteilungen (Social-Media-Likes, Shopping-Apps).",
        "Legen Sie das Handy beim Arbeiten außer Reichweite und mit dem Display nach unten.",
        "Halten Sie kurze Wartezeiten an der Kasse oder im Aufzug bewusst ohne Handy aus.",
      ],
      fr: [
        "Coupez les notifications superflues (likes, promotions, alertes secondaires).",
        "Posez l'appareil écran vers le bas hors de portée de main pendant vos sessions de travail.",
        "Tolérez 60 secondes de silence dans une file sans toucher à votre poche.",
      ],
      es: [
        "Desactiva notificaciones prescindibles (redes sociales, ofertas).",
        "Coloca el móvil boca abajo y fuera del alcance de la mano al concentrarte.",
        "Tolera un minuto de espera en una cola sin desenfundar el teléfono.",
      ],
    },
  },
  {
    level: "moderate_nomophobic_dependency",
    scoreRange: [15, 21],
    title: {
      en: "Moderate Nomophobia & Attentional Fragmentation",
      id: "Nomofobia Sedang & Fragmentasi Rentang Perhatian",
      de: "Moderate Nomophobie & Aufmerksamkeitsfragmentierung",
      fr: "Nomophobie modérée & morcellement attentionnel",
      es: "Nomofobia moderada y fragmentación atencional",
    },
    badge: {
      en: "MODERATE NOMOPHOBIA PROFILE (NMP-Q)",
      id: "PROFIL NOMOFOBIA SEDANG (NMP-Q)",
      de: "MODERATE NOMOPHOBIE",
      fr: "PROFIL NOMOPHOBIQUE MODÉRÉ",
      es: "PERFIL DE NOMOFOBIA MODERADA",
    },
    summary: {
      en: "Your smartphone has colonized your attention and emotional equilibrium. You experience tangible anxiety when disconnected, compulsively check feeds during social meals, and struggle with phantom vibrations and disrupted bedtime sleep.",
      id: "Ponsel pintarmu mulai menjajah perhatian dan kestabilan emosimu. Kamu merasakan kecemasan nyata saat tanpa sinyal, kerap membuka gawai saat mengobrol atau makan bersama teman (phubbing), serta mengalami getaran hantu dan tidur malam yang terganggu.",
      de: "Ihr Smartphone besetzt spürbare Anteile Ihres Alltags. Funklöcher lösen Unruhe aus, Mahlzeiten werden durch Blicke aufs Display unterbrochen, und der Schlaf leidet.",
      fr: "Le smartphone colonise votre attention. Une coupure de réseau génère une anxiété palpable, vous consultez vos flux à table et votre sommeil en pâtit.",
      es: "El móvil invade tu concentración y descanso. Quedarte sin conexión te altera, consultas las redes mientras cenas con gente y duermes peor.",
    },
    psychology: {
      en: "Dr. Çağan Yıldırım's NMP-Q findings show that the smartphone has become a digital surrogate attachment figure. The anticipation of unread alerts hijacks the ventral striatum, while FOMO activates insular pain circuits when disconnected.",
      id: "Riset NMP-Q Dr. Çağan Yıldırım membuktikan bahwa ponsel telah menjadi figur kelekatan (attachment) buatan. Antisipasi notifikasi baru membajak sistem dopamin striatum ventral, sementara rasa takut tertinggal (FOMO) mengaktifkan sirkuit rasa sakit emosional di otak saat terputus.",
      de: "Nach Yıldırıms NMP-Q-Forschung fungiert das Smartphone als digitaler Bindungsersatz. Alarmbereitschaft aktiviert das Belohnungssystem, während Trennung Schmerzschleifen triggert.",
      fr: "Les recherches NMP-Q de Yıldırım révèlent que l'appareil sert de figure d'attachement substitutive. L'attente des notifications stimule le striatum et la déconnexion active l'angoisse.",
      es: "Las investigaciones de Yıldırım señalan que el móvil actúa como figura de apego vicaria. La expectativa de mensajes hiperactiva el cuerpo estriado y la desconexión duele.",
    },
    actionProtocol: {
      en: [
        "Implement 'Grayscale Mode': Strip all vibrant colors from your screen in Accessibility settings to demagnify dopamine triggers by 40%.",
        "Establish a Phone-Free Bedroom: Purchase a dedicated $10 analog alarm clock and charge your phone in the hallway or living room overnight.",
        "Practice 'Phubbing Interruption': Consciously put your phone in your bag or coat pocket during meals with loved ones.",
      ],
      id: [
        "Aktifkan 'Mode Grayscale' (layar hitam putih) di pengaturan aksesibilitas untuk menurunkan daya tarik visual dopamin hingga 40%.",
        "Jadikan Kamar Tidur Bebas Ponsel: beli jam beker analog murah dan isi daya baterai ponselmu di luar kamar sepanjang malam.",
        "Hentikan kebiasaan phubbing: masukkan ponsel ke dalam tas atau kantong jaket saat makan bersama keluarga/pasangan.",
      ],
      de: [
        "Aktivieren Sie den Graustufen-Modus: Entzieht dem Display visuelle Reize und senkt die Dopaminattraktivität deutlich.",
        "Schaffen Sie ein handyfreies Schlafzimmer: Nutzen Sie einen analogen Wecker und laden Sie das Smartphone über Nacht im Flur.",
        "Stoppen Sie Phubbing: Packen Sie das Gerät bei gemeinsamen Essen bewusst in die Tasche.",
      ],
      fr: [
        "Activez le mode 'niveaux de gris' dans vos paramètres pour désamorcer l'attrait dopaminergique des icônes colorées.",
        "Sanctuaire de sommeil : achetez un réveil mécanique à aiguilles et chargez votre smartphone hors de la chambre.",
        "Enrayez le phubbing : rangez systématiquement le téléphone au fond de votre sac lors des repas partagés.",
      ],
      es: [
        "Activa el 'modo escala de grises' en accesibilidad para restar un 40% de magnetismo visual a las aplicaciones.",
        "Dormitorio libre de pantallas: usa un despertador analógico y deja el móvil cargando fuera del cuarto toda la noche.",
        "Frena el phubbing: guarda el móvil dentro del bolso o chaqueta durante comidas y conversaciones.",
      ],
    },
  },
  {
    level: "high_clinical_nomophobia_nmpq",
    scoreRange: [22, 28],
    title: {
      en: "High Clinical Risk of Nomophobia & Severe Digital Dependency",
      id: "Risiko Klinis Tinggi Nomofobia & Ketergantungan Digital Parah",
      de: "Hohes klinisches Risiko für Nomophobie (Schwere Abhängigkeit)",
      fr: "Risque clinique élevé de nomophobie & cyberdépendance sévère",
      es: "Alto riesgo clínico de nomofobia y dependencia digital severa",
    },
    badge: {
      en: "CLINICAL NOMOPHOBIA PROFILE (YILDIRIM NMP-Q)",
      id: "PROFIL NOMOFOBIA KLINIS (SKALA NMP-Q)",
      de: "KLINISCHES NOMOPHOBIE-PROFIL",
      fr: "PROFIL NOMOPHOBIQUE CLINIQUE",
      es: "PERFIL CLÍNICO DE NOMOFOBIA (NMP-Q)",
    },
    summary: {
      en: "You meet the clinical threshold for severe Nomophobia. You suffer acute autonomic panic when your phone is absent, experience phantom vibrations multiple times daily, cannot sleep without scrolling, and feel profound existential dread when disconnected from the digital hive-mind.",
      id: "Kamu memenuhi ambang klinis Nomofobia parah. Kamu mengalami kepanikan otonom saat ponselmu hilang/mati, merasakan getaran hantu berkali-kali sehari, tidak bisa tidur tanpa scrolling hingga larut, dan merasa sangat terasing jika tidak terkoneksi ke dunia maya.",
      de: "Sie erreichen den Schwellenwert schwerer Nomophobie. Trennung vom Gerät löst vegetative Paniksymptome aus, Sie leiden täglich unter Phantomvibrationen und können ohne Bildschirmlicht nicht einschlafen.",
      fr: "Vous franchissez le seuil clinique de la nomophobie sévère. L'absence de téléphone déclenche une angoisse viscérale, les vibrations fantômes sont quotidiennes et l'endormissement sans écran est impossible.",
      es: "Superas el umbral de nomofobia clínica severa. La falta de móvil desata pánico somático, sufres vibraciones fantasma a diario y eres incapaz de dormir sin navegar por la pantalla.",
    },
    psychology: {
      en: "This represents continuous autonomic hyperarousal: the prefrontal cortex has outsourced its working memory, social anchoring, and emotional regulation to the mobile interface. The brain perceives device separation as an acute threat to social survival and tribal safety.",
      id: "Kondisi ini mencerminkan hiper-arousal sistem saraf yang kronis: otak depan telah mengalihdayakan (outsourcing) memori kerja, rasa aman sosial, dan regulasi emosimu ke layar ponsel. Otak menerjemahkan terputusnya koneksi sebagai ancaman kematian sosial.",
      de: "Chronische Übererregung: Das Gehirn hat Emotionsregulation und soziale Verankerung an das Display ausgelagert und interpretiert Funkstille als existentielle Bedrohung.",
      fr: "Hypervigilance neurovégétative : le cerveau a externalisé sa régulation affective sur l'appareil et vit la déconnexion comme un abandon relationnel violent.",
      es: "Hiperalerta neurovegetativa continua: tu corteza cerebral ha delegado la calma y la seguridad social en el móvil, viviendo la desconexión como una amenaza de aislamiento.",
    },
    actionProtocol: {
      en: [
        "Commit to a Structured Digital Detox Architecture: Schedule 2-hour daily offline blocks where the phone is locked in a drawer.",
        "Delete high-friction, infinite-scroll social media apps from your phone (access them only via desktop browser).",
        "Replace passive scrolling with Nuju Somatic Voice Venting: When lonely or restless, speak into Nuju for 1 minute instead of tumbling down algorithm rabbit holes.",
      ],
      id: [
        "Terapkan Arsitektur Detoks Digital: jadwalkan 2 jam setiap hari di mana ponselmu dikunci di dalam laci atau ruangan lain.",
        "Hapus aplikasi media sosial dengan fitur infinite-scroll yang adiktif dari ponsel (buka hanya lewat peramban komputer).",
        "Ganti scrolling pasif dengan Curhat Suara di Nuju: saat gelisah atau kesepian, rekam suaramu selama 1 menit di Nuju daripada terjerumus lubang algoritma.",
      ],
      de: [
        "Etablieren Sie feste Offline-Fenster: Täglich 2 Stunden, in denen das Smartphone in einer Schublade weggeschlossen wird.",
        "Löschen Sie Endlos-Scroll-Apps vom Gerät und nutzen Sie diese ausschließlich am Desktop.",
        "Ersetzen Sie doomscrolling durch Nuju-Sprachjournaling: Sprechen Sie bei innerer Unruhe Gefühle ein, statt Reizen nachzujagen.",
      ],
      fr: [
        "Instaurez des plages hors-ligne fermes : 2 heures par jour où le téléphone est verrouillé dans un tiroir.",
        "Supprimez les applications à défilement infini du smartphone pour ne les consulter que sur ordinateur.",
        "Substituez le doomscrolling par le journal vocal Nuju : déposez votre agitation par la voix plutôt que d'absorber des flux infinis.",
      ],
      es: [
        "Comprométete con franjas offline sagradas: guarda el teléfono en un cajón durante 2 horas seguidas al día.",
        "Elimina las aplicaciones de scroll infinito del móvil (úsalas únicamente en el navegador del ordenador).",
        "Cambia el consumo pasivo por el desahogo de voz en Nuju: susurra tu inquietud a la app antes de caer en el pozo del algoritmo.",
      ],
    },
  },
  {
    level: "severe_digital_separation_panic_crisis",
    scoreRange: [29, 36],
    title: {
      en: "Acute Digital Separation Panic & Total Nomophobic Entrapment",
      id: "Kepanikan Pemisahan Digital Akut & Penjara Nomofobia Total",
      de: "Akute digitale Trennungspanik & totaler Nomophobie-Zwang",
      fr: "Panique aiguë de séparation numérique & dépendance extrême",
      es: "Pánico agudo por separación digital y atrapamiento nomofóbico total",
    },
    badge: {
      en: "ACUTE SEPARATION CRISIS (NOMOPHOBIA)",
      id: "KRISIS NOMOFOBIA AKUT",
      de: "AKUTE DIGITALE PANIKKRISE",
      fr: "CRISE DE SEVRAGE NUMÉRIQUE AIGUË",
      es: "CRISIS AGUDA DE DESCONEXIÓN DIGITAL",
    },
    summary: {
      en: "You are suffering from acute, incapacitating Nomophobia. Your phone operates as an artificial external nervous system; without it, you experience severe panic attacks, sweating, dissociation, and an utter inability to function or regulate your emotions.",
      id: "Kamu mengalami Nomofobia akut yang melumpuhkan hidupmu. Ponselmu telah bertindak sebagai sistem saraf eksternal tiruan; tanpanya, kamu mengalami serangan panik fisik, keringat dingin, disosiasi, dan ketidakmampuan total untuk menenangkan emosi.",
      de: "Schwerste existenzielle Smartphone-Abhängigkeit: Ohne Gerät erleiden Sie vegetative Panikzustände, Schüttelfrost und das Gefühl völliger Auflösung.",
      fr: "Dépendance technologique dévastatrice : le smartphone fait office de système nerveux externe de substitution. La séparation provoque des crises d'angoisse paroxystiques.",
      es: "Dependencia digital extrema e incapacitante: tu teléfono funciona como una prótesis nerviosa. Su ausencia te genera ataques de pánico somáticos y despersonalización.",
    },
    psychology: {
      en: "This reflects severe behavioral addiction and sensory processing overload. The brain's neurobiological locus of control has completely externalized into the device, triggering acute amygdalar emergency signals when disconnected.",
      id: "Kondisi ini mencerminkan adiksi perilaku berat dan kelebihan beban sensori. Pusat kendali neurobiologis otakmu telah berpindah sepenuhnya ke dalam gawai, menyalakan sirine darurat amigdala saat koneksi terputus.",
      de: "Schwerste Verhaltenssucht mit vollständiger Externalisierung des Kontrollzentrums: Das Gehirn interpretiert Offline-Zustände als vitale Notlage.",
      fr: "Addiction comportementale majeure : le centre de contrôle émotionnel est totalement délégué à l'écran, plongeant le système limbique dans un sevrage brutal en cas d'absence.",
      es: "Adicción conductual severa: la sede del control emocional se ha externalizado por completo en la pantalla, viviendo cada desconexión como un trauma biológico.",
    },
    actionProtocol: {
      en: [
        "Seek guided support from a behavioral addiction specialist or cognitive behavioral therapist specialized in digital detox.",
        "Initiate a physical 'Dumbphone Transition' or use physical lockboxes with timers for evening hours.",
        "Prioritize grounding nervous system practices: cold water face immersion, barefoot earthing, and deep acoustic voice journaling in Nuju.",
      ],
      id: [
        "Cari bantuan profesional dari psikolog klinis yang ahli dalam adiksi perilaku dan detoksifikasi digital.",
        "Pertimbangkan transisi ke ponsel biasa (dumbphone) tanpa media sosial atau gunakan kotak kunci fisik berwaktu di malam hari.",
        "Latih teknik grounding sistem saraf: basuh wajah dengan air dingin, jalan bertelanjang kaki di rumput, dan lakukan jurnal suara di Nuju.",
      ],
      de: [
        "Suchen Sie psychotherapeutische Unterstützung bei Verhaltenssüchten und digitaler Entwöhnung.",
        "Erwägen Sie den zeitweisen Wechsel zu einem einfachen Tastenhandy ('Dumbphone') oder nutzen Sie abschließbare Handyboxen mit Zeitschloss.",
        "Stärken Sie Ihre somatische Erdung durch Kaltwasseranwendungen, Naturkontakt und Nuju-Sprachtherapie.",
      ],
      fr: [
        "Faites-vous accompagner par un thérapeute expert des addictions comportementales et des cyberdépendances.",
        "Envisagez une boîte de confinement horaire pour votre smartphone ou un téléphone basique sans applications.",
        "Pratiquez des ancrages corporels intenses (eau froide sur le visage, marche pieds nus et journalisation vocale Nuju).",
      ],
      es: [
        "Busca apoyo en psicoterapia especializada en adicciones conductuales y deshabituación digital.",
        "Valora el uso de cajas de seguridad con temporizador o la transición temporal a un teléfono básico sin internet.",
        "Prioriza técnicas de anclaje somático: inmersión facial en agua fría, contacto con la naturaleza y notas de voz en Nuju.",
      ],
    },
  },
];

export const NOMOPHOBIA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "0 - Disagree Completely / Never (Sovereign & Peaceful Unplugged)",
      id: "0 - Sangat Tidak Setuju / Tidak Pernah (Tenang Tanpa Ponsel)",
      de: "0 - Trifft gar nicht zu / Nie (Gelassen ohne Smartphone)",
      fr: "0 - Pas du tout d'accord / Jamais (Serein(e) sans téléphone)",
      es: "0 - Totalmente en desacuerdo / Nunca (Tranquilo sin móvil)",
    },
  },
  {
    value: 1,
    label: {
      en: "1 - Slightly Agree / Mild (Mild inconvenience or occasional checking)",
      id: "1 - Agak Setuju / Ringan (Sedikit terganggu atau sesekali mengecek)",
      de: "1 - Trifft eher wenig zu / Leicht (Gelegentliches Nachsehen)",
      fr: "1 - Plutôt peu d'accord / Léger (Gêne minime ou vérification ponctuelle)",
      es: "1 - Algo de acuerdo / Leve (Incomodidad leve o comprobación puntual)",
    },
  },
  {
    value: 2,
    label: {
      en: "2 - Moderately Agree / Frequently (Noticeable anxiety & constant checking)",
      id: "2 - Cukup Setuju / Sedang (Cemas nyata & terus-menerus mengecek)",
      de: "2 - Trifft mäßig zu / Häufig (Deutliche Unruhe & Phubbing)",
      fr: "2 - Assez d'accord / Fréquent (Anxiété nette et consultation fréquente)",
      es: "2 - Bastante de acuerdo / Frecuente (Ansiedad evidente y uso constante)",
    },
  },
  {
    value: 3,
    label: {
      en: "3 - Strongly Agree / Severe Panic (Acute dread, phantom vibrations, insomnia)",
      id: "3 - Sangat Setuju / Sangat Parah (Panik berat, getaran hantu, tidur rusak)",
      de: "3 - Trifft voll zu / Schwer (Panik bei Funkstille, Phantomvibrationen)",
      fr: "3 - Tout à fait d'accord / Sévère (Panique aiguë, insomnie, vibrations fantômes)",
      es: "3 - Totalmente de acuerdo / Severo (Pánico agudo, vibración fantasma, insomnio)",
    },
  },
];

export const NOMOPHOBIA_SUBSCALE_INFO = {
  device_separation_panic_disconnect: {
    name: {
      en: "Device Separation Panic & Disconnect",
      id: "Panik Kehilangan Ponsel & Tanpa Sinyal",
      de: "Gerätetrennungspanik & Netzausfall",
      fr: "Panique de séparation & déconnexion",
      es: "Pánico a la separación y desconexión",
    },
    description: {
      en: "Acute anxiety, dread, and helplessness when the battery dies, service drops, or the phone is forgotten at home.",
      id: "Kepanikan hebat saat baterai habis, sinyal internet hilang, atau ponsel tertinggal di rumah.",
      de: "Panikgefühle bei leerem Akku, Funklöchern oder wenn das Handy daheim vergessen wurde.",
      fr: "Anxiété vive en cas de batterie vide, d'absence de réseau ou d'oubli de l'appareil.",
      es: "Angustia severa cuando se agota la batería, no hay cobertura o dejas el móvil en casa.",
    },
  },
  compulsive_checking_phantom_vibrations: {
    name: {
      en: "Compulsive Checking & Phantom Vibrations",
      id: "Pengecekan Kompulsif & Getaran Hantu",
      de: "Zwanghaftes Prüfen & Phantom-Vibrationen",
      fr: "Vérification compulsive & vibrations fantômes",
      es: "Comprobación compulsiva y vibración fantasma",
    },
    description: {
      en: "Reflexive checking every few minutes, phantom vibration sensations, taking the phone to the bathroom, and bedside bedtime scrolling.",
      id: "Refleks membuka layar setiap beberapa menit, getaran palsu di paha, membawa gawai ke toilet, dan scrolling sebelum tidur.",
      de: "Ständiges Entsperren ohne Anlass, Phantomvibrationen, Mitnahme ins Bad und Nachtscrollen.",
      fr: "Déverrouillage machinal sans raison, sensations de sonneries fantômes et consultation au lit.",
      es: "Desbloqueo reflejo continuo, sensación de vibraciones falsas y uso del móvil en la cama o el baño.",
    },
  },
  interpersonal_disconnection_fomo: {
    name: {
      en: "Interpersonal Disconnection & FOMO",
      id: "Keterputusan Hubungan & Sindrom FOMO",
      de: "Zwischenmenschliche Isolation & FOMO",
      fr: "Coupure relationnelle & angoisse du FOMO",
      es: "Desconexión interpersonal y miedo a perderse algo (FOMO)",
    },
    description: {
      en: "Dread of missing messages, fear of being unreachable, phubbing during in-person meals, and damage to real-world intimacy.",
      id: "Takut tertinggal kabar (FOMO), panik tidak bisa dihubungi, phubbing saat makan bersama, dan penurunan kemesraan nyata.",
      de: "Furcht vor verpassten Nachrichten, Phubbing bei Verabredungen und Entfremdung im echten Leben.",
      fr: "Peur de rater des alertes, phubbing lors des repas et dégradation des liens intimes réels.",
      es: "Terror a no enterarse de las cosas, phubbing en comidas y deterioro de los vínculos presenciales.",
    },
  },
};

export function calculateNomophobiaScore(answers: Record<number, number>): number {
  return Object.values(answers).reduce((sum, val) => sum + val, 0);
}

export function calculateNomophobiaSubscales(answers: Record<number, number>): {
  device_separation_panic_disconnect: number;
  compulsive_checking_phantom_vibrations: number;
  interpersonal_disconnection_fomo: number;
} {
  let dsp = 0;
  let ccp = 0;
  let idf = 0;

  NOMOPHOBIA_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "device_separation_panic_disconnect") dsp += score;
    if (q.subscale === "compulsive_checking_phantom_vibrations") ccp += score;
    if (q.subscale === "interpersonal_disconnection_fomo") idf += score;
  });

  return {
    device_separation_panic_disconnect: dsp,
    compulsive_checking_phantom_vibrations: ccp,
    interpersonal_disconnection_fomo: idf,
  };
}

export function getNomophobiaResultLevel(score: number): NomophobiaResultLevel {
  const match = NOMOPHOBIA_RESULT_LEVELS.find(
    (lvl) => score >= lvl.scoreRange[0] && score <= lvl.scoreRange[1]
  );
  return match || NOMOPHOBIA_RESULT_LEVELS[NOMOPHOBIA_RESULT_LEVELS.length - 1];
}

export const getNomophobiaResult = getNomophobiaResultLevel;
export const NOMOPHOBIA_RESULTS = NOMOPHOBIA_RESULT_LEVELS;
