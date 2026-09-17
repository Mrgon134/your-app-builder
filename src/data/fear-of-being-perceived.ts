export type PerceivedLang = "en" | "id" | "de" | "fr" | "es";

export interface PerceivedQuestion {
  id: number;
  subscale: "visibility_dread" | "covert_concealment" | "post_exposure_rumination";
  prompt: Record<PerceivedLang, string>;
  options: {
    label: Record<PerceivedLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface PerceivedArchetype {
  level: "visibly_unapologetic" | "reluctant_spotlight" | "hyper_vigilant_camouflager" | "invisible_ghost";
  badge: Record<PerceivedLang, string>;
  title: Record<PerceivedLang, string>;
  tagline: Record<PerceivedLang, string>;
  description: Record<PerceivedLang, string>;
  psychologyInsight: Record<PerceivedLang, string>;
  actionProtocols: Record<PerceivedLang, string[]>;
  dailyAffirmation: Record<PerceivedLang, string>;
}

export interface PerceivedScoreResult {
  totalScore: number;
  percentage: number;
  level: PerceivedArchetype["level"];
  profile: PerceivedArchetype;
  subscales: {
    visibility_dread: { score: number; percentage: number };
    covert_concealment: { score: number; percentage: number };
    post_exposure_rumination: { score: number; percentage: number };
  };
}

export const PERCEIVED_QUESTIONS: PerceivedQuestion[] = [
  // Subscale 1: Visibility Dread (Panic and physiological spike when looked at or noticed)
  {
    id: 1,
    subscale: "visibility_dread",
    prompt: {
      en: "When walking into a crowded room, restaurant, or gym, I feel an acute wave of panic that everyone is judging my appearance, posture, or walk.",
      id: "Saat memasuki ruangan ramai, kafe, atau gym, aku merasakan lonjakan panik seolah semua mata sedang menghakimi caraku berjalan atau berpakaian.",
      de: "Wenn ich einen belebten Raum, ein Restaurant oder ein Fitnessstudio betrete, fürchte ich sofort, dass jeder meine Haltung oder Kleidung mustert.",
      fr: "Quand j'entre dans une pièce bondée ou un restaurant, une bouffée de panique me saisit : j'ai l'impression que tous les regards me jugent.",
      es: "Al entrar a una sala llena, restaurante o gimnasio, siento una ola de pánico como si todos juzgaran mi postura o mi aspecto.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — I feel comfortable existing in public spaces",
          id: "Tidak pernah — aku merasa rileks dan nyaman berada di ruang publik",
          de: "Nie — ich bewege mich entspannt in der Öffentlichkeit",
          fr: "Jamais — je me sens à l'aise dans les espaces publics",
          es: "Nunca — me siento cómodo existiendo en espacios públicos",
        },
      },
      {
        score: 1,
        label: {
          en: "Briefly — slight self-consciousness for the first 30 seconds",
          id: "Sebentar — sedikit canggung selama 30 detik pertama lalu biasa saja",
          de: "Kurz — ein kleiner Moment der Verunsicherung, der schnell verfliegt",
          fr: "Brièvement — une légère gêne durant les 30 premières secondes",
          es: "Brevemente — ligera timidez los primeros 30 segundos",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I adjust my gait, stare at my phone, or avoid making eye contact",
          id: "Sering — aku mengubah caraku berjalan, pura-pura menatap ponsel, atau menghindari kontak mata",
          de: "Häufig — ich verändere meinen Gang, starre aufs Smartphone und meide Blickkontakt",
          fr: "Souvent — je modifie ma démarche, fixe mon écran et évite les regards",
          es: "Frecuentemente — cambio mi paso, miro el móvil y evito mirar a los ojos",
        },
      },
      {
        score: 3,
        label: {
          en: "Paralyzing — physical visceral dread; I feel like a naked target under a scorching spotlight",
          id: "Sangat lumpuh — ketakutan fisik yang intens; aku merasa seperti target telanjang di bawah sorot lampu tajam",
          de: "Lähmend — intensive körperliche Beklemmung; ich fühle mich wie auf dem Präsentierteller",
          fr: "Paralysant — une angoisse physique vive; je me sens mis à nu sous un projecteur impitoyable",
          es: "Paralizante — pánico físico visceral; me siento un blanco desnudo bajo un foco cegador",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "visibility_dread",
    prompt: {
      en: "Having my photo taken, appearing on a video call with my camera on, or being recorded makes my chest tighten with distress.",
      id: "Difoto, menyalakan kamera saat video call, atau direkam membuat dadaku sesak dilanda ketidaknyamanan.",
      de: "Fotografiert zu werden, die Kamera im Videocall anzuschalten oder gefilmt zu werden, schnürt mir die Kehle zu.",
      fr: "Être pris en photo, allumer ma caméra en réunion ou être filmé me provoque une oppression dans la poitrine.",
      es: "Que me tomen una foto, encender la cámara en una videollamada o ser grabado me oprime el pecho.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "No issue — cameras and photos feel totally neutral or enjoyable",
          id: "Tidak masalah — kamera dan foto terasa biasa saja atau menyenangkan",
          de: "Kein Problem — Kameras und Fotos sind mir völlig gleichgültig oder machen Spaß",
          fr: "Aucun souci — les caméras me laissent serein",
          es: "Sin problema — las fotos y cámaras me resultan indiferentes o amenas",
        },
      },
      {
        score: 1,
        label: {
          en: "Minor dislike — prefer candid shots over posing",
          id: "Sedikit risih — lebih suka foto candid daripada disuruh berpose",
          de: "Leichte Abneigung — bevorzuge Schnappschüsse statt Posen",
          fr: "Légère gêne — je préfère les photos prises sur le vif",
          es: "Leve disgusto — prefiero fotos espontáneas a posar",
        },
      },
      {
        score: 2,
        label: {
          en: "Strong aversion — I stare constantly at my self-preview tile to manage my facial expressions",
          id: "Sangat risih — aku terus-menerus memantau kotak preview wajahku demi menjaga ekspresi",
          de: "Starke Abneigung — ich starre im Call nur auf mein eigenes Bild, um jede Mimik zu kontrollieren",
          fr: "Forte aversion — je scrute mon retour vidéo pour contrôler chaque expression",
          es: "Fuerte aversión — vigilo mi propia imagen en la llamada para controlar mis gestos",
        },
      },
      {
        score: 3,
        label: {
          en: "Extreme dread — I will invent excuses, technical glitches, or avoid events entirely to escape the lens",
          id: "Ketakutan ekstrem — aku mengarang alasan teknis atau menghindari acara demi tidak terekam kamera",
          de: "Extreme Panik — ich erfinde technische Ausreden oder meide Events, um der Linse zu entkommen",
          fr: "Angoisse extrême — j'invente des pannes techniques ou j'évite les événements pour fuir l'objectif",
          es: "Pánico extremo — invento fallos técnicos o cancelo planes para no ser visto",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "visibility_dread",
    prompt: {
      en: "When someone pays me a public compliment or sings 'Happy Birthday', I wish the ground would swallow me whole.",
      id: "Saat seseorang memujiku di depan umum atau menyanyikan lagu ulang tahun, aku berharap bumi menelanku seketika.",
      de: "Wenn mir öffentlich ein Kompliment gemacht wird oder man 'Happy Birthday' singt, möchte ich im Erdboden versinken.",
      fr: "Quand on me fait un compliment en public ou qu'on me chante 'Joyeux Anniversaire', j'ai envie de disparaître sous terre.",
      es: "Cuando me elogian en público o me cantan 'Cumpleaños Feliz', desearía que la tierra me tragara.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Comfortable — I accept praise and celebratory attention graciously",
          id: "Nyaman — aku menerima pujian dan perhatian dengan senang hati dan wajar",
          de: "Entspannt — ich nehme Lob und Aufmerksamkeit gerne an",
          fr: "À l'aise — j'accepte les éloges et l'attention avec plaisir",
          es: "Cómodo — acepto los elogios y la atención con naturalidad",
        },
      },
      {
        score: 1,
        label: {
          en: "A bit bashful — slight blush, but I smile through it",
          id: "Sedikit tersipu — agak malu sebentar tapi tetap bisa tersenyum",
          de: "Etwas verlegen — kurzes Erröten, aber gut aushaltbar",
          fr: "Un peu timide — je rougis légèrement mais souris",
          es: "Algo tímido — me sonrojo un poco pero lo llevo bien",
        },
      },
      {
        score: 2,
        label: {
          en: "Deeply painful — intense physical heat, racing pulse, and an overwhelming urge to deflect attention",
          id: "Sangat tidak nyaman — wajah memanas, jantung berdebar kencang, dan ingin segera mengalihkan topik",
          de: "Sehr unangenehm — Hitzewallung, Herzklopfen und der Drang, die Aufmerksamkeit sofort wegzulenken",
          fr: "Très désagréable — bouffée de chaleur, tachycardie et besoin pressant de dévier le sujet",
          es: "Muy incómodo — sofoco, taquicardia y necesidad imperiosa de desviar la atención",
        },
      },
      {
        score: 3,
        label: {
          en: "Excruciating mortification — being singled out feels dangerous, humiliating, and unbearable",
          id: "Siksaan batin luar biasa — dijadikan pusat perhatian terasa berbahaya, memalukan, dan tak tertahankan",
          de: "Unerträgliche Pein — im Mittelpunkt zu stehen fühlt sich lebensbedrohlich und entwürdigend an",
          fr: "Torture absolue — être sous les feux de la rampe me paraît humiliant et terrifiant",
          es: "Tortura absoluta — ser el centro de atención se siente peligroso, denigrante e insoportable",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "visibility_dread",
    prompt: {
      en: "I panic when speaking up in meetings or group dinners, even when I know the exact correct answer.",
      id: "Aku panik saat harus berbicara di rapat atau makan malam bersama, meski aku tahu persis jawaban yang benar.",
      de: "Ich bekomme Herzrasen, wenn ich mich in Meetings oder bei Tisch zu Wort melden soll, selbst wenn ich die Lösung kenne.",
      fr: "Je panique à l'idée de prendre la parole en réunion ou lors d'un dîner, même quand je détiens la réponse exacte.",
      es: "Me aterra hablar en reuniones o comidas grupales, aun cuando sé perfectamente la respuesta correcta.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — speaking to groups feels completely manageable",
          id: "Tidak setuju — berbicara di depan grup terasa sangat wajar dan terkendali",
          de: "Stimme nicht zu — vor Gruppen zu sprechen fällt mir leicht",
          fr: "Pas d'accord — m'exprimer en groupe ne me pose aucun problème",
          es: "En desacuerdo — hablar en grupo me resulta manejable y natural",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — mild butterflies before taking the floor",
          id: "Kadang — sedikit gugup sesaat sebelum mulai bicara",
          de: "Gelegentlich — leichtes Lampenfieber vor dem ersten Satz",
          fr: "Parfois — un petit trac avant d'intervenir",
          es: "A veces — mariposas en el estómago antes de hablar",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — dry mouth, shaky voice, and rapid heart rate force me to stay quiet",
          id: "Sering — tenggorokan tercekat, suara bergetar, dan jantung memburu membuatku memilih diam",
          de: "Häufig — trockener Mund, zittrige Stimme und Herzrasen lassen mich lieber schweigen",
          fr: "Souvent — gorge sèche, voix tremblante et palpitations me poussent au silence",
          es: "Frecuentemente — boca seca, voz temblorosa y taquicardia me fuerzan a callar",
        },
      },
      {
        score: 3,
        label: {
          en: "Total freeze — throat locks up; I experience dorsal vagal shutdown rather than be heard",
          id: "Lumpuh total — pita suara terkunci; sistem sarafku memilih 'freeze' daripada harus bersuara",
          de: "Völlige Starre — die Stimme versagt komplett; mein Nervensystem schaltet in den Shutdown",
          fr: "Blocage total — la gorge se verrouille; mon système nerveux passe en état de sidération",
          es: "Bloqueo total — la garganta se me cierra; mi sistema nervioso se apaga antes de hablar",
        },
      },
    ],
  },

  // Subscale 2: Covert Concealment (Downplaying existence, shrinking presence, stealth living)
  {
    id: 5,
    subscale: "covert_concealment",
    prompt: {
      en: "I deliberately wear plain, neutral clothing (black, grey, oversized) to blend into the background and avoid catching anyone's eye.",
      id: "Aku sengaja memakai pakaian serba polos dan netral (hitam, abu-abu, gombrang) agar membaur dan tidak menarik perhatian orang.",
      de: "Ich trage bewusst unauffällige, weite Kleidung in neutralen Farben, um in der Masse unsichtbar zu werden.",
      fr: "Je m'habille délibérément de façon neutre et discrète (noir, gris, ample) pour me fondre dans le décor.",
      es: "Visto deliberadamente ropa neutra y holgada (negro, gris) para camuflarme y pasar desapercibido.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I wear whatever expresses my authentic personality",
          id: "Tidak setuju — aku memakai apa pun yang mengekspresikan kepribadianku secara bebas",
          de: "Stimme nicht zu — ich trage, was mir gefällt und meine Persönlichkeit ausdrückt",
          fr: "Pas d'accord — je m'habille selon mes goûts sans me cacher",
          es: "En desacuerdo — visto lo que expresa mi personalidad sin ocultarme",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — preference for understated casual looks",
          id: "Kadang — sekadar lebih menyukai gaya santai yang tidak mencolok",
          de: "Gelegentlich — mag es einfach schlicht und praktisch",
          fr: "Parfois — simple préférence pour la sobriété",
          es: "A veces — mera preferencia por la sencillez",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — standing out visually feels dangerous; I use clothing as camouflage",
          id: "Sering — tampil mencolok secara visual terasa menakutkan; pakaian adalah kamuflaseku",
          de: "Häufig — optisch aufzufallen empfinde ich als Risiko; Kleidung dient als Tarnung",
          fr: "Souvent — me démarquer me semble risqué; mes vêtements me servent de bouclier",
          es: "Frecuentemente — destacar visualmente me asusta; uso la ropa como camuflaje",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly — my entire physical presentation is calculated to render me as invisible as a shadow",
          id: "Selalu — seluruh penampilanku dirancang dengan cermat agar aku tidak terlihat seperti bayangan",
          de: "Ständig — mein ganzes Auftreten ist darauf kalkuliert, wie ein Geist durchs Leben zu gehen",
          fr: "Constamment — tout mon style est pensé pour m'effacer comme une ombre",
          es: "Constantemente — toda mi apariencia está calculada para hacerme invisible como una sombra",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "covert_concealment",
    prompt: {
      en: "I hide my talents, creative projects, or career wins from friends and social media because the thought of being seen makes me sick.",
      id: "Aku menyembunyikan bakat, karya kreatif, atau prestasi kerjaku dari teman dan medsos karena merasa mual jika dilihat orang.",
      de: "Ich verheimliche Talente, kreative Projekte oder berufliche Siege, weil der Gedanke, gesehen zu werden, mir Unbehagen bereitet.",
      fr: "Je dissimule mes talents, mes créations ou mes réussites car l'idée d'être exposé m'angoisse.",
      es: "Oculto mis talentos, creaciones o éxitos profesionales porque la idea de que me vean me revuelve el estómago.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I share my accomplishments comfortably and openly",
          id: "Tidak setuju — aku membagikan pencapaian dan karyaku dengan percaya diri",
          de: "Stimme nicht zu — ich teile Erfolge und Werke mit Freude",
          fr: "Pas d'accord — je partage mes accomplissements sans honte",
          es: "En desacuerdo — comparto mis logros y proyectos con agrado",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly — selective sharing with close confidants only",
          id: "Ringan — hanya berbagi pada lingkaran orang terdekat",
          de: "Leicht — teile es nur im engsten Kreis",
          fr: "Légèrement — je ne partage qu'avec mes intimes",
          es: "Levemente — solo lo comparto con personas muy cercanas",
        },
      },
      {
        score: 2,
        label: {
          en: "Substantially — I keep massive portfolios of brilliant work completely hidden in digital drawers",
          id: "Cukup besar — banyak karya hebatku yang kusimpan rapat di folder rahasia tanpa pernah dipublikasikan",
          de: "Erheblich — ich halte großartige Arbeiten streng in der Schublade versteckt",
          fr: "Sensiblement — j'ai des dossiers remplis de créations que je n'ose montrer à personne",
          es: "Bastante — guardo proyectos brillantes bajo llave por temor a exponerlos",
        },
      },
      {
        score: 3,
        label: {
          en: "Total concealment — I actively play dumb or pretend to be incompetent so no one expects anything from me",
          id: "Penyembunyian total — aku sengaja pura-pura bodoh atau tidak bisa apa-apa agar orang tidak menaruh ekspektasi padaku",
          de: "Völliges Versteckspiel — ich stelle mich absichtlich dumm, um bloß keine Erwartungen zu wecken",
          fr: "Dissimulation absolue — je feins l'incompétence pour qu'on ne remarque jamais mon potentiel",
          es: "Ocultamiento total — me hago el tonto a propósito para que nadie espere nada de mí",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "covert_concealment",
    prompt: {
      en: "I post something on social media (a photo, thought, or story) and delete it within minutes out of sudden, overwhelming regret.",
      id: "Aku mengunggah sesuatu di medsos (foto, opini, atau story) lalu menghapusnya beberapa menit kemudian karena dilanda penyesalan akut.",
      de: "Ich poste etwas auf Social Media und lösche es nach wenigen Minuten aus plötzlicher Reue wieder.",
      fr: "Je publie une photo ou un avis sur les réseaux sociaux et le supprime après quelques minutes pris de panique.",
      es: "Publico algo en redes sociales y lo borro a los pocos minutos presa de un arrepentimiento instantáneo.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — I post what I want without obsessive second-guessing",
          id: "Tidak pernah — aku mengunggah apa yang kuinginkan tanpa cemas berlebihan",
          de: "Nie — ich poste ohne ständiges Grübeln",
          fr: "Jamais — je poste sans me torturer l'esprit",
          es: "Nunca — publico lo que deseo sin darle mil vueltas",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only if there was a glaring typo or error",
          id: "Jarang — hanya jika ada salah ketik yang fatal",
          de: "Selten — nur bei offensichtlichen Tippfehlern",
          fr: "Rarement — seulement s'il y a une grosse faute",
          es: "Rara vez — solo por erratas evidentes",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — the vulnerability hangover hits hard: 'Why did I think anyone cared? I look so conceited.'",
          id: "Sering — rasa malu langsung menyergap: 'Ngapain aku ngepos ini? Kelihatan caper banget deh.'",
          de: "Häufig — der Schamkater schlägt zu: 'Warum habe ich das getan? Es wirkt so anmaßend.'",
          fr: "Souvent — la gueule de bois de la vulnérabilité me frappe : 'Pour qui je me prends ?'",
          es: "Frecuentemente — la resaca de vulnerabilidad me golpea: '¿Por qué lo subí? Qué ridículo.'",
        },
      },
      {
        score: 3,
        label: {
          en: "Always — I am a complete ghost online; I consume content anonymously with zero public footprint",
          id: "Selalu — aku seperti hantu di internet; hanya melihat konten orang lain secara anonim tanpa jejak",
          de: "Immer — ich bin ein Geist im Netz; ich konsumiere nur anonym ohne jeden eigenen Fußabdruck",
          fr: "Toujours — je suis un fantôme virtuel; je regarde tout sans jamais laisser la moindre trace",
          es: "Siempre — soy un fantasma digital; consumo contenido en el anonimato sin dejar rastro",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "covert_concealment",
    prompt: {
      en: "I avoid eating, drinking, or checking my phone in front of others because performing human actions in public feels exposed.",
      id: "Aku sungkan makan, minum, atau mengecek HP di depan orang lain karena merasa canggung melakukan hal manusiawi di ruang terbuka.",
      de: "Ich meide es, vor anderen zu essen, zu trinken oder mein Handy zu bedienen, weil es sich entblößend anfühlt.",
      fr: "J'évite de manger, de boire ou de regarder mon téléphone en public car ces gestes me font sentir trop vulnérable.",
      es: "Evito comer, beber o mirar el móvil delante de otros porque hacer cosas cotidianas me hace sentir expuesto.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — basic bodily needs in public are totally unremarkable",
          id: "Tidak setuju — makan atau minum di tempat umum adalah hal biasa yang tidak perlu dipikirkan",
          de: "Stimme nicht zu — alltägliche Handlungen in der Öffentlichkeit sind mir völlig vertraut",
          fr: "Pas d'accord — ces gestes font partie de la vie normale",
          es: "En desacuerdo — comer o beber en público es algo totalmente cotidiano",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly — slightly self-conscious eating messy foods (like ribs or wings)",
          id: "Ringan — hanya canggung kalau makan makanan yang berantakan (seperti saus belepotan)",
          de: "Leicht — nur bei unordentlichem Essen etwas gehemmt",
          fr: "Légèrement — seulement avec des plats salissants",
          es: "Levemente — solo con comidas aparatosas",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I wait until I am alone in my car or room to eat, drink, or adjust my clothes",
          id: "Sering — aku memilih menahan lapar sampai sendirian di mobil atau kamar baru makan dengan tenang",
          de: "Häufig — ich warte lieber, bis ich allein im Auto oder Zimmer bin, um in Ruhe zu essen",
          fr: "Souvent — j'attends d'être seul dans ma voiture ou ma chambre pour manger ou boire",
          es: "Frecuentemente — prefiero esperar a estar a solas en mi coche o habitación para comer tranquilo",
        },
      },
      {
        score: 3,
        label: {
          en: "Extremely — merely possessing a physical body that occupies space in front of others induces profound shame",
          id: "Sangat ekstrem — keberadaan fisik tubuhku di hadapan orang lain saja sudah memicu rasa malu yang mendalam",
          de: "Extrem — allein die Tatsache, einen sichtbaren Körper im Raum zu haben, löst Scham aus",
          fr: "Extrêmement — le simple fait d'avoir un corps visible dans l'espace m'inspire une honte vive",
          es: "Extremadamente — el mero hecho de ocupar espacio físico delante de otros me provoca una vergüenza atroz",
        },
      },
    ],
  },

  // Subscale 3: Post-Exposure Rumination (The vulnerability hangover and mental replay)
  {
    id: 9,
    subscale: "post_exposure_rumination",
    prompt: {
      en: "After any social gathering, meeting, or party, I spend hours (or days) replaying every sentence I said, agonizing over how foolish I looked.",
      id: "Setelah kumpul-kumpul, rapat, atau pesta, aku menghabiskan berjam-jam memutar ulang setiap kalimatku, mencemaskan betapa konyolnya diriku.",
      de: "Nach jedem Treffen oder Meeting gehe ich stundenlang jeden einzelnen Satz durch und quäle mich mit der Angst, mich blamiert zu haben.",
      fr: "Après une soirée ou une réunion, je ressasse chaque mot prononcé pendant des heures, persuadé d'avoir été ridicule.",
      es: "Tras una fiesta o reunión, paso horas repasando cada frase que dije, atormentado por si quedé en ridículo.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — when an event ends, my mind moves forward immediately",
          id: "Tidak pernah — begitu acara selesai, pikiranku langsung beralih ke hal lain",
          de: "Nie — nach dem Event denke ich an andere Dinge",
          fr: "Jamais — une fois l'événement passé, je passe à autre chose",
          es: "Nunca — al terminar un evento, mi mente sigue adelante sin rumiar",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — a brief 5-minute review if an awkward moment occurred",
          id: "Kadang — introspeksi singkat 5 menit hanya jika ada momen canggung yang nyata",
          de: "Gelegentlich — kurzes Nachdenken, wenn etwas wirklich peinlich war",
          fr: "Parfois — une réflexion rapide de 5 minutes en cas de malaise réel",
          es: "A veces — un repaso de 5 minutos solo si hubo un momento incómodo",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I dissect my vocal inflection, jokes that fell flat, and micro-expressions of others for hours",
          id: "Sering — aku membedah intonasi suaraku, leluconku yang garing, dan ekspresi orang lain selama berjam-jam",
          de: "Häufig — ich seziere meine Stimmlage, Witze und die Mimik der anderen stundenlang",
          fr: "Souvent — je dissèque le ton de ma voix et la moindre réaction de l'audience",
          es: "Frecuentemente — analizo mi tono, mis bromas y los gestos ajenos durante horas",
        },
      },
      {
        score: 3,
        label: {
          en: "Agonizing — debilitating shame spiral; I physically cringe, groan aloud in my bedroom, and wish to erase my existence",
          id: "Sangat menyiksa — spiral rasa malu yang melumpuhkan; aku meringis kesakitan di kamar dan ingin menghilang dari muka bumi",
          de: "Zermürbend — lähmende Schamspirale; ich stöhne vor Peinlichkeit laut auf und will mich auflösen",
          fr: "Dévastateur — une spirale de honte atroce; je grimace de douleur seul dans mon lit en voulant m'évaporer",
          es: "Devastador — espiral de vergüenza insoportable; me retuerzo a solas de la culpa deseando desaparecer",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "post_exposure_rumination",
    prompt: {
      en: "I assume that people remember my awkwardness and flaws with the exact same magnifying intensity that I do.",
      id: "Aku mengira orang lain mengingat kecanggunganku dan kekuranganku dengan intensitas lensa pembesar yang sama tajamnya denganku.",
      de: "Ich gehe fest davon aus, dass andere meine Fehler mit derselben Lupe betrachten und abspeichern wie ich selbst.",
      fr: "Je présume que les autres se souviennent de mes maladresses avec la même loupe grossissante que moi.",
      es: "Asumo que los demás recuerdan mis torpezas con la misma lupa implacable con la que yo me juzgo.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I understand the 'Spotlight Effect': people are mostly focused on themselves",
          id: "Tidak setuju — aku paham 'Spotlight Effect': orang lain pada dasarnya terlalu sibuk memikirkan diri mereka sendiri",
          de: "Stimme nicht zu — ich kenne den 'Spotlight-Effekt': jeder denkt primär an sich selbst",
          fr: "Pas d'accord — je sais que chacun est bien trop occupé par ses propres soucis",
          es: "En desacuerdo — conozco el efecto foco: la gente está demasiado ocupada en sí misma",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly — I know logically they forget quickly, but emotional residue lingers",
          id: "Ringan — logikaku tahu mereka cepat lupa, tapi ada sisa emosi kecil yang tertinggal",
          de: "Leicht — logisch weiß ich, dass sie es vergessen, aber ein kleiner Rest bleibt",
          fr: "Légèrement — je sais qu'ils oublient vite, mais un petit doute persiste",
          es: "Levemente — sé que lo olvidan, pero queda un residuo de duda",
        },
      },
      {
        score: 2,
        label: {
          en: "Substantially — I feel labeled forever by one minor social misstep or stutter",
          id: "Cukup besar — aku merasa dicap buruk selamanya hanya karena satu kesalahan kecil atau ucapan terbata-bata",
          de: "Erheblich — ich befürchte, wegen eines kleinen Versprechers für immer abgestempelt zu sein",
          fr: "Sensiblement — j'ai l'impression d'être étiqueté à vie pour un simple bafouillage",
          es: "Bastante — siento que un tropiezo verbal me marcará negativamente para siempre",
        },
      },
      {
        score: 3,
        label: {
          en: "Totally — I am convinced that everyone in my social or professional circle secretly mocks my perceived inadequacy",
          id: "Sepenuhnya — aku yakin orang-orang di lingkunganku diam-diam menertawakan ketidakmampuanku",
          de: "Völlig — ich bin überzeugt, dass mein Umfeld sich heimlich über meine Unzulänglichkeit lustig macht",
          fr: "Totalement — je suis persuadé que mon entourage se moque secrètement de mes défauts",
          es: "Totalmente — estoy convencido de que todos en secreto se burlan de mi supuesta torpeza",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "post_exposure_rumination",
    prompt: {
      en: "The emotional exhaustion of being seen or interacting forces me into days of solitary isolation to recover.",
      id: "Kelelahan emosional akibat dilihat atau berinteraksi memaksaku mengurung diri berhari-hari untuk memulihkan diri.",
      de: "Die Erschöpfung, gesehen worden zu sein, zwingt mich in tagelange soziale Isolation, um mich zu erholen.",
      fr: "L'épuisement d'avoir été vu et exposé m'oblige à m'isoler pendant plusieurs jours pour récupérer.",
      es: "El desgaste emocional de haber sido visto me obliga a aislarme durante días para recuperarme.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — social interactions don't drain me in this traumatic way",
          id: "Tidak setuju — interaksi sosial tidak menguras energiku secara traumatis seperti itu",
          de: "Stimme nicht zu — Begegnungen erschöpfen mich nicht auf diese traumatische Art",
          fr: "Pas d'accord — les échanges ne me vident pas de cette façon",
          es: "En desacuerdo — socializar no me drena de esta manera tan traumática",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly — standard introvert rest of a quiet evening",
          id: "Ringan — istirahat introvert standar dengan bersantai satu malam",
          de: "Leicht — brauche danach einfach einen ruhigen Abend",
          fr: "Légèrement — une simple soirée au calme me suffit",
          es: "Levemente — solo requiero una noche tranquila para recargar",
        },
      },
      {
        score: 2,
        label: {
          en: "Substantially — social masking takes such a heavy cognitive toll that I cancel plans for 48 hours",
          id: "Cukup besar — memakai 'topeng sosial' begitu menguras otak hingga aku membatalkan rencana selama 48 jam",
          de: "Erheblich — das soziale Maskieren kostet so viel Energie, dass ich Pläne für zwei Tage absage",
          fr: "Sensiblement — porter un masque social m'épuise au point d'annuler mes plans pendant 48 heures",
          es: "Bastante — fingir normalidad me agota tanto que cancelo compromisos por 48 horas",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe crash — exposure triggers a depressive dip where I hide behind drawn curtains in total sensory silence",
          id: "Crash parah — terekspos memicu penurunan mood drastis hingga aku mengunci diri di kamar gelap tanpa suara",
          de: "Schwerer Absturz — Sichtbarkeit führt in ein depressives Loch mit abgedunkelten Fenstern",
          fr: "Effondrement total — l'exposition déclenche une chute dépressive où je me terre dans le noir",
          es: "Colapso total — exponerme desata un bajón depresivo que me encierra a oscuras",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "post_exposure_rumination",
    prompt: {
      en: "Deep down, I feel an irrational fantasy: life would be peaceful and safe if I could simply exist as a disembodied consciousness without a perceivable physical body.",
      id: "Jauh di lubuk hatiku, ada fantasi irasional: hidup akan jauh lebih damai andai aku bisa ada sebagai kesadaran tanpa tubuh fisik yang bisa dilihat orang.",
      de: "Tief im Inneren habe ich den Wunsch: Das Leben wäre friedlich, wenn ich einfach als körperloses Bewusstsein existieren könnte.",
      fr: "Au fond de moi, j'ai ce fantasme : la vie serait si paisible si je pouvais exister comme un esprit pur sans enveloppe corporelle.",
      es: "En el fondo, guardo una fantasía: la vida sería perfecta si pudiera ser una conciencia pura sin un cuerpo físico observable.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — I enjoy having a body and living in the physical world",
          id: "Tidak pernah — aku menikmati memiliki tubuh dan hidup di dunia nyata",
          de: "Nie — ich bewohne meinen Körper gerne und lebe gern in der materiellen Welt",
          fr: "Jamais — j'aime habiter mon corps et vivre dans le monde physique",
          es: "Nunca — disfruto tener cuerpo y vivir plenamente en el mundo físico",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only during sci-fi daydreams or fleeting moments of fatigue",
          id: "Jarang — hanya saat melamun film sci-fi atau ketika sangat lelah",
          de: "Selten — nur bei Science-Fiction-Tagträumen oder tiefer Müdigkeit",
          fr: "Rarement — juste dans des rêveries ou lors d'une grande fatigue",
          es: "Rara vez — solo en fantasías de ciencia ficción o tras un día agotador",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — having a physical form that can be scrutinized, weighed, and judged feels exhausting",
          id: "Sering — memiliki wujud fisik yang bisa dinilai, ditatap, dan dihakimi terasa sangat melelahkan",
          de: "Oft — eine sichtbare physische Form zu haben, die beurteilt werden kann, ist unendlich anstrengend",
          fr: "Souvent — avoir une enveloppe corporelle exposée au regard d'autrui m'épuise",
          es: "A menudo — tener un cuerpo sujeto al escrutinio y juicio ajeno resulta agotador",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronically — the core of my anxiety is precisely the sheer terror of being perceived as a corporeal being",
          id: "Kronis — akar kecemasanku adalah ketakutan mendalam terhadap fakta bahwa diriku bisa dilihat orang lain",
          de: "Chronisch — der Kern meiner Angst ist schlichtweg der Horror davor, als physisches Wesen wahrgenommen zu werden",
          fr: "Chronique — le cœur de mon anxiété réside dans la terreur pure d'être perçu physiquement par autrui",
          es: "Crónicamente — el núcleo de mi angustia es el terror visceral a ser percibido como un ser de carne y hueso",
        },
      },
    ],
  },
];

export const PERCEIVED_ARCHETYPES: Record<PerceivedArchetype["level"], PerceivedArchetype> = {
  visibly_unapologetic: {
    level: "visibly_unapologetic",
    badge: {
      en: "Radiant & Unapologetic",
      id: "Percaya Diri & Nyaman",
      de: "Souverän Sichtbar",
      fr: "Rayonnant & Authentique",
      es: "Radiante y Seguro",
    },
    title: {
      en: "Grounded Radiance & Natural Presence",
      id: "Kenyamanan Diri & Kehadiran yang Alami",
      de: "Geerdete Präsenz & Natürliche Souveränität",
      fr: "Présence Naturelle & Ancrage Paisible",
      es: "Presencia Serena y Autenticidad Natural",
    },
    tagline: {
      en: "You inhabit your body and voice with ease, recognizing that being perceived is simply the natural currency of living.",
      id: "Kamu menghuni tubuh dan suaramu dengan nyaman, menyadari bahwa dilihat orang lain adalah bagian alami dari kehidupan.",
      de: "Du bewohnst deinen Körper und deine Stimme mit Leichtigkeit und weißt, dass Sichtbarkeit zum Leben gehört.",
      fr: "Vous habitez votre corps et votre voix avec aisance, conscient qu'être vu est simplement le prix du vivant.",
      es: "Habitas tu cuerpo y tu voz con serenidad, sabiendo que ser visto es parte natural de la existencia.",
    },
    description: {
      en: "Your scores reflect minimal fear of being perceived. You do not suffer from the cognitive illusion that every eye in the room is cataloging your flaws. You speak, dress, and move through public spaces without compulsive camouflage or post-social shame spirals.",
      id: "Skormu menunjukkan ketenangan emosional saat berinteraksi. Kamu tidak terjebak dalam ilusi bahwa semua orang sedang mengawasi kelemahanmu. Kamu bisa berekspresi secara wajar tanpa perlu menyembunyikan diri.",
      de: "Deine Werte belegen geringe Angst vor Wahrnehmung. Du leidest nicht unter dem Spotlight-Effekt und musst dich nicht verkleiden oder verstecken, um dich sicher zu fühlen.",
      fr: "Vos résultats indiquent une grande liberté face au regard d'autrui. Vous n'êtes pas prisonnier de l'effet projecteur et évoluez sans honte ni camouflage.",
      es: "Tus resultados reflejan seguridad ante el escrutinio social. No sufres el efecto foco y te mueves por el mundo sin necesidad de camuflarte ni aislarte.",
    },
    psychologyInsight: {
      en: "You possess high somatic safety and low Social Evaluative Threat (SET). Your nervous system interprets the gaze of others as neutral social information rather than a predatory scan for vulnerability.",
      id: "Kamu memiliki rasa aman somatik yang tinggi. Sistem sarafmu menafsirkan tatapan orang lain sebagai interaksi netral, bukan ancaman pemangsaan terhadap kelemahanmu.",
      de: "Dein Nervensystem interpretiert Blicke anderer als neutrale Information und nicht als Bedrohung deines sozialen Überlebens.",
      fr: "Votre système nerveux perçoit le regard d'autrui comme une information neutre et non comme une menace existentielle de jugement.",
      es: "Tu sistema nervioso interpreta las miradas ajenas como información neutra y no como un ataque contra tu integridad.",
    },
    actionProtocols: {
      en: [
        "Continue using your voice to advocate for projects and boundaries.",
        "Model healthy visibility for friends who struggle with severe concealment.",
        "Celebrate creative outputs publicly without second-guessing.",
      ],
      id: [
        "Terus gunakan suaramu untuk menyuarakan ide dan batasan diri secara sehat.",
        "Jadilah teladan kenyamanan sosial bagi teman yang masih takut tampil.",
        "Publikasikan karyamu tanpa rasa malu atau overthinking.",
      ],
      de: [
        "Nutze deine Stimme weiterhin für Ideen und klare Grenzen.",
        "Sei ein Vorbild für entspannte Sichtbarkeit im Freundeskreis.",
        "Teile kreative Werke ohne nachträgliches Löschen.",
      ],
      fr: [
        "Continuez d'exprimer vos idées avec clarté et assurance.",
        "Montrez la voie d'une présence apaisée à vos proches plus discrets.",
        "Partagez vos projets sans céder au regret d'avoir été vu.",
      ],
      es: [
        "Sigue expresando tus ideas con firmeza y serenidad.",
        "Sé un referente de presencia tranquila para quienes temen mostrarse.",
        "Publica y comparte tu trabajo sin arrepentimientos posteriores.",
      ],
    },
    dailyAffirmation: {
      en: "I have the right to occupy physical space, to be seen, and to exist unapologetically in the light.",
      id: "Aku berhak menempati ruang fisik, terlihat, dan hidup dengan bangga di bawah cahaya terang.",
      de: "Ich habe das Recht, Raum einzunehmen, gesehen zu werden und furchtlos im Licht zu stehen.",
      fr: "J'ai le droit d'occuper de l'espace, d'être vu et d'exister pleinement dans la lumière.",
      es: "Tengo derecho a ocupar espacio, a ser visto y a existir plenamente bajo la luz.",
    },
  },

  reluctant_spotlight: {
    level: "reluctant_spotlight",
    badge: {
      en: "The Hesitant Contributor",
      id: "Penyimpan Bakat",
      de: "Der zögerliche Denker",
      fr: "L'Observateur Retenu",
      es: "El Pensador Cauteloso",
    },
    title: {
      en: "The Hesitant Contributor & Covert Thinker",
      id: "Pemikir Berbakat yang Menahan Diri",
      de: "Der reflektierte Beobachter im Halbschatten",
      fr: "L'Artisan de l'Ombre & la Voix Retenue",
      es: "El Creador en la Penumbra y la Voz Cauta",
    },
    tagline: {
      en: "You have brilliant ideas and quiet brilliance, but bringing them into the spotlight triggers a sudden surge of self-censorship.",
      id: "Kamu memiliki ide cemerlang dan kemampuan hebat, namun membawanya ke sorot lampu memicu sensor diri yang mendadak.",
      de: "Du hast kluge Ideen, doch sobald das Rampenlicht auf dich fällt, setzt reflexartige Selbstzensur ein.",
      fr: "Vous possédez de remarquables idées, mais les mettre en avant déclenche un réflexe d'autocensure immédiat.",
      es: "Tienes ideas valiosas, pero exponerlas ante los demás dispara una autocensura automática.",
    },
    description: {
      en: "You manage daily life well, but public visibility makes you deeply uncomfortable. You prefer working behind the scenes. You occasionally delete social posts, avoid asking questions in large town halls, and experience a mild vulnerability hangover after being celebrated. You prefer being respected over being looked at.",
      id: "Kamu bisa beraktivitas dengan baik, namun sorotan publik membuatmu risih. Kamu lebih suka bekerja di balik layar. Sesekali kamu menghapus postingan medsos, sungkan bertanya di forum besar, dan merasa sedikit canggung setelah dipuji.",
      de: "Du meisterst deinen Alltag, doch öffentlicher Fokus stresst dich. Du arbeitest lieber hinter den Kulissen, löschst gelegentlich Beiträge und bist nach Lob verlegen.",
      fr: "Vous fonctionnez bien au quotidien, mais la mise en avant vous coûte. Vous préférez l'arrière-scène et ressentez un léger malaise après un éloge.",
      es: "Te desenvuelves bien, pero la exposición pública te incomoda. Prefieres el trabajo entre bambalinas y sueles dudar tras compartir tus logros.",
    },
    psychologyInsight: {
      en: "Thomas Gilovich's 'Spotlight Effect' research demonstrates that humans intuitively overestimate how much others notice their appearance or slip-ups by over 50%. You are projecting internal scrutiny outward.",
      id: "Riset 'Spotlight Effect' oleh Thomas Gilovich membuktikan bahwa manusia melebih-lebihkan perhatian orang lain terhadap penampilan atau kesalahan mereka hingga lebih dari 50%. Kamu sedang memproyeksikan kritik internalmu ke mata orang lain.",
      de: "Der 'Spotlight-Effekt' nach Thomas Gilovich belegt: Wir überschätzen um mehr als 50 %, wie intensiv andere unsere kleinen Ausrutscher registrieren.",
      fr: "L'effet projecteur de Thomas Gilovich démontre que nous surestimons de plus de 50 % l'attention que les autres portent à nos faux pas.",
      es: "El efecto foco de Thomas Gilovich revela que sobreestimamos en más de un 50% cuánto se fijan los demás en nuestros supuestos errores.",
    },
    actionProtocols: {
      en: [
        "The 10-Second Rule: When you have an answer in a meeting, speak within 10 seconds before your amygdala manufactures reasons to stay silent.",
        "Leave the post up: When you post on social media or publish a document, close the app immediately and do not open it for 2 hours.",
        "Voice Journal the Vulnerability: Use Nuju after public exposure to discharge the cognitive chatter.",
      ],
      id: [
        "Aturan 10 Detik: Saat punya jawaban di rapat, bicaralah dalam 10 detik pertama sebelum otakmu menciptakan alasan untuk bungkam.",
        "Biarkan Postinganmu Tayang: Setelah mengunggah tulisan atau karya, tutup aplikasi selama 2 jam tanpa bolak-balik mengecek.",
        "Curhatkan ke Jurnal Suara Nuju: Lepaskan sensasi canggung pasca presentasi lewat rekaman suara privat.",
      ],
      de: [
        "Die 10-Sekunden-Regel: Melde dich im Meeting innerhalb von 10 Sekunden, bevor dein Gehirn Zweifel fabriziert.",
        "Lass den Beitrag online: Schließe nach dem Posten die App für mindestens 2 Stunden.",
        "Nuju-Sprachmemo: Entlade die Aufregung nach einer Präsentation in einem geschützten Audiotagebuch.",
      ],
      fr: [
        "La règle des 10 secondes : prenez la parole dans les 10 secondes avant que le doute ne s'installe.",
        "Laissez la publication en ligne : fermez l'application pendant 2 heures après avoir posté.",
        "Audio Nuju : déchargez l'angoisse d'exposition dans votre journal vocal sécurisé.",
      ],
      es: [
        "Regla de los 10 segundos: habla en las reuniones antes de que transcurran 10 segundos y gane la duda.",
        "Mantén la publicación: no abras la aplicación en las 2 horas posteriores a compartir algo.",
        "Diario de voz en Nuju: desahoga la resaca de vulnerabilidad tras una exposición pública.",
      ],
    },
    dailyAffirmation: {
      en: "People are not scrutinizing my flaws; they are navigating their own inner worlds. My voice deserves to be heard.",
      id: "Orang lain tidak sedang menguliti kekuranganku; mereka sibuk dengan dunia batin mereka sendiri. Suaraku layak didengar.",
      de: "Die anderen scannen nicht meine Fehler; sie sind mit sich selbst beschäftigt. Meine Stimme hat Gewicht.",
      fr: "Les autres ne dissèquent pas mes failles; ils sont absorbés par leur propre vie. Ma voix a toute sa place.",
      es: "Los demás no juzgan mis defectos; están ocupados con sus propias vidas. Mi voz merece ser escuchada.",
    },
  },

  hyper_vigilant_camouflager: {
    level: "hyper_vigilant_camouflager",
    badge: {
      en: "The Social Chameleon",
      id: "Bunglon Sosial",
      de: "Das soziale Chamäleon",
      fr: "Le Caméléon Social",
      es: "El Camaleón Hipervigilante",
    },
    title: {
      en: "The Social Chameleon & Hyper-Vigilant Camouflager",
      id: "Bunglon Sosial & Kamuflase Ekstrem",
      de: "Das soziale Chamäleon im ständigen Tarnmodus",
      fr: "Le Caméléon en Hypervigilance Permanente",
      es: "El Camaleón Social y la Vigilancia Defensiva",
    },
    tagline: {
      en: "You have mastered the art of being physically present while keeping your true self completely undetectable.",
      id: "Kamu sangat ahli hadir secara fisik di keramaian sembari menyembunyikan jati dirimu agar tidak terdeteksi.",
      de: "Du hast die Kunst perfektioniert, anwesend zu sein, während dein wahres Ich völlig unsichtbar bleibt.",
      fr: "Vous maîtrisez l'art d'être présent dans la pièce tout en rendant votre véritable être indétectable.",
      es: "Dominas el arte de estar presente físicamente mientras tu verdadero ser permanece invisible.",
    },
    description: {
      en: "Your scores reflect acute visibility dread. You carefully curate neutral clothing, avoid calling attention to yourself, and monitor every facial expression. After social interactions, you enter agonizing shame spirals—replaying casual conversations and burning with embarrassment. Being noticed feels like standing in the crosshairs of an impending attack.",
      id: "Skormu mencerminkan ketakutan intens terhadap sorotan. Kamu sengaja memakai pakaian serba redup, memantau ekspresi wajahmu tiap detik, dan dilanda rasa malu menyiksa setelah berinteraksi sosial. Dilihat orang terasa seperti menjadi sasaran tembak yang terancam bahaya.",
      de: "Du leidest unter akuter Angst vor Wahrnehmung. Du wählst unauffällige Kleidung, kontrollierst deine Mimik penibel und wirst nach jedem Treffen von quälenden Schamspiralen heimgesucht.",
      fr: "Vous souffrez d'une vive angoisse d'exposition. Vous contrôlez votre allure pour passer inaperçu et revivez chaque échange avec un sentiment d'humiliation rongeant.",
      es: "Padeces un miedo agudo a ser percibido. Te vistes para camuflarte, vigilas tus gestos y sufres espirales de vergüenza tras cualquier interacción cotidiana.",
    },
    psychologyInsight: {
      en: "This pattern stems from Social Evaluative Threat (SET) and developmental shaming. If early vulnerability was met with public humiliation, bullying, or harsh parental scrutiny, the nervous system concludes: 'Invisibility is the only guarantee of physical and emotional safety.'",
      id: "Pola ini lahir dari luka dipermalukan di masa lalu (*Social Evaluative Threat*). Jika masa kecilmu diwarnai perundungan atau kritikan tajam, otakmu menyimpulkan: 'Menjadi tak kasat mata adalah satu-satunya jaminan keselamatan.'",
      de: "Dies resultiert aus früher Beschämung oder Mobbing. Das Nervensystem speichert ab: 'Nur wer unsichtbar bleibt, ist vor Schmerz und Spott sicher.'",
      fr: "Cette défense naît d'humiliations passées. Le système nerveux a gravé la règle suivante : « L'invisibilité est ma seule garantie de survie émotionnelle. »",
      es: "Surge de heridas de humillación temprana o acoso. El sistema nervioso asume que ser invisible es el único modo de no ser lastimado.",
    },
    actionProtocols: {
      en: [
        "Micro-Visibility Exposure: Wear one item of color or ask one brief question in a store to desensitize your panic response.",
        "Somatic Grounding: When you feel eyes on you, place feet flat on the floor and exhale for 6 seconds to deactivate fight-or-flight.",
        "Reality Check Journaling in Nuju: Write down: 'Did anyone actually criticize me today, or did my mind fabricate the judgment?'",
      ],
      id: [
        "Paparan Keberanian Mikro: Kenakan satu aksesoris berwarna cerah atau tanyakan hal sederhana ke kasur toko untuk melatih sarafmu.",
        "Grounding Somatik: Saat merasa diperhatikan, tekan telapak kaki ke lantai dan hembuskan napas panjang 6 detik untuk menenangkan alarm bahaya.",
        "Uji Realita di Nuju: Catat di jurnal: 'Apakah ada orang yang benar-benar mengejekku hari ini, atau itu murni ilusi ketakutanku?'",
      ],
      de: [
        "Mikro-Exposition: Trage ein farbiges Detail oder stelle eine kurze Frage im Laden, um die Panikschwelle zu senken.",
        "Somatische Erdung: Spüre den Boden unter den Füßen und atme 6 Sekunden lang aus, wenn Blicke auf dir ruhen.",
        "Realitäts-Check in Nuju: Notiere: 'Hat mich heute wirklich jemand verurteilt oder war es nur mein innerer Kritiker?'",
      ],
      fr: [
        "Micro-exposition : portez un vêtement plus coloré ou posez une question simple à un passant pour habituer votre corps.",
        "Ancrage somatique : posez les pieds au sol et allongez l'expiration sur 6 secondes dès que vous vous sentez épié.",
        "Vérification des faits sur Nuju : notez si quelqu'un vous a réellement critiqué ou s'il s'agissait d'une projection.",
      ],
      es: [
        "Microexposiciones: usa un toque de color o haz una pregunta breve en una tienda para desensibilizar el pánico.",
        "Enraizamiento corporal: siente los pies en el suelo y exhala durante 6 segundos cuando sientas miradas sobre ti.",
        "Test de realidad en Nuju: escribe en el diario si hubo una crítica real o si fue solo una invención de tu mente.",
      ],
    },
    dailyAffirmation: {
      en: "I do not have to hide to be safe. It is safe for me to be seen, heard, and known in my authentic human form.",
      id: "Aku tidak harus bersembunyi demi merasa aman. Aman bagiku untuk terlihat, terdengar, dan dikenal apa adanya.",
      de: "Ich muss mich nicht verstecken, um sicher zu sein. Es ist sicher, mich in meiner wahren Gestalt zu zeigen.",
      fr: "Je n'ai pas besoin de me cacher pour être en sécurité. Je peux être vu et exister tel que je suis.",
      es: "No necesito esconderme para estar a salvo. Es seguro para mí ser visto y aceptado como soy.",
    },
  },

  invisible_ghost: {
    level: "invisible_ghost",
    badge: {
      en: "The Cloaked Ghost",
      id: "Hantu Tak Kasat Mata",
      de: "Der unsichtbare Schatten",
      fr: "Le Fantôme Invisible",
      es: "El Fantasma Invisible",
    },
    title: {
      en: "The Chronic Invisibility Ghost & Total Cloak",
      id: "Hantu Tak Kasat Mata & Penghapusan Diri Total",
      de: "Die totale Selbstauslöschung im Schutze der Unsichtbarkeit",
      fr: "La Dissolution du Corps & l'Ombre Absolue",
      es: "El Aislamiento Fantasmal y la Autoeliminación",
    },
    tagline: {
      en: "You treat your very existence as a shameful intrusion; merely having a visible, physical body feels unbearable.",
      id: "Kamu memperlakukan keberadaanmu sebagai gangguan yang memalukan; sekadar memiliki tubuh fisik yang terlihat terasa tak tertahankan.",
      de: "Du empfindest deine schiere Existenz als anmaßend; einen sichtbaren Körper zu bewohnen ist fast unerträglich.",
      fr: "Vous vivez votre existence comme une intrusion coupable; le simple fait d'avoir un corps visible vous pèse affreusement.",
      es: "Sientes tu existencia como un estorbo imperdonable; tener un cuerpo visible en el mundo te resulta insoportable.",
    },
    description: {
      en: "Your scores indicate severe, clinical-level fear of being perceived (scopophobia / visibility terror). You actively wish you could exist without a corporeal form. You avoid eating in public, dread your reflection, cancel essential medical appointments, and live in total digital and social concealment. The trauma of past exposure has driven your nervous system into chronic dorsal vagal collapse.",
      id: "Skormu mencerminkan ketakutan ekstrem terhadap keberadaan fisik (*scopophobia*). Kamu berharap bisa hidup tanpa tubuh nyata. Kamu menahan lapar di tempat umum, takut melihat cermin, menghindari dokter, dan hidup dalam persembunyian digital total.",
      de: "Deine Ergebnisse zeigen eine tiefgreifende Scopophobie (Angst vor Blicken). Du würdest am liebsten als körperloser Geist existieren. Du meidest Spiegel, Arztbesuche und jegliche digitale Spur aus nackter Furcht vor Entblößung.",
      fr: "Vos scores signalent une phobie aiguë du regard d'autrui (scopophobie). Vous rêvez d'exister sans enveloppe charnelle. Vous évitez les miroirs, repoussez les rendez-vous médicaux et vous terrez dans un silence absolu.",
      es: "Tus resultados indican una fobia severa a ser observado (escopofobia). Desearías no tener cuerpo físico. Evitas mirarte al espejo, cancelas citas médicas y vives en una clandestinidad social extrema.",
    },
    psychologyInsight: {
      en: "This extreme manifestation represents severe bodily dissociation and developmental trauma. The individual has learned that to be seen is to be annihilated, resulting in a somatic reflex to fold inward and vanish.",
      id: "Kondisi ini merupakan wujud disosiasi tubuh yang parah dan trauma perkembangan. Otak bawah sadarmu meyakini bahwa terlihat sama dengan kehancuran, memicu refleks somatik untuk mengecil dan lenyap.",
      de: "Hier liegt eine schwere körperliche Dissoziation vor. Das Nervensystem hat verinnerlicht: 'Gesehen werden bedeutet Vernichtung.'",
      fr: "Ce tableau relève d'une dissociation corporelle profonde liée au trauma : l'inconscient associe la visibilité à l'anéantissement pur.",
      es: "Representa una grave disociación corporal y trauma relacional: el inconsciente asocia la visibilidad con la aniquilación total.",
    },
    actionProtocols: {
      en: [
        "Trauma-Informed Therapy: Seek specialized support in Somatic Experiencing, EMDR, or Compassion-Focused Therapy (CFT).",
        "Gentle Mirror Work: Spend 30 seconds daily looking at your hands or feet with warm, non-judgmental acceptance.",
        "Encrypted Audio Sanctuary: Use Nuju's voice notes in a dark, quiet room to reconnect with the sound of your own voice safely.",
      ],
      id: [
        "Konseling Profesional: Sangat disarankan mencari psikolog dengan keahlian EMDR atau terapi trauma somatik.",
        "Latihan Cermin Lembut: Tatap telapak tangan atau kakimu selama 30 detik setiap hari dengan penerimaan yang hangat tanpa menghakimi.",
        "Sanctuary Jurnal Suara: Rekam suaramu sendiri di ruang privat Nuju untuk menyambung kembali hubungan dengan dirimu secara aman.",
      ],
      de: [
        "Traumatherapeutische Hilfe: Nutze EMDR oder Somatic Experiencing zur behutsamen Desensibilisierung.",
        "Sanfte Spiegelübung: Betrachte täglich 30 Sekunden lang deine eigenen Hände mit liebevoller Akzeptanz.",
        "Verschlüsseltes Sprachrefugium: Nutze Nujus Audiotagebuch im abgedunkelten Raum, um dich an deine eigene Stimme zu gewöhnen.",
      ],
      fr: [
        "Thérapie du trauma : orientez-vous vers l'EMDR ou la thérapie sensorimotrice pour sécuriser votre corps.",
        "Exercice du miroir bienveillant : regardez vos mains 30 secondes par jour avec tendresse et sans jugement.",
        "Sanctuaire audio Nuju : réappropriez-vous votre voix dans l'intimité d'un enregistrement chiffré.",
      ],
      es: [
        "Terapia especializada en trauma: busca apoyo en EMDR o Experiencia Somática para devolverle la seguridad a tu cuerpo.",
        "Práctica del espejo compasivo: mira tus manos durante 30 segundos al día con afecto y sin crítica.",
        "Refugio sonoro en Nuju: graba tu voz en la intimidad de tu diario para reencontrarte de forma segura contigo mismo.",
      ],
    },
    dailyAffirmation: {
      en: "My body is not a crime or an embarrassment. I have a legitimate, sacred place on this earth, and I am allowed to take up space.",
      id: "Tubuhku bukanlah aib atau kesalahan. Aku memiliki tempat yang sah dan suci di bumi ini, dan aku berhak menempati ruang.",
      de: "Mein Körper ist keine Schande. Ich habe einen legitimen Platz auf dieser Erde und darf sichtbar Raum einnehmen.",
      fr: "Mon corps n'est ni une faute ni une honte. J'ai une place légitime sur cette terre et le droit d'exister en plein jour.",
      es: "Mi cuerpo no es una vergüenza ni un error. Tengo un lugar sagrado en esta tierra y merezco ocupar espacio.",
    },
  },
};

export function calculatePerceivedScore(answers: Record<number, number>): PerceivedScoreResult {
  let totalScore = 0;
  let dreadScore = 0;
  let concealmentScore = 0;
  let ruminationScore = 0;

  PERCEIVED_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    totalScore += score;

    if (q.subscale === "visibility_dread") dreadScore += score;
    if (q.subscale === "covert_concealment") concealmentScore += score;
    if (q.subscale === "post_exposure_rumination") ruminationScore += score;
  });

  const maxTotal = PERCEIVED_QUESTIONS.length * 3; // 36
  const maxSubscale = 4 * 3; // 12
  const percentage = Math.round((totalScore / maxTotal) * 100);

  let level: PerceivedArchetype["level"];
  if (percentage <= 24) {
    level = "visibly_unapologetic";
  } else if (percentage <= 49) {
    level = "reluctant_spotlight";
  } else if (percentage <= 74) {
    level = "hyper_vigilant_camouflager";
  } else {
    level = "invisible_ghost";
  }

  return {
    totalScore,
    percentage,
    level,
    profile: PERCEIVED_ARCHETYPES[level],
    subscales: {
      visibility_dread: {
        score: dreadScore,
        percentage: Math.round((dreadScore / maxSubscale) * 100),
      },
      covert_concealment: {
        score: concealmentScore,
        percentage: Math.round((concealmentScore / maxSubscale) * 100),
      },
      post_exposure_rumination: {
        score: ruminationScore,
        percentage: Math.round((ruminationScore / maxSubscale) * 100),
      },
    },
  };
}
