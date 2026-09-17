export type FinancialAnxietyLang = "en" | "id" | "de" | "fr" | "es";

export type FinancialAnxietySubscale =
  | "cognitive_bandwidth_tax"
  | "catastrophic_destitution_phobia"
  | "deprivation_guilt_hoarding";

export interface FinancialAnxietyQuestion {
  id: number;
  subscale: FinancialAnxietySubscale;
  prompt: Record<FinancialAnxietyLang, string>;
  options: {
    label: Record<FinancialAnxietyLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface FinancialAnxietyArchetypeProfile {
  level: "grounded_abundance" | "mild_hypervigilance" | "chronic_scarcity" | "severe_destitution_terror";
  badge: Record<FinancialAnxietyLang, string>;
  title: Record<FinancialAnxietyLang, string>;
  tagline: Record<FinancialAnxietyLang, string>;
  description: Record<FinancialAnxietyLang, string>;
  psychologyInsight: Record<FinancialAnxietyLang, string>;
  actionProtocols: Record<FinancialAnxietyLang, string[]>;
  dailyAffirmation: Record<FinancialAnxietyLang, string>;
}

export interface FinancialAnxietyScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: "grounded_abundance" | "mild_hypervigilance" | "chronic_scarcity" | "severe_destitution_terror";
  subscales: {
    cognitive_bandwidth_tax: { score: number; max: number; percentage: number };
    catastrophic_destitution_phobia: { score: number; max: number; percentage: number };
    deprivation_guilt_hoarding: { score: number; max: number; percentage: number };
  };
  profile: FinancialAnxietyArchetypeProfile;
}

export const FINANCIAL_ANXIETY_QUESTIONS: FinancialAnxietyQuestion[] = [
  // Subscale 1: Cognitive Bandwidth Tax & Money Tunneling (Q1 - Q4)
  {
    id: 1,
    subscale: "cognitive_bandwidth_tax",
    prompt: {
      en: "Thoughts about money, unexpected bills, or future expenses intrude into my mind while I am trying to work, relax, or sleep.",
      id: "Pikiran tentang uang, tagihan mendadak, atau biaya masa depan menyusup ke otakku saat aku sedang bekerja, beristirahat, atau mencoba tidur.",
      de: "Gedanken an Geld, Rechnungen oder zukünftige Ausgaben drängen sich auf, während ich arbeite, entspanne oder schlafe.",
      fr: "Des pensées sur l'argent, les factures imprévues ou l'avenir financier s'immiscent quand je travaille, me détends ou dors.",
      es: "Pensamientos sobre dinero, facturas imprevistas o gastos futuros me invaden mientras trabajo, descanso o intento dormir.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely; I review finances during dedicated planning times and let it go",
          id: "Jarang; saya mengevaluasi keuangan pada jadwal khusus lalu melupakannya",
          de: "Selten; ich plane meine Finanzen zu festen Zeiten und lasse dann los",
          fr: "Rarement; je fais mes comptes à des moments précis puis passe à autre chose",
          es: "Rara vez; reviso mis finanzas en momentos asignados y me desentiendo",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; usually around tax season or when making major purchases",
          id: "Sesekali; biasanya saat masa pajak atau saat membeli barang berharga besar",
          de: "Gelegentlich; vor allem bei Steuererklärungen oder Großanschaffungen",
          fr: "Parfois; en période d'impôts ou lors d'achats importants",
          es: "A veces; sobre todo en época de impuestos o compras grandes",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; money anxiety causes brain fog, decision paralysis, and poor focus",
          id: "Sering; kecemasan uang memicu kabut otak, sulit fokus, dan ragu mengambil keputusan",
          de: "Häufig; Geldsorgen verursachen Konzentrationsschwächen und innere Lähmung",
          fr: "Souvent; l'angoisse financière brouille mes idées et paralyse mes choix",
          es: "Frecuentemente; la angustia económica me dispersa y bloquea mis decisiones",
        },
      },
      {
        score: 3,
        label: {
          en: "Almost constantly; financial calculations run on an endless background loop in my brain",
          id: "Hampir terus-menerus; kalkulasi angka uang berputar tanpa henti di kepalaku",
          de: "Fast ständig; Finanzberechnungen laufen als Dauerschleife im Hintergrund",
          fr: "Presque tout le temps; des calculs financiers tournent en boucle dans ma tête",
          es: "Casi constantemente; mi cerebro calcula números y gastos en un bucle sin fin",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "cognitive_bandwidth_tax",
    prompt: {
      en: "Checking my bank balance or opening financial mail triggers physical panic (racing pulse, sinking gut, cold sweats).",
      id: "Mengecek saldo m-banking atau membuka amplop tagihan memicu reaksi panik fisik (jantung berdebar, perut mual, keringat dingin).",
      de: "Der Blick auf den Kontostand oder das Öffnen von Post löst körperliche Panik aus (Herzrasen, Magenkrampf).",
      fr: "Consulter mon compte en banque ou ouvrir le courrier financier déclenche une panique physique (cœur qui bat, sueurs froides).",
      es: "Mirar el saldo bancario o abrir cartas financieras me causa pánico físico (taquicardia, nudo en el estómago).",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; it is neutral administrative data for me",
          id: "Tidak pernah; itu sekadar data angka administratif biasa bagiku",
          de: "Nie; für mich sind das neutrale administrative Daten",
          fr: "Jamais; ce sont de simples données administratives neutres",
          es: "Nunca; para mí son datos administrativos neutros",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly; only if I know I made an unusually big expense recently",
          id: "Sedikit; hanya jika aku sadar baru saja mengeluarkan uang dalam jumlah luar biasa",
          de: "Schwach; nur wenn ich kurz zuvor eine ungewöhnliche Ausgabe hatte",
          fr: "Légèrement; seulement si j'ai fait une dépense inhabituelle",
          es: "Levemente; solo si acabo de realizar un gasto extraordinario",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; I delay checking balances for days to avoid the gut-drop sensation",
          id: "Sering; aku menunda melihat saldo berhari-hari demi menghindari rasa mual di perut",
          de: "Oft; ich zögere den Kontocheck tagelang heraus, um die Angst zu meiden",
          fr: "Souvent; je retarde la vérification des comptes pour esquiver l'angoisse",
          es: "A menudo; pospongo mirar la cuenta durante días para no sentir ese nudo",
        },
      },
      {
        score: 3,
        label: {
          en: "Severely; I actively avoid my finances entirely, living in terrified ostrich-mode",
          id: "Sangat parah; aku benar-benar mengabaikan keuanganku seperti burung unta yang menancapkan kepala ke tanah",
          de: "Extrem; ich praktiziere totale Vogel-Strauß-Taktik aus nackter Todesangst",
          fr: "Sévèrement; je pratique la politique de l'autruche par pure terreur",
          es: "Severamente; evito mis finanzas por completo, viviendo con la cabeza bajo tierra por miedo",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "cognitive_bandwidth_tax",
    prompt: {
      en: "I spend an irrational amount of time researching the cheapest option for everyday low-cost goods (spending hours to save $2).",
      id: "Aku menghabiskan waktu berjam-jam tanpa rasional hanya demi mencari opsi termurah barang harian (buang 2 jam demi hemat 20 ribu perak).",
      de: "Ich verbringe irrational viel Zeit mit Preisvergleichen für Alltagsartikel, um Centbeträge zu sparen.",
      fr: "Je perds un temps démesuré à comparer pour économiser quelques centimes sur des broutilles quotidiennes.",
      es: "Invierto un tiempo irracional en buscar la opción más barata para artículos diarios (horas para ahorrar 2 euros).",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I value my cognitive time over negligible price differences",
          id: "Tidak pernah; saya lebih menghargai waktu dan energiku dibanding selisih harga sepele",
          de: "Nie; meine Zeit ist mir wertvoller als minimale Cent-Unterschiede",
          fr: "Jamais; mon temps et ma sérénité valent plus que quelques centimes",
          es: "Nunca; valoro mi tiempo y energía mental por encima de céntimos",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; mostly during seasonal promotions or grocery bulk buying",
          id: "Sesekali; terutama saat belanja bulanan atau diskon musiman",
          de: "Gelegentlich; vor allem bei Wocheneinkäufen oder Rabattaktionen",
          fr: "Parfois; lors des courses hebdomadaires ou soldes",
          es: "A veces; en compras mensuales o rebajas",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; paying slightly more feels like a humiliating personal failure",
          id: "Sering; membayar sedikit lebih mahal terasa seperti kegagalan pribadi yang memalukan",
          de: "Häufig; etwas mehr zu zahlen fühlt sich wie ein persönliches Versagen an",
          fr: "Souvent; payer un peu plus cher me donne l'impression d'avoir été dupé",
          es: "Frecuentemente; pagar un poco más se siente como un fracaso personal humillante",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly; my brain is trapped in extreme price-hypervigilance that exhausts my willpower daily",
          id: "Terus-menerus; otakku terkunci dalam hiper-kewaspadaan harga yang menguras energiku setiap hari",
          de: "Ständig; permanente Preis-Hypervigilanz raubt mir jegliche mentale Energie",
          fr: "Constamment; cette hypervigilance sur chaque centime épuise toute ma volonté",
          es: "Constantemente; la hipervigilancia de precios me agota la fuerza de voluntad a diario",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "cognitive_bandwidth_tax",
    prompt: {
      en: "Even when I receive unexpected income or a pay raise, the relief lasts only moments before the dread of future loss takes over.",
      id: "Bahkan saat menerima rezeki tak terduga atau kenaikan gaji, rasa lega hanya bertahan sesaat sebelum ketakutan akan kehilangan kembali membayangi.",
      de: "Selbst bei Gehaltserhöhungen oder Boni währt die Erleichterung nur kurz, bevor neue Verlustangst einsetzt.",
      fr: "Même après une prime ou une augmentation, le soulagement s'évapore aussitôt, chassé par la terreur de tout perdre.",
      es: "Incluso al recibir un aumento o ingreso extra, el alivio dura minutos antes de que la angustia vuelva.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely; I celebrate financial milestones with gratitude and satisfaction",
          id: "Jarang; saya merayakan pencapaian keuangan dengan rasa syukur dan puas",
          de: "Selten; ich feiere finanzielle Meilensteine mit Freude und Zufriedenheit",
          fr: "Rarement; je savoure mes réussites financières avec gratitude",
          es: "Rara vez; celebro mis logros económicos con gratitud y tranquilidad",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes; I briefly worry about inflation or higher expenses",
          id: "Kadang-kadang; saya sempat mencemaskan inflasi atau pengeluaran bertambah",
          de: "Manchmal; ich denke kurz an Inflation oder gestiegene Lebenshaltungskosten",
          fr: "Parfois; j'anticipe l'inflation ou des dépenses futures",
          es: "A veces; pienso brevemente en la inflación o mayores costes",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; extra money only increases my paranoia of how quickly it can disappear",
          id: "Sering; uang lebih justru meningkatkan paranoia betapa cepatnya uang itu bisa raib",
          de: "Häufig; mehr Geld schürt nur die Angst, wie schnell wieder alles weg sein kann",
          fr: "Souvent; avoir plus d'argent attise la peur paranoïaque de le voir disparaître",
          es: "Frecuentemente; tener más dinero aumenta mi paranoia sobre lo rápido que puede esfumarse",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; there is no amount of money that can silence the phantom poverty in my nervous system",
          id: "Selalu; tidak ada jumlah uang berapapun yang bisa membungkam alarm ilusi kemiskinan di tubuhku",
          de: "Immer; keine Summe der Welt kann das Gefühl chronischer Knappheit in mir beruhigen",
          fr: "Toujours; aucun montant ne peut faire taire le spectre de la ruine ancré en moi",
          es: "Siempre; no existe cifra que calme el fantasma de la miseria grabado en mi cuerpo",
        },
      },
    ],
  },

  // Subscale 2: Catastrophic Destitution Phobia (Q5 - Q8)
  {
    id: 5,
    subscale: "catastrophic_destitution_phobia",
    prompt: {
      en: "I harbor a recurring, vivid fear that I will end up bankrupt, homeless, or starving on the street—despite having savings or steady work.",
      id: "Aku menyimpan ketakutan berulang yang sangat nyata bahwa diriku akan jatuh bangkrut, gelandangan, atau mati kelaparan—meski punya tabungan atau pekerjaan stabil.",
      de: "Ich trage die permanente Panik in mir, eines Tages obdachlos und verarmt auf der Straße zu enden – trotz Ersparnissen.",
      fr: "J'ai la peur obsessionnelle de finir ruiné, sans-abri ou affamé sous les ponts, malgré un salaire ou une épargne.",
      es: "Tengo un terror recurrente a acabar en la quiebra, sin hogar o mendigando en la calle, a pesar de tener ahorros o empleo.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I trust in my resilience, skills, and safety net",
          id: "Tidak pernah; saya percaya pada daya tahan, keahlian, dan jaring pengamanku",
          de: "Nie; ich vertraue auf meine Fähigkeiten und mein Auffangnetz",
          fr: "Jamais; j'ai confiance en mes compétences et ma capacité d'adaptation",
          es: "Nunca; confío en mi capacidad, experiencia y red de apoyo",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely; only during severe macroeconomic recessions or global crises",
          id: "Jarang; hanya saat masa krisis moneter berat atau resesi global",
          de: "Selten; nur bei extremen Wirtschaftskrisen oder Entlassungswellen",
          fr: "Rarement; uniquement lors de crises économiques majeures",
          es: "Rara vez; solo en recesiones económicas severas",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; any minor job hiccup or sickness makes me picture total financial apocalypse",
          id: "Sering; kendala kecil di kantor atau jatuh sakit langsung membuatku membayangkan kiamat finansial",
          de: "Oft; kleine berufliche Hürden lösen sofort Bilder des totalen Ruins aus",
          fr: "Souvent; le moindre accroc professionnel me fait imaginer la faillite totale",
          es: "A menudo; cualquier contratiempo laboral me hace visualizar la ruina absoluta",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly; my baseline nervous system operates as if destitution is one mistake away",
          id: "Terus-menerus; sistem sarafku hidup dalam keyakinan bahwa kehancuran hidup hanya berjarak satu kesalahan kecil",
          de: "Ständig; mein Nervensystem lebt in dem Glauben, nur einen Fehler vom Abgrund entfernt zu sein",
          fr: "Constamment; mon corps réagit comme si un seul faux pas me précipitait dans le gouffre",
          es: "Constantemente; mi cuerpo reacciona como si la indigencia estuviera a un solo error de distancia",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "catastrophic_destitution_phobia",
    prompt: {
      en: "I feel sick with anxiety when I have to spend money on necessary car/home maintenance, medical care, or dental work.",
      id: "Aku merasa mual dan cemas saat harus mengeluarkan uang untuk servis mobil/rumah yang rusak, biaya berobat, atau perawatan gigi.",
      de: "Reparaturen am Auto, Hausinstandhaltungen oder Zahnarztkosten lösen Übelkeit und Panik aus.",
      fr: "Les dépenses imprévues mais vitales (santé, dentiste, réparations de voiture) me rendent malade d'angoisse.",
      es: "Gastar dinero en reparaciones necesarias del hogar, del coche o en salud dental me produce una angustia física nauseabunda.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Not at all; I maintain an emergency fund specifically for these realities",
          id: "Sama sekali tidak; saya memang menyiapkan dana darurat khusus untuk hal seperti ini",
          de: "Gar nicht; dafür habe ich einen Notgroschen eingeplant",
          fr: "Pas du tout; mon fonds d'urgence est précisément fait pour cela",
          es: "Para nada; tengo un fondo de emergencia creado para estos imprevistos",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly annoyed, but I pay it promptly without lingering distress",
          id: "Agak kesal, tapi saya langsung melunasinya tanpa stres berkepanjangan",
          de: "Leicht verärgert, aber ich zahle es zügig ohne anhaltenden Stress",
          fr: "Légèrement agacé, mais je règle la note sans drame",
          es: "Me fastidia un poco, pero lo pago sin quedarme rumiando",
        },
      },
      {
        score: 2,
        label: {
          en: "Severely; I delay doctors or car repairs because parted money feels like physical injury",
          id: "Cukup parah; aku menunda ke dokter atau bengkel karena mengeluarkan uang terasa seperti luka fisik",
          de: "Deutlich; ich schiebe Arztbesuche auf, weil Geldausgaben schmerzen wie Wunden",
          fr: "Sévèrement; je repousse le médecin ou les réparations car débourser m'est douloureux",
          es: "Severamente; pospongo citas médicas o averías porque soltar dinero me duele en el cuerpo",
        },
      },
      {
        score: 3,
        label: {
          en: "Extreme; unforeseen repairs trigger rage, deep depression, or feeling that life is punishing me",
          id: "Ekstrem; biaya tak terduga memicu amarah, depresi mendalam, atau merasa hidup sedang menghukumku",
          de: "Extrem; unerwartete Kosten lösen Depressionen aus und das Gefühl, verflucht zu sein",
          fr: "Extrême; une facture imprévue me plonge dans la dépression ou la rage d'être maudit",
          es: "Extremo; cualquier gasto imprevisto me sume en la depresión o la sensación de que la vida me castiga",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "catastrophic_destitution_phobia",
    prompt: {
      en: "Growing up, I experienced financial instability, witnessed explosive fights about money, or felt the shame of poverty.",
      id: "Saat masa kecil, aku menyaksikan ketidakstabilan finansial, pertengkaran hebat orang tua soal uang, atau merasa malu akibat kemiskinan.",
      de: "In meiner Kindheit erlebte ich finanzielle Unsicherheit, bittere Geldstreitigkeiten oder die Scham der Armut.",
      fr: "Enfant, j'ai connu la précarité, assisté à des disputes violentes autour de l'argent ou ressenti la honte du manque.",
      es: "En mi infancia viví inestabilidad económica, presencié discusiones feroces por dinero o sentí la vergüenza de la precariedad.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "No; money was discussed calmly and predictably in my household",
          id: "Tidak; urusan uang dibicarakan secara tenang dan sehat di keluargaku",
          de: "Nein; über Finanzen wurde ruhig und transparent gesprochen",
          fr: "Non; l'argent était un sujet serein, stable et prévisible",
          es: "No; el dinero se gestionaba con tranquilidad y estabilidad en mi hogar",
        },
      },
      {
        score: 1,
        label: {
          en: "Slightly; money was tight occasionally, but basic security was maintained",
          id: "Sedikit; uang sempat pas-pasan sesekali, namun kebutuhan dasar selalu aman",
          de: "Gering; es war manchmal knapp, aber die Grundversorgung stand nie in Frage",
          fr: "Un peu; c'était parfois juste, mais la sécurité de base était assurée",
          es: "Levemente; hubo épocas apretadas, pero las necesidades básicas estaban cubiertas",
        },
      },
      {
        score: 2,
        label: {
          en: "Substantially; money was an emotional weapon, a source of constant screaming, or extreme stress",
          id: "Cukup besar; uang menjadi senjata emosional, pemicu teriakan, atau stres kronis di rumah",
          de: "Deutlich; Geld war ein Dauerkampffeld und Auslöser massiver häuslicher Spannungen",
          fr: "Fortement; l'argent était un sujet toxique, source de cris et de tensions permanentes",
          es: "Bastante; el dinero era un arma arrojadiza y fuente de gritos continuos",
        },
      },
      {
        score: 3,
        label: {
          en: "Profoundly; severe deprivation or bankruptcy left deep, unhealed somatic scars in my memory",
          id: "Sangat mendalam; kebangkrutan atau kemiskinan parah meninggalkan trauma somatis mendalam yang belum sembuh",
          de: "Tiefgreifend; schwere Armut oder Insolvenz hinterließen bleibende traumatische Wunden",
          fr: "Profondément; la précarité aiguë ou la faillite a laissé des traumatismes corporels indélébiles",
          es: "Profundamente; la ruina o las carencias extremas dejaron cicatrices somáticas imborrables",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "catastrophic_destitution_phobia",
    prompt: {
      en: "I obsessively calculate how many months or weeks I could survive if all my income suddenly vanished today.",
      id: "Aku terobsesi menghitung berapa bulan atau minggu aku bisa bertahan hidup jika seluruh penghasilanku tiba-tiba lenyap hari ini.",
      de: "Ich kalkuliere zwanghaft, wie viele Wochen ich überleben könnte, wenn alle Einkünfte sofort wegfielen.",
      fr: "Je calcule de façon obsessionnelle combien de semaines je pourrais survivre si mes revenus s'arrêtaient net.",
      es: "Calculo obsesivamente cuántos meses o semanas sobreviviría si mis ingresos desaparecieran de golpe hoy mismo.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely; I know my runway logically without obsessing over it",
          id: "Jarang; saya tahu cadangan danaku secara rasional tanpa terobsesi memikirkannya",
          de: "Selten; ich kenne meine Liquidität ohne ständiges Grübeln",
          fr: "Rarement; je connais mon épargne sans en faire une obsession",
          es: "Rara vez; conozco mis ahorros sin obsesionarme con ello",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; during career transitions or contract renewals",
          id: "Sesekali; saat transisi karir atau perpanjangan kontrak kerja",
          de: "Gelegentlich; bei Jobwechseln oder auslaufenden Verträgen",
          fr: "Parfois; lors d'un changement de poste ou fin de contrat",
          es: "A veces; en transiciones laborales o contratos por renovar",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; I run the survival numbers multiple times a week to self-soothe",
          id: "Sering; aku menghitung angka bertahan hidup berkali-kali seminggu untuk menenangkan diri",
          de: "Häufig; ich rechne das Überlebenspolster mehrmals pro Woche durch, um mich zu beruhigen",
          fr: "Souvent; je recalcule ma réserve plusieurs fois par semaine pour me rassurer",
          es: "Frecuentemente; hago los cálculos de supervivencia varias veces por semana para calmarme",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly; even with years of runway, I feel like I have only 72 hours before disaster strikes",
          id: "Terus-menerus; meski punya tabungan bertahun-tahun, aku merasa hanya punya waktu 72 jam sebelum musibah tiba",
          de: "Ständig; selbst mit jahrelangem Polster fühlt es sich an, als blieben mir nur 72 Stunden",
          fr: "Constamment; même avec des années d'avance, je me sens à 72 heures de la faillite",
          es: "Constantemente; aun teniendo años de colchón, siento que me quedan 72 horas de vida económica",
        },
      },
    ],
  },

  // Subscale 3: Deprivation Guilt, Stinginess & Distress Spending (Q9 - Q12)
  {
    id: 9,
    subscale: "deprivation_guilt_hoarding",
    prompt: {
      en: "Buying something purely for joy, self-care, or comfort (a massage, nice dinner, quality shoes) fills me with guilt and self-blame.",
      id: "Membeli sesuatu murni demi kebahagiaan, perawatan diri, atau kenyamanan (pijat, makan enak, sepatu bagus) membuatku diliputi rasa bersalah dan penyesalan.",
      de: "Ausgaben rein für Freude, Wellness oder Genuss (gutes Essen, Urlaub) lösen Schuldgefühle und Selbstvorwürfe aus.",
      fr: "M'offrir un plaisir personnel (bon restaurant, massage, vêtements de qualité) déclenche une culpabilité dévorante.",
      es: "Comprar algo por puro placer, bienestar o comodidad (buena comida, masaje, calzado de calidad) me llena de culpa y autorreproche.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I joyfully spend on my wellbeing within my planned budget",
          id: "Tidak pernah; saya dengan senang hati membelanjakan untuk kesejahteraan diriku sesuai anggaran",
          de: "Nie; ich gönne mir Freude und Komfort im Rahmen meines Budgets",
          fr: "Jamais; je m'accorde des plaisirs dans la limite de mon budget en toute sérénité",
          es: "Nunca; disfruto gastar en mi bienestar dentro de mi presupuesto planificado",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely; only if I splurged substantially beyond my regular allowance",
          id: "Jarang; hanya jika saya berbelanja jauh melampaui batas wajar",
          de: "Selten; nur wenn ich mein Monatsbudget massiv überschritten habe",
          fr: "Rarement; seulement si j'ai vraiment explosé mes limites habituelles",
          es: "Rara vez; solo si me excedí claramente de lo previsto",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; I return items I bought or feel dirty and reckless after buying quality things",
          id: "Sering; aku sering mengembalikan barang yang kubeli atau merasa bersalah setelah membeli barang bagus",
          de: "Oft; ich schicke Einkäufe zurück oder schäme mich für gute Dinge",
          fr: "Souvent; je renvoie mes achats ou me sens 'irresponsable' après m'être fait plaisir",
          es: "A menudo; devuelvo cosas compradas o me siento irresponsable tras comprar algo de calidad",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; spending on myself feels like a moral betrayal, so I endure discomfort and deprivation",
          id: "Selalu; mengeluarkan uang untuk diri sendiri terasa seperti pengkhianatan moral, sehingga kupilih menderita sengsara",
          de: "Immer; Ausgaben für mich fühlen sich wie ein moralischer Verrat an; ich wähle Askese",
          fr: "Toujours; dépenser pour moi m'apparaît comme une trahison immorale; je m'impose l'austérité",
          es: "Siempre; gastar en mí se siente como una traición ética; prefiero privarme y sufrir incomodidad",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "deprivation_guilt_hoarding",
    prompt: {
      en: "I hoard worn-out, broken, or expired items because throwing them out or replacing them feels like a dangerous waste.",
      id: "Aku menimbun barang usang, rusak, atau kadaluwarsa karena membuang atau menggantinya terasa seperti pemborosan berbahaya.",
      de: "Ich behalte kaputte, abgetragene oder abgelaufene Dinge, weil Ersetzen sich wie Verschwendung anfühlt.",
      fr: "Je conserve des objets usés, cassés ou périmés car les jeter ou les racheter me semble un gâchis impardonnable.",
      es: "Acumulo cosas rotas, gastadas o caducadas porque tirarlas o sustituirlas me parece un despilfarro peligroso.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I declutter and replace degraded items responsibly",
          id: "Tidak pernah; saya merapikan dan mengganti barang rusak secara berkala",
          de: "Nie; ich entsorge und ersetze unbrauchbare Gegenstände sachlich",
          fr: "Jamais; je me sépare des objets cassés et remplace ce qui est usé sans hésiter",
          es: "Nunca; desecho lo roto y renuevo lo necesario de forma ordenada",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; I try to repair things first to be environmentally conscious",
          id: "Sesekali; saya coba memperbaiki dulu demi ramah lingkungan",
          de: "Gelegentlich; ich repariere Dinge aus Gründen der Nachhaltigkeit",
          fr: "Parfois; je tente de réparer d'abord par conscience écologique",
          es: "A veces; intento reparar primero por sostenibilidad",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; I wear clothes with holes or use malfunctioning tools to save money",
          id: "Sering; aku memakai baju bolong atau alat rusak demi menghemat uang",
          de: "Häufig; ich nutze verschlissene Kleidung oder defekte Geräte, um Geld zu sparen",
          fr: "Souvent; je porte des vêtements troués ou utilise du matériel défaillant pour économiser",
          es: "Frecuentemente; uso ropa agujereada o utensilios rotos para evitar gastar",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly; my living space is cluttered with degraded goods because replacement feels terrifying",
          id: "Terus-menerus; tempat tinggalku penuh barang rusak karena menggantinya memicu kepanikan",
          de: "Ständig; meine Wohnung ist voll von Altem, weil Neuanschaffung Todesangst weckt",
          fr: "Constamment; mon espace est encombré de biens dégradés car racheter m'angoisse profondément",
          es: "Constantemente; mi casa está llena de cosas deterioradas porque cambiarlas me aterra",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "deprivation_guilt_hoarding",
    prompt: {
      en: "After periods of intense deprivation and stinginess, I swing into impulsive 'revenge spending' or secret binge shopping to numb my stress.",
      id: "Setelah periode penghematan ekstrem yang menyiksa, aku terjerumus ke 'belanja balas dendam' impulsif secara diam-diam demi meredakan stres.",
      de: "Nach Phasen harter Knausrigkeit verfalle ich in impulsive 'Rache-Käufe', um Stress zu betäuben.",
      fr: "Après des périodes de privation sévère, je bascule dans des achats compulsifs secrets pour anesthésier mon stress.",
      es: "Tras periodos de austeridad asfixiante, caigo en compras impulsivas de revancha para adormecer mi ansiedad.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; my spending is balanced and emotionally steady",
          id: "Tidak pernah; pengeluaran belanjaku seimbang dan stabil secara emosional",
          de: "Nie; mein Konsumverhalten ist emotional ausgeglichen",
          fr: "Jamais; mes dépenses sont équilibrées et sereines",
          es: "Nunca; mi consumo es equilibrado y estable emocionalmente",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely; maybe an impulsive small treat during a very stressful work week",
          id: "Jarang; mungkin sekadar jajan kopi enak saat minggu kerja yang sangat padat",
          de: "Selten; vielleicht ein kleiner Snack nach einer harten Arbeitswoche",
          fr: "Rarement; une petite gourmandise après une rude semaine",
          es: "Rara vez; un capricho pequeño tras una semana estresante",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; I swing between extreme penny-pinching and shame-filled shopping binges",
          id: "Sering; aku berayun antara berhemat ekstrem lalu kalap belanja penuh penyesalan",
          de: "Oft; ich pendle zwischen radikalem Geiz und reuevollen Konsumräuschen",
          fr: "Souvent; j'oscille entre radinerie extrême et frénésie d'achats honteuse",
          es: "A menudo; oscilo entre el tacañismo extremo y atracones de compras cargados de culpa",
        },
      },
      {
        score: 3,
        label: {
          en: "Severely; I am trapped in an agonizing financial binging-and-purging cycle that damages my savings",
          id: "Sangat parah; aku terjebak dalam siklus bulimia finansial (tahan-lampiaskan-sesali) yang merusak tabunganku",
          de: "Extrem; ein destruktiver Kreislauf aus Askese und Kaufrausch ruiniert meine Finanzen",
          fr: "Sévèrement; un cycle destructeur de privation et de compensation ruine mes économies",
          es: "Severamente; un ciclo destructivo de privación y despilfarro compulsivo destruye mis ahorros",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "deprivation_guilt_hoarding",
    prompt: {
      en: "Financial anxiety strains my romantic partnership or friendships—causing fights over minor expenses, split bills, or secretive finances.",
      id: "Kecemasan finansial merusak hubungan asmara atau pertemananku—memicu pertengkaran soal pengeluaran sepele, pembagian tagihan, atau merahasiakan uang.",
      de: "Geldsorgen belasten meine Partnerschaft – Streitigkeiten über Kleinausgaben oder verheimlichte Finanzen sind an der Tagesordnung.",
      fr: "L'anxiété financière empoisonne mon couple ou mes amitiés: disputes pour des détails de facture ou comptes secrets.",
      es: "La angustia económica deteriora mi relación de pareja o amistades: disputas por gastos menores o dinero en secreto.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely; I communicate openly and peacefully about shared money values",
          id: "Jarang; saya mengomunikasikan nilai keuangan secara terbuka dan damai",
          de: "Selten; wir sprechen offen und partnerschaftlich über Finanzen",
          fr: "Rarement; nous parlons d'argent en toute confiance et transparence",
          es: "Rara vez; hablamos de dinero con franqueza y acuerdos armoniosos",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; mild disagreements on vacations or gift-giving budgets",
          id: "Sesekali; perbedaan pendapat ringan soal anggaran liburan atau kado",
          de: "Gelegentlich; kleinere Diskussionen bei Urlauben oder Geschenken",
          fr: "Parfois; de petits désaccords sur les vacances ou cadeaux",
          es: "A veces; discrepancias leves sobre vacaciones o regalos",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; I police my partner's receipts or hide my own purchases to avoid judgment",
          id: "Sering; aku mengawasi struk belanja pasangan atau menyembunyikan belanjaku demi menghindari cekcok",
          de: "Häufig; ich kontrolliere Quittungen des Partners oder verstecke eigene Einkäufe",
          fr: "Souvent; je surveille les tickets de caisse de l'autre ou cache mes paquets par honte",
          es: "Frecuentemente; fiscalizo los gastos de mi pareja o escondo compras para no discutir",
        },
      },
      {
        score: 3,
        label: {
          en: "Severely; financial terror has made me controlling, resentful, or deceitful in my closest relationships",
          id: "Sangat parah; teror finansial membuatku manipulatif, mengontrol, atau tidak jujur dalam hubungan terdekat",
          de: "Extrem; Geldpanik hat mich kontrollierend, misstrauisch und unehrlich gemacht",
          fr: "Extrême; la terreur de manquer m'a rendu contrôlant, méfiant ou menteur envers mes proches",
          es: "Extremo; el pánico financiero me ha vuelto controlador, desconfiado o mentiroso con mis seres queridos",
        },
      },
    ],
  },
];

export const FINANCIAL_ANXIETY_ARCHETYPES: Record<
  "grounded_abundance" | "mild_hypervigilance" | "chronic_scarcity" | "severe_destitution_terror",
  FinancialAnxietyArchetypeProfile
> = {
  grounded_abundance: {
    level: "grounded_abundance",
    badge: {
      en: "Regulated Abundance / Mindful Stewardship",
      id: "Keberlimpahan Terkelola / Hubungan Sehat dengan Uang",
      de: "Regulierte Gelassenheit / Gesunde Finanzführung",
      fr: "Sérénité Financière / Gestion Équilibrée",
      es: "Abundancia Regulada / Gestión Consciente",
    },
    title: {
      en: "The Regulated Steward",
      id: "Sang Pengelola Bijak",
      de: "Der achtsame Verwalter",
      fr: "Le Gestionnaire Serein",
      es: "El Gestor Sereno",
    },
    tagline: {
      en: "Money is an objective tool for safety and living, not an emotional weapon or source of terror.",
      id: "Uang adalah alat penunjang kehidupan yang objektif, bukan senjata emosi atau sumber teror batin.",
      de: "Geld ist für Sie ein nützliches Werkzeug für Freiheit und Sicherheit, kein existenzieller Albtraum.",
      fr: "L'argent est pour vous un instrument de liberté et de sécurité, non une source de terreur.",
      es: "El dinero es una herramienta para vivir y protegerte, no una pesadilla existencial.",
    },
    description: {
      en: "Your nervous system does not confuse bank account fluctuations with your core human worth or immediate survival. You can spend on health, joy, and necessities without triggering post-purchase guilt, and you address bills and unforeseen costs with calm, grounded pragmatism.",
      id: "Sistem sarafmu tidak menyamakan saldo tabungan dengan harga dirimu atau kepastian keselamatan hidup. Kamu bisa mengeluarkan uang untuk kesehatan dan kesenangan tanpa dihantui penyesalan, serta menghadapi tagihan tak terduga dengan kepala dingin.",
      de: "Ihr Nervensystem koppelt Ihren menschlichen Wert nicht an Kontobewegungen. Sie investieren in Gesundheit und Genuss ohne quälende Reue und begegnen Rechnungen mit pragmatischer Ruhe.",
      fr: "Votre système nerveux ne confond pas vos finances avec votre valeur humaine. Vous investissez dans votre bien-être sans culpabilité et réglez les imprévus avec calme et méthode.",
      es: "Tu sistema nervioso no confunde tu saldo bancario con tu valor como persona. Inviertes en tu bienestar sin culpa y afrontas los imprevistos con serenidad pragmática.",
    },
    psychologyInsight: {
      en: "According to Sendhil Mullainathan and Eldar Shafir (Harvard/Princeton research), your brain operates without a 'scarcity cognitive bandwidth tax'. Because money thoughts do not flood your executive prefrontal cortex, your working memory, emotional regulation, and decision quality remain high.",
      id: "Berdasarkan riset Mullainathan dan Shafir (Harvard/Princeton), otakmu bebas dari 'pajak kognitif kelangkaan'. Karena pikiran uang tidak membajak korteks prefrontalmu, memori kerja, regulasi emosi, dan ketajaman keputusanmu tetap optimal.",
      de: "Nach der Forschung von Mullainathan & Shafir ist Ihr Gehirn frei von der 'kognitiven Knappheitssteuer'. Ihre Exekutivfunktionen und Entscheidungsqualitäten bleiben ungetrübt.",
      fr: "Selon les travaux de Mullainathan & Shafir, votre esprit est préservé de la 'taxe cognitive de la pénurie'. Vos capacités de discernement et de décision restent optimales.",
      es: "Según las investigaciones de Mullainathan y Shafir, tu mente está libre del 'impuesto cognitivo de la escasez'. Tu corteza prefrontal funciona con lucidez y calma.",
    },
    actionProtocols: {
      en: [
        "Continue maintaining your automated savings and conscious spending buckets.",
        "Practice generous, joyful giving to causes or people you love without anxiety.",
        "Regularly remind yourself that money is meant to serve your human life, not vice versa.",
      ],
      id: [
        "Pertahankan tabungan otomatis dan pos pengeluaran sadar yang sudah berjalan baik.",
        "Biasakan berbagi dan bersedekah dengan gembira tanpa rasa cemas kekurangan.",
        "Ingatkan dirimu bahwa uang diciptakan untuk melayani kehidupanmu, bukan sebaliknya.",
      ],
      de: [
        "Pflegen Sie Ihre automatisierten Spar- und Genussbudgets weiterhin diszipliniert.",
        "Gönnen Sie sich und anderen Freude ohne nachfolgende Selbstzweifel.",
        "Verankern Sie den Grundsatz: Geld dient Ihrem Leben, nicht Ihr Leben dem Geld.",
      ],
      fr: [
        "Conservez vos automatismes d'épargne et vos budgets plaisirs équilibrés.",
        "Pratiquez la générosité envers vous et vos proches sans arrière-pensée anxieuse.",
        "Rappelez-vous régulièrement que l'argent est au service de votre vie, et non l'inverse.",
      ],
      es: [
        "Mantén tus ahorros automáticos y tus presupuestos de disfrute consciente.",
        "Practica la generosidad hacia ti y hacia otros sin miedo a la escasez.",
        "Recuerda que el dinero es un siervo de tu vida, no tu amo emocional.",
      ],
    },
    dailyAffirmation: {
      en: "I am safe, capable, and worthy regardless of temporary economic fluctuations.",
      id: "Aku aman, berdaya, dan berharga terlepas dari pasang surut kondisi ekonomi sementara.",
      de: "Ich bin sicher, handlungsfähig und wertvoll, unabhängig von kurzfristigen Finanzturbulenzen.",
      fr: "Je suis en sécurité, compétent et digne, au-delà des fluctuations matérielles.",
      es: "Estoy a salvo, soy capaz y valioso independientemente de los altibajos económicos.",
    },
  },

  mild_hypervigilance: {
    level: "mild_hypervigilance",
    badge: {
      en: "The Frugal Sentinel / Scarcity Guard",
      id: "Penjaga Hemat Waspada / Cemas Biaya",
      de: "Der sparsame Wächter / Finanz-Wachsamkeit",
      fr: "La Sentinelle Économe / Vigilance Budgétaire",
      es: "El Centinela Ahorrador / Alerta de Gastos",
    },
    title: {
      en: "The Cautious Sentinel",
      id: "Sang Penjaga Waspada",
      de: "Der vorsichtige Wächter",
      fr: "Le Gardien Prudent",
      es: "El Centinela Prudente",
    },
    tagline: {
      en: "You are financially responsible, but invisible worry casts a shadow over everyday spending.",
      id: "Secara finansial kamu bertanggung jawab, namun kekhawatiran tak kasat mata selalu membayangi pengeluaran harian.",
      de: "Sie sind diszipliniert, doch eine leise Sorge begleitet jeden alltäglichen Kassenbon.",
      fr: "Vous êtes rigoureux, mais une inquiétude diffuse plane sur le moindre achat du quotidien.",
      es: "Eres financieramente responsable, pero una sombra de inquietud acompaña cada ticket de compra.",
    },
    description: {
      en: "You have your bills paid and money in reserve, but spending on non-essential joys makes you flinch. You over-research purchases, feel subtle pangs of regret after buying quality items, and mentally track balances more frequently than necessary. Scarcity is a faint background hum in your nervous system.",
      id: "Tagihanmu terbayar dan kamu punya tabungan, tetapi mengeluarkan uang untuk hal menyenangkan membuatmu tersentak. Kamu terlalu lama meriset harga sebelum membeli, merasa sedikit bersalah setelah membeli barang bagus, dan mengecek rekening lebih sering dari yang dibutuhkan.",
      de: "Ihre Rechnungen sind bezahlt und Rücklagen vorhanden, dennoch schmerzt nicht-lebensnotwendiger Konsum. Sie vergleichen übertrieben lange Preise und spüren nach Einkäufen leisen Ärger. Knappheit ist ein ständiges Hintergrundsummen in Ihrem Körper.",
      fr: "Vos comptes sont à l'équilibre, mais vous grimacez dès qu'il s'agit de vous faire plaisir. Vous comparez trop les prix et ressentez un pincement au cœur après avoir acheté de la qualité.",
      es: "Pagas tus facturas y tienes ahorros, pero gastar en ocio te tensa. Comparas precios en exceso, sientes una punzada de culpa tras compras de calidad y vigilas tus cuentas más de la cuenta.",
    },
    psychologyInsight: {
      en: "Brad Klontz calls this a 'Money Vigilance' script. While it protects you from debt, it carries an emotional bandwidth tax. Your nervous system treats spending as safety depletion rather than resource circulation.",
      id: "Brad Klontz menyebut ini skrip 'Money Vigilance' (Kewaspadaan Uang). Meski melindungimu dari jeratan utang, kebiasaan ini membebani energi kognitif. Tubuhmu mengartikan pengeluaran sebagai hilangnya rasa aman, bukan perputaran rezeki.",
      de: "Dr. Brad Klontz nennt dies das Skript der 'Geld-Wachsamkeit'. Es schützt vor Schulden, raubt aber Lebensqualität. Ihr Körper deutet Ausgaben als Verlust von Sicherheit statt als Ressourcentausch.",
      fr: "Brad Klontz qualifie ce schéma de 'Vigilance financière'. S'il évite les dettes, il taxe votre sérénité. Votre système nerveux perçoit la dépense comme une perte de sécurité vitale.",
      es: "Brad Klontz lo define como 'Vigilancia Monetaria'. Te protege de la deuda, pero a costa de tu paz. Tu biología interpreta gastar como una pérdida de protección y no como circulación de recursos.",
    },
    actionProtocols: {
      en: [
        "Create a 'Guilt-Free Splurge' Account: Allocate 5-10% of monthly income specifically to be spent on pure enjoyment with zero justification.",
        "Institute the '10-Minute Price Rule': For items under $30, never spend more than 5 minutes comparing prices. Your time is worth more.",
        "Somatic Abundance Breathing: When paying a bill, exhale slowly and think: 'I am exchanging paper/digits for shelter, food, or joy. My capacity to earn is alive.'",
      ],
      id: [
        "Buat Rekening 'Uang Hura-Hura Bebas Sesal': Sisihkan 5-10% penghasilan bulanan khusus untuk bersenang-senang tanpa perlu merasa bersalah.",
        "Terapkan 'Aturan 10 Menit': Untuk belanja di bawah 200 ribu, jangan habiskan lebih dari 5 menit membandingkan harga. Waktumu jauh lebih berharga.",
        "Napas Kelimpahan Somatis: Saat membayar, hembuskan napas perlahan dan afirmasikan: 'Uang ini mengalir untuk menghidupi rumah, makanan, atau kenyamananku. Rezekiku tetap mengalir.'",
      ],
      de: [
        "Richten Sie ein 'Genusskonto' ein: Reservieren Sie 5-10 % Ihres Nettoeinkommens ausschließlich für Freude – ohne jegliche Rechtfertigungspflicht.",
        "Die 5-Minuten-Preisregel: Vergleichen Sie bei Artikeln unter 30 € maximal 5 Minuten. Ihre geistige Ruhe ist wertvoller.",
        "Somatische Entlastung beim Bezahlen: Atmen Sie beim Überweisen bewusst aus und denken Sie: 'Ich tausche Geld gegen echte Lebensqualität. Meine Ertragskraft lebt.'",
      ],
      fr: [
        "Créez un compte 'Plaisir Sans Culpabilité': Allouez 5 à 10 % de vos revenus au pur divertissement, sans avoir à vous justifier.",
        "Règle des 5 minutes: Pour tout achat inférieur à 30 €, ne passez pas plus de 5 minutes à comparer les prix. Votre temps est précieux.",
        "Respiration d'abondance: En payant une facture, expirez longuement et répétez: 'J'échange cette monnaie contre du confort et de la sécurité bien réels.'",
      ],
      es: [
        "Crea una cuenta de 'Disfrute Libre de Culpa': Destina el 5-10% de tus ingresos a caprichos puros sin tener que dar explicaciones a nadie.",
        "La regla de los 5 minutos: Para compras menores de 30 euros, no pases más de 5 minutos comparando. Tu paz mental vale más.",
        "Respiración somática de circulación: Al pagar una factura, exhala lento y recuerda: 'Estoy canjeando números por techo, alimento o bienestar. Mi capacidad de generar sigue viva.'",
      ],
    },
    dailyAffirmation: {
      en: "Allowing myself comfort and joy does not threaten my long-term financial survival.",
      id: "Mengizinkan diriku menikmati kenyamanan dan kebahagiaan tidak mengancam masa depan finansialku.",
      de: "Mir Komfort und Freude zu gönnen, gefährdet meine finanzielle Zukunft in keiner Weise.",
      fr: "M'accorder du confort et de la joie ne menace en rien ma sécurité financière future.",
      es: "Permitirme comodidad y disfrute no pone en riesgo mi seguridad económica a largo plazo.",
    },
  },

  chronic_scarcity: {
    level: "chronic_scarcity",
    badge: {
      en: "Chronic Scarcity Bandwidth Tax / Hoarding Guilt",
      id: "Beban Pajak Kelangkaan Kronis / Rasa Bersalah Berbelanja",
      de: "Chronische Knappheitsblockade / Knausrigkeitsdruck",
      fr: "Taxe de Pénurie Chronique / Culpabilité d'Achat",
      es: "Impuesto de Escasez Crónica / Culpa por Gastar",
    },
    title: {
      en: "The Scarcity Anchor",
      id: "Sang Penjaga Ketakutan Kelangkaan",
      de: "Der Knappheits-Gefangene",
      fr: "Le Prisonnier du Manque",
      es: "El Prisionero de la Escasez",
    },
    tagline: {
      en: "Trapped in the cognitive bandwidth tax of scarcity, constantly braced for an imminent financial collapse.",
      id: "Terjebak dalam pajak kognitif rasa kekurangan, tubuhmu terus bersiaga menghadapi kiamat finansial.",
      de: "Gefangen im Tunnelblick der Knappheit – Ihr Körper wartet permanent auf den unvermeidlichen Bankrott.",
      fr: "Prisonnier de la vision en tunnel de la pénurie, votre corps guette en permanence la faillite imminente.",
      es: "Atrapado en la visión de túnel de la escasez, tu cuerpo espera en alerta el colapso económico inminente.",
    },
    description: {
      en: "Scarcity dominates your mental landscape. You spend substantial emotional bandwidth ruminating over money, checking accounts in dread, and postponing dental or healthcare visits because spending feels like an open wound. You may swing between extreme penny-pinching and secret impulse purchases to numb the misery.",
      id: "Pikiran tentang uang dan ketakutan kekurangan mendominasi kepalamu. Sebagian besar energi emosionalmu terkuras untuk mengkhawatirkan uang, membuka rekening dengan rasa mual, dan menunda berobat karena membayar terasa seperti luka fisik. Kamu sering berayun antara berhemat ekstrem lalu kalap belanja diam-diam demi meredakan stres.",
      de: "Geldsorgen beherrschen Ihren Alltag. Sie verschwenden enorme mentale Bandbreite mit Kontrollzwängen und zögern Arztbesuche hinaus, weil Zahlungen wehtun. Oft pendeln Sie zwischen extremer Askese und heimlichen Kompensationskäufen.",
      fr: "La peur du manque sature votre esprit. Vous gaspillez une énergie colossale à ruminer, surveiller vos comptes et repousser les soins de santé essentiels. Vous oscillez entre austérité étouffante et achats impulsifs pour calmer l'angoisse.",
      es: "La obsesión por el dinero copa tu energía. Agotas tus recursos mentales rumiando, revisando tus cuentas con náuseas y posponiendo visitas médicas porque pagar te desgarra. Oscilas entre una tacañería extrema y compras compulsivas secretas para anestesiar el dolor.",
    },
    psychologyInsight: {
      en: "Mullainathan and Shafir demonstrated that scarcity triggers 'tunneling': the brain focuses exclusively on the immediate shortfall while neglecting long-term planning, effectively reducing fluid intelligence by up to 13 IQ points during financial stress triggers.",
      id: "Riset Mullainathan dan Shafir membuktikan bahwa rasa kekurangan memicu 'efek terowongan' (tunneling): otak hanya fokus pada kekurangan sesaat dan mengabaikan perencanaan jangka panjang, menurunkan kecerdasan efektif hingga setara 13 poin IQ saat dilanda kecemasan uang.",
      de: "Mullainathan & Shafir wiesen nach, dass Knappheit den 'Tunnelblick' erzwingt: Das Gehirn starrt auf das Defizit und blendet Weitsicht aus, was die fluide Intelligenz in Stressphasen um bis zu 13 IQ-Punkte senkt.",
      fr: "Les chercheurs de Harvard ont prouvé que la pénurie crée une 'vision en tunnel': l'esprit s'obsède sur le manque immédiat et délaisse la vision à long terme, amputant temporairement les capacités cognitives de 13 points de QI.",
      es: "Las investigaciones demuestran que la escasez induce un 'efecto túnel': la mente se obsesiona con el déficit inmediato y sabotea la planificación a largo plazo, restando hasta 13 puntos de inteligencia fluida durante los picos de estrés financiero.",
    },
    actionProtocols: {
      en: [
        "Designate a Weekly 'Financial Window': Confine all bill paying, balance checking, and budgeting to a single 30-minute block on Fridays. Outside that window, forbid yourself from checking banking apps.",
        "Break the Deprivation-Binge Cycle: Stop punishing yourself with extreme penny-pinching. Budget small daily comforts to prevent explosive compensatory spending.",
        "Unpack Family Money Scripts: Journal about how your parents treated money. Acknowledge: 'Their poverty or anxiety was theirs. I live in a different reality today.'",
      ],
      id: [
        "Tetapkan 'Jadwal Keuangan Mingguan': Batasi urusan bayar tagihan, cek saldo, dan anggaran hanya dalam satu sesi 30 menit setiap hari Jumat. Di luar jadwal itu, haramkan membuka aplikasi m-banking.",
        "Hentikan Siklus Hemat-Kalap: Jangan menyiksa diri dengan berhemat terlalu pelit. Anggarkan jajan kecil harian agar tidak memicu ledakan belanja balas dendam.",
        "Bongkar Pola Uang Masa Kecil: Tulis jurnal tentang bagaimana orang tuamu menyikapi uang. Sadari: 'Kemiskinan dan ketakutan masa lalu adalah milik mereka. Hari ini aku hidup dalam realitas yang berbeda.'",
      ],
      de: [
        "Feste wöchentliche Finanzzeit: Begrenzen Sie Kontochecks und Überweisungen auf ein einziges 30-Minuten-Fenster am Freitag. Außerhalb dieser Zeit ist die Banking-App tabu.",
        "Durchbrechen Sie den Geiz-Kaufrausch-Zirkel: Erlauben Sie sich kleine tägliche Freuden, um explosive Frustkäufe im Keim zu ersticken.",
        "Glaubenssätze der Herkunftsfamilie entlarven: Reflektieren Sie die Finanzängste Ihrer Eltern: 'Ihre Not war real. Ich lebe heute in meiner eigenen, erwachsenen Sicherheit.'",
      ],
      fr: [
        "Fenêtre financière hebdomadaire: Limitez les comptes et factures à un créneau unique de 30 minutes le vendredi. En dehors, désinstallez ou bloquez les applis bancaires.",
        "Cassez le cycle privation-craquage: Cessez de vous punir par une austérité cruelle. Intégrez de petits plaisirs quotidiens pour éviter les crises d'achats compensatoires.",
        "Exorcisez les traumatismes d'enfance: Écrivez sur les angoisses financières de vos parents. Réalisez: 'Leur précarité leur appartenait. Aujourd'hui, je suis adulte et autonome.'",
      ],
      es: [
        "Ventana Financiera Semanal: Limita la revisión de cuentas y pagos a un bloque único de 30 minutos los viernes. Fuera de ese espacio, prohíbete entrar en las apps bancarias.",
        "Rompe el ciclo privación-atracón: Deja de castigarte con una tacañería draconiana. Permítete pequeños gastos diarios para evitar explosiones de consumo compensatorio.",
        "Desmonta las herencias familiares: Escribe sobre la relación de tus padres con el dinero. Asume: 'La precariedad o el miedo de mi infancia eran de ellos. Hoy vivo en una realidad distinta.'",
      ],
    },
    dailyAffirmation: {
      en: "I do not need to live in starvation mode to guarantee my future security.",
      id: "Aku tidak perlu hidup dalam mode sengsara kelaparan demi menjamin masa depan keuanganku.",
      de: "Ich muss mich nicht im Hungermodus kasteien, um meine zukünftige Sicherheit zu garantieren.",
      fr: "Je n'ai pas besoin de vivre en mode survie pour garantir ma sécurité future.",
      es: "No necesito vivir en modo privación extrema para garantizar mi seguridad de mañana.",
    },
  },

  severe_destitution_terror: {
    level: "severe_destitution_terror",
    badge: {
      en: "Severe Financial PTSD / Phantom Poverty Phobia",
      id: "Trauma Finansial Berat / Fobia Kemiskinan Akut",
      de: "Schweres Finanz-PTSD / Phantomschmerz der Armut",
      fr: "SSPT Financier Sévère / Phobie de la Ruine",
      es: "TEPT Financiero Severo / Terror a la Pobreza",
    },
    title: {
      en: "The Phantom Bankrupt",
      id: "Sang Teror Kebangkrutan Semu",
      de: "Der Phantom-Bankrotteur",
      fr: "Le Ruiné Fantôme",
      es: "El Quebrado Fantasma",
    },
    tagline: {
      en: "Your nervous system is trapped in primal panic, convinced that catastrophic ruin is imminent at any second.",
      id: "Sistem sarafmu terjebak dalam kepanikan purba, yakin bahwa kehancuran total akan menimpa dalam hitungan detik.",
      de: "Ihr Nervensystem lebt im nackten Überlebenskampf, überzeugt, dass der totale Ruin unmittelbar bevorsteht.",
      fr: "Votre système nerveux est figé dans une terreur viscérale, persuadé que la ruine absolue est imminente.",
      es: "Tu biología está atrapada en un pánico primitivo, convencida de que la ruina total acecha a cada segundo.",
    },
    description: {
      en: "You suffer from acute financial trauma. Regardless of actual assets, your body reacts to expenses as existential threats, flooding you with cortisol, nausea, insomnia, and catastrophic visions of homelessness. You may neglect vital health needs, live in squalor to save pennies, and damage relationships through intense financial secrecy or paranoia.",
      id: "Kamu mengalami trauma finansial yang parah. Berapa pun aset riil yang kamu miliki, tubuhmu mengartikan pengeluaran uang sebagai ancaman mati, membanjiri tubuhmu dengan kortisol, insomnia, dan bayangan menjadi gelandangan. Kamu mungkin mengorbankan kesehatan fisik, hidup tersiksa demi menghemat recehan, dan merusak hubungan karena paranoia uang.",
      de: "Sie leiden unter akutem finanziellem Trauma. Unabhängig vom realen Vermögen reagiert Ihr Körper auf Ausgaben wie auf Lebensgefahr – mit Schlaflosigkeit, Übelkeit und Alpträumen von Obdachlosigkeit. Sie vernachlässigen Ihre Gesundheit und belasten Beziehungen durch Paranoia.",
      fr: "Vous endurez un traumatisme financier aigu. Quel que soit votre solde réel, votre corps réagit à la moindre dépense comme à une menace mortelle (insomnies, nausées, visions de déchéance). Vous mettez votre santé en péril pour économiser et sabotez vos liens affectifs.",
      es: "Padeces un trauma financiero severo. Sin importar tu patrimonio real, tu cuerpo interpreta cualquier gasto como una amenaza de muerte biológica (insomnio, taquicardias, visiones de mendicidad). Descuidas tu salud y dinamitas relaciones por pura paranoia económica.",
    },
    psychologyInsight: {
      en: "This represents deep somatized financial PTSD, often rooted in childhood bankruptcy, eviction, parental despair, or generational poverty. The sympathetic nervous system is perpetually locked in survival vigilance, treating money like physical oxygen.",
      id: "Kondisi ini merupakan PTSD finansial tersomatisasi yang mendalam, sering kali berakar dari kebangkrutan masa kecil, penggusuran rumah, keputusasaan orang tua, atau kemiskinan antargenerasi. Sistem saraf simpatikmu terkunci dalam mode bertahan hidup, menganggap uang layaknya tabung oksigen.",
      de: "Hier liegt eine tief somatisierte Traumatisierung vor, meist verwurzelt in frühkindlicher Zwangsräumung, Insolvenz oder existenzieller Verzweiflung der Eltern. Geld wird neurobiologisch wie lebenswichtiger Sauerstoff verhandelt.",
      fr: "Ce profil traduit un stress post-traumatique financier profond, né d'expulsions, de faillites familiales ou de dénuement infantile. Le système nerveux traite l'argent comme de l'oxygène vital sans lequel il étouffe.",
      es: "Representa un TEPT financiero somatizado en tus células, arraigado en desahucios infantiles, quiebras o miseria familiar. Tu sistema simpático trata el dinero como oxígeno biológico: perder un billete equivale a asfixiarse.",
    },
    actionProtocols: {
      en: [
        "Somatic Grounding Before Checking Accounts: Never look at finances in a dysregulated state. Drink warm water, press feet firmly into the floor, do 3 physiological sighs, and look around your secure room first.",
        "Health Expense Exemption Rule: Establish an absolute, unbreakable personal covenant that physical and mental health expenses are never questioned or delayed.",
        "Financial Therapy: Seek a certified Financial Therapist (CFT-I) or trauma therapist specializing in scarcity deconditioning and money scripts.",
      ],
      id: [
        "Regulasi Somatis Sebelum Buka m-Banking: Jangan pernah melihat uang dalam kondisi tubuh tegang. Minum air hangat, pijakkan kaki ke lantai, lakukan 3 kali desah fisiologis, dan lihat sekeliling kamarmu yang aman terlebih dahulu.",
        "Klausul Pengecualian Kesehatan: Buat perjanjian sakral bahwa biaya kesehatan fisik dan mental tidak boleh dipertanyakan, ditunda, atau disesali demi uang.",
        "Terapi Finansial Terakreditasi: Cari terapis atau psikolog trauma yang memahami dekonstruksi 'Money Scripts' dan pemulihan trauma kelangkaan masa kecil.",
      ],
      de: [
        "Somatische Erdung vor dem Bank-Login: Öffnen Sie Bankdaten nie im Zustand der Panik. Trinken Sie warmes Wasser, spüren Sie den festen Boden und atmen Sie tief durch.",
        "Der Unantastbarkeits-Pakt für Gesundheit: Schließen Sie einen feierlichen Vertrag mit sich: Gesundheitsausgaben für Körper und Seele werden niemals aufgeschoben oder bereut.",
        "Finanzpsychologische Therapie: Suchen Sie Unterstützung bei zertifizierten Finanztherapeuten oder Traumatherapeuten zur Entkopplung früher Armutstraumata.",
      ],
      fr: [
        "Ancrage somatique avant tout regard sur vos comptes: Ne consultez jamais vos finances en état de crise. Buvez de l'eau tiède, ancrez vos pieds au sol et faites 3 soupirs physiologiques.",
        "Pacte sacré pour la santé: Décrétez une règle absolue: les dépenses médicales et psychologiques ne sont JAMAIS remises en cause ni repoussées par souci d'économie.",
        "Thérapie financière spécialisée: Consultez un thérapeute formé aux traumatismes financiers et aux scénarios de vie économiques (Money Scripts).",
      ],
      es: [
        "Regulación somática previa: Jamás abras el banco con taquicardia. Bebe agua templada, apoya los pies con firmeza en el suelo y realiza 3 suspiros fisiológicos antes de mirar números.",
        "Pacto innegociable de salud: Establece una regla sagrada: los gastos en salud física y mental jamás se cuestionan, se regatean ni se posponen por dinero.",
        "Terapia financiera especializada: Acude a un terapeuta especializado en dinero o trauma para disolver los lazos de terror grabados desde la infancia.",
      ],
    },
    dailyAffirmation: {
      en: "I am more than my bank account. My life is safe, my worth is eternal, and the past cannot starve me today.",
      id: "Aku jauh lebih berharga daripada saldo bankku. Hidupku aman, nilaiku abadi, dan luka masa lalu tak bisa lagi membiarkanku kelaparan hari ini.",
      de: "Ich bin unendlich mehr als mein Bankkonto. Mein Leben ist geborgen und die Vergangenheit kann mich heute nicht mehr aushungern.",
      fr: "Je suis infiniment plus que mon compte en banque. Ma vie est en sécurité et le passé ne peut plus m'affamer aujourd'hui.",
      es: "Soy infinitamente más que mi cuenta bancaria. Mi vida está a salvo, mi valor es sagrado y el pasado ya no puede hacerme pasar hambre hoy.",
    },
  },
};

export function calculateFinancialAnxietyScore(
  answers: Record<number, number>
): FinancialAnxietyScoreResult {
  let cognitiveBandwidthTaxScore = 0;
  let catastrophicDestitutionPhobiaScore = 0;
  let deprivationGuiltHoardingScore = 0;

  FINANCIAL_ANXIETY_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "cognitive_bandwidth_tax") cognitiveBandwidthTaxScore += score;
    if (q.subscale === "catastrophic_destitution_phobia")
      catastrophicDestitutionPhobiaScore += score;
    if (q.subscale === "deprivation_guilt_hoarding")
      deprivationGuiltHoardingScore += score;
  });

  const totalScore =
    cognitiveBandwidthTaxScore +
    catastrophicDestitutionPhobiaScore +
    deprivationGuiltHoardingScore;
  const maxScore = 36;
  const percentage = Math.min(100, Math.round((totalScore / maxScore) * 100));

  let level: "grounded_abundance" | "mild_hypervigilance" | "chronic_scarcity" | "severe_destitution_terror";

  if (percentage <= 25) {
    level = "grounded_abundance";
  } else if (percentage <= 52) {
    level = "mild_hypervigilance";
  } else if (percentage <= 78) {
    level = "chronic_scarcity";
  } else {
    level = "severe_destitution_terror";
  }

  const profile = FINANCIAL_ANXIETY_ARCHETYPES[level];

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    subscales: {
      cognitive_bandwidth_tax: {
        score: cognitiveBandwidthTaxScore,
        max: 12,
        percentage: Math.min(100, Math.round((cognitiveBandwidthTaxScore / 12) * 100)),
      },
      catastrophic_destitution_phobia: {
        score: catastrophicDestitutionPhobiaScore,
        max: 12,
        percentage: Math.min(
          100,
          Math.round((catastrophicDestitutionPhobiaScore / 12) * 100)
        ),
      },
      deprivation_guilt_hoarding: {
        score: deprivationGuiltHoardingScore,
        max: 12,
        percentage: Math.min(
          100,
          Math.round((deprivationGuiltHoardingScore / 12) * 100)
        ),
      },
    },
    profile,
  };
}
