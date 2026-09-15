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
  }
];

export function getQuizBySlug(slug: string): QuizMeta | undefined {
  return QUIZZES_DATA.find((q) => q.slug === slug || q.id === slug);
}

export function getAllQuizzes(): QuizMeta[] {
  return QUIZZES_DATA;
}
