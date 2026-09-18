export type AmbiguousLossCardLang = "en" | "id" | "de" | "fr" | "es";

export interface AmbiguousLossQuestion {
  id: number;
  subscale: "psychological_absence_presence" | "frozen_grief_closure_paralysis" | "boundary_ambiguity_exhaustion";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface AmbiguousLossResultLevel {
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
  psychology: {
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

export const AMBIGUOUS_LOSS_QUESTIONS: AmbiguousLossQuestion[] = [
  // 1. Psychological Absence / Presence Paradox (Q1 - Q4)
  {
    id: 1,
    subscale: "psychological_absence_presence",
    text: {
      en: "Someone important in my life is physically present in front of me, but emotionally, psychologically, or cognitively unreachable.",
      id: "Seseorang yang penting dalam hidupku ada secara fisik di depanku, namun secara emosional atau batin terasa sangat jauh dan tak terjangkau.",
      de: "Eine wichtige Person in meinem Leben ist körperlich anwesend, emotional oder geistig jedoch völlig unerreichbar.",
      fr: "Une personne importante de ma vie est physiquement présente, mais émotionnellement ou psychologiquement inaccessible.",
      es: "Alguien fundamental en mi vida está físicamente a mi lado, pero emocional o mentalmente se encuentra a años luz de distancia."
    }
  },
  {
    id: 2,
    subscale: "psychological_absence_presence",
    text: {
      en: "I am grieving someone who is physically absent or has cut contact, yet their psychological presence still dominates my daily thoughts and emotional space.",
      id: "Aku berduka atas seseorang yang sudah tidak ada di dekatku atau memutuskan kontak, namun bayangan batinnya terus menguasai pikiran dan energiku.",
      de: "Ich trauere um jemanden, der physisch fort ist oder den Kontakt abgebrochen hat, dessen seelische Präsenz meinen Alltag jedoch weiter bestimmt.",
      fr: "Je pleure quelqu'un qui a disparu physiquement ou rompu le contact, mais dont la présence psychologique hante encore mes journées.",
      es: "Lloro a alguien que ya no está físicamente o cortó el contacto, pero cuya presencia psicológica sigue ocupando todo mi espacio mental."
    }
  },
  {
    id: 3,
    subscale: "psychological_absence_presence",
    text: {
      en: "The person I loved has changed so fundamentally (due to illness, addiction, ideological capture, or trauma) that they feel like a stranger wearing their face.",
      id: "Orang yang kusayangi telah berubah sedemikian drastis (karena penyakit, adiksi, atau trauma) hingga terasa seperti orang asing yang memakai wajah mereka.",
      de: "Die Person, die ich liebte, hat sich (durch Sucht, Krankheit oder Wandel) so radikal verändert, dass sie mir wie ein Fremder im vertrauten Körper vorkommt.",
      fr: "La personne que j'aimais a tellement changé (maladie, addiction ou rupture) qu'elle me semble être une inconnue portant son visage.",
      es: "La persona que amaba ha cambiado de forma tan radical (enfermedad, adicción o distancia) que parece un extraño habitando su cuerpo."
    }
  },
  {
    id: 4,
    subscale: "psychological_absence_presence",
    text: {
      en: "Sporadic, ambiguous breadcrumbs of contact (rare texts, half-hearted check-ins) keep me perpetually uncertain if the relationship is alive or dead.",
      id: "Interaksi yang sepotong-sepotong (chat sesekali, sapaan tanpa kejelasan) membuatku terus menggantung, tidak tahu apakah relasi ini masih hidup atau sudah mati.",
      de: "Sporadische, unklare Lebenszeichen (seltene Nachrichten) halten mich in ständiger Ungewissheit, ob die Beziehung noch existiert oder tot ist.",
      fr: "Des miettes de contact épisodiques (messages rares et flous) m'enferment dans l'incertitude de savoir si le lien existe encore ou non.",
      es: "Migajas esporádicas de contacto (mensajes ambiguos cada cierto tiempo) me mantienen en la duda de si la relación sigue viva o muerta."
    }
  },

  // 2. Frozen Grief & Closure Paralysis (Q5 - Q8)
  {
    id: 5,
    subscale: "frozen_grief_closure_paralysis",
    text: {
      en: "Because there was no official funeral, definitive breakup conversation, or clean ending, I feel my mourning process is completely frozen in time.",
      id: "Karena tidak pernah ada upacara perpisahan resmi, ucapan putus yang jelas, atau titik akhir konkret, proses dukaku terasa membeku tanpa ujung.",
      de: "Weil es keinen offiziellen Abschied, kein klärendes Gespräch oder definiertes Ende gab, fühlt sich meine Trauer wie eingefroren an.",
      fr: "Faute de fin explicite, d'adieu formel ou de rupture claire, mon processus de deuil est complètement bloqué dans les limbes.",
      es: "Al no haber existido una conversación de cierre definitiva, un adiós formal o un final claro, mi duelo se encuentra completamente congelado."
    }
  },
  {
    id: 6,
    subscale: "frozen_grief_closure_paralysis",
    text: {
      en: "I am exhausted from swinging like a pendulum between irrational hope ('maybe things will return to normal') and devastating grief ('it is already gone').",
      id: "Aku lelah terombang-ambing seperti bandul antara harapan semu ('mungkin nanti akan membaik lagi') dan kesedihan yang meremukkan ('semuanya sudah tiada').",
      de: "Ich bin erschöpft von dem ständigen Hin und Her zwischen irrationaler Hoffnung ('Vielleicht wird es wieder wie früher') und erdrückender Trauer ('Es ist vorbei').",
      fr: "Je suis épuisé d'osciller entre l'espoir irrationnel (« peut-être que tout redeviendra comme avant ») et la douleur du néant (« c'est fini »).",
      es: "Me agota oscilar como un péndulo entre la esperanza irracional ('quizá vuelva a ser como antes') y la tristeza aplastante ('ya lo he perdido')."
    }
  },
  {
    id: 7,
    subscale: "frozen_grief_closure_paralysis",
    text: {
      en: "My grief feels 'disenfranchised'—people around me don't validate my sorrow, telling me to 'just move on' or saying 'at least they are still alive.'",
      id: "Dukaku terasa tidak diakui orang lain—mereka menyuruhku 'move on saja' atau berkata 'syukurlah dia masih hidup', tanpa paham betapa pedihnya situasi ini.",
      de: "Meine Trauer wird vom Umfeld nicht anerkannt; man sagt mir, ich solle 'nach vorne schauen', oder wiegelt ab: 'Aber die Person lebt doch noch.'",
      fr: "Mon chagrin est invisible pour mon entourage : on me dit de « passer à autre chose » ou que « la personne est au moins encore vivante ».",
      es: "Mi dolor no es validado por los demás; me dicen que 'pase página' o argumentan que 'al menos la persona sigue viva', sin entender el vacío."
    }
  },
  {
    id: 8,
    subscale: "frozen_grief_closure_paralysis",
    text: {
      en: "I obsessively replay our history in my mind, searching for the exact moment the rupture began, unable to reach peace without a final explanation.",
      id: "Aku memutar ulang kenangan masa lalu berulang-ulang, mencari tahu kapan keretakan ini dimulai, dan tersiksa karena tak pernah mendapat penjelasan akhir.",
      de: "Ich spule die Vergangenheit im Kopf immer wieder ab, suche nach dem Wendepunkt und finde ohne definitive Erklärung keine innere Ruhe.",
      fr: "Je rejoue le passé en boucle, cherchant le moment précis où tout a basculé, incapable de trouver la paix sans une explication définitive.",
      es: "Repaso mentalmente el pasado una y otra vez buscando el momento en que todo se rompió, incapaz de estar en paz sin una explicación final."
    }
  },

  // 3. Boundary Ambiguity & Caregiver/Partner Exhaustion (Q9 - Q12)
  {
    id: 9,
    subscale: "boundary_ambiguity_exhaustion",
    text: {
      en: "I suffer from severe 'role confusion'—I no longer know if I am their partner, child, caregiver, roommate, or merely a ghost in their peripheral vision.",
      id: "Aku mengalami kerancuan peran yang membingungkan—aku tak tahu lagi apakah posisiku sebagai pasangan, anak, perawat, atau sekadar orang asing di matanya.",
      de: "Ich leide unter extremer 'Rollenunklarheit' – ich weiß nicht mehr, ob ich Partner, Kind, Pflegender oder nur noch ein Schatten in ihrem Leben bin.",
      fr: "Je vis une confusion de rôle perturbante : je ne sais plus si je suis son partenaire, son enfant, son soignant ou un fantôme dans sa vie.",
      es: "Sufro una profunda confusión de roles: ya no sé si soy su pareja, su hijo, su cuidador o simplemente un espectro en su vida cotidiana."
    }
  },
  {
    id: 10,
    subscale: "boundary_ambiguity_exhaustion",
    text: {
      en: "I feel immense guilt whenever I experience personal happiness, pursue new opportunities, or consider moving on with my own life.",
      id: "Aku merasa sangat bersalah setiap kali merasakan kebahagiaan pribadi, mengejar cita-cita baru, atau berniat melanjutkan hidupku sendiri.",
      de: "Ich habe enorme Schuldgefühle, wenn ich persönliche Freude erlebe, neue Wege gehe oder darüber nachdenke, mein eigenes Leben weiterzuleben.",
      fr: "Je ressens une vive culpabilité dès que j'éprouve de la joie, que j'envisage de nouveaux projets ou que je tente d'avancer.",
      es: "Siento una culpa enorme cada vez que experimento alegría personal, nuevos proyectos o considero reconstruir mi vida por separado."
    }
  },
  {
    id: 11,
    subscale: "boundary_ambiguity_exhaustion",
    text: {
      en: "I carry the daily psychological fatigue of holding two contradictory truths at the same time: 'They are here, yet they are gone.'",
      id: "Aku menanggung kelelahan psikis harian karena harus menampung dua kenyataan yang berlawanan sekaligus: 'Dia ada di sini, namun dia sudah tiada.'",
      de: "Mich zermürbt die tägliche mentale Last, zwei widersprüchliche Realitäten gleichzeitig halten zu müssen: 'Sie sind da, und doch verloren.'",
      fr: "Je porte l'épuisement quotidien de vivre avec deux vérités incompatibles : « cette personne est là, et pourtant elle n'est plus là ».",
      es: "Cargo con el agotamiento diario de sostener dos verdades contradictorias a la vez: 'Está aquí presente, pero a la vez ya no está'."
    }
  },
  {
    id: 12,
    subscale: "boundary_ambiguity_exhaustion",
    text: {
      en: "In moments of sheer exhaustion, I secretly wish for a definitive ending or catastrophic break just so this excruciating limbo would finally stop—and then I feel sick with shame.",
      id: "Di saat lelah luar biasa, aku diam-diam berharap ada akhir yang tegas atau perpisahan mutlak agar ketidakpastian ini berakhir—lalu aku merasa jijik pada diriku sendiri.",
      de: "In Momenten purer Erschöpfung wünsche ich mir heimlich ein endgültiges Ende, nur damit diese Ungewissheit aufhört – und schäme mich zutiefst dafür.",
      fr: "Dans les moments d'épuisement extrême, je souhaite secrètement une rupture nette juste pour que ce calvaire s'arrête, avant d'en avoir honte.",
      es: "En momentos de agotamiento extremo, he deseado en secreto un final tajante solo para detener este limbo asfixiante, sintiendo luego una culpa atroz."
    }
  }
];

export const AMBIGUOUS_LOSS_RESULTS: AmbiguousLossResultLevel[] = [
  {
    level: "clear_closure_fluidity",
    scoreRange: [0, 9],
    title: {
      en: "High Boundary Clarity & Resolved Mourning",
      id: "Kejelasan Batasan Batin & Duka Tuntas",
      de: "Hohe Rollenklarheit & Integrierte Trauer",
      fr: "Clarté des Limites & Deuil Résolu",
      es: "Claridad Vincular y Duelo Resuelto"
    },
    summary: {
      en: "You have clear boundaries between physical presence and psychological attachment. Your relationships operate with defined roles, and when loss occurs, you are able to process closure without chronic limbo paralysis.",
      id: "Kamu memiliki batasan batin yang sehat antara kehadiran fisik dan ikatan emosional. Hubunganmu memiliki peran yang jelas, dan saat terjadi perpisahan, kamu mampu berduka hingga tuntas tanpa tersiksa dalam ketidakpastian berkepanjangan.",
      de: "Sie verfügen über klare Grenzen zwischen physischer Präsenz und innerer Bindung. Verluste können Sie trauern und abschließen, ohne in endloser Ungewissheit stecken zu bleiben.",
      fr: "Vous maintenez des frontières saines entre présence physique et lien psychologique. Les deuils sont traversés et résolus sans blocage dans un flou persistant.",
      es: "Mantienes límites nítidos entre presencia física y apego emocional. Gestionas las pérdidas y transiciones con suficiente claridad sin quedar atrapado en el limbo."
    },
    psychology: {
      en: "Low boundary ambiguity. Dr. Pauline Boss's research indicates that clarity regarding whether a relationship is psychologically viable or concluded protects against somatic fatigue and prolonged grief disorder.",
      id: "Kerancuan batasan rendah. Penelitian Dr. Pauline Boss menunjukkan bahwa kejelasan status hubungan melindungi tubuh dan pikiran dari kelelahan somatik kronis dan gangguan duka berkepanjangan.",
      de: "Geringe Rollenunklarheit. Nach Dr. Pauline Boss schützt die klare emotionale Einordnung von Beziehungen vor somatischer Erschöpfung und chronischer Trauer.",
      fr: "Faible ambiguïté des frontières relationnelles. La distinction claire entre ce qui est vivant et ce qui est révolu préserve l'énergie psychique.",
      es: "Baja ambigüedad relacional. Las investigaciones de la Dra. Pauline Boss demuestran que la certeza en los roles afectivos previene el desgaste crónico."
    },
    actionProtocol: {
      en: [
        "Continue honoring your boundaries and clear communication habits.",
        "Offer grounded presence to friends who are navigating long-term family caregiving or ambiguous breakups.",
        "Maintain reflective hygiene using Nuju voice journaling for regular emotional check-ins."
      ],
      id: [
        "Pertahankan batasan batin yang sehat dan komunikasi yang tegas.",
        "Hadirkan empati bagi kerabat yang sedang merawat orang sakit menahun atau terjebak dalam hubungan tanpa kepastian.",
        "Gunakan jurnal suara Nuju untuk mengevaluasi dinamika emosional secara berkala."
      ],
      de: [
        "Wahren Sie Ihre gesunden Grenzen und klare Kommunikation.",
        "Bringen Sie Mitgefühl für Menschen auf, die Angehörige pflegen oder in ungelösten Trennungen feststecken.",
        "Nutzen Sie das Nuju-Sprachjournal zur regelmäßigen emotionalen Hygiene."
      ],
      fr: [
        "Conservez vos limites saines et votre communication limpide.",
        "Soutenez vos proches confrontés à des situations d'aidance ou des ruptures sans clôture.",
        "Utilisez le journal vocal Nuju pour préserver votre clarté intérieure au quotidien."
      ],
      es: [
        "Mantén tus límites claros y una comunicación transparente.",
        "Acompaña con empatía a familiares o amigos en situaciones de cuidado crónico o rupturas inconclusas.",
        "Usa el diario de voz Nuju para sostener tu higiene emocional y procesar tus experiencias."
      ]
    },
    badge: {
      en: "BOUNDARY CLARITY",
      id: "KEJELASAN BATASAN",
      de: "KLARE GRENZEN",
      fr: "LIMITES CLAIRES",
      es: "LÍMITES CLAROS"
    }
  },
  {
    level: "mild_boundary_fuzziness",
    scoreRange: [10, 17],
    title: {
      en: "Mild Ambiguity & Transient Yearning",
      id: "Ambivalensi Ringan & Kerinduan Sesaat",
      de: "Leichte Rollenunschärfe & Vorübergehende Sehnsucht",
      fr: "Ambiguïté Légère & Nostalgie Passagère",
      es: "Ambigüedad Leve y Añoranza Transitoria"
    },
    summary: {
      en: "You occasionally feel the friction of an unresolved dynamic or missing closure, but it does not dismantle your day-to-day vitality. You occasionally wonder 'what if,' but can redirect your energy toward your own living life.",
      id: "Kamu sesekali merasakan ganjalan dari masa lalu yang belum tuntas atau kerinduan yang tak terjawab, namun hal itu tidak merusak semangat hidupmu. Kamu masih mampu memusatkan fokus pada kehidupan nyatamu.",
      de: "Sie spüren gelegentlich den Schmerz ungeklärter Abschiede oder veränderter Beziehungen, bleiben davon im Alltag jedoch handlungsfähig und fokussiert.",
      fr: "Vous ressentez parfois le tiraillement d'une relation inachevée, mais vous conservez votre élan vital et votre capacité à vivre au présent.",
      es: "Sientes a veces la molestia de un cierre inconcluso o una añoranza flotante, pero sin perder el timón ni la energía de tu día a día."
    },
    psychology: {
      en: "Mild ambiguous loss friction. You retain sufficient psychological flexibility to tolerate the lack of an official punctuation mark without spiraling into frozen grief.",
      id: "Gesekan duka ambigu ringan. Kamu memiliki kelenturan psikologis yang memadai untuk menerima ketiadaan titik akhir yang rapi tanpa terjebak dalam kelumpuhan batin.",
      de: "Leichte Reibung durch unvollständigen Abschluss. Sie tolerieren die Ungewissheit meist, ohne in erstarrte Trauer zu verfallen.",
      fr: "Friction modérée liée à l'ambiguïté. Votre souplesse émotionnelle vous permet de tolérer l'absence de clôture nette sans désespoir.",
      es: "Tricción leve por pérdida ambigua. Cuentas con la flexibilidad para sobrellevar la falta de respuestas definitivas sin paralizarte."
    },
    actionProtocol: {
      en: [
        "Practice naming the missing piece: 'I miss who they used to be, while accepting who they are now.'",
        "Avoid stalking social media archives or old text conversations when feeling lonely.",
        "Vent spontaneous nostalgia into Nuju's encrypted voice journal without judgment."
      ],
      id: [
        "Latih mengakui kenyataan: 'Aku rindu sosoknya yang dulu, namun menerima kenyataan dirinya yang sekarang.'",
        "Hindari membuka kembali arsip chat lama atau memantau media sosialnya saat sedang sepi.",
        "Luapkan kerinduan sesaat itu ke jurnal suara Nuju tanpa perlu merasa bersalah."
      ],
      de: [
        "Gefühle benennen: 'Ich vermisse, wer sie einmal waren, akzeptiere aber, wer sie heute sind.'",
        "Widerstehen Sie dem Drang, alte Chatverläufe oder Profile zu durchforsten.",
        "Sprechen Sie vorübergehende Wehmut in den geschützten Nuju-Sprachraum ein."
      ],
      fr: [
        "Nommez la nuance : « Je regrette ce que nous étions, mais j'accepte ce qui est aujourd'hui ».",
        "Évitez de relire les anciens messages ou d'épier ses profils lors des moments de creux.",
        "Déposez vos vagues de nostalgie dans le journal audio Nuju en toute tranquillité."
      ],
      es: [
        "Nombra la paradoja: 'Extraño a la persona que fue, pero acepto a quien es en el presente'.",
        "Evita revisar conversaciones pasadas o monitorear sus redes en momentos de soledad.",
        "Vuelca tus oleadas de nostalgia en el diario de voz de Nuju sin juzgarte."
      ]
    },
    badge: {
      en: "REFLECTIVE DRIFT",
      id: "PERENUNGAN HALUS",
      de: "SANFTE SEHNSUCHT",
      fr: "DÉRIVE NOSTALGIQUE",
      es: "AÑORANZA FLOTANTE"
    }
  },
  {
    level: "frozen_limbo_grief",
    scoreRange: [18, 25],
    title: {
      en: "Moderate Ambiguous Loss & Suspended Mourning",
      id: "Duka Ambigu Sedang & Duka Batin Tergantung",
      de: "Mehrdeutiger Verlust & Schwebende Trauer",
      fr: "Perte Ambiguë Modérée & Deuil Suspendu",
      es: "Pérdida Ambigua Moderada y Duelo Suspendido"
    },
    summary: {
      en: "You are caught in a prolonged state of suspended grief. Whether caring for someone whose personality has evaporated or holding on after an unresolved breakup, you cannot mourn because they are not dead, but you cannot celebrate because they are not truly here.",
      id: "Kamu terjebak dalam duka yang menggantung. Entah merawat sosok yang telah berubah drastis atau memikirkan relasi yang putus tanpa kejelasan, kamu tidak bisa berduka karena mereka masih bernapas, namun tak bisa bahagia karena mereka sudah tiada di batinmu.",
      de: "Sie stecken in schwebender Trauer fest. Sie können weder richtig trauern (weil die Person noch da ist), noch unbeschwert sein (weil die eigentliche Beziehung verloren ist).",
      fr: "Vous êtes pris au piège d'un deuil suspendu. Vous ne pouvez ni faire votre deuil (la personne vit encore), ni savourer le lien (l'intimité s'est évaporée).",
      es: "Estás atrapado en un duelo suspendido. No puedes llorar una muerte formal porque la persona existe, pero tampoco disfrutar el vínculo porque la conexión murió."
    },
    psychology: {
      en: "Classic Ambiguous Loss (Dr. Pauline Boss Type I or Type II). The absence of official ritual and social recognition leaves your nervous system in cognitive dissonance, blocking natural stages of emotional bereavement.",
      id: "Pola klasik Ambiguous Loss Dr. Pauline Boss (Tipe I atau II). Ketiadaan ritual resmi dan pengakuan sosial membuat sistem sarafmu mengalami disonansi kognitif yang membekukan proses duka alami.",
      de: "Klassischer mehrdeutiger Verlust nach Dr. Pauline Boss. Das Fehlen von Ritualen und Bestätigung blockiert den natürlichen Trauerverlauf.",
      fr: "Perte ambiguë classique (Dr Pauline Boss). L'absence de rituel officiel et de reconnaissance sociale fige les mécanismes naturels du deuil.",
      es: "Pérdida ambigua típica (Dra. Pauline Boss). La falta de un rito explícito y de validación comunitaria paraliza las fases habituales del duelo."
    },
    actionProtocol: {
      en: [
        "Adopt 'Both/And' Thinking: Replace 'They are coming back' or 'They are dead' with: 'They are gone from my daily life, AND they will always be part of my story.'",
        "Create a Private Symbolic Ritual: Light a candle or write a letter you don't send to mark the end of the old chapter.",
        "Uncensor your grief in Nuju: Speak your raw, confusing feelings out loud into Nuju's private audio journal to release the cognitive deadlock."
      ],
      id: [
        "Gunakan Pola Pikir 'Keduanya/Dan': Ubah pemikiran ekstrem dengan kalimat: 'Dia sudah tiada dalam keseharianku, DAN kenangannya akan selalu menjadi bagian dari perjalananku.'",
        "Buat Ritual Simbolis Pribadi: Nyalakan lilin atau tulis surat yang tak perlu dikirim untuk menandai penutupan babak lama ini.",
        "Curhatkan kebingunganmu di Nuju: Bicarakan kepedihan yang rumit ini ke jurnal suara Nuju untuk melepaskan jerat kebuntuan di kepala."
      ],
      de: [
        "Das 'Sowohl-als-auch'-Prinzip anwenden: 'Sie sind aus meinem Alltag verschwunden, UND sie bleiben für immer Teil meiner Biografie.'",
        "Ein eigenes Abschiedsritual schaffen: Einen symbolischen Brief schreiben, um das Kapitel innerlich zu schließen.",
        "Die Verwirrung bei Nuju aussprechen: Nutzen Sie das Sprachjournal, um die zermürbende Ambivalenz laut zu entladen."
      ],
      fr: [
        "Pratiquez la pensée dialectique : « Cette personne est sortie de ma vie quotidienne, ET elle a forgé mon histoire ».",
        "Créez votre propre rituel symbolique : écrivez une lettre d'adieu pour vous-même pour marquer la fin d'un cycle.",
        "Videz votre sac dans Nuju : parlez de votre deuil silencieux dans le journal vocal pour dénouer le nœud qui vous étouffe."
      ],
      es: [
        "Aplica el pensamiento 'Y': 'Esta persona ya no forma parte de mi cotidianidad, Y a la vez siempre será parte de mi historia'.",
        "Crea un ritual simbólico íntimo: escribe una carta de despedida que no enviarás para cerrar conscientemente la etapa.",
        "Desahoga tu limbo en Nuju: habla en voz alta en el diario privado de Nuju para desarticular el estancamiento mental."
      ]
    },
    badge: {
      en: "FROZEN GRIEF",
      id: "DUKA MEMBEKU",
      de: "ERSTARRTE TRAUER",
      fr: "DEUIL SUSPENDU",
      es: "DUELO EN SUSPENSO"
    }
  },
  {
    level: "severe_boundary_ambiguity",
    scoreRange: [26, 31],
    title: {
      en: "High Boundary Ambiguity & Chronic Relational Limbo",
      id: "Kerancuan Batasan Berat & Limbo Hubungan Kronis",
      de: "Schwere Rollenunklarheit & Chronischer Schwebezustand",
      fr: "Ambiguïté Relationnelle Sévère & Limbe Chronique",
      es: "Alta Ambigüedad Vincular y Limbo Crónico"
    },
    summary: {
      en: "You are living under severe boundary ambiguity. You no longer know who you are in relation to this person. The inability to move forward without guilt, coupled with sporadic false hopes, is causing chronic cognitive fatigue, somatic tension, and emotional numbness.",
      id: "Kamu menanggung beban kerancuan batasan yang berat. Kamu tak tahu lagi siapa dirimu di hadapan orang ini. Ketidakmampuan melangkah maju tanpa rasa bersalah memicu kelelahan kognitif kronis, ketegangan somatik, dan mati rasa emosional.",
      de: "Sie leiden unter schwerer Rollenunklarheit. Schuldgefühle beim Weiterleben und sporadische falsche Hoffnungen führen zu chronischer seelischer und körperlicher Erschöpfung.",
      fr: "Vous endurez une confusion de rôle sévère. L'incapacité d'avancer sans culpabilité et les faux espoirs intermittents provoquent un épuisement somatique et psychique profond.",
      es: "Vives en una profunda ambigüedad relacional. No saber qué lugar ocupas en su vida y la culpa al intentar avanzar te provocan fatiga crónica, tensión somática y apatía."
    },
    psychology: {
      en: "Boundary Ambiguity Exhaustion. When the psychological presence does not match physical reality for years, families and individuals develop immobilization, somatic pain, and chronic indecision.",
      id: "Kelelahan Akibat Kerancuan Batasan. Ketika kehadiran fisik bertolak belakang dengan kehadiran emosional selama bertahun-tahun, tubuh dan pikiran mengalami kelumpuhan gerak, nyeri fisik, dan keraguan kronis.",
      de: "Erschöpfung durch Grenz-Mehrdeutigkeit. Die ständige Diskrepanz zwischen körperlicher Gegenwart und seelischer Abwesenheit lähmt Entscheidungen und schlägt auf den Körper.",
      fr: "Épuisement par ambiguïté des limites. La dissonance permanente entre présence physique et absence affective fige l'individu dans une paralysie décisionnelle.",
      es: "Agotamiento por ambigüedad vincular. La discrepancia continua entre cuerpo presente y mente ausente genera parálisis vital, dolores somáticos y dudas paralizantes."
    },
    actionProtocol: {
      en: [
        "Uncouple Love from Obligation: You can love and honor someone without sacrificing your own sanity, health, and future.",
        "Reclaim Your Life Decision-Making: Give yourself explicit permission: 'I am allowed to build a joyful life even if this situation never resolves.'",
        "Voice journaling as boundary reconstruction: Speak out your forbidden thoughts and guilt into Nuju's zero-knowledge encrypted audio sanctuary."
      ],
      id: [
        "Pisahkan Kasih Sayang dari Pengorbanan Buta: Kamu bisa tetap menyayangi seseorang tanpa harus mengorbankan kesehatan mental dan masa depanmu sendiri.",
        "Beri Izin pada Dirimu Sendiri: 'Aku berhak membangun hidup yang bahagia meski situasi ini tidak pernah mencapai akhir yang sempurna.'",
        "Rekonstruksi batasan di Nuju: Bicarakan rasa bersalah dan pikiran terlarangmu ke jurnal suara Nuju tanpa rasa takut."
      ],
      de: [
        "Liebe von Aufopferung trennen: Sie dürfen jemanden schätzen, ohne Ihre eigene seelische Gesundheit und Zukunft zu opfern.",
        "Erlaubnis zum Weiterleben: 'Ich darf ein erfülltes Leben führen, selbst wenn dieser Zustand ungelöst bleibt.'",
        "Grenzen im Nuju-Sprachjournal ziehen: Sprechen Sie unaussprechliche Schuldgefühle frei von der Seele."
      ],
      fr: [
        "Distinguez amour et sacrifice : vous pouvez chérir quelqu'un sans détruire votre santé mentale ni votre avenir.",
        "Autorisez-vous à vivre : « J'ai le droit d'être heureux même si cette situation reste sans dénouement ».",
        "Reconstruction vocale avec Nuju : verbalisez vos pensées coupables et vos dilemmes dans l'espace chiffré de Nuju."
      ],
      es: [
        "Separa el afecto del sacrificio autodestructivo: puedes amar a alguien sin inmolar tu salud mental ni hipotecar tu futuro.",
        "Concédete permiso: 'Tengo derecho a ser feliz y construir mi vida aunque esta situación nunca se resuelva del todo'.",
        "Reconstrucción en Nuju: habla de tus culpas y pensamientos prohibidos en el refugio privado y cifrado de Nuju."
      ]
    },
    badge: {
      en: "RELATIONAL LIMBO",
      id: "LIMBO HUBUNGAN",
      de: "SCHWEBEZUSTAND",
      fr: "LIMBE RELATIONNEL",
      es: "LIMBO VINCULAR"
    }
  },
  {
    level: "paralyzing_ambiguous_agony",
    scoreRange: [32, 36],
    title: {
      en: "Profound Ambiguous Agony & Frozen Grief Paralysis",
      id: "Penderitaan Ambigu Berat & Kelumpuhan Duka Total",
      de: "Schwere Mehrdeutige Agonie & Trauerlähmung",
      fr: "Agonie d'Ambiguïté Profonde & Paralysie du Deuil",
      es: "Agonía Ambigua Extrema y Parálisis del Duelo"
    },
    summary: {
      en: "You are in acute emotional agony from an intolerable ambiguous loss. Your life has been placed on indefinite hold. You oscillate between desperate hope, profound despair, and intense shame for secretly wishing the ordeal would finally end. You feel completely isolated in a tragedy nobody knows how to talk about.",
      id: "Kamu berada dalam penderitaan emosional yang luar biasa akibat duka tanpa kepastian. Hidupmu serasa dibekukan tanpa batas waktu. Kamu terombang-ambing antara harapan hampa, keputusasaan mendalam, dan rasa malu karena diam-diam menginginkan kepastian akhir.",
      de: "Sie befinden sich in akuter seelischer Agonie. Ihr Leben steht still. Das Pendeln zwischen verzweifelter Hoffnung und Scham über geheime Wünsche nach einem Ende überfordert Ihre Kräfte völlig.",
      fr: "Vous traversez une agonie émotionnelle insoutenable. Votre existence est suspendue. L'alternance d'espoir vain, de désespoir et de culpabilité secrète broie votre vitalité.",
      es: "Te encuentras en una angustia extrema por una pérdida ambigua asfixiante. Tu vida ha quedado en pausa indefinida; la oscilación entre esperanza vana y culpa secreta devora tus fuerzas."
    },
    psychology: {
      en: "Traumatic Ambiguous Loss Paralysis. Dr. Pauline Boss documents that unresolved ambiguous loss is the most stressful form of grief because it defies natural biological closure, leading to clinical despair and severe identity erosion.",
      id: "Kelumpuhan Duka Ambigu Traumatis. Dr. Pauline Boss mencatat bahwa kehilangan yang ambigu adalah bentuk duka paling melelahkan bagi manusia karena menolak penuntasan biologis, memicu keputusasaan klinis dan erosi identitas diri.",
      de: "Traumatischer mehrdeutiger Verlust. Nach Dr. Pauline Boss die belastendste Form der Trauer, da das Gehirn mangels Abschluss in permanenter Alarmbereitschaft verharrt.",
      fr: "Paralysie traumatique de la perte ambiguë. Pour le Dr Pauline Boss, c'est la forme de deuil la plus dévastatrice car elle prive le cerveau de toute conclusion naturelle.",
      es: "Parálisis traumática por pérdida ambigua. La Dra. Pauline Boss la define como el dolor más desgastante porque desafía el cierre biológico natural, erosionando la propia identidad."
    },
    actionProtocol: {
      en: [
        "Engage with a Professional Grief Counselor or Therapist trained specifically in Ambiguous Loss (Boss model).",
        "Normalize the Secret Wishes: Forgive yourself for wishing it would end—it is not cruelty, it is your exhausted nervous system begging for psychological safety.",
        "Release the unspeakable burden in Nuju: Speak every single taboo thought, terror, and sorrow into Nuju's zero-knowledge encrypted voice vault where no human can judge you."
      ],
      id: [
        "Cari Bantuan Terapis Profesional atau Konselor Duka yang memahami konsep Ambiguous Loss.",
        "Maafkan Pikiran Terlarangmu: Berdamailah dengan keinginan agar semua ini segera berakhir—itu bukan tanda kamu jahat, melainkan jeritan tubuhmu yang kelelahan.",
        "Lepaskan beban paling tabu di Nuju: Bicarakan setiap kesedihan terdalam dan ketakutanmu ke brankas suara Nuju yang terenkripsi tanpa kompromi."
      ],
      de: [
        "Suchen Sie therapeutische Hilfe bei Fachleuten für Trauerbegleitung und mehrdeutigen Verlust.",
        "Verzeihen Sie sich geheime Wünsche: Der Wunsch nach einem Ende ist keine Kälte, sondern ein Notsignal Ihres überlasteten Nervensystems.",
        "Die unaussprechliche Last bei Nuju abladen: Nutzen Sie das private Sprachjournal, um jedes Tabu ohne jede Scham auszusprechen."
      ],
      fr: [
        "Consultez un thérapeute spécialisé dans l'accompagnement du deuil et de la perte ambiguë.",
        "Pardonnez-vous vos pensées secrètes : souhaiter un dénouement n'est pas un manque d'amour, c'est l'appel au secours de votre système nerveux.",
        "Déchargez vos tabous dans Nuju : confiez vos peurs les plus sombres dans le sanctuaire vocal chiffré de Nuju, loin de tout jugement."
      ],
      es: [
        "Busca el acompañamiento de un psicólogo especializado en duelo y pérdida ambigua.",
        "Perdónate los deseos inconfesables: desear que el limbo termine no te hace mala persona, es el grito de socorro de tu cuerpo agotado.",
        "Descarga lo indecible en Nuju: habla de tus miedos y dolores más censurados en la bóveda privada de voz de Nuju con total seguridad."
      ]
    },
    badge: {
      en: "FROZEN AGONY",
      id: "AGONI MEMBEKU",
      de: "ERSTARRTE AGONIE",
      fr: "AGONIE SUSPENDUE",
      es: "AGONÍA SUSPENDIDA"
    }
  }
];

export const AMBIGUOUS_LOSS_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Rarely",
      id: "Tidak Pernah / Jarang",
      de: "Nie / Selten",
      fr: "Jamais / Rarement",
      es: "Nunca / Rara vez"
    }
  },
  {
    value: 1,
    label: {
      en: "Sometimes",
      id: "Kadang-kadang",
      de: "Manchmal",
      fr: "Parfois",
      es: "A veces"
    }
  },
  {
    value: 2,
    label: {
      en: "Often",
      id: "Sering",
      de: "Oft",
      fr: "Souvent",
      es: "A menudo"
    }
  },
  {
    value: 3,
    label: {
      en: "Almost Always / Constant",
      id: "Hampir Selalu / Terus-menerus",
      de: "Fast immer / Ständig",
      fr: "Presque toujours / En permanence",
      es: "Casi siempre / Constante"
    }
  }
];

export const AMBIGUOUS_LOSS_SUBSCALE_INFO = {
  psychological_absence_presence: {
    name: {
      en: "Psychological Absence & Physical Presence Paradox",
      id: "Paradoks Hadir Fisik tapi Tiada Emosional",
      de: "Körperliche Präsenz & Psychologische Abwesenheit",
      fr: "Présence Physique & Absence Psychologique",
      es: "Presencia Física y Ausencia Psicológica"
    },
    description: {
      en: "Someone physically present but unreachable, or physically absent yet consuming your thoughts and emotional bandwidth.",
      id: "Seseorang hadir di depan mata namun tak terjangkau, atau tiada di dekatmu namun terus menguasai pikiran dan energimu.",
      de: "Körperlich da, aber seelisch unerreichbar, oder physisch abwesend und dennoch gedanklich dauerhaft präsent.",
      fr: "Personne physiquement présente mais inaccessible, ou absente et occupant continuellement vos pensées.",
      es: "Alguien físicamente al lado pero inalcanzable, o ausente pero consumiendo toda tu energía mental."
    }
  },
  frozen_grief_closure_paralysis: {
    name: {
      en: "Frozen Grief & Closure Paralysis",
      id: "Duka Membeku & Kelumpuhan Tanpa Kepastian",
      de: "Erstarrte Trauer & Fehlender Abschluss",
      fr: "Deuil Figé & Paralysie sans Clôture",
      es: "Duelo Congelado y Parálisis de Cierre"
    },
    description: {
      en: "No definitive ending ritual, swinging between false hope and devastating sorrow, and unvalidated disenfranchised grief.",
      id: "Ketiadaan perpisahan resmi, terombang-ambing antara harapan semu dan kepedihan, serta duka yang tak diakui lingkungan.",
      de: "Kein offizieller Abschied, Zerrissenheit zwischen Hoffnung und Trauer, und gesellschaftlich nicht anerkannter Schmerz.",
      fr: "Absence de rituel de fin, oscillation entre faux espoir et désespoir, et deuil invisible pour l'entourage.",
      es: "Falta de un final explícito, vaivén entre falsas esperanzas y dolor profundo, y sufrimiento incomprendido."
    }
  },
  boundary_ambiguity_exhaustion: {
    name: {
      en: "Boundary Ambiguity & Relational Fatigue",
      id: "Kerancuan Peran & Kelelahan Menjaga Batasan",
      de: "Rollenunklarheit & Beziehungserschöpfung",
      fr: "Confusion des Rôles & Épuisement Relationnel",
      es: "Confusión de Roles y Desgaste Vincular"
    },
    description: {
      en: "Role confusion, guilt over personal joy or moving on, carrying two contradictory truths, and exhaustion from uncertainty.",
      id: "Kerancuan peran, rasa bersalah saat bahagia, memikul dua kebenaran yang bertolak belakang, dan letihnya ketidakpastian.",
      de: "Rollenverwirrung, Schuldgefühle beim Weiterleben, gleichzeitiges Halten widersprüchlicher Realitäten und Zermürbung.",
      fr: "Confusion des statuts, culpabilité à savourer la vie, fardeau de deux vérités inconciliables et fatigue de l'incertitude.",
      es: "Incertidumbre sobre el rol, culpa por salir adelante, soportar dos verdades opuestas y fatiga por el limbo constante."
    }
  }
};

export function getAmbiguousLossResult(totalScore: number): AmbiguousLossResultLevel {
  const matched = AMBIGUOUS_LOSS_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || AMBIGUOUS_LOSS_RESULTS[AMBIGUOUS_LOSS_RESULTS.length - 1];
}

export function calculateAmbiguousLossSubscales(answers: Record<number, number>): {
  psychological_absence_presence: number;
  frozen_grief_closure_paralysis: number;
  boundary_ambiguity_exhaustion: number;
} {
  let psychological_absence_presence = 0;
  let frozen_grief_closure_paralysis = 0;
  let boundary_ambiguity_exhaustion = 0;

  AMBIGUOUS_LOSS_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "psychological_absence_presence") psychological_absence_presence += val;
    if (q.subscale === "frozen_grief_closure_paralysis") frozen_grief_closure_paralysis += val;
    if (q.subscale === "boundary_ambiguity_exhaustion") boundary_ambiguity_exhaustion += val;
  });

  return { psychological_absence_presence, frozen_grief_closure_paralysis, boundary_ambiguity_exhaustion };
}
