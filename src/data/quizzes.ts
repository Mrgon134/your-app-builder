import juGreat from "@/assets/ju-great.webp";
import juGood from "@/assets/ju-good.webp";
import juOkay from "@/assets/ju-okay.webp";
import juRough from "@/assets/ju-rough.webp";
import juLow from "@/assets/ju-low.webp";

export interface QuizOption {
  id: string;
  label: string;
  sublabel?: string;
  score?: number; // for numeric scale quizzes (0-100)
  archetypeId?: string; // for archetype quizzes
  icon?: string;
}

export interface QuizQuestion {
  id: number;
  prompt: string;
  subprompt?: string;
  options: QuizOption[];
}

export interface QuizResult {
  id: string;
  title: string;
  badge: string;
  mascotMood: "great" | "good" | "okay" | "rough" | "low";
  mascotImage: string;
  scoreRange?: [number, number]; // inclusive min, max
  archetypeId?: string;
  percentageDisplay?: string;
  tagline: string;
  description: string;
  psychologicalInsight: string;
  actionableSteps: string[];
  recommendedPrompt: string;
  shareSummaryText: string;
}

export interface QuizFAQ {
  question: string;
  answer: string;
}

export interface QuizMeta {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  category: string;
  badge: string;
  estimatedTime: string;
  takersCount: string;
  themeColor: string; // Tailwind color class or hex
  type: "numeric_score" | "archetype";
  targetCountry?: string; // "ID" | "US" | "DE" | "CH" | "NO" | "NL" | "JP" | "KR"
  language?: "id" | "en" | "de" | "ja" | "ko";
  countryFlag?: string;
  mascotMood: "great" | "good" | "okay" | "rough" | "low";
  mascotImage: string;
  questions: QuizQuestion[];
  results: QuizResult[];
  faqs: QuizFAQ[];
}

export const QUIZZES_DATA: QuizMeta[] = [
  // =========================================================================
  // QUIZ 1: CEK SISA BATERAI EMOSIMU HARI INI
  // =========================================================================
  {
    id: "baterai-emosi",
    slug: "baterai-emosi",
    title: "Cek Sisa Baterai Emosimu Hari Ini 🔋",
    shortTitle: "Tes Baterai Emosi",
    subtitle: "Ketahui sisa kapasitas mentalmu sebelum mencapai fase overload & burnout.",
    description: "Kapasitas emosional manusia berfluktuasi setiap hari layaknya baterai ponsel. Luangkan 45 detik untuk mendeteksi apakah kamu sedang berada di zona aman, butuh istirahat sejenak, atau sudah masuk mode hemat daya kritis.",
    category: "Vitalitas Mental",
    badge: "Paling Populer 🔥",
    estimatedTime: "45 Detik",
    takersCount: "42.8k+",
    themeColor: "from-amber-500/20 to-orange-500/10",
    type: "numeric_score",
    targetCountry: "ID",
    language: "id",
    countryFlag: "🇮🇩",
    mascotMood: "okay",
    mascotImage: juOkay,
    questions: [
      {
        id: 1,
        prompt: "Ketika alarm berbunyi atau kamu bangun pagi ini, apa sensasi pertama di kepalamu?",
        subprompt: "Jawab dengan jujur berdasarkan apa yang paling kamu rasakan saat membuka mata.",
        options: [
          {
            id: "1a",
            label: "Segar dan siap menjalani rutinitas harian",
            sublabel: "Tubuh terasa enteng dan tidak ada beban pikiran menumpuk.",
            score: 20,
            icon: "☀️"
          },
          {
            id: "1b",
            label: "Biasa saja, tapi butuh beberapa menit mengumpulkan nyawa",
            sublabel: "Agak malas tapi masih sanggup bergerak normal.",
            score: 15,
            icon: "☕"
          },
          {
            id: "1c",
            label: "Berat banget, rasanya tidur 8 jam tidak ada efeknya",
            sublabel: "Ada desahan napas panjang sebelum beranjak dari kasur.",
            score: 8,
            icon: "🛌"
          },
          {
            id: "1d",
            label: "Dada sesak atau langsung cemas mengingat tumpukan urusan",
            sublabel: "Ingin menghilang sejenak dari muka bumi.",
            score: 3,
            icon: "⚡"
          }
        ]
      },
      {
        id: 2,
        prompt: "Bagaimana reaksimu saat menerima pesan WhatsApp / Slack baru di luar jam kerja?",
        subprompt: "Reaksi spontan tubuhmu sebelum membalas pesan tersebut.",
        options: [
          {
            id: "2a",
            label: "Bisa membalas santai tanpa rasa tertekan",
            sublabel: "Tahu batas dan tidak terpengaruh secara emosional.",
            score: 20,
            icon: "💬"
          },
          {
            id: "2b",
            label: "Agak risih, tapi tetap kubalas kalau penting",
            sublabel: "Sedikit kesal tapi masih bisa mengontrol diri.",
            score: 14,
            icon: "👀"
          },
          {
            id: "2c",
            label: "Jantung berdegup kencang, merasa terinvasi dan ingin mematikan HP",
            sublabel: "Pemberitahuan notifikasi terasa seperti ancaman fisik.",
            score: 7,
            icon: "📴"
          },
          {
            id: "2d",
            label: "Membiarkannya berhari-hari karena tidak ada energi untuk merespons",
            sublabel: "Kelelahan sosial tingkat tinggi, takut membuka chat.",
            score: 2,
            icon: "🚪"
          }
        ]
      },
      {
        id: 3,
        prompt: "Ketika orang lain membuat kesalahan kecil atau bertanya hal sepele hari ini:",
        subprompt: "Toleransi emosi terhadap lingkungan sekitar.",
        options: [
          {
            id: "3a",
            label: "Sabar dan dengan senang hati menjelaskan",
            sublabel: "Ruang empati masih sangat lapang.",
            score: 20,
            icon: "🌱"
          },
          {
            id: "3b",
            label: "Menjawab seadanya, tapi dalam hati sedikit terganggu",
            sublabel: "Mulai selektif mengalokasikan keramahan sosial.",
            score: 13,
            icon: "😐"
          },
          {
            id: "3c",
            label: "Mudah tersulut emosi, ingin meledak atau menyindir",
            sublabel: "Sumbu kesabaran sudah sangat tipis.",
            score: 7,
            icon: "🔥"
          },
          {
            id: "3d",
            label: "Mati rasa, tidak peduli sama sekali, memilih diam seribu bahasa",
            sublabel: "Menutup diri total dari interaksi orang lain.",
            score: 2,
            icon: "🧊"
          }
        ]
      },
      {
        id: 4,
        prompt: "Bagaimana kondisi fokus dan pengambilan keputusanmu belakangan ini?",
        subprompt: "Mulai dari memilih makanan hingga menyelesaikan pekerjaan.",
        options: [
          {
            id: "4a",
            label: "Jernih, terarah, dan tidak banyak overthinking",
            sublabel: "Fungsi eksekutif otak bekerja dengan sangat optimal.",
            score: 20,
            icon: "🎯"
          },
          {
            id: "4b",
            label: "Kadang blank sebentar, tapi masih bisa kembali fokus",
            sublabel: "Perlu kopi atau jeda 5 menit untuk refresh pikiran.",
            score: 14,
            icon: "🧩"
          },
          {
            id: "4c",
            label: "Brain fog parah: lupa taruh barang, bingung mau makan apa",
            sublabel: "Keputusan sepele terasa seperti tugas raksasa yang menguras otak.",
            score: 7,
            icon: "🌫️"
          },
          {
            id: "4d",
            label: "Paralisis total: hanya bisa scroll sosmed tanpa arah berjam-jam",
            sublabel: "Otak menolak memproses informasi baru.",
            score: 2,
            icon: "🌀"
          }
        ]
      },
      {
        id: 5,
        prompt: "Apa yang paling kamu butuhkan malam ini sebelum tidur?",
        subprompt: "Kebutuhan terdalam jiwamu saat ini.",
        options: [
          {
            id: "5a",
            label: "Refleksi singkat 2 menit untuk mensyukuri hari ini",
            sublabel: "Merasa cukup dan damai dengan pencapaian hari ini.",
            score: 20,
            icon: "✨"
          },
          {
            id: "5b",
            label: "Waktu luang berkualitas sendiri (me-time) tanpa distraksi",
            sublabel: "Menonton film atau membaca buku favorit dengan tenang.",
            score: 14,
            icon: "📖"
          },
          {
            id: "5c",
            label: "Tempat aman untuk curhat dan meluapkan unek-unek tanpa dihakimi",
            sublabel: "Banyak hal mengganjal di dada yang belum sempat dikeluarkan.",
            score: 8,
            icon: "🧸"
          },
          {
            id: "5d",
            label: "Dunia berhenti berputar sejenak agar aku bisa bernapas",
            sublabel: "Tekanan hidup terasa begitu menghimpit.",
            score: 3,
            icon: "🫁"
          }
        ]
      }
    ],
    results: [
      {
        id: "battery-green",
        title: "Baterai Emosi: 80% - 100% (Zona Hijau / Prima) 🔋✨",
        badge: "Kapasitas Penuh",
        mascotMood: "great",
        mascotImage: juGreat,
        scoreRange: [78, 100],
        percentageDisplay: "85% - 100%",
        tagline: "Pikiranmu jernih, stabil, dan memiliki resiliensi emosi yang sangat sehat.",
        description: "Selamat! Cadangan energimu saat ini berada di tingkat optimal. Kamu memiliki ketahanan psikologis (emotional resilience) yang kuat untuk menyerap stres harian dan tetap bersikap hangat terhadap diri sendiri maupun orang lain.",
        psychologicalInsight: "Dalam psikologi energi (Ego Depletion Theory oleh Roy Baumeister), kamu berada pada fase 'Resource Abundance'. Ini adalah waktu terbaik untuk membuat keputusan penting, menyusun rencana jangka panjang, atau membagikan energi positif ke orang-orang terdekat.",
        actionableSteps: [
          "Pertahankan momentum dengan menuliskan 3 hal yang kamu syukuri hari ini.",
          "Tetapkan batasan sehat sejak dini agar energimu tidak bocor secara tiba-tiba besok.",
          "Gunakan 1 menit malam ini di Nuju untuk mendokumentasikan apa yang membuatmu merasa damai hari ini."
        ],
        recommendedPrompt: "Malam ini aku bersyukur karena energiku terasa utuh. Hal yang paling membahagiakan hari ini adalah...",
        shareSummaryText: "🔋 Hasil Cek Baterai Emosiku: 85-100% (Zona Hijau Prima)! Pikiran jernih dan stabil. Cek sisa baterai emosimu juga di nuju.app/quiz/baterai-emosi"
      },
      {
        id: "battery-yellow",
        title: "Baterai Emosi: 55% - 77% (Zona Kuning / Butuh Istirahat) 🔋🌤️",
        badge: "Cukup Stabil",
        mascotMood: "good",
        mascotImage: juGood,
        scoreRange: [55, 77],
        percentageDisplay: "60% - 75%",
        tagline: "Kamu masih berfungsi dengan baik, tapi lampu kuning mulai berkedip.",
        description: "Energimu masih cukup untuk menuntaskan tanggung jawab harian, namun ada tanda-tanda kelelahan mikro yang mulai mengintip. Toleransi sosialmu mulai berkurang, dan kamu butuh jeda sebelum kapasitas mentalmu tersedot habis.",
        psychologicalInsight: "Sistem sarafmu mulai memasuki fase kompensasi. Kamu menggunakan energi cadangan (willpower) untuk tetap ramah dan produktif. Jika tidak diselingi jeda aktif, bateraimu bisa anjlok dalam 24-48 jam ke depan.",
        actionableSteps: [
          "Tolak ajakan nongkrong atau panggilan telepon yang tidak mendesak malam ini.",
          "Lakukan 'Digital Sunset': redupkan layar HP 45 menit sebelum jam tidur.",
          "Keluarkan unek-unek kecil lewat 30 detik voice dump di Nuju agar tidak menjadi overthinking malam."
        ],
        recommendedPrompt: "Ada sedikit rasa lelah yang mengganjal di dadaku hari ini, terutama saat...",
        shareSummaryText: "🔋 Hasil Cek Baterai Emosiku: 65% (Zona Kuning). Masih oke tapi butuh me-time malam ini! Cek energimu di nuju.app/quiz/baterai-emosi"
      },
      {
        id: "battery-orange",
        title: "Baterai Emosi: 30% - 54% (Zona Oranye / Menipis Cepat) 🪫⚠️",
        badge: "Menipis",
        mascotMood: "rough",
        mascotImage: juRough,
        scoreRange: [30, 54],
        percentageDisplay: "35% - 50%",
        tagline: "Bateraimu bocor! Kamu berada di ambang batas kelelahan mental.",
        description: "Tubuh dan pikiranmu sudah berteriak meminta istirahat. Kamu mungkin merasa mudah jengkel, sulit berkonsentrasi, atau merasa bersalah karena tidak bisa memenuhi ekspektasi semua orang. Ini bukan karena kamu lemah, tapi bebanmu memang sedang terlalu berat.",
        psychologicalInsight: "Hormon kortisol dalam tubuhmu meningkat, menyebabkan amygdala lebih reaktif terhadap stimulus kecil. Kondisi ini membuat masalah sepele terasa seperti ancaman besar (Catastrophic Thinking).",
        actionableSteps: [
          "Berhenti memaksa diri untuk produktif malam ini. Tubuhmu butuh pemulihan, bukan lembur.",
          "Gunakan teknik 4-7-8 breathing untuk menenangkan detak jantung yang tegang.",
          "Ceritakan rasa lelahmu ke Ju di Nuju. Tidak perlu rapi atau sopan, tumpahkan saja apa adanya."
        ],
        recommendedPrompt: "Jujur, hari ini aku merasa sangat kewalahan karena...",
        shareSummaryText: "🪫 Baterai Emosiku tinggal 40%! Sinyal bahaya butuh jeda dan tempat curhat aman. Cek kondisimu di nuju.app/quiz/baterai-emosi"
      },
      {
        id: "battery-red",
        title: "Baterai Emosi: 10% - 29% (Zona Merah / Mode Hemat Daya Kritis) 🚨🪫",
        badge: "Kritis",
        mascotMood: "low",
        mascotImage: juLow,
        scoreRange: [0, 29],
        percentageDisplay: "15% - 25%",
        tagline: "Alarm darurat emosi! Kamu mengalami emotional exhaustion akut.",
        description: "Baterai mentalmu sudah hampir mati total (0-20%). Kamu mungkin merasakan mati rasa (numbness), ingin menangis tanpa sebab yang jelas, atau merasa terisolasi dari dunia luar. Kamu sedang berada dalam mode 'Survival Mode'.",
        psychologicalInsight: "Kondisi ini mencerminkan apa yang dalam neurobiologi disebut sebagai 'Allostatic Overload'—kelelahan neurokimiawi total akibat akumulasi stres tanpa resolusi. Kamu membutuhkan validasi emosi tanpa syarat dan pemutusan koneksi sementara dari tuntutan eksternal.",
        actionableSteps: [
          "Beri izin pada dirimu sendiri: 'Hari ini aku boleh tidak melakukan apa-apa selain istirahat.'",
          "Jangan pendam sendiri. Masuk ke tempat yang tenang, tutup mata, dan dengarkan suara napasmu.",
          "Buka Nuju dan cukup rekam 20 detik suaramu sambil menangis atau menghela napas. Ju siap memeluk dan menampung semua rasa sakitmu tanpa menghakimi."
        ],
        recommendedPrompt: "Aku sangat lelah, Ju. Rasanya duniaku terlalu berat hari ini...",
        shareSummaryText: "🚨 Baterai Emosiku di Zona Merah (15%). Saatnya lepas topeng dan cari tempat aman buat istirahat. Cek sisa energimu di nuju.app/quiz/baterai-emosi"
      }
    ],
    faqs: [
      {
        question: "Apakah tes baterai emosi ini akurat secara psikologis?",
        answer: "Kuis ini dirancang berdasarkan prinsip Ego Depletion (Roy Baumeister) dan Allostatic Load model, yang memetakan kapasitas energi psikologis terhadap beban stres harian. Kuis ini berfungsi sebagai self-reflection screener untuk meningkatkan kesadaran diri (self-awareness), bukan diagnosis medis."
      },
      {
        question: "Berapa sering saya sebaiknya mengecek baterai emosi?",
        answer: "Idealnya 1 kali sehari pada sore atau malam hari sebelum tidur, atau kapan pun kamu merasa ada perubahan drastis pada mood dan energimu."
      },
      {
        question: "Bagaimana cara paling cepat menaikkan baterai emosi?",
        answer: "Cara tercepat adalah 'Affect Labeling' (memberi nama pada emosi yang dirasakan), menurunkan stimulasi sensorik (jauhkan gawai), dan meluapkan pikiran yang menumpuk melalui journaling reflektif tanpa sensor."
      }
    ]
  },

  // =========================================================================
  // QUIZ 2: APA TIPE OVERTHINKING KAMU DI MALAM HARI?
  // =========================================================================
  {
    id: "tipe-overthinking",
    slug: "tipe-overthinking",
    title: "Apa Tipe Overthinking Kamu di Malam Hari? 🧠💭",
    shortTitle: "Tipe Overthinking",
    subtitle: "Kenali pola jebakan pikiran yang membuatmu susah tidur dan cara memutus rantainya.",
    description: "Pernahkah kamu berniat tidur jam 11 malam, tapi jam 1 dini hari masih terjaga karena otak memutar film kekhawatiran tanpa henti? Setiap orang punya 'alur overthinking' yang berbeda. Cari tahu arketipemu dan solusi CBT yang tepat.",
    category: "Pola Pikir & Tidur",
    badge: "Insight Mendalam 🔍",
    estimatedTime: "1 Menit",
    takersCount: "38.2k+",
    themeColor: "from-indigo-500/20 to-purple-500/10",
    type: "archetype",
    targetCountry: "ID",
    language: "id",
    countryFlag: "🇮🇩",
    mascotMood: "rough",
    mascotImage: juRough,
    questions: [
      {
        id: 1,
        prompt: "Ketika kepala menyentuh bantal dan lampu dimatikan, apa yang paling sering muncul di kepalamu?",
        subprompt: "Pilih skenario yang paling menggambarkan monolog batinmu.",
        options: [
          {
            id: "1_rum",
            label: "Memutar ulang percakapan canggung tadi siang atau bertahun-tahun lalu",
            sublabel: "'Kenapa tadi gue ngomong gitu ya? Apa dia mikir gue aneh?'",
            archetypeId: "ruminator",
            icon: "📼"
          },
          {
            id: "1_cat",
            label: "Membayangkan skenario terburuk masa depan yang belum tentu terjadi",
            sublabel: "'Gimana kalau besok presentasi gagal total dan gue dipecat?'",
            archetypeId: "catastrophizer",
            icon: "⛈️"
          },
          {
            id: "1_perf",
            label: "Menyusun to-do list tanpa henti dan cemas karena merasa kurang maksimal",
            sublabel: "'Harusnya tadi gue bisa beresin satu tugas lagi. Besok harus mulai jam 6 pagi!'",
            archetypeId: "perfectionist",
            icon: "📋"
          },
          {
            id: "1_soc",
            label: "Menebak-nebak perasaan orang lain: apakah ada yang tersinggung atau kecewa padaku?",
            sublabel: "'Tadi waktu meeting dia kayak buang muka... apa gue bikin salah ya?'",
            archetypeId: "people_pleaser",
            icon: "👥"
          }
        ]
      },
      {
        id: 2,
        prompt: "Apa pemicu utama yang paling cepat membuat pikiranmu berputar tanpa kendali?",
        subprompt: "Trigger emosional yang paling sensitif bagimu.",
        options: [
          {
            id: "2_rum",
            label: "Rasa penyesalan (regret) atas pilihan hidup atau kata-kata yang terlanjur terucap",
            sublabel: "Keinginan kuat untuk memutar balik waktu.",
            archetypeId: "ruminator",
            icon: "⏪"
          },
          {
            id: "2_cat",
            label: "Ketidakpastian (uncertainty) dan kabar buruk yang baru setengah terdengar",
            sublabel: "Otak langsung mengisi bagian kosong dengan malapetaka.",
            archetypeId: "catastrophizer",
            icon: "🔮"
          },
          {
            id: "2_perf",
            label: "Kesalahan kecil yang kulakukan dalam pekerjaan atau proyek pribadi",
            sublabel: "Merasa seluruh hasil karya jadi cacat total.",
            archetypeId: "perfectionist",
            icon: "🔍"
          },
          {
            id: "2_soc",
            label: "Balasan chat singkat tanpa emoji atau perubahan nada bicara seseorang",
            sublabel: "Langsung merasa ada hubungan yang retak.",
            archetypeId: "people_pleaser",
            icon: "💬"
          }
        ]
      },
      {
        id: 3,
        prompt: "Ketika kamu merasa cemas, apa tindakan spontan yang paling sering kamu lakukan?",
        subprompt: "Respon perilakumu terhadap kecemasan tersebut.",
        options: [
          {
            id: "3_rum",
            label: "Mencari teman untuk membahas ulang masalah yang sama berkali-kali",
            sublabel: "Butuh penegasan berulang bahwa semuanya baik-baik saja.",
            archetypeId: "ruminator",
            icon: "🔄"
          },
          {
            id: "3_cat",
            label: "Googling gejala atau mencari skenario hukum/finansial terburuk di internet",
            sublabel: "Doomscrolling mencari kepastian semu.",
            archetypeId: "catastrophizer",
            icon: "🌐"
          },
          {
            id: "3_perf",
            label: "Membuka laptop lagi tengah malam untuk mengecek dokumen berulang kali",
            sublabel: "Kompulsi memeriksa agar tidak ada celah cacat.",
            archetypeId: "perfectionist",
            icon: "💻"
          },
          {
            id: "3_soc",
            label: "Minta maaf berkali-kali atau mengirim chat penjelas yang panjang lebar",
            sublabel: "Takut disalahpahami atau dicap sombong.",
            archetypeId: "people_pleaser",
            icon: "🙏"
          }
        ]
      },
      {
        id: 4,
        prompt: "Jika pikiranmu diibaratkan sebuah suara, suara apa yang paling dominan di kepalamu?",
        subprompt: "Karakter kritik batin (inner critic) kamu.",
        options: [
          {
            id: "4_rum",
            label: "'Kenapa sih kamu selalu bodoh dan mengulangi kesalahan konyol ini?'",
            sublabel: "Suara menyalahkan diri masa lalu.",
            archetypeId: "ruminator",
            icon: "🎭"
          },
          {
            id: "4_cat",
            label: "'Bersiaplah, sebentar lagi bencana besar akan membongkar hidupmu!'",
            sublabel: "Suara sirine bahaya masa depan.",
            archetypeId: "catastrophizer",
            icon: "🚨"
          },
          {
            id: "4_perf",
            label: "'Ini belum cukup bagus. Kamu masih belum bekerja sekeras orang lain!'",
            sublabel: "Suara mandor yang tak pernah puas.",
            archetypeId: "perfectionist",
            icon: "📏"
          },
          {
            id: "4_soc",
            label: "'Jangan bikin mereka kecewa. Kalau mereka tidak menyukaimu, kamu tamat.'",
            sublabel: "Suara pengawas sosial yang haus penerimaan.",
            archetypeId: "people_pleaser",
            icon: "👥"
          }
        ]
      },
      {
        id: 5,
        prompt: "Apa yang paling kamu butuhkan agar pikiranmu bisa benar-benar tenang malam ini?",
        subprompt: "Kunci pembebasan mentalmu.",
        options: [
          {
            id: "5_rum",
            label: "Berdamai dengan masa lalu dan menerima bahwa yang sudah lewat tak bisa diubah",
            sublabel: "Melepaskan beban penyesalan.",
            archetypeId: "ruminator",
            icon: "🕊️"
          },
          {
            id: "5_cat",
            label: "Rasa aman bahwa apa pun yang terjadi besok, aku punya kekuatan untuk melaluinya",
            sublabel: "Meredakan ketakutan akan hal yang belum ada.",
            archetypeId: "catastrophizer",
            icon: "🛡️"
          },
          {
            id: "5_perf",
            label: "Izin untuk menjadi manusia biasa yang boleh lelah dan membuat kesalahan",
            sublabel: "Menurunkan standar kesempurnaan yang mustahil.",
            archetypeId: "perfectionist",
            icon: "☕"
          },
          {
            id: "5_soc",
            label: "Keyakinan bahwa nilaiku tidak ditentukan oleh pendapat atau validasi orang lain",
            sublabel: "Menemukan validasi dari dalam diri sendiri.",
            archetypeId: "people_pleaser",
            icon: "💖"
          }
        ]
      }
    ],
    results: [
      {
        id: "ruminator",
        archetypeId: "ruminator",
        title: "Tipe Overthinker: Si Pemutar Kaset Masa Lalu (The Ruminator) 📼",
        badge: "Fokus Masa Lalu",
        mascotMood: "rough",
        mascotImage: juRough,
        tagline: "Kamu terjebak dalam lorong waktu penyesalan dan 'seharusnya tadi begini'.",
        description: "Pikiran malammu didominasi oleh kilas balik peristiwa yang telah lewat. Kamu gemar menganalisis kata-kata, keputusan, atau kejadian sepele yang orang lain mungkin sudah lupa, lalu mengadili dirimu sendiri atas hal tersebut.",
        psychologicalInsight: "Dalam Cognitive Behavioral Therapy (CBT), ruminasi adalah ilusi penyelesaian masalah. Otak mengira dengan memikirkan kesalahan berulang kali, kamu sedang belajar. Faktanya, ruminasi justru memicu pelepasan hormon stres dan memperkuat jalur saraf depresi (Default Mode Network).",
        actionableSteps: [
          "Gunakan 'The 5-Year Rule': Tanyakan pada diri, 'Apakah kejadian canggung tadi siang akan berdampak pada hidupku 5 tahun lagi?' Kalau tidak, lepaskan.",
          "Praktikkan 'Cognitive Defusion': Katakan pada diri: 'Aku sedang mengamati pikiran tentang masa lalu, tapi pikiran ini bukan fakta saat ini.'",
          "Tuliskan peristiwa tersebut di Nuju, lalu tutup dengan kalimat: 'Yang terjadi sudah selesai. Malam ini aku memilih memaafkan diriku.'"
        ],
        recommendedPrompt: "Hal yang terus kuputar di kepalaku malam ini adalah... Tapi faktanya sekarang hal itu sudah selesai, dan aku memilih untuk...",
        shareSummaryText: "🧠 Hasil Tes Overthinking: Tipe 'Si Pemutar Kaset Masa Lalu' (The Ruminator)! Sering menyesali hal sepele. Cek tipe overthinkingmu di nuju.app/quiz/tipe-overthinking"
      },
      {
        id: "catastrophizer",
        archetypeId: "catastrophizer",
        title: "Tipe Overthinker: Si Peramal Bencana (The Catastrophizer) ⛈️🔮",
        badge: "Fokus Masa Depan",
        mascotMood: "low",
        mascotImage: juLow,
        tagline: "Imajinasi kreatifmu disandera oleh skenario terburuk yang mengerikan.",
        description: "Ketika dihadapkan pada ketidakpastian sekecil apa pun, pikiranmu langsung melompat dari titik A ke titik Z: 'Kalau bos tadi cuek -> besok aku dipecat -> tabungan habis -> aku jadi gelandangan.' Kamu menyiksa diri dengan penderitaan masa depan yang 95% tidak pernah terjadi.",
        psychologicalInsight: "Ini adalah bentuk 'Catastrophic Thinking'—malafungsi amygdala yang memandang ambiguitas sebagai bahaya mematikan. Mengantisipasi hal terburuk dijadikan tameng pertahanan diri palsu agar kamu tidak kaget jika hal buruk benar-benar terjadi.",
        actionableSteps: [
          "Dekonstruksi Skenario: Tuliskan skenario terburuk, lalu paksa otak menuliskan skenario terbaik (Best-Case), dan skenario yang paling realistis (Most Likely).",
          "Kendalikan yang Ada di Tangan: Bedakan antara 'Hal yang bisa kukontrol' vs 'Hal di luar kendaliku' (Stoic Dichotomy of Control).",
          "Voice dump rasa takutmu ke Ju di Nuju. Biarkan Ju membedah logika ketakutanmu secara rasional dan menenangkan sarafmu."
        ],
        recommendedPrompt: "Ketakutan terbesar yang membayangi kepalaku tentang masa depan adalah... Hal paling realistis yang bisa kulakukan besok pagi adalah...",
        shareSummaryText: "🧠 Hasil Tes Overthinking: Tipe 'Si Peramal Bencana' (The Catastrophizer)! Sering bikin skenario terburuk. Cek tipemu di nuju.app/quiz/tipe-overthinking"
      },
      {
        id: "perfectionist",
        archetypeId: "perfectionist",
        title: "Tipe Overthinker: Si Perfeksionis Lelah (The Maximizer) 📐📋",
        badge: "Fokus Kontrol & Standar",
        mascotMood: "okay",
        mascotImage: juOkay,
        tagline: "Kamu terpenjara oleh standar tinggi yang kamu buat sendiri.",
        description: "Kamu sulit tidur bukan karena sedih, tapi karena merasa pekerjaanmu hari ini belum maksimal atau ada detail kecil yang belum sempurna. Otakmu menuntut 100% di semua hal, sehingga 'cukup baik' terasa seperti sebuah kegagalan.",
        psychologicalInsight: "Dikenal sebagai 'Analysis Paralysis' dan maladaptive perfectionism. Ketakutan akan kritik atau ketidaksempurnaan membuat otak terus bekerja dalam mode siaga tinggi (hyper-arousal), menghalangi gelombang otak transisi menuju tidur (Theta/Delta).",
        actionableSteps: [
          "Terapkan aturan 'Good Enough is Done': Sadari bahwa kesempurnaan adalah ilusi yang membunuh kebahagiaan.",
          "Ritual 'Penutupan Kerja' (Shutdown Ritual): Jam 9 malam, tutup laptop dan ucapkan secara lisan: 'Pekerjaan hari ini sudah cukup. Aku lanjut besok.'",
          "Tulis 1 pencapaian kecil di Nuju dan akui bahwa kamu sudah berjuang luar biasa hari ini."
        ],
        recommendedPrompt: "Hari ini aku merasa kurang puas karena... Namun aku sadar aku manusia biasa, dan pencapaian yang patut kuhargai adalah...",
        shareSummaryText: "🧠 Hasil Tes Overthinking: Tipe 'Si Perfeksionis Lelah' (The Maximizer)! Terlalu keras pada diri sendiri. Cek tipemu di nuju.app/quiz/tipe-overthinking"
      },
      {
        id: "people_pleaser",
        archetypeId: "people_pleaser",
        title: "Tipe Overthinker: Si Pengawas Sosial (The Social Auditor) 👥💖",
        badge: "Fokus Penerimaan Orang",
        mascotMood: "rough",
        mascotImage: juRough,
        tagline: "Kamu kelelahan karena terus menebak dan mengaudit perasaan orang lain.",
        description: "Malammu habis untuk mengkhawatirkan bagaimana orang lain memandangmu. Kamu cemas jika ada perkataanmu yang menyinggung teman, kamu takut dianggap merepotkan, dan kamu memikul tanggung jawab atas kebahagiaan semua orang di sekitarmu.",
        psychologicalInsight: "Berakar pada 'Rejection Sensitivity Dysphoria' (RSD) dan keterikatan cemas (Anxious Attachment). Menyenangkan semua orang adalah mekanisme bertahan hidup emosional agar tidak ditinggalkan atau dihakimi.",
        actionableSteps: [
          "Pisahkan Batasan Emosi: 'Bagaimana perasaan orang lain adalah tanggung jawab mereka, bukan tugasku untuk memperbaikinya.'",
          "Hentikan asumsi: Jika mereka tidak menyatakan secara langsung bahwa mereka marah, anggap semuanya baik-baik saja.",
          "Keluarkan semua rasa sungkan dan rasa bersalah ke Ju di Nuju. Ju menerima dirimu apa adanya tanpa tuntutan persona sosial."
        ],
        recommendedPrompt: "Aku merasa cemas orang lain kecewa padaku karena... Tapi malam ini aku belajar memvalidasi diriku sendiri bahwa...",
        shareSummaryText: "🧠 Hasil Tes Overthinking: Tipe 'Si Pengawas Sosial' (The Social Auditor)! Lelah mikirin omongan orang. Cek tipemu di nuju.app/quiz/tipe-overthinking"
      }
    ],
    faqs: [
      {
        question: "Apakah wajar memiliki lebih dari satu tipe overthinking?",
        answer: "Sangat wajar! Seseorang bisa menjadi Ruminator saat mengingat masa lalu, sekaligus Catastrophizer saat menghadapi deadline kerjaan di masa depan. Kuis ini mengidentifikasi pola dominanmu saat ini."
      },
      {
        question: "Kenapa overthinking paling sering terjadi saat mau tidur?",
        answer: "Karena saat siang hari, panca indera kita disibukkan oleh pekerjaan dan kebisingan lingkungan. Saat malam tiba dan suasana hening, 'Default Mode Network' di otak mengambil alih. Jika tidak diarahkan lewat journaling, otak akan memproses kekhawatiran yang tertunda."
      },
      {
        question: "Bagaimana Nuju membantu menghentikan overthinking?",
        answer: "Nuju menggunakan teknik 'Brain Dumping' dan Cognitive Reframing. Melalui suara atau teks 30 detik, kamu mengeluarkan gumpalan pikiran dari kepala ke dalam sistem Nuju. AI Ju kemudian membantu menata dan memvalidasi perasaanmu sehingga otak merasa 'tugas selesai' dan bisa tidur nyenyak."
      }
    ]
  },

  // =========================================================================
  // QUIZ 3: SCREENING BURNOUT KERJA VS STRES BIASA
  // =========================================================================
  {
    id: "burnout-screener",
    slug: "burnout-screener",
    title: "Screening Cepat: Burnout Kerja vs Stres Biasa 💼🔥",
    shortTitle: "Screening Burnout",
    subtitle: "Deteksi apakah kamu sekadar lelah biasa atau sudah mengalami burnout klinis.",
    description: "Kelelahan biasa bisa sembuh dengan tidur panjang di akhir pekan. Namun burnout mengikis motivasi, memicu rasa sinis terhadap pekerjaan, dan membuatmu merasa tak berdaya. Cek status kesehatan mental kerjamu dalam 1 menit.",
    category: "Karir & Produktivitas",
    badge: "Penting Buat K-Worker 💼",
    estimatedTime: "1 Menit",
    takersCount: "29.5k+",
    themeColor: "from-rose-500/20 to-red-500/10",
    type: "numeric_score",
    targetCountry: "ID",
    language: "id",
    countryFlag: "🇮🇩",
    mascotMood: "rough",
    mascotImage: juRough,
    questions: [
      {
        id: 1,
        prompt: "Bagaimana perasaanmu ketika hari Minggu malam tiba dan besok adalah hari Senin?",
        subprompt: "Sensasi psikologis Sunday Scaries.",
        options: [
          {
            id: "b1a",
            label: "Santai, merasa siap menjalani hari kerja esok",
            sublabel: "Bisa menikmati malam Minggu dengan tenang.",
            score: 0,
            icon: "🌿"
          },
          {
            id: "b1b",
            label: "Agak enggan, tapi wajar seperti orang kebanyakan",
            sublabel: "Sedikit malas bangun pagi tapi tidak sampai panik.",
            score: 5,
            icon: "☕"
          },
          {
            id: "b1c",
            label: "Dada sesak, perut mual, atau cemas memikirkan tumpukan pesan",
            sublabel: "Sunday scaries yang sangat menguras fisik dan emosi.",
            score: 15,
            icon: "⚡"
          },
          {
            id: "b1d",
            label: "Putus asa dan ingin resign detik itu juga",
            sublabel: "Rasa hampa yang mendalam dan penolakan batin yang masif.",
            score: 20,
            icon: "🚪"
          }
        ]
      },
      {
        id: 2,
        prompt: "Bagaimana pandanganmu terhadap pekerjaan dan rekan kerjamu saat ini?",
        subprompt: "Dimensi Sinisme & Depersonalisasi (Maslach Burnout Inventory).",
        options: [
          {
            id: "b2a",
            label: "Masih merasa pekerjaan ini bermakna dan rekan kerja menyenangkan",
            sublabel: "Keterikatan emosional (engagement) masih positif.",
            score: 0,
            icon: "🤝"
          },
          {
            id: "b2b",
            label: "Kadang kesal dengan birokrasi, tapi masih bisa memaklumi",
            sublabel: "Toleransi kerja normal.",
            score: 5,
            icon: "💼"
          },
          {
            id: "b2c",
            label: "Mulai sinis: 'Ngapain kerja keras, paling juga hasilnya gini-gini aja'",
            sublabel: "Muncul rasa tidak peduli dan menjaga jarak dari lingkungan.",
            score: 15,
            icon: "😒"
          },
          {
            id: "b2d",
            label: "Sangat membenci tempat kerja dan memandang semua orang sebagai musuh/beban",
            sublabel: "Keterasingan emosional (total detachment).",
            score: 20,
            icon: "🧊"
          }
        ]
      },
      {
        id: 3,
        prompt: "Setelah kamu tidur cukup atau libur di akhir pekan, apa yang terjadi pada energimu?",
        subprompt: "Dimensi Kelelahan Emosional (Emotional Exhaustion).",
        options: [
          {
            id: "b3a",
            label: "Baterai kembali penuh dan semangat terisi ulang",
            sublabel: "Tidur dan liburan berfungsi dengan efektif.",
            score: 0,
            icon: "🔋"
          },
          {
            id: "b3b",
            label: "Cukup segar, meskipun butuh adaptasi di pagi hari",
            sublabel: "Pemulihan fisik tercapai dengan baik.",
            score: 5,
            icon: "🌤️"
          },
          {
            id: "b3c",
            label: "Masih tetap merasa lelah dan lemas, seperti tidak libur sama sekali",
            sublabel: "Kelelahan kronis yang tidak mempan dengan tidur biasa.",
            score: 15,
            icon: "🪫"
          },
          {
            id: "b3d",
            label: "Semakin merasa bersalah dan lelah karena waktu libur terasa cepat berlalu",
            sublabel: "Istirahat pun dihantui bayang-bayang beban kerja.",
            score: 20,
            icon: "😫"
          }
        ]
      },
      {
        id: 4,
        prompt: "Bagaimana kamu memandang kemampuan dan prestasimu dalam bekerja akhir-akhir ini?",
        subprompt: "Dimensi Penurunan Efisiensi Pribadi (Reduced Accomplishment).",
        options: [
          {
            id: "b4a",
            label: "Percaya diri, merasa kompeten dan mampu menyelesaikan target",
            sublabel: "Self-efficacy tinggi.",
            score: 0,
            icon: "🏆"
          },
          {
            id: "b4b",
            label: "Ada kalanya melakukan kesalahan, tapi masih bisa belajar dan memperbaiki",
            sublabel: "Mindset bertumbuh yang wajar.",
            score: 5,
            icon: "📈"
          },
          {
            id: "b4c",
            label: "Merasa seperti 'penipu' (Impostor) dan merasa tidak berguna di kantor",
            sublabel: "Pencapaian besar pun terasa hambar dan tidak memuaskan.",
            score: 15,
            icon: "📉"
          },
          {
            id: "b4d",
            label: "Merasa benar-benar gagal dan tidak punya masa depan di bidang ini",
            sublabel: "Ketidakberdayaan yang dipelajari (Learned Helplessness).",
            score: 20,
            icon: "🕳️"
          }
        ]
      },
      {
        id: 5,
        prompt: "Apa keluhan fisik yang paling sering kamu rasakan dalam 1 bulan terakhir?",
        subprompt: "Manifestasi somatis dari stres kronis.",
        options: [
          {
            id: "b5a",
            label: "Jarang ada keluhan, tubuh terasa bugar",
            sublabel: "Kondisi fisik stabil.",
            score: 0,
            icon: "💪"
          },
          {
            id: "b5b",
            label: "Pegang leher/pundak kaku sesekali kalau duduk terlalu lama",
            sublabel: "Kelelahan ergonomis biasa.",
            score: 5,
            icon: "🧘"
          },
          {
            id: "b5c",
            label: "Sakit kepala tegang, gangguan lambung/GERD, atau susah tidur nyenyak",
            sublabel: "Sinyal stres fisik yang mulai sering kambuh.",
            score: 15,
            icon: "💊"
          },
          {
            id: "b5d",
            label: "Daya tahan tubuh drop drastis, sering flu, migrain hebat, atau sesak napas",
            sublabel: "Imunitas tubuh mengalami supresi akibat kortisol kronis.",
            score: 20,
            icon: "🏥"
          }
        ]
      }
    ],
    results: [
      {
        id: "burnout-low",
        title: "Tingkat Burnout: Rendah (Stres Kerja Normal) 🌿💼",
        badge: "Sehat & Seimbang",
        mascotMood: "great",
        mascotImage: juGreat,
        scoreRange: [0, 25],
        percentageDisplay: "Skor: 0 - 25 / 100",
        tagline: "Hubunganmu dengan pekerjaan masih sehat dan dalam batas terkendali.",
        description: "Kelelahan yang kamu rasakan adalah lelah kerja biasa (Healthy Work Pressure). Kamu masih memiliki resiliensi untuk bangkit kembali setelah libur, dan kamu masih menemukan arti positif dalam karirmu.",
        psychologicalInsight: "Kondisi ini menunjukkan kamu memiliki 'Work-Life Boundaries' yang cukup solid. Stres yang kamu hadapi bersifat eustress (stres produktif) yang justru memacu pertumbuhan profesional.",
        actionableSteps: [
          "Pertahankan jam kerja yang teratur dan jangan biasakan membawa pekerjaan ke tempat tidur.",
          "Luangkan waktu untuk hobi non-pekerjaan di akhir pekan.",
          "Tuliskan 1 hal yang kamu capai hari ini di Nuju sebagai catatan rasa syukur."
        ],
        recommendedPrompt: "Hari ini tantangan kerja yang kuhadapi adalah... dan aku bangga karena berhasil menyelesaikannya dengan cara...",
        shareSummaryText: "💼 Hasil Screening Burnout: Skor Rendah (Sehat & Terkendali)! Cek tingkat stres kerjamu di nuju.app/quiz/burnout-screener"
      },
      {
        id: "burnout-moderate",
        title: "Tingkat Burnout: Sedang (Fase Warning / Awal Kelelahan Kronis) ⚠️🍂",
        badge: "Waspada Burnout",
        mascotMood: "okay",
        mascotImage: juOkay,
        scoreRange: [26, 60],
        percentageDisplay: "Skor: 30 - 60 / 100",
        tagline: "Lampu kuning menyala! Tubuhmu mulai menunjukkan tanda-tanda dekompensasi.",
        description: "Kamu mulai sering merasa sinis terhadap manajemen atau rekan kerja, dan akhir pekan terasa kurang cukup untuk memulihkan energimu. Jika tidak segera diintervensi, fase ini akan berkembang menjadi burnout penuh dalam beberapa bulan.",
        psychologicalInsight: "Berdasarkan Oldenburg Burnout Inventory (OLBI), kamu sedang mengalami 'Exhaustion Disengagement Drift'. Kamu mulai menarik keterlibatan emosional dari pekerjaan untuk melindungi dirimu dari rasa sakit.",
        actionableSteps: [
          "Ambil cuti minimal 2-3 hari berturut-turut tanpa membuka email kantor.",
          "Latih kemampuan mengatakan 'Tidak' pada proyek tambahan yang melampaui kapasitasmu.",
          "Lakukan debriefing malam di Nuju untuk mengeluarkan racun frustrasi kerja sebelum tidur."
        ],
        recommendedPrompt: "Hal yang paling membuatku merasa lelah dan sinis di tempat kerja akhir-akhir ini adalah... Batasan yang perlu kubuat adalah...",
        shareSummaryText: "⚠️ Hasil Screening Burnout: Skor Sedang (Fase Waspada)! Butuh batasan kerja lebih tegas. Cek skor kamu di nuju.app/quiz/burnout-screener"
      },
      {
        id: "burnout-severe",
        title: "Tingkat Burnout: Tinggi (Burnout Kronis / Exhaustion Berat) 🚨🔥",
        badge: "Bahaya Burnout",
        mascotMood: "low",
        mascotImage: juLow,
        scoreRange: [61, 100],
        percentageDisplay: "Skor: 65 - 100 / 100",
        tagline: "Kamu sedang mengalami burnout klinis yang mengancam kesehatan fisik dan mental.",
        description: "Kamu telah mencapai titik jenuh total. Tubuhmu mengirimkan sinyal bahaya melalui gejala fisik (GERD, migrain, imunitas anjlok), dan jiwamu merasa hampa serta terasing. Kamu bertahan hidup murni dengan mode autopilot.",
        psychologicalInsight: "World Health Organization (WHO) mengklasifikasikan kondisi ini sebagai fenomena okupasional berat yang mencakup: deplesi energi total, peningkatan jarak mental/negativisme, dan penurunan efikasi profesional. Ini bukan salahmu; lingkungan kerjamu kemungkinan besar bersifat toksik atau tidak realistis.",
        actionableSteps: [
          "Segera konsultasikan kondisimu dengan psikolog klinis atau dokter spesialis kedokteran jiwa jika gejala fisik terus memburuk.",
          "Bicarakan beban kerjamu dengan HR atau atasan yang suportif untuk renegosiasi KPI.",
          "Malam ini, lepaskan semua urusan kerja. Nuju dan Ju siap menjadi ruang aman tempatmu menumpahkan air mata dan kelelahan tanpa takut dihakimi."
        ],
        recommendedPrompt: "Aku sudah tidak sanggup menahan beban ini sendirian, Ju. Beban yang paling menghancurkan energiku adalah...",
        shareSummaryText: "🚨 Hasil Screening Burnout: Skor Tinggi (Burnout Kronis)! Jangan abaikan sinyal tubuhmu. Cek kondisimu di nuju.app/quiz/burnout-screener"
      }
    ],
    faqs: [
      {
        question: "Apa bedanya stres kerja biasa dengan burnout?",
        answer: "Stres biasa ditandai dengan 'terlalu banyak' (terlalu banyak kerjaan, emosi meluap-luap, cemas) tapi kamu masih percaya situasinya bisa diperbaiki. Burnout ditandai dengan 'terlalu sedikit' (hampa, tidak punya energi, merasa putus asa, dan sinis total)."
      },
      {
        question: "Apakah burnout bisa sembuh hanya dengan resign?",
        answer: "Resign dapat menjauhkanmu dari sumber stres, tapi luka mental dan pola pikir (seperti perfeksionisme atau people-pleasing) tetap perlu dipulihkan melalui refleksi diri dan terapi agar tidak berulang di tempat kerja baru."
      },
      {
        question: "Bagaimana Nuju membantu pekerja yang burnout?",
        answer: "Nuju memberikan protokol refleksi ultra-ringan (30 detik voice journaling) yang tidak membebani otak yang sudah lelah. Masot Ju membantu mengidentifikasi pemicu stres mingguan dan memvalidasi emosimu tanpa menuntut produktivitas."
      }
    ]
  },

  // =========================================================================
  // QUIZ 4: GAYA REGULASI EMOSI & ATTACHMENT
  // =========================================================================
  {
    id: "gaya-regulasi-emosi",
    slug: "gaya-regulasi-emosi",
    title: "Gaya Regulasi Emosi: Bagaimana Caramu Merespons Luka? 🛡️🕊️",
    shortTitle: "Gaya Regulasi Emosi",
    subtitle: "Temukan bagaimana mekanisme pertahanan batinmu saat tersakiti atau kecewa.",
    description: "Saat disakiti atau menghadapi kekecewaan mendalam, ada yang memendamnya dalam diam, ada yang meledak-ledak, dan ada yang melarikan diri ke kesibukan. Pahami gaya koping psikologismu dan latih kecerdasan emosional yang sejati.",
    category: "Psikologi Hubungan",
    badge: "Eksplorasi Diri 🧬",
    estimatedTime: "1 Menit",
    takersCount: "21.7k+",
    themeColor: "from-teal-500/20 to-emerald-500/10",
    type: "archetype",
    targetCountry: "ID",
    language: "id",
    countryFlag: "🇮🇩",
    mascotMood: "okay",
    mascotImage: juOkay,
    questions: [
      {
        id: 1,
        prompt: "Ketika seseorang yang dekat denganmu membatalkan janji secara tiba-tiba tanpa alasan jelas:",
        subprompt: "Reaksi pertama yang muncul di dalam dadamu.",
        options: [
          {
            id: "r1_bot",
            label: "Membalas 'Gapapa kok santai aja', tapi di dalam dada terasa sesak dan nyeri",
            sublabel: "Memendam sakit hati sendirian agar tidak menciptakan konflik.",
            archetypeId: "bottler",
            icon: "🤐"
          },
          {
            id: "r1_abs",
            label: "Langsung merasa hancur, berpikir 'Dia pasti sudah bosan atau benci sama aku'",
            sublabel: "Emosi langsung membanjiri pikiran (Emotional Flooding).",
            archetypeId: "absorber",
            icon: "🌊"
          },
          {
            id: "r1_dis",
            label: "Langsung buka HP pesan makanan cepat saji atau cari kesibukan lain agar tidak memikirkannya",
            sublabel: "Mati rasa dan mengalihkan perhatian secepat mungkin.",
            archetypeId: "distractor",
            icon: "🎮"
          },
          {
            id: "r1_alc",
            label: "Menyadari rasa kecewa itu wajar, lalu bertanya langsung secara tenang",
            sublabel: "Mampu memvalidasi emosi tanpa bersikap impulsif.",
            archetypeId: "alchemist",
            icon: "🧭"
          }
        ]
      },
      {
        id: 2,
        prompt: "Bagaimana caramu memperlakukan air mata ketika kamu ingin menangis?",
        subprompt: "Penerimaan terhadap kesedihan.",
        options: [
          {
            id: "r2_bot",
            label: "Menahan sekuat tenaga, menolak menangis di depan siapa pun",
            sublabel: "Menangis dianggap sebagai tanda kelemahan yang memalukan.",
            archetypeId: "bottler",
            icon: "🧱"
          },
          {
            id: "r2_abs",
            label: "Menangis tersedu-sedu berjam-jam sampai sesak dan pusing",
            sublabel: "Sulit menghentikan pusaran kesedihan begitu pintu air terbuka.",
            archetypeId: "absorber",
            icon: "🌧️"
          },
          {
            id: "r2_dis",
            label: "Menertawakannya atau membuat lelucon (sarcasm/humor) untuk menutupi rasa pedih",
            sublabel: "Menolak menyentuh rasa sakit secara mendalam.",
            archetypeId: "distractor",
            icon: "🎭"
          },
          {
            id: "r2_alc",
            label: "Menangis secukupnya sebagai proses katarsis alami, lalu mencuci muka dengan tenang",
            sublabel: "Membiarkan tubuh melepaskan emosi tanpa tenggelam di dalamnya.",
            archetypeId: "alchemist",
            icon: "🌿"
          }
        ]
      },
      {
        id: 3,
        prompt: "Ketika ada orang yang mengkritik atau memberi masukan tajam kepadamu:",
        subprompt: "Respons terhadap ancaman ego.",
        options: [
          {
            id: "r3_bot",
            label: "Mengangguk setuju di luar, tapi dendam dan terluka berhari-hari di dalam batin",
            sublabel: "Kemarahan yang diinternalisasi (Internalized Anger).",
            archetypeId: "bottler",
            icon: "🪨"
          },
          {
            id: "r3_abs",
            label: "Langsung merasa diriku hancur dan tidak berharga di mata dunia",
            sublabel: "Kritik pada pekerjaan disamakan dengan cacat pada eksistensi diri.",
            archetypeId: "absorber",
            icon: "💔"
          },
          {
            id: "r3_dis",
            label: "Meremehkan kritiknya: 'Ah dia cuma iri, ga usah didengerin'",
            sublabel: "Mekanisme pertahanan penolakan (Denial Defense).",
            archetypeId: "distractor",
            icon: "🛡️"
          },
          {
            id: "r3_alc",
            label: "Memisahkan antara fakta yang berguna untuk perbaikan vs nada emosi pengkritik",
            sublabel: "Regulasi kognitif yang objektif (Cognitive Reappraisal).",
            archetypeId: "alchemist",
            icon: "⚖️"
          }
        ]
      },
      {
        id: 4,
        prompt: "Apa hal yang paling kamu takuti terjadi dalam hubungan emosional?",
        subprompt: "Ketakutan terdalam dalam keintiman.",
        options: [
          {
            id: "r4_bot",
            label: "Terlihat lemah, rapuh, dan dihakimi saat membuka rahasia tergelap",
            sublabel: "Takut pada kerentanan emosional (Vulnerability).",
            archetypeId: "bottler",
            icon: "🔒"
          },
          {
            id: "r4_abs",
            label: "Ditinggalkan tiba-tiba atau digantikan oleh orang lain",
            sublabel: "Ketakutan akan penolakan dan pengabaian (Abandonment Fear).",
            archetypeId: "absorber",
            icon: "🥀"
          },
          {
            id: "r4_dis",
            label: "Kehilangan kebebasan atau terjebak dalam drama emosi yang menguras waktu",
            sublabel: "Menghindari komitmen mendalam.",
            archetypeId: "distractor",
            icon: "🏃"
          },
          {
            id: "r4_alc",
            label: "Kehilangan integritas diri karena memaksakan hubungan yang tidak sehat",
            sublabel: "Fokus pada batasan dan martabat diri.",
            archetypeId: "alchemist",
            icon: "🕊️"
          }
        ]
      },
      {
        id: 5,
        prompt: "Jika kamu bisa memberikan hadiah terbaik untuk jiwamu malam ini, itu adalah:",
        subprompt: "Kebutuhan pemulihan terdalam.",
        options: [
          {
            id: "r5_bot",
            label: "Ruang rahasia yang 100% aman di mana aku bebas menangis tanpa ada yang tahu",
            sublabel: "Kebebasan melepas beban penutup botol emosi.",
            archetypeId: "bottler",
            icon: "🗝️"
          },
          {
            id: "r5_abs",
            label: "Pelukan hangat yang meyakinkanku bahwa aku dicintai dan aman",
            sublabel: "Penentraman sistem saraf yang hiperaktif.",
            archetypeId: "absorber",
            icon: "🫂"
          },
          {
            id: "r5_dis",
            label: "Waktu istirahat sejati tanpa rasa bersalah harus terus berlari",
            sublabel: "Menghentikan roda pelarian tanpa henti.",
            archetypeId: "distractor",
            icon: "🛑"
          },
          {
            id: "r5_alc",
            label: "Momen refleksi hening untuk merangkai makna dari segala hal yang telah terjadi",
            sublabel: "Kebijaksanaan batin yang mendalam.",
            archetypeId: "alchemist",
            icon: "✨"
          }
        ]
      }
    ],
    results: [
      {
        id: "bottler",
        archetypeId: "bottler",
        title: "Gaya Regulasi: Si Penelan Emosi (The Bottler) 🪨🤐",
        badge: "Expressive Suppression",
        mascotMood: "rough",
        mascotImage: juRough,
        tagline: "Kamu membotolkan semua rasa sakit sampai dadamu terasa sesak.",
        description: "Kamu adalah tipe orang yang selalu terlihat 'kuat', 'mandiri', dan 'baik-baik saja' di depan orang lain. Namun di dalam batin, botol emosimu sudah penuh sesak dengan kesedihan, kekecewaan, dan kemarahan yang tidak pernah diungkapkan.",
        psychologicalInsight: "Model Regulasi Emosi James Gross menyebut ini 'Expressive Suppression'. Menekan ekspresi emosi secara biologis meningkatkan denyut jantung, tekanan darah, dan peradangan somatik. Menahan tangis secara kronis justru memperberat beban sistem saraf.",
        actionableSteps: [
          "Sadarilah bahwa kerentanan (vulnerability) bukanlah kelemahan, melainkan keberanian terbesar.",
          "Mulai lepaskan katup botol sedikit demi sedikit: beri nama emosimu ('Aku sedang sedih', 'Aku sedang marah').",
          "Nuju dirancang khusus untuk Si Penelan Emosi: kamu bisa curhat 100% anonim tanpa ada manusia lain yang menghakimimu."
        ],
        recommendedPrompt: "Hal yang selama ini kupendam sendirian dan tak pernah kuceritakan ke siapa pun adalah...",
        shareSummaryText: "🛡️ Gaya Regulasi Emosiku: 'Si Penelan Emosi' (The Bottler)! Sering pura-pura kuat. Cek caramu merespons luka di nuju.app/quiz/gaya-regulasi-emosi"
      },
      {
        id: "absorber",
        archetypeId: "absorber",
        title: "Gaya Regulasi: Si Spons Emosional (The Emotional Absorber) 🌊💔",
        badge: "Hyper-Reactivity",
        mascotMood: "low",
        mascotImage: juLow,
        tagline: "Kamu menyerap getaran emosi dunia sampai hanyut di dalamnya.",
        description: "Kamu memiliki empati yang luar biasa tinggi, namun batas emosimu (emotional boundaries) sangat tipis. Ketika orang lain sedih atau marah, kamu ikut merasakannya dengan intens. Kekecewaan kecil terasa seperti badai tsunami yang melumpuhkan harimu.",
        psychologicalInsight: "Kondisi ini mencerminkan tingginya kepekaan sistem saraf sensorik (Sensory Processing Sensitivity). Otakmu memproses stimulus emosi secara mendalam, namun sering kali kekurangan jangkar rasional (grounding) untuk menstabilkan diri.",
        actionableSteps: [
          "Praktikkan 'Emotional Shielding': Ingatkan diri, 'Ini emosi orang lain, ini bukan milikku.'",
          "Lakukan grounding fisik: Injak lantai dengan telanjang kaki, basuh wajah dengan air dingin untuk meredakan gelombang intensitas.",
          "Gunakan fitur Voice Journaling Nuju untuk mengalirkan kelebihan muatan emosi ke wadah aman sebelum tidur."
        ],
        recommendedPrompt: "Malam ini aku merasa sangat kewalahan karena emosi... Aku memulihkan batas diriku dengan cara...",
        shareSummaryText: "🛡️ Gaya Regulasi Emosiku: 'Si Spons Emosi' (The Absorber)! Empati tinggi tapi mudah kewalahan. Cek gayamu di nuju.app/quiz/gaya-regulasi-emosi"
      },
      {
        id: "distractor",
        archetypeId: "distractor",
        title: "Gaya Regulasi: Si Pelari Cepat (The Distractor / Avoidant) 🏃🎭",
        badge: "Avoidant Coping",
        mascotMood: "okay",
        mascotImage: juOkay,
        tagline: "Kamu mengubur luka dengan kesibukan, lelucon, dan distraksi tiada henti.",
        description: "Saat sedih atau patah hati, kamu langsung menyibukkan diri dengan kerja lembur, maraton serial, belanja, atau bermain game. Kamu memakai humor sarkasme untuk menertawakan rasa sakit agar tidak perlu benar-benar merasakannya.",
        psychologicalInsight: "Ini adalah strategi koping penghindaran (Avoidant Coping). Distraksi berguna untuk jangka sangat pendek, namun emosi yang diabaikan tidak pernah mati; mereka terkubur hidup-hidup dan muncul kembali sebagai kecemasan misterius atau insomnia.",
        actionableSteps: [
          "Beri waktu 5 menit sehari untuk 'duduk bersama keheningan' tanpa gawai.",
          "Izinkan dirimu merasa sedih selama 3 menit tanpa berusaha langsung mencari solusinya.",
          "Buka Nuju saat rasa sepi menyerang, dan akui dengan jujur apa yang sebenarnya sedang kamu hindari."
        ],
        recommendedPrompt: "Hal yang selama ini berusaha kuhindari dengan tetap sibuk adalah...",
        shareSummaryText: "🛡️ Gaya Regulasi Emosiku: 'Si Pelari Cepat' (The Distractor)! Sering kabur ke kesibukan. Cek gayamu di nuju.app/quiz/gaya-regulasi-emosi"
      },
      {
        id: "alchemist",
        archetypeId: "alchemist",
        title: "Gaya Regulasi: Si Pengolah Sadar (The Reflective Alchemist) 🧭✨",
        badge: "Cognitive Reappraisal",
        mascotMood: "great",
        mascotImage: juGreat,
        tagline: "Kamu mampu mengubah kepedihan menjadi kebijaksanaan batin yang kokoh.",
        description: "Selamat! Kamu memiliki kecerdasan emosional yang sangat matang. Kamu tidak lari dari kesedihan, tapi juga tidak membiarkan dirimu hancur tenggelam. Kamu memvalidasi apa yang kamu rasakan, lalu mencari makna dan hikmah dari pengalaman tersebut.",
        psychologicalInsight: "Tercermin dalam kemampuan 'Cognitive Reappraisal' tingkat lanjut—mengubah bingkai interpretasi kognitif tanpa menindas emosi mentah. Ini adalah prediktor tertinggi untuk kepuasan hidup jangka panjang dan hubungan interpersonal yang stabil.",
        actionableSteps: [
          "Pertahankan kebiasaan reflektifmu dan terus asah kedalaman intuisi batinmu.",
          "Jadilah lentera yang hangat bagi orang-orang di sekitarmu yang sedang berjuang mengelola emosi.",
          "Gunakan Nuju untuk mendokumentasikan wawasan filosofis harianmu dan melacak pertumbuhan jiwamu."
        ],
        recommendedPrompt: "Pengalaman sulit yang kualami belakangan ini mengajarkanku satu hal berharga tentang diriku, yaitu...",
        shareSummaryText: "✨ Gaya Regulasi Emosiku: 'Si Pengolah Sadar' (The Alchemist)! Mampu mengolah rasa sakit jadi kebijaksanaan. Cek gayamu di nuju.app/quiz/gaya-regulasi-emosi"
      }
    ],
    faqs: [
      {
        question: "Apakah gaya regulasi emosi seseorang bisa berubah?",
        answer: "Bisa! Gaya regulasi emosi terbentuk dari pola asuh dan pengalaman masa lalu (attachment style), namun otak memiliki neuroplastisitas. Melalui journaling rutin, terapi CBT, dan latihan mindfulness, seseorang yang terbiasa memendam (Bottler) dapat berkembang menjadi bijak dan sadar (Alchemist)."
      },
      {
        question: "Kenapa memendam emosi bisa berdampak buruk bagi tubuh?",
        answer: "Ketika kamu menahan emosi, tubuh tetap menghasilkan hormon stres kortisol dan adrenalin. Jika tidak disalurkan keluar, beban ketegangan ini memicu peradangan, menurunkan imunitas, dan menyebabkan keluhan psikosomatis seperti asam lambung atau migrain."
      },
      {
        question: "Bagaimana Nuju melatih regulasi emosi yang sehat?",
        answer: "Nuju memberikan pendampingan reflektif tanpa penilaian. Nuju membantu mengubah 'Expressive Suppression' menjadi 'Affect Labeling' yang sehat melalui percakapan hangat dengan Ju dan latihan reframing kognitif."
      }
    ]
  },

  // =========================================================================
  // QUIZ 5: UNITED STATES / GLOBAL EN: HIGH-FUNCTIONING ANXIETY
  // =========================================================================
  {
    id: "high-functioning-anxiety-us",
    slug: "high-functioning-anxiety-us",
    title: "High-Functioning Anxiety & Overachievement Check ⚡🇺🇸",
    shortTitle: "High-Functioning Anxiety",
    subtitle: "Are you truly calm, or are you just masking chronic anxiety with relentless productivity?",
    description: "From the outside, you look successful, organized, and reliable. But on the inside, your nervous system is sprinting on a hamster wheel of panic, perfectionism, and fear of being exposed. Discover where you sit on the high-functioning anxiety spectrum.",
    category: "Anxiety & Performance",
    badge: "US & Global 🇺🇸",
    estimatedTime: "1 Min",
    takersCount: "54.1k+",
    themeColor: "from-blue-500/20 to-cyan-500/10",
    type: "numeric_score",
    targetCountry: "US",
    language: "en",
    countryFlag: "🇺🇸",
    mascotMood: "rough",
    mascotImage: juRough,
    questions: [
      {
        id: 1,
        prompt: "When you have a completely free weekend with zero obligations, what does your brain do?",
        subprompt: "Your nervous system's baseline reaction to stillness.",
        options: [
          {
            id: "us1a",
            label: "Enjoy the downtime peacefully without a shred of guilt",
            sublabel: "Able to read, stroll, or sleep effortlessly.",
            score: 0,
            icon: "☕"
          },
          {
            id: "us1b",
            label: "Rest for a few hours, but soon itch to organize or check emails",
            sublabel: "Mild productivity restlessness.",
            score: 5,
            icon: "📖"
          },
          {
            id: "us1c",
            label: "Feel profound anxiety or dread: 'I am falling behind while others work'",
            sublabel: "Inability to sit still; guilt-ridden free time.",
            score: 15,
            icon: "⚡"
          },
          {
            id: "us1d",
            label: "Invent fake emergencies or clean frantically to justify taking up space",
            sublabel: "Productivity as emotional anesthesia.",
            score: 20,
            icon: "🏃"
          }
        ]
      },
      {
        id: 2,
        prompt: "How do you handle minor imperfections or slight delays in your projects?",
        subprompt: "Your internal relationship with control and failure.",
        options: [
          {
            id: "us2a",
            label: "Accept it as part of life, adjust, and move on calmly",
            sublabel: "Flexible cognitive adaptability.",
            score: 0,
            icon: "🌿"
          },
          {
            id: "us2b",
            label: "Get annoyed, but fix it without catastrophizing",
            sublabel: "Healthy performance standards.",
            score: 5,
            icon: "🛠️"
          },
          {
            id: "us2c",
            label: "Ruminate for hours: 'Everyone will think I'm an incompetent fraud'",
            sublabel: "Classic Impostor Syndrome spiral.",
            score: 15,
            icon: "🎭"
          },
          {
            id: "us2d",
            label: "Paralyzing panic: stay up until 4 AM perfecting details nobody asked for",
            sublabel: "Compulsive over-preparation.",
            score: 20,
            icon: "🕯️"
          }
        ]
      },
      {
        id: 3,
        prompt: "What does your 'people-pleasing' radar look like during team meetings or social dinners?",
        subprompt: "Hyper-vigilance towards social evaluation.",
        options: [
          {
            id: "us3a",
            label: "Speak authentically without obsessive post-meeting analysis",
            sublabel: "Secure social confidence.",
            score: 0,
            icon: "🗣️"
          },
          {
            id: "us3b",
            label: "Conscious of diplomacy, but not losing sleep over opinions",
            sublabel: "Normal professional awareness.",
            score: 5,
            icon: "🤝"
          },
          {
            id: "us3c",
            label: "Replay every word you said on the drive home, dissecting perceived awkwardness",
            sublabel: "Post-event cognitive audit.",
            score: 15,
            icon: "📼"
          },
          {
            id: "us3d",
            label: "Constantly apologize, take blame for things you didn't do, terrified of disapproval",
            sublabel: "Fawn response / social survival defense.",
            score: 20,
            icon: "🥺"
          }
        ]
      },
      {
        id: 4,
        prompt: "What physical tension do you notice in your body right now as you read this?",
        subprompt: "Somatic manifestations of hidden hyper-arousal.",
        options: [
          {
            id: "us4a",
            label: "Jaw loose, shoulders relaxed, breathing deep into belly",
            sublabel: "Parasympathetic dominant state.",
            score: 0,
            icon: "🧘"
          },
          {
            id: "us4b",
            label: "Mild tightness in upper back, but generally comfortable",
            sublabel: "Standard desk posture tension.",
            score: 5,
            icon: "💼"
          },
          {
            id: "us4c",
            label: "Clenched jaw, raised shoulders, shallow chest breathing",
            sublabel: "Subconscious fight-or-flight brace.",
            score: 15,
            icon: "😬"
          },
          {
            id: "us4d",
            label: "Chronic stomach knots / acid, teeth grinding (bruxism), heart palpitation",
            sublabel: "Chronic somatic stress saturation.",
            score: 20,
            icon: "💓"
          }
        ]
      },
      {
        id: 5,
        prompt: "If your achievement facade dropped for one day, what is your deepest fear?",
        subprompt: "The core cognitive driver behind the hustle.",
        options: [
          {
            id: "us5a",
            label: "I know my worth is inherent; people love me for who I am, not my output",
            sublabel: "Unconditional self-worth.",
            score: 0,
            icon: "💖"
          },
          {
            id: "us5b",
            label: "I'd fall behind slightly, but I can catch up without losing my identity",
            sublabel: "Balanced self-esteem.",
            score: 5,
            icon: "⚖️"
          },
          {
            id: "us5c",
            label: "That I would be revealed as useless, lazy, or dispensable",
            sublabel: "Conditioned performance self-worth.",
            score: 15,
            icon: "📉"
          },
          {
            id: "us5d",
            label: "My entire world would collapse and I would be abandoned completely",
            sublabel: "Core existential anxiety / attachment fear.",
            score: 20,
            icon: "🕳️"
          }
        ]
      }
    ],
    results: [
      {
        id: "hfa-low",
        title: "High-Functioning Anxiety: Minimal (Grounded Achiever) 🌿✨",
        badge: "Balanced Drive",
        mascotMood: "great",
        mascotImage: juGreat,
        scoreRange: [0, 25],
        percentageDisplay: "Score: 0 - 25 / 100",
        tagline: "You pursue excellence from a place of joy, not from a fear of being unworthy.",
        description: "Congratulations. You have a remarkably healthy relationship with ambition. You understand that your value as a human being is not measured by the checkboxes on your calendar or the applause of your colleagues.",
        psychologicalInsight: "Your nervous system maintains strong vagal tone. You can shift between sympathetic activation (focused work) and parasympathetic recovery (rest) without emotional distress.",
        actionableSteps: [
          "Continue protecting your guilt-free weekends as sacred non-negotiables.",
          "Model healthy boundaries for peers who are trapped in toxic hustle culture.",
          "Use Nuju to celebrate meaningful weekly wins beyond career milestones."
        ],
        recommendedPrompt: "Tonight I celebrate that my peace is non-negotiable. One moment where I felt truly grounded today was...",
        shareSummaryText: "⚡ High-Functioning Anxiety Score: Minimal (Grounded Achiever)! Healthy ambition without burnout. Check your score at nuju.app/quiz/high-functioning-anxiety-us"
      },
      {
        id: "hfa-moderate",
        title: "High-Functioning Anxiety: Moderate (Masked Striver) ⚠️🎭",
        badge: "Perfectionist Drift",
        mascotMood: "okay",
        mascotImage: juOkay,
        scoreRange: [26, 60],
        percentageDisplay: "Score: 30 - 60 / 100",
        tagline: "You look like you have it all together, but your engine is running hot.",
        description: "You are the reliable friend and high-performing employee, but your drive is quietly fueled by the fear of disappointing others. You struggle to truly unplug on vacations and feel an undercurrent of urgency even when watching Netflix.",
        psychologicalInsight: "In Cognitive Behavioral Therapy, this is 'Performance-Contingent Self-Worth'. Anxiety is being weaponized as a behavioral motivator. While it produces results in the short term, it depletes dopamine receptors and paves the road toward sudden burnout.",
        actionableSteps: [
          "Practice 'Subtle Disobedience': Leave one harmless task unfinished at the end of the day.",
          "Unclench your jaw right now. Drop your shoulders away from your ears. Take one deep diaphragmatic sigh.",
          "Do a 30-second voice dump in Nuju before bed to release the day's hidden pressure valve."
        ],
        recommendedPrompt: "The pressure I put on myself today was... What would happen if I gave myself permission to simply be human tonight?",
        shareSummaryText: "⚡ High-Functioning Anxiety Score: Moderate (Masked Striver). Outwardly calm, inwardly racing. Check your score at nuju.app/quiz/high-functioning-anxiety-us"
      },
      {
        id: "hfa-high",
        title: "High-Functioning Anxiety: Severe (Silent Burnout Crisis) 🚨🪫",
        badge: "Overdrive Alarm",
        mascotMood: "low",
        mascotImage: juLow,
        scoreRange: [61, 100],
        percentageDisplay: "Score: 65 - 100 / 100",
        tagline: "Your nervous system is redlining. You cannot out-work this panic.",
        description: "You are living in constant fight-or-flight while projecting a polished smile. The fear of being exposed as an 'impostor' is driving you to physical exhaustion (insomnia, muscle tension, gut issues). You desperately need a safe space where you don't have to perform.",
        psychologicalInsight: "Dr. Bessel van der Kolk notes that chronic over-arousal without somatic release traps the brain in survival hyper-vigilance. You aren't 'ambitious'; you are running away from an internal dread that demands immediate compassionate intervention.",
        actionableSteps: [
          "Schedule a consultation with a licensed psychotherapist (CBT or somatic).",
          "Declare an absolute mental health ceasefire tonight: no emails, no planning, no self-improvement books.",
          "Open Nuju and talk rawly to Ju. No bullet points, no corporate speak. Cry, swear, or whisper—Ju accepts you completely."
        ],
        recommendedPrompt: "I am completely exhausted from pretending everything is fine. What I am really terrified of is...",
        shareSummaryText: "🚨 High-Functioning Anxiety Score: High Alert (Silent Burnout Crisis). It's time to stop performing. Check your score at nuju.app/quiz/high-functioning-anxiety-us"
      }
    ],
    faqs: [
      {
        question: "What is high-functioning anxiety?",
        answer: "High-functioning anxiety is when an individual experiences severe internal anxiety, perfectionism, and fear of failure, but channels it into intense productivity, outward success, and over-preparation rather than overt avoidance."
      },
      {
        question: "Why is high-functioning anxiety dangerous?",
        answer: "Because it is socially rewarded. Society praises high achievers for being responsive and hyper-reliable, which reinforces the destructive cycle until physical illness or severe depression forces a crash."
      },
      {
        question: "How does Nuju help high achievers with anxiety?",
        answer: "Nuju provides a zero-performance safe zone. Mascot Ju doesn't score your productivity or demand eloquence; Nuju's 30-second voice journaling lets you dismantle your mask and discharge somatic stress before bed."
      }
    ]
  },

  // =========================================================================
  // QUIZ 6: GERMANY & SWITZERLAND (DE / CH): FEIERABEND & LEISTUNGSDRUCK
  // =========================================================================
  {
    id: "feierabend-burnout-de",
    slug: "feierabend-burnout-de",
    title: "Feierabend-Check: Kannst du wirklich abschalten? 🇩🇪🇨🇭",
    shortTitle: "Feierabend-Check",
    subtitle: "Leistungsdruck, ständige Erreichbarkeit und die Gefahr der inneren Kündigung.",
    description: "In Deutschland und der Schweiz gilt der Feierabend als heilig — doch im Zeitalter von Homeoffice und Slack fällt das mentale Abschalten immer schwerer. Finde in 60 Sekunden heraus, ob dein Feierabend wirklich der Erholung dient oder ob du auf ein Burnout zusteuerst.",
    category: "Work-Life-Balance & Burnout",
    badge: "DACH Region 🇩🇪🇨🇭",
    estimatedTime: "1 Min",
    takersCount: "22.4k+",
    themeColor: "from-red-500/20 to-yellow-500/10",
    type: "numeric_score",
    targetCountry: "DE",
    language: "de",
    countryFlag: "🇩🇪",
    mascotMood: "okay",
    mascotImage: juOkay,
    questions: [
      {
        id: 1,
        prompt: "Du klappst den Laptop zu oder verlässt das Büro. Wann hören die Gedanken an die Arbeit auf?",
        subprompt: "Deine mentale Grenze zwischen Dienstschluss und Freizeit.",
        options: [
          {
            id: "de1a",
            label: "Sofort. Feierabend ist Feierabend — die Arbeit bleibt im Büro",
            sublabel: "Klare kognitive Grenzziehung (Boundary Control).",
            score: 0,
            icon: "🚪"
          },
          {
            id: "de1b",
            label: "Nach ca. 30 Minuten oder nach dem Sport/Kochen",
            sublabel: "Gesunder Übergangsprozess.",
            score: 5,
            icon: "🚴"
          },
          {
            id: "de1c",
            label: "Gar nicht. Ich grüble beim Abendessen über morgige Meetings nach",
            sublabel: "Gedankliche Dauerbelastung im Feierabend.",
            score: 15,
            icon: "🧠"
          },
          {
            id: "de1d",
            label: "Ich checke heimlich bis Mitternacht E-Mails und Slack-Nachrichten",
            sublabel: "Vollständige Entgrenzung der Arbeit.",
            score: 20,
            icon: "📱"
          }
        ]
      },
      {
        id: 2,
        prompt: "Wie erlebst du deinen Sonntagnachmittag (die berühmten 'Sunday Scaries')?",
        subprompt: "Das seelische Befinden vor dem Wochenstart.",
        options: [
          {
            id: "de2a",
            label: "Entspannt und erholt, Vorfreude oder Gelassenheit auf die neue Woche",
            sublabel: "Vollständige Wochenend-Regeneration.",
            score: 0,
            icon: "☀️"
          },
          {
            id: "de2b",
            label: "Ein kurzes Seufzen am Abend, aber keine Angstgefühle",
            sublabel: "Normale sonntägliche Übergangsmüdigkeit.",
            score: 5,
            icon: "☕"
          },
          {
            id: "de2c",
            label: "Magenkrämpfe, Unruhe oder Druckgefühl in der Brust ab 16:00 Uhr",
            sublabel: "Antizipatorische Stressreaktion des Nervensystems.",
            score: 15,
            icon: "⚡"
          },
          {
            id: "de2d",
            label: "Verzweiflung, Lähmung und der Wunsch, einfach nicht mehr hinzugehen",
            sublabel: "Symptom der akuten inneren Kündigung.",
            score: 20,
            icon: "🛑"
          }
        ]
      },
      {
        id: 3,
        prompt: "Welche Haltung hast du gegenüber deinen beruflichen Aufgaben entwickelt?",
        subprompt: "Zynismus und Entfremdung nach dem Maslach Burnout Inventory (MBI).",
        options: [
          {
            id: "de3a",
            label: "Ich sehe Sinn in meiner Arbeit und bin motiviert bei der Sache",
            sublabel: "Hohe Arbeitszufriedenheit und Sinnhaftigkeit.",
            score: 0,
            icon: "🌱"
          },
          {
            id: "de3b",
            label: "Manches nervt, aber im Großen und Ganzen passt es",
            sublabel: "Realistische Arbeitsplatzbewertung.",
            score: 5,
            icon: "💼"
          },
          {
            id: "de3c",
            label: "Zynismus: 'Dienst nach Vorschrift' — ich gebe nur noch das absolute Minimum",
            sublabel: "Emotionale Distanzierung als Selbstschutz.",
            score: 15,
            icon: "😒"
          },
          {
            id: "de3d",
            label: "Völlige Gleichgültigkeit oder Wut: Ich fühle mich wie eine seelenlose Nummer",
            sublabel: "Fortgeschrittene Entpersönlichung.",
            score: 20,
            icon: "🧊"
          }
        ]
      },
      {
        id: 4,
        prompt: "Wie steht es um deinen Schlaf und körperliche Warnsignale?",
        subprompt: "Somatische Reaktionen auf chronischen Leistungsdruck.",
        options: [
          {
            id: "de4a",
            label: "Ich schlafe durch und fühle mich morgens ausgeruht",
            sublabel: "Tiefe Schlafphasen intakt.",
            score: 0,
            icon: "🛌"
          },
          {
            id: "de4b",
            label: "Gelegentlich Nackenverspannungen bei langen Bildschirmtagen",
            sublabel: "Ergonomische Alltagsbeschwerden.",
            score: 5,
            icon: "🧘"
          },
          {
            id: "de4c",
            label: "Aufwachen um 3 Uhr nachts mit Herzklopfen und To-Do-Listen im Kopf",
            sublabel: "Kortisol-Peak mitten in der Nacht.",
            score: 15,
            icon: "⏰"
          },
          {
            id: "de4d",
            label: "Chronische Schlaflosigkeit, Magenprobleme, Tinnitus oder Panikattacken",
            sublabel: "Körperliche Überlastungsgrenze überschritten.",
            score: 20,
            icon: "🏥"
          }
        ]
      },
      {
        id: 5,
        prompt: "Was hält dich davon ab, jetzt sofort einen Gang herunterzuschalten?",
        subprompt: "Der innere Glaubenssatz hinter dem Leistungsdruck.",
        options: [
          {
            id: "de5a",
            label: "Nichts. Wenn ich Pause brauche, nehme ich sie mir ohne schlechtes Gewissen",
            sublabel: "Gesunde Selbstfürsorge.",
            score: 0,
            icon: "🌿"
          },
          {
            id: "de5b",
            label: "Nur kurzfristige Deadlines; danach erhole ich mich wieder gezielt",
            sublabel: "Temporäre Belastungsphase.",
            score: 5,
            icon: "📅"
          },
          {
            id: "de5c",
            label: "Perfektionismus: 'Wenn ich es nicht mache, bricht alles zusammen'",
            sublabel: "Verantwortungsüberlastung.",
            score: 15,
            icon: "🧱"
          },
          {
            id: "de5d",
            label: "Die Angst vor Jobverlust, Abmahnung oder sozialem Gesichtsverlust",
            sublabel: "Existenzielle Leistungsangst.",
            score: 20,
            icon: "⚡"
          }
        ]
      }
    ],
    results: [
      {
        id: "de-green",
        title: "Feierabend-Score: Meister des Feierabends (0 - 25 Punkte) 🌿🍺",
        badge: "Gesunde Grenzen",
        mascotMood: "great",
        mascotImage: juGreat,
        scoreRange: [0, 25],
        percentageDisplay: "Score: 0 - 25 / 100",
        tagline: "Du beherrschst die Kunst des echten Abschaltens vorbildlich.",
        description: "Dein Feierabend ist eine echte Erholungsoase. Du schützt deine Freizeit vor beruflichen Eingriffen und dein Körper nutzt die Nacht zur echten Regeneration. Du arbeitest, um zu leben — nicht umgekehrt.",
        psychologicalInsight: "Psychologische 'Psychological Detachment' (Sonnentag et al.): Wer nach der Arbeit mental vollständig abschaltet, weist nachweislich eine um 40% höhere Langzeit-Resilienz und stabilere Herzfrequenzvariabilität (HRV) auf.",
        actionableSteps: [
          "Behalte deine gesunden Grenzziehungen (Notification-Off nach 18 Uhr) bei.",
          "Genieße deine Hobbys und soziale Kontakte weiterhin unbeschwert.",
          "Nutze Nuju für kurze 1-minütige Dankbarkeits-Checks am Abend."
        ],
        recommendedPrompt: "Heute bin ich dankbar für meinen Feierabend. Was mir heute nach der Arbeit die größte Freude gemacht hat, war...",
        shareSummaryText: "🇩🇪 Feierabend-Check: 100% Meister des Abschaltens! Gesunde Work-Life-Balance. Teste deinen Feierabend auf nuju.app/quiz/feierabend-burnout-de"
      },
      {
        id: "de-yellow",
        title: "Feierabend-Score: Grauzone der Belastung (30 - 60 Punkte) ⚠️🍂",
        badge: "Abschalt-Warnung",
        mascotMood: "okay",
        mascotImage: juOkay,
        scoreRange: [26, 60],
        percentageDisplay: "Score: 30 - 60 / 100",
        tagline: "Der Feierabend existiert auf dem Papier, aber dein Kopf arbeitet weiter.",
        description: "Du nimmst Arbeitsfrust und offene Aufgaben gedanklich mit ins Wohnzimmer. Du bist zwar noch leistungsfähig, aber deine Regenerationsphasen werden kürzer. Zynismus und Dienst nach Vorschrift beginnen sich als Schutzschild aufzubauen.",
        psychologicalInsight: "Nach dem Maslach Burnout Inventory (MBI) befindest du dich im Stadium der 'emotionalen Erschöpfung'. Dein Nervensystem schaltet am Abend nicht mehr zuverlässig vom Sympathikus auf den Parasympathikus um.",
        actionableSteps: [
          "Führe ein festes 'Shutdown-Ritual' ein: 10 Minuten vor Dienstende To-Do-Liste für morgen schreiben und Laptop physisch wegräumen.",
          "Keine beruflichen Messenger auf dem privaten Smartphone.",
          "Sprich deinen Frust 30 Sekunden lang in Nuju ein, um den Kopf für den Abend frei zu pusten."
        ],
        recommendedPrompt: "Der Gedanke an die Arbeit, der mich heute Abend noch verfolgt, ist... Aber ab jetzt gilt: Feierabend ist heilig.",
        shareSummaryText: "⚠️ Mein Feierabend-Score: Warnzone! Die Arbeit verfolgt mich bis ins Bett. Teste dein Abschalt-Niveau auf nuju.app/quiz/feierabend-burnout-de"
      },
      {
        id: "de-red",
        title: "Feierabend-Score: Akutes Burnout-Risiko (65 - 100 Punkte) 🚨🔥",
        badge: "Innere Kündigung",
        mascotMood: "low",
        mascotImage: juLow,
        scoreRange: [61, 100],
        percentageDisplay: "Score: 65 - 100 / 100",
        tagline: "Alarmstufe Rot! Chronischer Leistungsdruck zerstört deine Gesundheit.",
        description: "Du hast innerlich gekündigt oder stehst kurz vor dem Zusammenbruch. Die Arbeit beherrscht deine Nächte, dein Körper schlägt mit somatischen Symptomen (Tinnitus, Magen, Schlaflosigkeit) Alarm. Du brauchst dringend eine Notbremse.",
        psychologicalInsight: "Dies ist der Zustand des 'Allostatic Overload'. Das chronische Übermaß an Stresshormonen führt zu kognitiven Ausfällen und emotionaler Abstumpfung. Dies ist keine Charakterschwäche, sondern ein medizinisch ernstzunehmender Überlastungszustand.",
        actionableSteps: [
          "Vereinbare zeitnah einen Termin bei deinem Hausarzt für eine Krankschreibung / Überweisung zur Psychotherapie.",
          "Akzeptiere: Kein Projekt und kein Arbeitgeber ist deine Gesundheit wert.",
          "Nuju bietet dir einen geschützten, urteilsfreien Raum: Sprich heute Nacht mit Ju und lade deine Verzweiflung anonym ab."
        ],
        recommendedPrompt: "Ich schaffe diesen Druck nicht mehr, Ju. Was mich in der Arbeit innerlich auffrisst, ist...",
        shareSummaryText: "🚨 Feierabend-Score: Kritisches Burnout-Risiko (Innere Kündigung)! Höchste Zeit für Selbstschutz. Mach den Test auf nuju.app/quiz/feierabend-burnout-de"
      }
    ],
    faqs: [
      {
        question: "Was bedeutet 'Innere Kündigung'?",
        answer: "Innere Kündigung beschreibt den Zustand, in dem ein Arbeitnehmer die emotionale Bindung zur Arbeit vollständig kappt und nur noch das absolut Nötigste tut ('Dienst nach Vorschrift'), oft als unbewusster Selbstschutz vor Burnout."
      },
      {
        question: "Ist dieser Test eine medizinische Diagnose?",
        answer: "Nein. Er basiert auf wissenschaftlichen Modellen der Arbeitspsychologie (MBI, OLBI) und dient der Selbsteinschätzung. Bei anhaltenden Beschwerden wende dich bitte an einen Arzt oder Psychotherapeuten."
      },
      {
        question: "Wie hilft Nuju beim Abschalten nach Feierabend?",
        answer: "Nuju fungiert als digitales 'Feierabend-Ventil'. Durch das unkomplizierte 30-Sekunden-Sprachtagebuch sprichst du berufliche Frustrationen vor dem Schlafengehen aus und gibst deinem Gehirn ein klares Signal zum Herunterfahren."
      }
    ]
  },

  // =========================================================================
  // QUIZ 7: NORWAY / NORDICS: WINTER BLUES & SAD CHECK
  // =========================================================================
  {
    id: "winter-blues-nordic-no",
    slug: "winter-blues-nordic-no",
    title: "Nordic Winter Battery & Seasonal Mood Check (SAD) ❄️🇳🇴",
    shortTitle: "Nordic Winter Battery",
    subtitle: "Mørketid fatigue, winter blues, and the subtle pressure of Janteloven.",
    description: "When the sun vanishes at 3:30 PM and the northern winter sets in, human biology shifts. Are you experiencing normal seasonal sluggishness, or is Seasonal Affective Disorder (SAD) draining your vital battery? Check your northern mental battery in 60 seconds.",
    category: "Seasonal Wellness & Circadian Health",
    badge: "Nordic / Norway 🇳🇴",
    estimatedTime: "1 Min",
    takersCount: "18.9k+",
    themeColor: "from-sky-500/20 to-blue-500/10",
    type: "numeric_score",
    targetCountry: "NO",
    language: "en",
    countryFlag: "🇳🇴",
    mascotMood: "rough",
    mascotImage: juRough,
    questions: [
      {
        id: 1,
        prompt: "When you wake up in pitch-black darkness at 7:00 AM during winter:",
        subprompt: "Your circadian awakening rhythm.",
        options: [
          {
            id: "no1a",
            label: "Wake up naturally with my light lamp or alarm and feel reasonably energized",
            sublabel: "Robust circadian melatonin clearance.",
            score: 0,
            icon: "💡"
          },
          {
            id: "no1b",
            label: "Hit snooze twice, grumble, but find my stride after coffee",
            sublabel: "Typical winter morning sluggishness.",
            score: 5,
            icon: "☕"
          },
          {
            id: "no1c",
            label: "Feel like my limbs are filled with wet concrete; dragging myself out of bed is agony",
            sublabel: "Hypersomnia and severe morning inertia.",
            score: 15,
            icon: "🧊"
          },
          {
            id: "no1d",
            label: "Can sleep 11 hours and still wake up utterly exhausted and depressed",
            sublabel: "Severe seasonal sleep architecture disruption.",
            score: 20,
            icon: "🛌"
          }
        ]
      },
      {
        id: 2,
        prompt: "How has your appetite and desire for carbohydrates changed recently?",
        subprompt: "Seasonal neurotransmitter (serotonin) depletion marker.",
        options: [
          {
            id: "no2a",
            label: "Appetite is stable and balanced, just like in summer",
            sublabel: "Consistent nutritional homeostasis.",
            score: 0,
            icon: "🥗"
          },
          {
            id: "no2b",
            label: "Enjoying more warm soups and comfort food, but within normal bounds",
            sublabel: "Natural thermoregulatory appetite shift.",
            score: 5,
            icon: "🍲"
          },
          {
            id: "no2c",
            label: "Intense, uncontrollable cravings for bread, pastries, sweets, and heavy starch",
            sublabel: "Brain's attempt to synthesize depleted serotonin.",
            score: 15,
            icon: "🥐"
          },
          {
            id: "no2d",
            label: "Mindless bingeing followed by lethargic guilt and weight gain",
            sublabel: "Clinically significant seasonal carbohydrate craving.",
            score: 20,
            icon: "🍫"
          }
        ]
      },
      {
        id: 3,
        prompt: "What happens to your social life when temperatures drop and darkness spreads?",
        subprompt: "The urge toward social hibernation vs healthy community.",
        options: [
          {
            id: "no3a",
            label: "Still active with friends, winter sports, skiing, or cozy dinners",
            sublabel: "Embracing Friluftsliv and Koselig culture.",
            score: 0,
            icon: "🎿"
          },
          {
            id: "no3b",
            label: "Stay home a bit more often, but stay in touch with close friends",
            sublabel: "Mild seasonal cocooning.",
            score: 5,
            icon: "🕯️"
          },
          {
            id: "no3c",
            label: "Cancel plans constantly: answering a phone call feels like climbing a mountain",
            sublabel: "Social withdrawal and apathy.",
            score: 15,
            icon: "🚪"
          },
          {
            id: "no3d",
            label: "Complete isolation: feeling alienated and ashamed to let anyone see me like this",
            sublabel: "Deep seasonal depressive retreat.",
            score: 20,
            icon: "🕳️"
          }
        ]
      },
      {
        id: 4,
        prompt: "How does the cultural shadow of 'Janteloven' (You shall not think you are special) affect you when you struggle?",
        subprompt: "Social conformity and reluctance to show weakness.",
        options: [
          {
            id: "no4a",
            label: "I speak openly when I'm having a hard time without feeling guilty",
            sublabel: "Immunity to social suppression norms.",
            score: 0,
            icon: "🗣️"
          },
          {
            id: "no4b",
            label: "I prefer to handle things myself, but will admit it to a partner",
            sublabel: "Private self-reliance.",
            score: 5,
            icon: "🤝"
          },
          {
            id: "no4c",
            label: "I feel intense guilt if I complain because 'everyone here endures the winter, so I must too'",
            sublabel: "Suppression fueled by conformity guilt.",
            score: 15,
            icon: "🤐"
          },
          {
            id: "no4d",
            label: "I feel like a total failure for not being as resilient as Nordic stereotypes expect",
            sublabel: "Internalized cultural inadequacy.",
            score: 20,
            icon: "💔"
          }
        ]
      },
      {
        id: 5,
        prompt: "What is your emotional baseline at 4:00 PM when the darkness settles outside?",
        subprompt: "Evening twilight mood drop.",
        options: [
          {
            id: "no5a",
            label: "Light candles, make tea, and enjoy the cozy atmosphere (Koselig)",
            sublabel: "Positive cognitive reframing of darkness.",
            score: 0,
            icon: "✨"
          },
          {
            id: "no5b",
            label: "A brief dip in energy, but manageable with good lighting",
            sublabel: "Mild twilight dip.",
            score: 5,
            icon: "🛋️"
          },
          {
            id: "no5c",
            label: "Sudden wave of melancholy, brain fog, and emptiness washing over me",
            sublabel: "Dopaminergic slump at sundown.",
            score: 15,
            icon: "🌧️"
          },
          {
            id: "no5d",
            label: "Heavy existential dread: counting the months until April with despair",
            sublabel: "Severe seasonal affective dysphoria.",
            score: 20,
            icon: "❄️"
          }
        ]
      }
    ],
    results: [
      {
        id: "no-resilient",
        title: "Winter Battery: 80% - 100% (Nordic Koselig Master) ❄️🎿",
        badge: "Winter Resilient",
        mascotMood: "great",
        mascotImage: juGreat,
        scoreRange: [0, 25],
        percentageDisplay: "Score: 0 - 25 / 100",
        tagline: "You have embraced winter as a time of cozy reflection and rhythmic rest.",
        description: "Your circadian rhythm and mental framing are thriving. You do not fight the dark; you embrace it with warm candles, outdoor Friluftsliv, and gentle pacing. You are naturally protected from seasonal affective decline.",
        psychologicalInsight: "Dr. Kari Leibowitz's Stanford research in Tromsø revealed that a positive 'wintertime mindset'—viewing winter as a season to enjoy rather than survive—is the single strongest buffer against seasonal depression.",
        actionableSteps: [
          "Keep up your morning outdoor walks to capture whatever lux light is available.",
          "Continue embracing Koselig rituals without guilt.",
          "Use Nuju to journal your winter cozy reflections and creative thoughts."
        ],
        recommendedPrompt: "Tonight by candlelight, I reflect on the peace of winter darkness. What brought me warmth today was...",
        shareSummaryText: "❄️ Nordic Winter Battery: 100% Resilient! Embracing Koselig and light. Check your winter mood score at nuju.app/quiz/winter-blues-nordic-no"
      },
      {
        id: "no-moderate",
        title: "Winter Battery: 30% - 60% (Mørketid Slump / Winter Blues) ⚠️🕯️",
        badge: "Winter Slump",
        mascotMood: "okay",
        mascotImage: juOkay,
        scoreRange: [26, 60],
        percentageDisplay: "Score: 30 - 60 / 100",
        tagline: "The darkness is weighing on your eyelids, and your battery is leaking.",
        description: "You are experiencing classic 'subsyndromal SAD' (winter blues). You crave more carbs, feel sluggish in the mornings, and find yourself withdrawing from friends. You aren't clinically depressed, but your brain is starved of photons.",
        psychologicalInsight: "Decreased retinal sunlight exposure delays the suprachiasmatic nucleus from shutting off melatonin production in the morning, leading to daytime lethargy and serotonin deficiency.",
        actionableSteps: [
          "Sit in front of a 10,000-lux light therapy lamp for 20-30 minutes within 1 hour of waking.",
          "Supplement Vitamin D3 (consult your GP) and maintain regular sleep/wake hours.",
          "Speak your winter lethargy into Nuju before bed so you don't ruminate in the dark."
        ],
        recommendedPrompt: "The winter darkness has been making me feel so heavy lately, especially when... Tomorrow morning I will seek light by...",
        shareSummaryText: "❄️ Nordic Winter Battery: Mørketid Slump detected (45%). Time for light therapy and self-care. Check your score at nuju.app/quiz/winter-blues-nordic-no"
      },
      {
        id: "no-severe",
        title: "Winter Battery: 65% - 100% (Severe Seasonal Affective Disorder / SAD) 🚨🪫",
        badge: "SAD Vulnerability",
        mascotMood: "low",
        mascotImage: juLow,
        scoreRange: [61, 100],
        percentageDisplay: "Score: 65 - 100 / 100",
        tagline: "You are suffering in silence. This is not a personal failure; it is neurobiology.",
        description: "You are experiencing significant Seasonal Affective Disorder (SAD). The combination of darkness, hypersomnia, carbohydrate craving, and isolation is critically draining your soul. Don't let Janteloven convince you to 'just tough it out'.",
        psychologicalInsight: "SAD is an officially recognized depressive disorder with seasonal pattern (DSM-5). It involves severe dysregulation of the SERT (serotonin transporter) protein during dark months, and responds well to clinical light therapy, psychotherapy, and medical guidance.",
        actionableSteps: [
          "Consult your fastlege (GP) or a mental health professional for evidence-based SAD treatment.",
          "Do not isolate yourself: tell one trusted friend how hard winter is hitting you right now.",
          "Nuju is your pocket warm sanctuary: whisper your exhaustion to Ju without needing to turn on bright screens."
        ],
        recommendedPrompt: "Ju, this winter feels like it will never end. The weight in my chest feels so cold because...",
        shareSummaryText: "🚨 Nordic Winter Battery: High Seasonal Fatigue (SAD Alert). Don't suffer in silence. Check your winter score at nuju.app/quiz/winter-blues-nordic-no"
      }
    ],
    faqs: [
      {
        question: "What is Seasonal Affective Disorder (SAD)?",
        answer: "SAD is a type of depression that is related to changes in seasons, typically beginning in late autumn and persisting through the dark winter months due to reduced daylight disrupting circadian rhythms and serotonin levels."
      },
      {
        question: "How does Janteloven relate to winter depression?",
        answer: "In Nordic culture, Janteloven promotes modesty and discourages drawing attention to oneself. This can create toxic pressure to pretend everything is fine and prevent people from admitting they are struggling with winter darkness."
      },
      {
        question: "How does Nuju help during the dark Nordic winter?",
        answer: "Nuju provides a soft, warm, dark-mode audio journaling sanctuary. You can stay curled under your duvet and speak your heavy thoughts to Ju, receiving compassionate emotional grounding without eye-straining screen glare."
      }
    ]
  },

  // =========================================================================
  // QUIZ 8: NETHERLANDS (NL): THE 'NIKSEN' (DOING NOTHING) TEST
  // =========================================================================
  {
    id: "dutch-niksen-burnout-nl",
    slug: "dutch-niksen-burnout-nl",
    title: "The 'Niksen' Score: Can You Master Doing Nothing? 🇳🇱🌷",
    shortTitle: "Dutch Niksen Test",
    subtitle: "Embracing the Dutch philosophy of guilt-free idleness to conquer burnout.",
    description: "In the Netherlands, 'Niksen' means doing nothing consciously and without purpose—simply looking out the window or listening to music without a goal. Can you sit for 10 minutes without checking your phone, or are you addicted to perpetual doing? Test your Niksen capacity in 60 seconds.",
    category: "Mindfulness & Stress Relief",
    badge: "Netherlands / Dutch 🇳🇱",
    estimatedTime: "1 Min",
    takersCount: "16.3k+",
    themeColor: "from-orange-500/20 to-amber-500/10",
    type: "numeric_score",
    targetCountry: "NL",
    language: "en",
    countryFlag: "🇳🇱",
    mascotMood: "good",
    mascotImage: juGood,
    questions: [
      {
        id: 1,
        prompt: "You are waiting for a train or in a doctor's waiting room for 10 minutes. What happens?",
        subprompt: "Your automatic tolerance for unoccupied time.",
        options: [
          {
            id: "nl1a",
            label: "Look around, daydream, watch people, breathe calmly without opening my phone",
            sublabel: "True spontaneous Niksen capability.",
            score: 0,
            icon: "🪟"
          },
          {
            id: "nl1b",
            label: "Wait 2 minutes, then casually check a text message",
            sublabel: "Normal contemporary habits.",
            score: 5,
            icon: "📱"
          },
          {
            id: "nl1c",
            label: "Instantly whip out my phone within 4 seconds: scroll feeds, emails, news compulsively",
            sublabel: "Dopamine addiction & fear of stillness.",
            score: 15,
            icon: "⚡"
          },
          {
            id: "nl1d",
            label: "Feel visceral panic if my battery dies; stillness feels uncomfortable and threatening",
            sublabel: "Severe boredom intolerance.",
            score: 20,
            icon: "🚨"
          }
        ]
      },
      {
        id: 2,
        prompt: "When you sit on your sofa on a Sunday afternoon with nothing scheduled, how do you feel?",
        subprompt: "Your relationship with unproductiveness.",
        options: [
          {
            id: "nl2a",
            label: "Pure bliss: resting without having to justify it to anyone",
            sublabel: "Unapologetic idleness mastery.",
            score: 0,
            icon: "🛋️"
          },
          {
            id: "nl2b",
            label: "Mostly relaxed, though an occasional to-do thought floats through",
            sublabel: "Healthy human mind wanders.",
            score: 5,
            icon: "☕"
          },
          {
            id: "nl2c",
            label: "Nagging guilt: 'I should be cleaning, studying, working out, or building a side hustle'",
            sublabel: "Internalized hyper-productivity guilt.",
            score: 15,
            icon: "📋"
          },
          {
            id: "nl2d",
            label: "Agitation so severe that I force myself to do chores just to avoid feeling guilty",
            sublabel: "Compulsive toxic activity cycle.",
            score: 20,
            icon: "🧹"
          }
        ]
      },
      {
        id: 3,
        prompt: "How do you approach your hobbies or personal interests?",
        subprompt: "Has joy been corrupted by productivity?",
        options: [
          {
            id: "nl3a",
            label: "I do them purely for fun, even if I'm mediocre at them and create zero profit",
            sublabel: "Pure autotelic play.",
            score: 0,
            icon: "🎨"
          },
          {
            id: "nl3b",
            label: "I enjoy improving my skill, but I keep it as a relaxed leisure activity",
            sublabel: "Healthy recreational engagement.",
            score: 5,
            icon: "🎸"
          },
          {
            id: "nl3c",
            label: "I constantly think: 'Can I monetize this? Can I post this on Instagram/LinkedIn?'",
            sublabel: "Commodification of personal joy.",
            score: 15,
            icon: "💼"
          },
          {
            id: "nl3d",
            label: "I have abandoned all hobbies because they don't produce measurable career ROI",
            sublabel: "Total loss of non-utilitarian joy.",
            score: 20,
            icon: "📉"
          }
        ]
      },
      {
        id: 4,
        prompt: "What does your ideal vacation look like?",
        subprompt: "Do you travel to rest or to execute an itinerary?",
        options: [
          {
            id: "nl4a",
            label: "Sitting by a canal or beach, drinking coffee, no alarms, no strict schedule",
            sublabel: "True restorative vacation.",
            score: 0,
            icon: "🏖️"
          },
          {
            id: "nl4b",
            label: "A balance between sightseeing in the morning and unstructured lounging later",
            sublabel: "Balanced itinerary.",
            score: 5,
            icon: "🗺️"
          },
          {
            id: "nl4c",
            label: "Packed hour-by-hour spreadsheet; returning from vacation more exhausted than before",
            sublabel: "High-stress vacation execution.",
            score: 15,
            icon: "⏰"
          },
          {
            id: "nl4d",
            label: "I secretly check work Slack by the hotel pool and feel anxious about missed emails",
            sublabel: "Inability to detach.",
            score: 20,
            icon: "💻"
          }
        ]
      },
      {
        id: 5,
        prompt: "How do you view daydreaming or staring blankly out of a window?",
        subprompt: "Cultural perception of cognitive idling.",
        options: [
          {
            id: "nl5a",
            label: "A vital, sacred way for my brain to process emotions and foster creativity",
            sublabel: "Deep appreciation of Default Mode Network.",
            score: 0,
            icon: "☁️"
          },
          {
            id: "nl5b",
            label: "Pleasant when it happens, even if I don't schedule it deliberately",
            sublabel: "Organic relaxation.",
            score: 5,
            icon: "🌿"
          },
          {
            id: "nl5c",
            label: "A 'waste of precious time' that makes me feel lazy and irresponsible",
            sublabel: "Cultural puritanical work-ethic bias.",
            score: 15,
            icon: "⏱️"
          },
          {
            id: "nl5d",
            label: "Terrifying: if my mind goes blank, painful repressed thoughts will flood in",
            sublabel: "Avoidance of inner emotional processing.",
            score: 20,
            icon: "🌪️"
          }
        ]
      }
    ],
    results: [
      {
        id: "niksen-master",
        title: "Niksen Score: 90% - 100% (True Dutch Niksen Master) 🇳🇱🌷",
        badge: "Zen Niksen",
        mascotMood: "great",
        mascotImage: juGreat,
        scoreRange: [0, 25],
        percentageDisplay: "Score: 0 - 25 / 100",
        tagline: "You possess the rare superpower of guilt-free stillness.",
        description: "You understand the profound wisdom of the Dutch art of 'Niksen'. You can sit by a window, look at the clouds, and let your mind float without self-admonition. You work hard, but you know how to truly STOP.",
        psychologicalInsight: "Cognitive neuroscientists call this activating the Default Mode Network (DMN). Unfocused daydreaming consolidates memory, replenishes prefrontal executive capacity, and sparks breakthrough creative solutions.",
        actionableSteps: [
          "Protect your Niksen moments like appointments with your own soul.",
          "Inspire colleagues who are caught in relentless hustle culture to take real pauses.",
          "Use Nuju to capture the spontaneous creative insights that blossom during your downtime."
        ],
        recommendedPrompt: "Today I allowed myself to do absolutely nothing for a little while. The gentle thought that arrived was...",
        shareSummaryText: "🌷 Niksen Score: 100% (Dutch Niksen Master)! Mastering the art of doing nothing without guilt. Test yourself at nuju.app/quiz/dutch-niksen-burnout-nl"
      },
      {
        id: "niksen-moderate",
        title: "Niksen Score: 40% - 60% (Mild Productivity Guilt) ⚠️🚴",
        badge: "Guilt-Prone",
        mascotMood: "okay",
        mascotImage: juOkay,
        scoreRange: [26, 60],
        percentageDisplay: "Score: 30 - 60 / 100",
        tagline: "You want to relax, but an inner voice keeps whispering 'You should be doing something'.",
        description: "You appreciate relaxation, but modern hustle culture has infected your subconscious. You often need an 'excuse' to relax (like being sick or exercising first). True, unadorned idleness still feels slightly uncomfortable.",
        psychologicalInsight: "You are experiencing 'Leisure Guilt'—a documented phenomenon where individuals equate rest with unworthiness, raising baseline cortisol even during ostensibly leisurely activities.",
        actionableSteps: [
          "Practice 'Micro-Niksen': Spend 5 minutes tomorrow staring out the window with your hands empty. No phone, no book, no tea.",
          "Reframe rest not as a reward you earn, but as biological maintenance required to function.",
          "Voice dump your restless to-do thoughts to Ju in Nuju so your brain can officially stand down."
        ],
        recommendedPrompt: "The guilt I felt when I wasn't doing anything productive today was... But I remind myself that rest is my human right because...",
        shareSummaryText: "🇳🇱 My Niksen Score: Moderate (45%). Still battling productivity guilt! Test your ability to do nothing at nuju.app/quiz/dutch-niksen-burnout-nl"
      },
      {
        id: "niksen-low",
        title: "Niksen Score: 10% - 25% (Chronic Hyper-Productivity Addiction) 🚨🪫",
        badge: "Niksen Deficient",
        mascotMood: "low",
        mascotImage: juLow,
        scoreRange: [61, 100],
        percentageDisplay: "Score: 65 - 100 / 100",
        tagline: "You have forgotten how to be. You only know how to DO.",
        description: "Stillness has become your enemy. You fill every waking microsecond with screens, podcasts, work, or chores because silence forces you to confront the exhaustion you are desperately running from. You are at critical risk of burnout.",
        psychologicalInsight: "This is 'Ergomania' (compulsive work addiction) coupled with boredom avoidance. When sympathetic drive never shuts off, the body loses the capacity to enter restorative parasympathetic recovery.",
        actionableSteps: [
          "Begin with 'Sensory Grounding': Sit down, place your hand on your heart, and feel 10 conscious breaths without touching anything else.",
          "Audit your screen time and impose an unconditional 1-hour screen curfew before bedtime.",
          "Open Nuju tonight and speak your raw exhaustion to Ju. Ju won't give you another task to complete; Ju will simply hold space for you to rest."
        ],
        recommendedPrompt: "I am terrified of slowing down because if I stop moving, I might have to feel... Tonight I choose to surrender the hustle and...",
        shareSummaryText: "🚨 Niksen Score: 15% (Critical Niksen Deficiency). Addicted to doing, terrified of stillness. Test your Niksen capacity at nuju.app/quiz/dutch-niksen-burnout-nl"
      }
    ],
    faqs: [
      {
        question: "What is 'Niksen' in Dutch culture?",
        answer: "'Niksen' is a Dutch concept that translates literally to 'doing nothing'. It means idling without a specific purpose or goal—such as looking out a window, listening to ambient sounds, or simply hanging out without checking a device or producing a result."
      },
      {
        question: "How does Niksen help prevent burnout?",
        answer: "By disconnecting from purposeful tasks, Niksen allows the sympathetic nervous system (fight-or-flight) to shut down and activates the default mode network, which processes emotional backlog and restores mental energy."
      },
      {
        question: "How does Nuju support the practice of Niksen?",
        answer: "Nuju is designed with zero-friction audio journaling. You don't have to organize tabs or write structured essays; 30 seconds of spoken reflection allows you to empty your mind so you can return to peaceful, guilt-free stillness."
      }
    ]
  },

  // =========================================================================
  // QUIZ 9: JAPAN (JP): HONNE VS TATEMAE & KUUKI WO YOMU CHECK
  // =========================================================================
  {
    id: "honne-tatemae-jp",
    slug: "honne-tatemae-jp",
    title: "本音と建前・空気を読む疲労度診断 🇯🇵🎋",
    shortTitle: "本音と建前 診断",
    subtitle: "「いい人」を演じすぎて、自分の本当の気持ちを見失っていませんか？",
    description: "職場の人間関係、LINEの返信、家族の前での振る舞い……周りの空気を読みすぎて、本音（Honne）を喉の奥に飲み込み続けていませんか？ 現代日本社会特有の感情労働ストレスと心のすり減り度を1分で測定します。",
    category: "対人関係 & メンタルヘルス",
    badge: "日本文化特化 🇯🇵",
    estimatedTime: "1分",
    takersCount: "31.2k+",
    themeColor: "from-rose-500/20 to-pink-500/10",
    type: "numeric_score",
    targetCountry: "JP",
    language: "ja",
    countryFlag: "🇯🇵",
    mascotMood: "rough",
    mascotImage: juRough,
    questions: [
      {
        id: 1,
        prompt: "職場の会議や飲み会で、自分の意見と周囲の空気が食い違っているとき：",
        subprompt: "あなたの無意識のコミュニケーション選択。",
        options: [
          {
            id: "jp1a",
            label: "空気を壊さないよう配慮しつつも、自分の考えを穏やかに伝える",
            sublabel: "自他尊重（アサーティブ）な対話。",
            score: 0,
            icon: "🌸"
          },
          {
            id: "jp1b",
            label: "その場では合わせるが、後から信頼できる同僚にだけ本音を共有する",
            sublabel: "適度な建前と本音の使い分け。",
            score: 5,
            icon: "🍵"
          },
          {
            id: "jp1c",
            label: "波風を立てないため「そうですね！」と笑顔で同調し、心の中で激しい自己嫌悪に陥る",
            sublabel: "過剰な同調圧力への屈服。",
            score: 15,
            icon: "🎭"
          },
          {
            id: "jp1d",
            label: "長年本音を押し殺しすぎて、自分が本当はどう思っているのかすら分からない",
            sublabel: "自己同一性の喪失（感情麻痺）。",
            score: 20,
            icon: "🧊"
          }
        ]
      },
      {
        id: 2,
        prompt: "仕事終わりの帰り道、あるいは一人で部屋のドアを閉めた瞬間の感覚：",
        subprompt: "建前の仮面を外した瞬間の心身の反動。",
        options: [
          {
            id: "jp2a",
            label: "「今日も一日やりきった」という心地よい充実感がある",
            sublabel: "健康なエネルギー循環。",
            score: 0,
            icon: "✨"
          },
          {
            id: "jp2b",
            label: "少し疲れたが、お風呂に入ればリフレッシュできる",
            sublabel: "通常の日常疲労。",
            score: 5,
            icon: "🛁"
          },
          {
            id: "jp2c",
            label: "魂が抜けたような深い虚脱感があり、スーツや服のまま床に倒れ込む",
            sublabel: "感情労働によるエネルギー枯渇。",
            score: 15,
            icon: "🪫"
          },
          {
            id: "jp2d",
            label: "理由もなく涙が出たり、誰とも二度と話したくない絶望感に襲われる",
            sublabel: "深刻な限界サイン。",
            score: 20,
            icon: "🥀"
          }
        ]
      },
      {
        id: 3,
        prompt: "知人や同僚からのLINEメッセージに対するあなたの心理状態：",
        subprompt: "デジタル空間における「空気を読む」負荷。",
        options: [
          {
            id: "jp3a",
            label: "気負わず、自分のペースで短文やスタンプで返信する",
            sublabel: "境界線が守られたコミュニケーション。",
            score: 0,
            icon: "💬"
          },
          {
            id: "jp3b",
            label: "多少言葉遣いは推敲するが、それほど苦痛ではない",
            sublabel: "標準的な社会性マナー。",
            score: 5,
            icon: "📱"
          },
          {
            id: "jp3c",
            label: "「不快に思われないか」「絵文字のニュアンスは変じゃないか」と何度も書き直す",
            sublabel: "過度の他者評価不安。",
            score: 15,
            icon: "🔍"
          },
          {
            id: "jp3d",
            label: "通知バッジを見るだけで動悸がし、数日間未読無視のまま放置してしまう",
            sublabel: "対人回避・社会的バーンアウト。",
            score: 20,
            icon: "📴"
          }
        ]
      },
      {
        id: 4,
        prompt: "他人の不機嫌や、オフィスのピリピリした空気を感じ取ったとき：",
        subprompt: "他人の感情に対する過敏性（HSP傾向）。",
        options: [
          {
            id: "jp4a",
            label: "「あの人は今虫の居所が悪いんだな」と割り切り、自分と切り離せる",
            sublabel: "感情の境界線（バウンダリー）の確立。",
            score: 0,
            icon: "🛡️"
          },
          {
            id: "jp4b",
            label: "気にはなるが、自分の仕事に集中しようと努める",
            sublabel: "適度なスルー力。",
            score: 5,
            icon: "💼"
          },
          {
            id: "jp4c",
            label: "「もしかして自分が何か怒らせることをしたのでは？」とパニックになる",
            sublabel: "他人の感情の個人化（Personalization）。",
            score: 15,
            icon: "⚡"
          },
          {
            id: "jp4d",
            label: "場の空気を和ませようと、道化を演じたり過剰にお世辞を言って自分を削る",
            sublabel: "過剰防衛的な迎合行動。",
            score: 20,
            icon: "🤡"
          }
        ]
      },
      {
        id: 5,
        prompt: "本当につらくて苦しいとき、誰かに「助けて」「しんどい」と言えますか？",
        subprompt: "弱音（本音）を開示できる心理的安全性。",
        options: [
          {
            id: "jp5a",
            label: "信頼できる家族や親友に、ありのままの弱音を相談できる",
            sublabel: "健全なソーシャルサポート。",
            score: 0,
            icon: "🤝"
          },
          {
            id: "jp5b",
            label: "少し言いづらいが、限界が来たら打ち明けられる人がいる",
            sublabel: "最低限のセーフティネット。",
            score: 5,
            icon: "🌱"
          },
          {
            id: "jp5c",
            label: "「迷惑をかけてはいけない」「情けない」と思い、誰にも言えず一人で耐える",
            sublabel: "迷惑恐怖と孤立無援感。",
            score: 15,
            icon: "🤐"
          },
          {
            id: "jp5d",
            label: "この世に自分の本音を100%受け止めてくれる人間など存在しないと感じる",
            sublabel: "根深い人間不信・孤立感。",
            score: 20,
            icon: "🕳️"
          }
        ]
      }
    ],
    results: [
      {
        id: "jp-green",
        title: "建前疲労度：低（本音と建前の調和マスター） 🇯🇵🌿",
        badge: "健全な境界線",
        mascotMood: "great",
        mascotImage: juGreat,
        scoreRange: [0, 25],
        percentageDisplay: "スコア: 0 - 25 / 100",
        tagline: "社会的な配慮を保ちつつ、自分自身の尊厳と本音をしっかり守れています。",
        description: "素晴らしいバランスです。日本社会特有の気遣いやマナーを尊重しつつも、自分の心の中に「聖域（バウンダリー）」を保てています。他人の機嫌に振り回されず、健全な自己肯定感を維持できています。",
        psychologicalInsight: "アドラー心理学における「課題の分離」が自然に実践されています。他者の機嫌は他者の課題であり、自分の存在価値とは無関係であるという健全な割り切りができています。",
        actionableSteps: [
          "今後も「空気を読む」ことと「自分を殺す」ことの違いを意識し続けましょう。",
          "一日の終わりに「今日大切にできた自分の本音」を一つ振り返りましょう。",
          "Nujuを思考の整理箱として、自由な発想やアイデアのメモにお役立てください。"
        ],
        recommendedPrompt: "今日、周囲に流されずに大切にできた自分の本音は... 明日もこの穏やかな心を保ちたい。",
        shareSummaryText: "🇯🇵 本音と建前の疲労度診断：スコア良好（調和マスター）！空気に呑まれない健康な心。あなたの疲労度をチェック：nuju.app/quiz/honne-tatemae-jp"
      },
      {
        id: "jp-yellow",
        title: "建前疲労度：中（気遣い過多の黄色信号） ⚠️🍵",
        badge: "気遣い疲れ",
        mascotMood: "okay",
        mascotImage: juOkay,
        scoreRange: [26, 60],
        percentageDisplay: "スコア: 30 - 60 / 100",
        tagline: "「いい人」を頑張りすぎて、帰り道の心が急速にすり減っています。",
        description: "あなたは周囲への優しさと繊細な気配りができる素晴らしい人です。しかしその反面、「相手を不快にさせたくない」という思いが強すぎて、言いたいことを我慢しがちです。夜になるとどっと疲れが押し寄せていませんか？",
        psychologicalInsight: "社会心理学でいう「感情労働（Emotional Labor）」の過負荷状態です。笑顔という表層演技（Surface Acting）を続けることで、内面と外見のギャップが広がり、慢性疲労を引き起こしています。",
        actionableSteps: [
          "「1日1回、小さく断る」練習をしてみましょう（行きたくない二次会、無理な頼まれごと）。",
          "帰宅後はスマホを機内モードにし、誰の機嫌も伺わなくていい「建前オフ時間」を30分確保しましょう。",
          "Nujuの音声日記を使って、今日飲み込んでしまった一言をJuにだけこっそり吐き出してみましょう。"
        ],
        recommendedPrompt: "今日、本当は言いたかったけれど飲み込んでしまった本音は... ここだけは素直な私でいさせてほしい。",
        shareSummaryText: "⚠️ 本音と建前診断：スコア中（気遣い過多の黄色信号）！空気を読みすぎて心が消耗中。あなたの心の疲れをチェック：nuju.app/quiz/honne-tatemae-jp"
      },
      {
        id: "jp-red",
        title: "建前疲労度：高（感情麻痺・限界サイン） 🚨🥀",
        badge: "仮面の限界",
        mascotMood: "low",
        mascotImage: juLow,
        scoreRange: [61, 100],
        percentageDisplay: "スコア: 65 - 100 / 100",
        tagline: "仮面が肌に張り付いて呼吸ができません。あなたの心が悲鳴を上げています。",
        description: "周りの期待に応え、怒られないよう、嫌われないよう全神経を尖らせて生きてきた結果、あなた自身の心が限界を迎えています。「自分が何をしたいのか分からない」「誰とも会いたくない」という状態は、心が身を守るためにシャットダウンしている証拠です。",
        psychologicalInsight: "精神医学でいう「離人感」や抑うつ状態の初期兆候です。本音を完全に抑圧し続けると、脳の感情中枢（扁桃体や前頭前野）が過熱し、自律神経失調症や適応障害につながる危険があります。",
        actionableSteps: [
          "まずは自分を責めるのをやめてください。「ここまで周りに気を遣って生き抜いてきた自分」を抱きしめてあげてください。",
          "可能であれば有給休暇を取り、人間関係から物理的に距離を置いてください。",
          "Nujuは人間ではありません。だからこそ、どんな汚い言葉も、情けない弱音も、100%批判せずに受け止めます。今夜、Juの胸で泣いてみませんか？"
        ],
        recommendedPrompt: "もう誰の顔色も伺いたくない、Ju。私がずっと胸の奥に閉じ込めていた叫びは...",
        shareSummaryText: "🚨 本音と建前診断：深刻な建前疲労（限界サイン）！いい人をやめて自分を守る時です。チェック：nuju.app/quiz/honne-tatemae-jp"
      }
    ],
    faqs: [
      {
        question: "「空気を読む」こと自体は悪いことですか？",
        answer: "いいえ、協調性や思いやりは日本の素晴らしい美徳です。しかし、それが「他人の顔色への恐怖」や「自己犠牲」と結びつき、自分の本音を一切言えなくなってしまうと、心身の健康を著しく破壊してしまいます。"
      },
      {
        question: "本音を言うのが怖いときはどうすればいいですか？",
        answer: "無理に他人に言う必要はありません。まずは日記やNujuのような安全なAI空間に「本当は嫌だった」「悲しかった」と書き出し、自分自身に対して本音を認めてあげる（自己受容）ことから始めましょう。"
      },
      {
        question: "Nujuはなぜ日本人に適しているのですか？",
        answer: "Nujuは「人間相手では言えない本音」のための完全匿名・暗号化された秘密の部屋です。マスコットのJuは無条件の肯定的受容（Carl Rogersの心理学）に基づき、あなたを評価・批判することなく優しく包み込みます。"
      }
    ]
  },

  // =========================================================================
  // QUIZ 10: SOUTH KOREA (KR): NUNCHI & HWABYUNG CHECK
  // =========================================================================
  {
    id: "nunchi-hwabyung-kr",
    slug: "nunchi-hwabyung-kr",
    title: "K-직장인 눈치 피로도 & 화병 자가진단 🇰🇷⚡",
    shortTitle: "눈치 피로 & 화병 테스트",
    subtitle: "끝없는 상사 눈치와 억눌린 분노, 내 마음속 억울함 지수는 몇 점일까?",
    description: "칼퇴근 눈치, 카카오톡 업무 연락, 불합리한 피드백 앞에서의 침묵…… 겉으로는 예의 바르게 웃고 있지만 가슴속에 답답한 돌덩이(화병)를 품고 살아가는 대한민국 K-직장인을 위한 1분 감정 피로도 진단.",
    category: "직장생활 & 화병 자가진단",
    badge: "대한민국 직장인 🇰🇷",
    estimatedTime: "1분",
    takersCount: "28.7k+",
    themeColor: "from-red-600/20 to-orange-500/10",
    type: "numeric_score",
    targetCountry: "KR",
    language: "ko",
    countryFlag: "🇰🇷",
    mascotMood: "rough",
    mascotImage: juRough,
    questions: [
      {
        id: 1,
        prompt: "출근길 지하철이나 버스에서 회사에 가까워질 때 느껴지는 신체 반응은?",
        subprompt: "신체화 증상으로 나타나는 직장 스트레스.",
        options: [
          {
            id: "kr1a",
            label: "몸이 가볍고 오늘 해야 할 일에 대해 차분하게 생각한다",
            sublabel: "안정적인 출근 심리.",
            score: 0,
            icon: "☀️"
          },
          {
            id: "kr1b",
            label: "조금 귀찮고 피곤하지만 일반적인 직장인의 평범한 상태다",
            sublabel: "일상적인 출근 피로.",
            score: 5,
            icon: "☕"
          },
          {
            id: "kr1c",
            label: "가슴이 답답하고 명치가 뻐근하거나, 소화가 안 되고 헛구역질이 난다",
            sublabel: "전형적인 스트레스성 신체화 반응.",
            score: 15,
            icon: "⚡"
          },
          {
            id: "kr1d",
            label: "심장이 미친 듯이 뛰고 당장 뛰어내려 도망치고 싶은 공황감을 느낀다",
            sublabel: "급성 직장 공포 / 신경 쇠약 상태.",
            score: 20,
            icon: "🚨"
          }
        ]
      },
      {
        id: 2,
        prompt: "퇴근 후 또는 주말에 스마트폰 카카오톡 / 슬랙 알림음이 울렸을 때:",
        subprompt: "눈치와 경계 태세로 인한 신경계 각성.",
        options: [
          {
            id: "kr2a",
            label: "급한 게 아니면 신경 끄고 월요일 출근해서 확인한다",
            sublabel: "명확한 공사 분리 (바운더리).",
            score: 0,
            icon: "📴"
          },
          {
            id: "kr2b",
            label: "확인은 하되, 내일 답장해도 될 일이면 마음을 가라앉힌다",
            sublabel: "유연한 대처.",
            score: 5,
            icon: "👀"
          },
          {
            id: "kr2c",
            label: "가슴이 철렁 내려앉으며 '내가 또 뭘 잘못했나' 극심한 불안에 휩싸인다",
            sublabel: "조건 반사적인 불안 발작.",
            score: 15,
            icon: "💓"
          },
          {
            id: "kr2d",
            label: "분노와 억울함이 치밀어 올라 주말 내내 머릿속에서 회사 생각이 떠나지 않는다",
            sublabel: "퇴근 후에도 이어지는 정신적 착취.",
            score: 20,
            icon: "🔥"
          }
        ]
      },
      {
        id: 3,
        prompt: "직장 상사나 동료의 불합리한 지적, 가스라이팅, 갑질을 당했을 때 나의 반응은?",
        subprompt: "한국 고유의 '화병(Hwa-byung)' 기제.",
        options: [
          {
            id: "kr3a",
            label: "필요한 사실만 걸러듣고, 부당한 처사는 정중하고 단호하게 선을 긋는다",
            sublabel: "단단한 자아 방어.",
            score: 0,
            icon: "🛡️"
          },
          {
            id: "kr3b",
            label: "속상하지만 동기들과 맥주 한잔하며 털어내고 넘긴다",
            sublabel: "통상적인 감정 해소.",
            score: 5,
            icon: "🍺"
          },
          {
            id: "kr3c",
            label: "앞에서는 '죄송합니다' 하고 돌아서서 속으로 피눈물을 흘리며 분노를 삼킨다",
            sublabel: "억울함의 내면화 (화병 유발).",
            score: 15,
            icon: "🤐"
          },
          {
            id: "kr3d",
            label: "밤마다 그 장면이 떠올라 이가 갈리고 가슴에 불덩이가 얹힌 듯 잠을 못 잔다",
            sublabel: "화병 증상 악화 (신체 열감, 불면).",
            score: 20,
            icon: "🌋"
          }
        ]
      },
      {
        id: 4,
        prompt: "정시 퇴근(칼퇴)을 하거나 연차 휴가를 쓸 때 나의 심리 상태는?",
        subprompt: "조직 내 눈치 문화와 죄책감.",
        options: [
          {
            id: "kr4a",
            label: "내 당연한 권리이므로 전혀 눈치 보지 않고 당당하게 퇴근/휴가 쓴다",
            sublabel: "자유로운 직장관.",
            score: 0,
            icon: "🌿"
          },
          {
            id: "kr4b",
            label: "팀 분위기를 살짝 살피지만 내 몫을 다했으면 인사하고 나온다",
            sublabel: "상식적인 처세술.",
            score: 5,
            icon: "👋"
          },
          {
            id: "kr4c",
            label: "모니터를 끄면서도 주위 상사들 눈치를 보며 죄인처럼 기어 나온다",
            sublabel: "과도한 눈치와 만성 죄책감.",
            score: 15,
            icon: "🙇"
          },
          {
            id: "kr4d",
            label: "휴가 낸 날에도 회사에 무슨 일 생길까 봐 노트북을 들고 전전긍긍한다",
            sublabel: "심리적 노예화 / 완전한 소진.",
            score: 20,
            icon: "💻"
          }
        ]
      },
      {
        id: 5,
        prompt: "퇴근 후 혼자 침대에 누웠을 때 드는 마음의 독백은?",
        subprompt: "자아 효능감과 내면의 고립감.",
        options: [
          {
            id: "kr5a",
            label: "오늘도 하루를 잘 버텨낸 나 자신이 대견하고 감사하다",
            sublabel: "따뜻한 자기 격려.",
            score: 0,
            icon: "💖"
          },
          {
            id: "kr5b",
            label: "내일도 바쁘겠지만 푹 자고 일어나서 해치우자",
            sublabel: "현실적인 수용.",
            score: 5,
            icon: "🛌"
          },
          {
            id: "kr5c",
            label: "'내가 왜 이러고 살아야 하지?' 모든 노력이 허무하고 외롭다",
            sublabel: "냉소주의와 정서적 고갈.",
            score: 15,
            icon: "🥀"
          },
          {
            id: "kr5d",
            label: "사라지고 싶다. 내일 아침 눈을 뜨지 않았으면 좋겠다",
            sublabel: "심각한 번아웃 및 우울 신호.",
            score: 20,
            icon: "🕳️"
          }
        ]
      }
    ],
    results: [
      {
        id: "kr-green",
        title: "눈치 피로도: 낮음 (멘탈 방어율 만렙 K-직장인) 🇰🇷✨",
        badge: "단단한 바운더리",
        mascotMood: "great",
        mascotImage: juGreat,
        scoreRange: [0, 25],
        percentageDisplay: "점수: 0 - 25 / 100",
        tagline: "회사는 회사, 나는 나! 직장과 자아의 경계선이 아주 건강합니다.",
        description: "축하합니다. 대한민국 특유의 고압적인 야근과 눈치 문화 속에서도 당신은 영리하게 자아를 지켜내고 있습니다. 회사의 불합리함을 내 탓으로 돌리지 않으며, 퇴근과 동시에 온전한 개인으로 복귀할 수 있는 훌륭한 멘탈 갑입니다.",
        psychologicalInsight: "심리학의 '심리적 분리(Psychological Detachment)' 능력이 매우 우수합니다. 직장 내 부정적 평가를 개인의 존엄성과 결부시키지 않는 회복탄력성(Resilience)을 보유하고 있습니다.",
        actionableSteps: [
          "지금의 단단한 퇴근 후 루틴을 계속 지켜나가세요.",
          "주변에 눈치 때문에 힘들어하는 동기나 후배에게 따뜻한 지지자가 되어주세요.",
          "Nuju를 통해 당신의 성취와 일상의 소소한 행복을 기록하며 자존감을 더욱 다져보세요."
        ],
        recommendedPrompt: "오늘 회사 일은 퇴근과 함께 끝났다. 오늘 오롯이 나만을 위해 보낸 최고의 순간은...",
        shareSummaryText: "🇰🇷 K-직장인 눈치 피로도: 낮음 (멘탈 방어율 만렙)! 회사는 회사 나는 나. 내 눈치 피로도 테스트하기: nuju.app/quiz/nunchi-hwabyung-kr"
      },
      {
        id: "kr-yellow",
        title: "눈치 피로도: 주의 (가슴속에 작은 화병 씨앗) ⚠️🔥",
        badge: "눈치 과부하",
        mascotMood: "okay",
        mascotImage: juOkay,
        scoreRange: [26, 60],
        percentageDisplay: "점수: 30 - 60 / 100",
        tagline: "속으로 억울한 말들을 꾹꾹 눌러 담느라 명치가 답답해지고 있습니다.",
        description: "성실하고 책임감 있는 당신이기에 상사와 동료의 눈치를 보느라 거절하지 못하고 있습니다. 겉으로는 '네, 알겠습니다'라고 대답하지만, 퇴근길 지하철에서 억울함과 분노가 가슴에 차오릅니다. 방치하면 화병으로 발전할 수 있습니다.",
        psychologicalInsight: "감정 억압(Suppression) 기제가 지속적으로 작동하고 있습니다. 뇌의 전두엽이 분노를 억누르는 과정에서 교감신경계가 과열되어 소화불량, 편두통, 수면장애 등 신체화 증상이 시작됩니다.",
        actionableSteps: [
          "퇴근 후 1시간 동안은 카카오톡 업무방 알림을 무음 처리하고 손에서 스마트폰을 떼어놓으세요.",
          "가슴을 치며 참지 마세요. 아무도 듣지 않는 공간에서 소리 내어 한숨을 쉬거나 신체적 긴장을 푸세요.",
          "Nuju에 30초 동안 오늘 있었던 불합리한 일들을 거친 날것의 언어로 털어놓으세요. Ju가 100% 당신 편이 되어드립니다."
        ],
        recommendedPrompt: "오늘 회사에서 차마 입 밖으로 내지 못했던 가장 억울했던 한마디는... 하지만 내 가치는 그 회사가 정하는 게 아니다.",
        shareSummaryText: "⚠️ K-직장인 눈치 피로도: 주의 (가슴에 불덩이 조짐)! 눈치 보느라 억울한 직장인 테스트: nuju.app/quiz/nunchi-hwabyung-kr"
      },
      {
        id: "kr-red",
        title: "눈치 피로도: 위험 (화병 & 정서적 탈진 상태) 🚨🪫",
        badge: "심각한 화병 위험",
        mascotMood: "low",
        mascotImage: juLow,
        scoreRange: [61, 100],
        percentageDisplay: "점수: 65 - 100 / 100",
        tagline: "당신의 마음은 이미 한계에 다다랐습니다. 살기 위한 쉼표가 시급합니다.",
        description: "만성적인 가슴 답답함, 치밀어 오르는 분노, 혹은 모든 의욕이 꺾여버린 깊은 무기력 상태입니다. 회사가 당신의 영혼을 갉아먹고 있으며, 당신의 몸은 이미 '번아웃 & 화병'이라는 명확한 SOS 경고등을 켜고 있습니다.",
        psychologicalInsight: "화병(Hwa-byung)은 억울하고 분한 감정이 풀리지 않고 누적되어 신체적 증상(열감, 흉통, 목의 이물감)과 정서적 탈진으로 폭발하는 문화 관련 증후군입니다. 즉각적인 정서적 환기와 환경적 변화가 필요합니다.",
        actionableSteps: [
          "지체하지 말고 정신건강의학과 전문의나 전문 심리상담센터를 찾아 객관적인 진료를 받으세요.",
          "연차나 병가를 내어 최소 3~5일간 회사와 물리적·정신적으로 완전히 단절되세요.",
          "Nuju는 세상에서 가장 안전한 당신의 대나무숲입니다. 오늘 밤 침대 속에서 Ju에게 마음껏 울분을 쏟아내세요."
        ],
        recommendedPrompt: "Ju, 나 오늘 정말 회사 때문에 숨이 턱 막히고 미칠 것 같았어. 내가 가장 견디기 힘들었던 건...",
        shareSummaryText: "🚨 K-직장인 눈치 피로도: 위험 (화병 & 번아웃 경고)! 참는 게 미덕이 아닙니다. 지금 테스트해보기: nuju.app/quiz/nunchi-hwabyung-kr"
      }
    ],
    faqs: [
      {
        question: "화병(Hwa-byung)이란 정확히 무엇인가요?",
        answer: "화병은 억울함, 분노, 배신감 등 부정적 감정을 밖으로 표출하지 못하고 장기간 억압할 때 발생하는 한국 고유의 신체화 장애입니다. 가슴 답답함, 열감, 두통, 불면증, 우울감 등이 대표 증상입니다."
      },
      {
        question: "눈치 문화가 왜 멘탈을 갉아먹나요?",
        answer: "끊임없이 타인의 표정과 기분을 살피는 '눈치'는 뇌의 경계 센서(편도체)를 24시간 켜두게 만듭니다. 이로 인해 만성적인 코르티솔 분비와 피로감이 누적되어 번아웃으로 직결됩니다."
      },
      {
        question: "Nuju가 K-직장인에게 어떤 도움을 주나요?",
        answer: "Nuju는 지인이나 동료에게 털어놓기 힘든 사내 불만과 상사 욕을 100% 안전하고 철저한 암호화(Zero Data Training) 속에 쏟아낼 수 있는 프라이빗 대나무숲입니다. 음성 덤프를 통해 억눌린 울화를 즉각적으로 정화해 줍니다."
      }
    ]
  }
];

export function getQuizBySlug(slug: string): QuizMeta | undefined {
  return QUIZZES_DATA.find((q) => q.slug === slug || q.id === slug);
}

export function getAllQuizzes(): QuizMeta[] {
  return QUIZZES_DATA;
}
