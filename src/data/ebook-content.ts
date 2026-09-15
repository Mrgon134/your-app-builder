import juMain from "@/assets/ju-main.webp";
import juGood from "@/assets/ju-good.webp";
import juOkay from "@/assets/ju-okay.webp";
import juRough from "@/assets/ju-rough.webp";
import juGreat from "@/assets/ju-great.webp";

export interface EbookChapter {
  id: string;
  chapterNumber: number;
  part: string;
  title: string;
  subtitle: string;
  readingTimeMinutes: number;
  content: string[];
  keyTakeaways: string[];
  actionableExercise?: {
    title: string;
    instructions: string[];
    samplePrompt: string;
  };
}

export interface EbookDailyPrompt {
  day: number;
  theme: string;
  category: "Kesadaran Diri" | "Regulasi Cemas" | "Hubungan & Batasan" | "Penerimaan Diri";
  prompt: string;
  juInsight: string;
  groundingMantra: string;
}

export interface EbookMetadata {
  title: string;
  subtitle: string;
  edition: string;
  publishedYear: number;
  publisher: string;
  authors: string[];
  pageCountApprox: number;
  coverImage: string;
  discountVoucherCode: string;
}

export const EBOOK_METADATA: EbookMetadata = {
  title: "Berdamai dengan Pikiran Sendiri",
  subtitle: "30 Hari Terapi Overthinking, Regulasi Cemas, & Jurnal Rilis Emosi",
  edition: "Edisi Digital Interaktif 2026",
  publishedYear: 2026,
  publisher: "Nuju Mental Wellbeing Press",
  authors: ["Nuju Self-Reflection Lab", "Tim Konselor CBT Nuju"],
  pageCountApprox: 138,
  coverImage: juMain,
  discountVoucherCode: "BERDAMAI2026",
};

export const EBOOK_CHAPTERS: EbookChapter[] = [
  {
    id: "bab-1-amigdala-panik",
    chapterNumber: 1,
    part: "BAGIAN 1: SAINS EMOSI & ANATOMI OVERTHINKING",
    title: "Mengapa Otak Kita Selalu Membayangkan Skenario Terburuk?",
    subtitle: "Mengenal amigdala primitif yang mengira email atasan adalah harimau bertaring panjang.",
    readingTimeMinutes: 7,
    content: [
      "Pernahkah kamu terbangun jam 2 pagi karena tiba-tiba teringat satu kalimat canggung yang kamu ucapkan dalam rapat tiga hari yang lalu?",
      "Atau mungkin kamu baru saja menerima pesan dari bos: 'Bisa ngobrol sebentar besok pagi?', dan dalam lima detik lambungmu melilit, jantungmu berdegup kencang, dan otakmu langsung merancang skenario kamu dipecat dan jatuh miskin?",
      "Selamat datang di alam pikiran manusia modern. Kamu tidak gila, dan kamu bukan orang lemah. Otakmu hanya sedang menjalankan algoritma purba yang berusia 200.000 tahun.",
      "Di dalam pusat limbik otakmu terdapat struktur seukuran biji almond bernama **amigdala**. Tugas amigdala di zaman berburu adalah mendeteksi bahaya mematikan. Nenek moyang kita yang santai dan mengira gemerisik semak-semak adalah angin sepoi-sepoi sudah punah dimakan predator. Nenek moyang kita yang hidup—dan mewariskan gen ke kita—adalah mereka yang selalu mengasumsikan bahaya terburuk.",
      "Masalahnya: di tahun 2026, bahaya kita bukan lagi singa, melainkan deadline, tagihan cicilan, perbandingan pencapaian di Instagram, dan ketidakpastian karier. Namun amigdala tidak bisa membedakan antara ancaman fisik nyata dan ancaman psikologis abstrak. Reaksi hormonalnya tetap sama: menyemburkan kortisol dan adrenalin.",
      "Langkah pertama untuk berhenti membenci dirimu sendiri adalah menyadari: **Overthinking bukan kelemahan moral, melainkan mekanisme perlindungan diri yang bekerja terlalu keras (over-functioning).**"
    ],
    keyTakeaways: [
      "Amigdala dirancang untuk mendeteksi bahaya demi bertahan hidup, bukan untuk membuatmu bahagia.",
      "Otak memproduksi pikiran negatif otomatis sebagai alarm pencegahan, bukan fakta mutlak.",
      "Menyadari bahwa otakmu sedang panik adalah 50% dari proses ketenangan."
    ],
    actionableExercise: {
      title: "Latihan 'Beri Nama si Alarm' (Affect Labeling)",
      instructions: [
        "Ketika kepalamu mulai merangkai skenario terburuk, letakkan tangan di dada.",
        "Katakan dalam hati: 'Terima kasih amigdala, aku tahu kamu ingin melindungiku. Tapi saat ini aku aman di tempat tidur.'",
        "Ambil napas panjang 4 detik lewat hidung, hembuskan 7 detik lewat mulut secara perlahan."
      ],
      samplePrompt: "Hal terburuk apa yang sedang ditakutkan otakku malam ini, dan seberapa realistis ketakutan itu jika dilihat 6 bulan dari sekarang?"
    }
  },
  {
    id: "bab-2-default-mode-network",
    chapterNumber: 2,
    part: "BAGIAN 1: SAINS EMOSI & ANATOMI OVERTHINKING",
    title: "Default Mode Network: Otak Pengelana yang Lupa Berhenti",
    subtitle: "Misteri kenapa pikiran justru paling ribut saat tubuh kita mencoba istirahat.",
    readingTimeMinutes: 8,
    content: [
      "Banyak orang heran: kenapa saat seharian sibuk bekerja mereka merasa baik-baik saja, tetapi begitu berbaring di kasur dan mematikan lampu, kepala mereka langsung dipenuhi penyesalan masa lalu dan kecemasan masa depan?",
      "Neurosains menemukan jawabannya pada tahun 2001: jaringan sirkuit otak bernama **Default Mode Network (DMN)**.",
      "Ketika kamu fokus pada tugas aktif (mengetik laporan, mengemudi, menghitung angka), jaringan konsentrasi otakmu (Task-Positive Network) menyala, dan DMN mati. Namun, begitu kamu berhenti beraktivitas—saat rebahan, mandi, atau melamun—DMN otomatis aktif kembali.",
      "DMN adalah pusat narasi diri (*self-referential thinking*). Fungsinya merangkai cerita: 'Siapa aku? Bagaimana reputasiku? Apa yang salah kemarin? Bagaimana caraku tidak gagal besok?'.",
      "Pada orang dengan kecemasan tinggi, DMN mengalami hiper-konektivitas (*hyperactive DMN*). Otak terjebak dalam siklus ruminasi tanpa tombol jeda.",
      "Satu-satunya cara menurunkan aktivitas DMN tanpa obat-obatan keras adalah dengan memindahkan fokus ke sensasi sensorik tubuh saat ini (*sensory grounding*) atau menuangkan narasi liar tersebut ke atas kertas/layar (journaling)."
    ],
    keyTakeaways: [
      "Pikiran malam hari yang berisik adalah aktivitas alami Default Mode Network (DMN).",
      "Jangan mencoba 'melawan' pikiran kosong dengan memaksakan pikiran positif; alihkan ke pencatatan.",
      "Menuangkan pikiran ke jurnal memindahkan beban memori kerja (*working memory offload*) sehingga otak bisa tidur."
    ]
  },
  {
    id: "bab-3-cognitive-defusion",
    chapterNumber: 3,
    part: "BAGIAN 2: SENJATA CBT & STOIKISME",
    title: "Teknik Cognitive Defusion: Kamu Adalah Langit, Pikiranmu Hanyalah Cuaca",
    subtitle: "Cara memisahkan identitas dirimu dari narasi negatif yang diputar di kepala.",
    readingTimeMinutes: 9,
    content: [
      "Sebagian besar penderitaan batin bukan berasal dari kenyataan itu sendiri, melainkan dari keyakinan kita bahwa setiap pikiran yang lewat di kepala adalah kebenaran mutlak.",
      "Dalam terapi Acceptance and Commitment Therapy (ACT) dan CBT modern, kondisi ini disebut **Cognitive Fusion** (keterikatan kognitif). Kita melebur dengan pikiran kita: ketika otak berkata 'Aku tidak berharga', kita langsung percaya bahwa kita benar-benar sampah.",
      "Lawan dari fusi adalah **Cognitive Defusion**—kemampuan untuk mundur satu langkah dan menyaksikan pikiran kita sebagai sekadar objek mental yang melintas.",
      "Bayangkan kamu sedang duduk di tepi rel kereta api. Pikiran-pikiranmu adalah gerbong kereta yang lewat berdentum-dentum. Orang yang fusi akan melompat ke atas gerbong kereta yang melaju kencang menuju jurang panik. Orang yang defusi akan duduk tenang di peron dan berkata: *'Oh, ada kereta bernama Rasa Cemas lewat. Menarik, tapi aku tidak perlu naik.'*",
      "Gunakan rumus bahasa ajaib ini: Ubah kalimat *'Aku payah'* menjadi *'Aku menyadari bahwa otakku sedang memproduksi pikiran bahwa aku payah.'* Perubahan satu kalimat ini menciptakan ruang psikologis yang melegakan."
    ],
    keyTakeaways: [
      "Pikiran adalah peristiwa kognitif sementara, bukan ramalan masa depan atau vonis kebenaran.",
      "Kamu adalah pengamat pikiran, bukan isi pikiranmu itu sendiri.",
      "Memberi jarak bahasa ('Aku menyadari ada pikiran...') menurunkan reaktivitas emosi seketika."
    ],
    actionableExercise: {
      title: "Latihan 'Daun di Atas Sungai' (Leaves on a Stream)",
      instructions: [
        "Tutup matamu selama 2 menit. Bayangkan sebuah sungai jernih berarus tenang dengan daun-daun maple berguguran di atasnya.",
        "Setiap kali satu pikiran muncul (misal: 'Besok kerjaan numpuk'), letakkan kalimat itu di atas sehelai daun.",
        "Saksikan daun itu mengapung pelan terbawa arus air hingga menjauh dari pandanganmu.",
        "Jika pikiran yang sama muncul lagi, letakkan di daun berikutnya. Jangan dorong, jangan tahan. Biarkan mengalir."
      ],
      samplePrompt: "Pikiran berulang apa yang paling sering menyamar sebagai fakta dalam hidupku minggu ini?"
    }
  },
  {
    id: "bab-4-dikotomi-kendali",
    chapterNumber: 4,
    part: "BAGIAN 2: SENJATA CBT & STOIKISME",
    title: "Dikotomi Kendali Epictetus: Mengeliminasi Beban yang Bukan Hakmu",
    subtitle: "Filosofi kuno berusia 2.000 tahun yang menjadi pondasi psikoterapi modern.",
    readingTimeMinutes: 9,
    content: [
      "Hampir 2.000 tahun yang lalu di Yunani kuno, seorang mantan budak bernama Epictetus membuka bukunya *Enchiridion* dengan kalimat paling revolusioner dalam sejarah kesehatan mental: **'Ada hal-hal yang berada di bawah kendali kita, dan ada hal-hal yang tidak berada di bawah kendali kita.'**",
      "Pikirkan baik-baik: Berapa banyak energimu yang habis untuk mencemaskan hal-hal berikut?",
      "1. Apakah orang lain menyukai caraku berbicara?",
      "2. Apakah perekonomian nasional akan membaik?",
      "3. Apakah pasangan atau teman akan mengecewakanku?",
      "4. Apakah cuaca esok hari akan cerah?",
      "Semua hal di atas berada di luar kendali mutlakmu. Ketika kamu menggantungkan ketenangan batinmu pada hal yang tidak bisa kamu kendalikan, kamu secara sukarela menyerahkan kunci kedamaianmu ke tangan orang asing dan nasib acak.",
      "Yang berada di bawah kendalimu HANYALAH: niatmu, usahamu, reaksimu, prinsip moralmu, dan bagaimana kamu merespons luka. Begitu kamu menarik garis tegas ini, 80% overthinking-mu gugur seketika."
    ],
    keyTakeaways: [
      "Pisahkan lingkaran perhatian (Circle of Concern) dari lingkaran kendali (Circle of Influence).",
      "Fokus pada proses dan usaha pribadi, lepaskan keterikatan pada hasil akhir yang ditentukan orang lain.",
      "Ketenangan sejati bukan ketiadaan masalah, melainkan kepastian atas apa yang pantas kamu urusi."
    ]
  },
  {
    id: "bab-5-audit-pikiran",
    chapterNumber: 5,
    part: "BAGIAN 2: SENJATA CBT & STOIKISME",
    title: "The 5-Minute Thought Audit: Mengadili Pikiran Negatif Otomatis (NATs)",
    subtitle: "Metode persidangan mental untuk membongkar distorsi kognitif Dr. Aaron Beck.",
    readingTimeMinutes: 8,
    content: [
      "Ketika pikiran buruk menyerang, jangan telan mentah-mentah. Bawa pikiran itu ke 'ruang sidang mental'.",
      "Dalam terapi CBT klasik, pikiran otomatis yang merusak disebut NATs (*Negative Automatic Thoughts*). NATs memiliki trik kotor: ia selalu membesar-besarkan risiko (*catastrophizing*) dan mengecilkan kemampuan bertaharmu (*underestimating resilience*).",
      "Untuk melawannya, ajukan 4 pertanyaan jaksa penuntut berikut:",
      "1. **Mana Bukti Nyatanya?** Apa bukti obyektif yang mendukung pikiran ini, dan apa bukti yang membantahnya?",
      "2. **Apakah Ada Penjelasan Alternatif?** Jika temanku tidak membalas chat selama 4 jam, apakah karena dia membenciku, atau karena dia sedang sibuk di jalan?",
      "3. **What's the Worst That Could Happen?** Jika skenario terburuk benar-benar terjadi, bisakah aku bertahan hidup? Apa rencana mitigasi 24 jam pertamaku?",
      "4. **Nasihat untuk Sahabat:** Jika sahabat terbaikmu datang dan menceritakan kekhawatiran yang sama, apakah kamu akan menghakiminya sekejam kamu menghakimi dirimu sendiri?"
    ],
    keyTakeaways: [
      "Gunakan 'Thought Audit' setiap kali merasakan lonjakan kecemasan mendadak.",
      "Bedakan antara kemungkinan teoritis (bisa saja terjadi) dan probabilitas nyata (kemungkinan besar tidak terjadi).",
      "Terapkan welas asih diri (*self-compassion*)—bicaralah pada dirimu seperti berbicara pada teman terluka."
    ]
  },
  {
    id: "bab-6-protokol-darurat-jam-2-pagi",
    chapterNumber: 6,
    part: "BAGIAN 4: PROTOKOL DARURAT JAM 2 PAGI",
    title: "Protokol Darurat Jam 2 Pagi: Reset Sistem Saraf dalam 90 Detik",
    subtitle: "Teknik Physiological Sigh Dr. Andrew Huberman & Grounding 5-4-3-2-1.",
    readingTimeMinutes: 7,
    content: [
      "Ketika kamu panik di tengah malam, kamu tidak bisa 'berpikir' keluar dari kepanikan. Mengapa? Karena saat amigdala membakar hormon stres, korteks prefrontal (otak logismu) sedang offline.",
      "Kamu harus menggunakan **jalur somatik (tubuh) untuk menenangkan otak**, bukan sebaliknya.",
      "Teknik tercepat yang terbukti secara klinis di Stanford Medicine adalah **Physiological Sigh**:",
      "1. Tarik napas dalam melalui hidung selama 3 detik.",
      "2. Tanpa membuang napas, tarik napas tajam sekali lagi di puncak paru-paru untuk mengembangkan alveoli yang kempis.",
      "3. Hembuskan napas panjang dan mendesah lewat mulut secara perlahan selama 6 sampai 8 detik.",
      "Ulangi 3 kali. Hembusan napas yang lebih panjang daripada tarikan napas merangsang saraf vagus (*vagus nerve*), yang memerintahkan nodus sinoatrial jantung untuk memperlambat detak nadi seketika.",
      "Jika pikiranmu masih melayang, lanjutkan dengan teknik **5-4-3-2-1 Grounding**: Sebutkan 5 benda yang kamu lihat di kamar temaram, raba 4 tekstur selimut/kulitmu, dengarkan 3 suara samar, cium 2 aroma di udara, dan rasakan 1 rasa di lidahmu."
    ],
    keyTakeaways: [
      "Gunakan tubuh untuk menenangkan pikiran, bukan mendebat pikiran dengan logika saat panik.",
      "Teknik Physiological Sigh menurunkan detak jantung secara instan dalam 3 repetisi.",
      "Grounding sensorik 5-4-3-2-1 memaksa otak kembali ke realitas fisik saat ini."
    ]
  }
];

export const EBOOK_DAILY_PROMPTS: EbookDailyPrompt[] = [
  {
    day: 1,
    theme: "Membongkar Beban Tersembunyi",
    category: "Kesadaran Diri",
    prompt: "Jika tubuhku bisa berbicara jujur malam ini tanpa perlu pura-pura kuat, bagian mana yang terasa paling lelah dan apa yang ia butuhkan?",
    juInsight: "Kelelahan emosional sering kali menyamar sebagai pegal di leher, pundak kaku, atau rahang yang mengatup rapat tanpa sadar.",
    groundingMantra: "Aku aman meletakkan beban ini malam ini. Hari esok punya waktunya sendiri."
  },
  {
    day: 2,
    theme: "Menamai si Suara Kritis",
    category: "Regulasi Cemas",
    prompt: "Kalimat paling kejam apa yang sering dikatakan suara di kepalaku hari ini, dan dari mana asal suara itu pertama kali kudengar?",
    juInsight: "Sering kali suara kritik di kepala kita bukan suara asli kita, melainkan gema dari ekspektasi orang tua, guru masa kecil, atau atasan yang menuntut kesempurnaan.",
    groundingMantra: "Aku bukan suara kritik di kepalaku. Aku adalah orang yang mendengarkannya."
  },
  {
    day: 3,
    theme: "Filter Dikotomi Kendali",
    category: "Regulasi Cemas",
    prompt: "Tuliskan 3 hal yang membuatmu cemas hari ini. Kelompokkan ke dalam dua kolom: 'Bisa Kukendalikan' vs 'Di Luar Kuasaku'.",
    juInsight: "Mencemaskan hal yang tidak bisa dikendalikan sama seperti memegang bara api berharap orang lain yang terbakar.",
    groundingMantra: "Aku melepaskan apa yang tidak bisa kuubah, dan mencurahkan energiku pada tindakanku saat ini."
  },
  {
    day: 4,
    theme: "Validasi Lelah Tanpa Rasa Bersalah",
    category: "Penerimaan Diri",
    prompt: "Kenapa aku merasa harus selalu produktif untuk merasa berharga? Apa yang terjadi jika hari ini aku sekadar bernapas?",
    juInsight: "Nilai dirimu sebagai manusia tidak ditentukan oleh checklist tugas yang kamu centang hari ini.",
    groundingMantra: "Istirahat adalah hak biologisku, bukan hadiah yang harus kudapatkan dengan menyiksa diri."
  },
  {
    day: 5,
    theme: "Menyentuh Luka Penolakan",
    category: "Hubungan & Batasan",
    prompt: "Pernahkah aku mengubah kepribadianku demi disukai orang lain? Apa harga batin yang harus kubayar untuk itu?",
    juInsight: "Disukai semua orang adalah tujuan mustahil. Lebih baik ditolak karena menjadi diri sendiri daripada dipuji karena menjadi orang lain.",
    groundingMantra: "Aku tidak membutuhkan persetujuan semua orang untuk merasa utuh."
  },
  {
    day: 6,
    theme: "Audit Energi Sosial",
    category: "Hubungan & Batasan",
    prompt: "Interaksi mana minggu ini yang membuat bateraiku terkuras habis, dan interaksi mana yang membuat jiwaku merasa hangat?",
    juInsight: "Batasan emosi bukan tembok untuk mengurung diri, melainkan pintu gerbang untuk menyaring siapa yang berhak masuk.",
    groundingMantra: "Berkata 'tidak' pada hal yang menguras energiku adalah berkata 'ya' pada kesehatan mentalku."
  },
  {
    day: 7,
    theme: "Refleksi Minggu Pertama: Kemenangan Kecil",
    category: "Kesadaran Diri",
    prompt: "Satu hal kecil apa yang berhasil kulewati minggu ini meskipun rasanya sangat berat saat menghadapinya?",
    juInsight: "Keberanian tidak selalu berteriak lantang. Terkadang keberanian adalah suara lirih di ujung hari yang berbisik: 'Aku akan coba lagi besok.'",
    groundingMantra: "Aku lebih tangguh daripada yang kukira. Aku sudah membuktikannya berkali-kali."
  },
  {
    day: 8,
    theme: "Pola Catastrophizing",
    category: "Regulasi Cemas",
    prompt: "Skenario terburuk apa yang sedang kuputar berulang-ulang di kepala? Berapa persentase kemungkinan riil hal itu terjadi dalam kenyataan?",
    juInsight: "Otak manusia dirancang untuk bertahan hidup, bukan untuk bahagia. Amigdala cenderung memperbesar risiko 10x lipat dari kenyataannya.",
    groundingMantra: "Pikiranku adalah pembuat hipotesis, bukan peramal masa depan."
  },
  {
    day: 9,
    theme: "Tubuh Menyimpan Memori Emosi",
    category: "Kesadaran Diri",
    prompt: "Tutup mata sejenak, rasakan bahu, rahang, dan perutmu. Di bagian mana tubuhmu menahan tegang hari ini, dan apa yang ingin dikatakannya?",
    juInsight: "Emosi yang tidak diungkapkan lewat kata-kata akan berteriak lewat sensasi fisik: lambung perih, bahu tegang, atau insomnia.",
    groundingMantra: "Aku mengizinkan tubuhku rileks. Bahaya itu sudah berlalu."
  },
  {
    day: 10,
    theme: "Jebakan Perbandingan Sosial",
    category: "Penerimaan Diri",
    prompt: "Melihat kehidupan siapa di media sosial yang membuatku merasa tertinggal atau gagal? Apa ilusi yang sedang kupercaya dari layar itu?",
    juInsight: "Jangan bandingkan highlight reel orang lain dengan adegan di balik layar hidupmu yang berantakan.",
    groundingMantra: "Linimasa hidupku unik. Aku bergerak dengan kecepatanku sendiri."
  },
  {
    day: 11,
    theme: "Ekspektasi Tak Terucap",
    category: "Hubungan & Batasan",
    prompt: "Apakah aku sedang kesal pada seseorang karena mereka tidak memperlakukanku seperti harapanku, padahal aku tak pernah menyampaikannya secara jujur?",
    juInsight: "Orang lain tidak punya indra keenam untuk membaca pikiranmu. Ekspektasi tanpa komunikasi adalah resep kepahitan.",
    groundingMantra: "Aku berhak mengutarakan kebutuhanku dengan tenang dan jelas."
  },
  {
    day: 12,
    theme: "Melepaskan Kebutuhan Mengontrol Masa Depan",
    category: "Regulasi Cemas",
    prompt: "Jika aku tahu bahwa 5 tahun lagi segalanya akan baik-baik saja, apa yang akan kulakukan berbeda hari ini?",
    juInsight: "Ketidakpastian bukan musuh, melainkan ruang kosong di mana kemungkinan baru bisa bertumbuh.",
    groundingMantra: "Aku percaya pada kemampuanku menyelesaikan masalah saat waktunya tiba."
  },
  {
    day: 13,
    theme: "Memaafkan Versi Diri Masa Lalu",
    category: "Penerimaan Diri",
    prompt: "Keputusan masa lalu apa yang masih kusesali? Bisakah aku memandang diriku saat itu sebagai seseorang yang hanya berusaha bertahan dengan pengetahuan terbatasnya?",
    juInsight: "Kamu mengambil keputusan terbaik yang bisa kamu buat dengan kapasitas mental dan emosional yang kamu miliki saat itu.",
    groundingMantra: "Aku memaafkan diriku di masa lalu. Dia membawaku bertahan sampai hari ini."
  },
  {
    day: 14,
    theme: "Refleksi Minggu Kedua: Menakar Beban",
    category: "Kesadaran Diri",
    prompt: "Beban apa yang selama ini kubawa ke mana-mana yang sebenarnya bukan milikku untuk diselesaikan?",
    juInsight: "Kamu bertanggung jawab atas kebahagiaanmu sendiri, tetapi bukan penanggung jawab utama emosi seluruh dunia di sekitarmu.",
    groundingMantra: "Aku meletakkan beban yang bukan milikku."
  },
  {
    day: 15,
    theme: "Eksplorasi Rasa Malu (Shame vs Guilt)",
    category: "Penerimaan Diri",
    prompt: "Apakah aku merasa 'telah berbuat salah' (guilt) atau merasa 'aku orang yang salah dan rusak' (shame)? Apa bedanya dalam caraku memperlakukan diri?",
    juInsight: "Rasa bersalah berkata 'aku berbuat keliru'. Rasa malu berkata 'aku orang cacat'. Jangan biarkan satu kesalahan mendefinisikan identitasmu.",
    groundingMantra: "Aku manusia yang bisa keliru, tetapi keberadaanku selalu berharga."
  },
  {
    day: 16,
    theme: "Seni Mengatakan 'Tidak'",
    category: "Hubungan & Batasan",
    prompt: "Permintaan atau ajakan apa yang sebenarnya ingin kutolak minggu ini? Apa hal terburuk yang terjadi jika aku menolaknya dengan sopan?",
    juInsight: "Setiap kali kamu memaksakan diri berkata 'ya' demi menyenangkan orang lain, kamu sedang berkata 'tidak' pada kedamaianmu sendiri.",
    groundingMantra: "Batasan yang sehat adalah bentuk penghormatan pada diri dan orang lain."
  },
  {
    day: 17,
    theme: "Meredam Perfeksionisme Toksik",
    category: "Regulasi Cemas",
    prompt: "Tugas apa yang sedang kutunda-tunda karena takut hasilnya tidak sempurna? Bagaimana jika targetku hari ini hanyalah 'cukup baik dan selesai'?",
    juInsight: "Done is better than perfect. Perfeksionisme sering kali hanyalah ketakutan akan kritik yang memakai topeng ambisi.",
    groundingMantra: "Karya yang tidak sempurna tetap bernilai. Kemajuan lebih utama daripada kesempurnaan."
  },
  {
    day: 18,
    theme: "Menemukan Jangkar Kedamaian",
    category: "Kesadaran Diri",
    prompt: "Tempat, aroma, lagu, atau aktivitas apa yang selalu berhasil membuat nafasku terasa lebih lambat dan hatiku lebih teduh?",
    juInsight: "Otak butuh pulau-pulau kecil ketenangan di tengah lautan rutinitas. Jadwalkan waktu untuk jangkarmu hari ini.",
    groundingMantra: "Ketenangan adalah rumah yang selalu bisa kukunjungi kembali di dalam dadaku."
  },
  {
    day: 19,
    theme: "Membongkar Keyakinan 'Harus'",
    category: "Regulasi Cemas",
    prompt: "Apa saja daftar 'aku harus...' yang membebani hariku? Ganti kata 'harus' menjadi 'aku memilih untuk...' dan rasakan pergeseran kekuatannya.",
    juInsight: "Kata 'harus' menciptakan tekanan eksternal. Kata 'memilih' mengembalikan kedaulatan dirimu sebagai pemilik hidup.",
    groundingMantra: "Aku memiliki kebebasan memilih bagaimana merespons duniaku."
  },
  {
    day: 20,
    theme: "Merayakan Sisi Rentan",
    category: "Penerimaan Diri",
    prompt: "Kapan terakhir kali aku menangis atau memperlihatkan rasa rapuhku kepada seseorang? Apa yang kurasakan setelahnya?",
    juInsight: "Kerentanan bukanlah tanda kelemahan, melainkan ukuran paling akurat dari keberanian emosional kita.",
    groundingMantra: "Menjadi rapuh adalah bagian dari menjadi manusia yang hidup dan merasa."
  },
  {
    day: 21,
    theme: "Refleksi Minggu Ketiga: Peta Transformasi",
    category: "Kesadaran Diri",
    prompt: "Perubahan pola pikir apa yang paling terasa dalam 21 hari terakhir ini saat badai emosi atau kekacauan pikiran datang?",
    juInsight: "Kamu mungkin belum terbebas sepenuhnya dari rasa cemas, tetapi jeda antara pemicu dan reaksimu kini semakin lebar dan tenang.",
    groundingMantra: "Setiap tarikan nafas sadar adalah langkah maju menuju kebebasan batin."
  },
  {
    day: 22,
    theme: "Menyapa Inner Child",
    category: "Penerimaan Diri",
    prompt: "Jika anak kecil di dalam dirimu (usia 7-10 tahun) berdiri di depanmu sekarang, pelukan dan kalimat apa yang paling ia rindukan untuk didengar?",
    juInsight: "Sering kali bagian yang paling cemas di dalam diri kita adalah anak kecil yang dulu merasa tidak aman atau tidak didengar.",
    groundingMantra: "Aku di sini sekarang. Kamu aman bersamaku."
  },
  {
    day: 23,
    theme: "Hubungan Resiprokal",
    category: "Hubungan & Batasan",
    prompt: "Siapa orang-orang yang ketika aku selesai berbicara dengan mereka, energiku terasa terisi kembali? Apakah aku sudah cukup merawat hubungan itu?",
    juInsight: "Hubungan yang sehat adalah tempat berteduh, bukan arena ujian yang menuntut pembuktian terus-menerus.",
    groundingMantra: "Aku menyirami benih pertemanan yang saling mendukung dan tulus."
  },
  {
    day: 24,
    theme: "De-identifikasi Pikiran Negatif",
    category: "Regulasi Cemas",
    prompt: "Ganti kalimat 'Aku orang gagal/cemas' menjadi 'Aku sedang memperhatikan pikiran yang mengatakan bahwa aku gagal'. Apa bedanya?",
    juInsight: "Pikiran hanyalah fenomena mental yang datang dan pergi seperti awan di langit. Langitnya tetap jernih dan tak terusik awan.",
    groundingMantra: "Pikiranku adalah cuaca, tetapi aku adalah langit birunya."
  },
  {
    day: 25,
    theme: "Rasa Syukur yang Spesifik",
    category: "Kesadaran Diri",
    prompt: "Sebutkan 3 hal remeh hari ini yang membuatmu tersenyum (misal: rasa kopi hangat, senyum orang asing, angin sejuk sore).",
    juInsight: "Syukur yang mendalam bukan tentang hal-hal besar spektakuler, melainkan tentang kemampuan memperhatikan keajaiban kecil sehari-hari.",
    groundingMantra: "Di tengah hiruk pikuk hidup, selalu ada kebaikan sederhana yang menantiku."
  },
  {
    day: 26,
    theme: "Toleransi Ketidaknyamanan",
    category: "Regulasi Cemas",
    prompt: "Emosi tidak enak apa yang paling ingin kuhindari hari ini (bosan, sedih, gelisah)? Bisakah aku duduk bersamanya selama 3 menit tanpa kabur ke gadget?",
    juInsight: "Rasa sakit emosional hanya bertambah saat kita melawannya. Ketika kita menyambutnya tanpa perlawanan, durasinya menyusut drastis.",
    groundingMantra: "Aku bisa bertahan melewati rasa tidak nyaman ini dengan nafas tenang."
  },
  {
    day: 27,
    theme: "Mendefinisikan Ulang Makna Sukses",
    category: "Penerimaan Diri",
    prompt: "Jika tidak ada seorang pun yang menilai atau memvalidasi hidupku, apa arti hidup yang sukses dan damai bagi versi diriku yang paling sejati?",
    juInsight: "Sukses sejati adalah ketika apa yang kamu pikirkan, rasakan, dan lakukan berada dalam keselarasan yang utuh.",
    groundingMantra: "Aku mendefinisikan keberhasilanku dengan ketenangan jiwaku."
  },
  {
    day: 28,
    theme: "Komunikasi Asertif dan Welas Asih",
    category: "Hubungan & Batasan",
    prompt: "Bagaimana caraku menyampaikan ketidaksetujuanku tanpa harus menjadi agresif atau defensif?",
    juInsight: "Kejujuran tanpa kelembutan adalah kekejaman. Kelembutan tanpa kejujuran adalah kepalsuan. Asertif adalah titik temu keduanya.",
    groundingMantra: "Aku berbicara dengan keteguhan hati dan ketenangan suara."
  },
  {
    day: 29,
    theme: "Ritual Pemulihan Harian",
    category: "Kesadaran Diri",
    prompt: "Ritual 5 menit apa sebelum tidur yang akan kulindungi setiap malam untuk menjaga kewarasan dan kualitas tidurku?",
    juInsight: "Cara kamu menutup harimu menentukan bagaimana alam bawah sadarmu memproses informasi sepanjang malam.",
    groundingMantra: "Malam ini, aku meletakkan seluruh dunia di luar pintu kamarku."
  },
  {
    day: 30,
    theme: "Janji untuk Tetap Ramah pada Diri Sendiri",
    category: "Penerimaan Diri",
    prompt: "Surat cinta singkat untuk diriku yang telah berjuang menuntaskan perjalanan ini: Janji apa yang ingin kuikat bersama Ju dan Nuju untuk hari-hari ke depan?",
    juInsight: "Perjalanan mengenal diri tidak pernah selesai. Tetapi sekarang, kamu sudah punya kompas, jurnal, dan teman setia di setiap langkah.",
    groundingMantra: "Aku berjanji akan selalu menjadi sahabat paling setia bagi diriku sendiri."
  }
];

export const LOCALIZED_CHAPTER_TRANSLATIONS: Record<
  string,
  { part: string; title: string; subtitle: string; takeaways: string[] }[]
> = {
  en: [
    {
      part: "PART 1: BRAIN SCIENCE & OVERTHINKING ANATOMY",
      title: "Why Does Our Brain Always Imagine Worst-Case Scenarios?",
      subtitle: "Understanding the primitive amygdala that mistakes boss emails for sabertooth tigers.",
      takeaways: [
        "The amygdala is built for survival vigilance, not for happiness.",
        "Automatic negative thoughts are cautionary alarm signals, not absolute truth.",
        "Recognizing your panic response is already 50% of reclaiming peace."
      ]
    },
    {
      part: "PART 1: BRAIN SCIENCE & OVERTHINKING ANATOMY",
      title: "The Overactive Default Mode Network (DMN)",
      subtitle: "Why your brain starts ruminating the moment you try to rest.",
      takeaways: [
        "Idle brain states default to past regret and future anxiety.",
        "Mindful sensory anchors disrupt repetitive rumination loops.",
        "Action is the best antidote to overthinking paralysis."
      ]
    },
    {
      part: "PART 2: COGNITIVE BEHAVIORAL THERAPY (CBT)",
      title: "Unmasking the 5 Cognitive Distortions",
      subtitle: "Catastrophizing, mind reading, emotional reasoning, black-and-white thinking, and toxic 'shoulds'.",
      takeaways: [
        "Feelings are real, but they are not always factual reflections of reality.",
        "Replacing 'I must' with 'I choose' restores internal sovereignty.",
        "Cognitive reframing turns irrational dread into manageable challenges."
      ]
    },
    {
      part: "PART 3: STOIC PHILOSOPHY & EMOTIONAL REGULATION",
      title: "The Dichotomy of Control: Letting Go of What You Can't Fix",
      subtitle: "Epictetus' ancient formula for absolute modern mental peace.",
      takeaways: [
        "Focus only on your own actions, thoughts, and responses.",
        "Release external opinions and future outcomes beyond your reach.",
        "True freedom begins where the desire to control everything ends."
      ]
    },
    {
      part: "PART 3: STOIC PHILOSOPHY & EMOTIONAL REGULATION",
      title: "Recharging Your Internal Emotional Battery",
      subtitle: "Distinguishing physical tiredness from spiritual and sensory exhaustion.",
      takeaways: [
        "Sensory overload requires quiet solitude, not mindless social media scrolling.",
        "Saying no to draining requests is a vital act of self-preservation.",
        "Rest is a biological requirement, not a reward for burning out."
      ]
    },
    {
      part: "PART 4: THE ART OF SELF-COMPASSION",
      title: "Becoming Your Own Warmest Ally",
      subtitle: "Ending the cruel inner critic and building resilient self-compassion.",
      takeaways: [
        "Self-compassion produces higher resilience than harsh self-criticism.",
        "Speak to yourself the way you would speak to someone you deeply love.",
        "Perfection is an illusion; steady, kind progress is genuine growth."
      ]
    }
  ],
  de: [
    {
      part: "TEIL 1: NEUROWISSENSCHAFT & GRÜBEL-ANATOMIE",
      title: "Warum malt unser Gehirn immer den Teufel an die Wand?",
      subtitle: "Die Amygdala verstehen, die eine E-Mail vom Chef mit einem Raubtier verwechselt.",
      takeaways: [
        "Die Amygdala dient dem Überleben, nicht deinem Glück.",
        "Negative Gedanken sind Warnsignale, keine unumstößlichen Fakten.",
        "Die Panik wahrzunehmen, ist bereits der halbe Weg zur Ruhe."
      ]
    },
    {
      part: "TEIL 1: NEUROWISSENSCHAFT & GRÜBEL-ANATOMIE",
      title: "Das überaktive Default Mode Network (DMN)",
      subtitle: "Warum dein Gehirn genau dann zu grübeln beginnt, wenn du dich ausruhen willst.",
      takeaways: [
        "Im Leerlauf neigt das Gehirn zu Sorgen und Reue.",
        "Sensorische Achtsamkeit unterbricht destruktive Gedankenschleifen.",
        "Gezieltes Handeln löst mentale Lähmung auf."
      ]
    },
    {
      part: "TEIL 2: KOGNITIVE VERHALTENSTHERAPIE (KVT)",
      title: "Entlarvung der 5 kognitiven Verzerrungen",
      subtitle: "Katastrophisieren, Gedankenlesen, emotionale Beweisführung und toxische Pflichtgefühle.",
      takeaways: [
        "Gefühle sind real, aber sie sind keine objektiven Beweise.",
        "Ersetze 'Ich muss' durch 'Ich entscheide mich für'.",
        "Kognitive Umstrukturierung verwandelt diffuse Ängste in lösbare Aufgaben."
      ]
    },
    {
      part: "TEIL 3: STOISCHE PHILOSOPHIE & EMOTIONSREGULATION",
      title: "Die Dichotomie der Kontrolle: Loslassen, was du nicht ändern kannst",
      subtitle: "Epiktets zeitlose Formel für echte innere Gelassenheit im digitalen Zeitalter.",
      takeaways: [
        "Konzentriere dich nur auf das, was in deiner direkten Macht liegt.",
        "Lass die Meinungen anderer und ungewisse Zukunftsszenarien los.",
        "Innere Freiheit beginnt dort, wo der Kontrollzwang aufhört."
      ]
    },
    {
      part: "TEIL 3: STOISCHE PHILOSOPHIE & EMOTIONSREGULATION",
      title: "Die emotionale Batterie wieder aufladen",
      subtitle: "Physische Müdigkeit von mentaler und sensorischer Reizüberflutung unterscheiden.",
      takeaways: [
        "Reizüberflutung verlangt nach echter Stille, nicht nach Bildschirmen.",
        "Nein zu sagen ist gelebte Selbstfürsorge.",
        "Erholung ist ein biologisches Grundbedürfnis."
      ]
    },
    {
      part: "TEIL 4: DIE KUNST DES SELBSTMITGEFÜHLS",
      title: "Die Kunst, Frieden mit sich selbst zu schließen",
      subtitle: "Den inneren Kritiker beruhigen und bedingungslose Selbstakzeptanz lernen.",
      takeaways: [
        "Selbstmitgefühl stärkt mehr als harte Selbstkritik.",
        "Sprich mit dir wie mit einem Menschen, der dir am Herzen liegt.",
        "Fortschritt und Sanftmut sind wertvoller als Perfektionismus."
      ]
    }
  ],
  ja: [
    {
      part: "第1部：感情の科学と反すう思考のメカニズム",
      title: "なぜ私たちの脳は常に最悪のシナリオを想像してしまうのか？",
      subtitle: "上司からのメールをサーベルタイガーと誤認する原始の扁桃体を知る。",
      takeaways: [
        "扁桃体は生存のために危険を察知する器官であり、幸福のために作られたわけではない。",
        "自動的なネガティブ思考は警報アラームに過ぎず、確定した事実ではない。",
        "「脳がパニックを起こしている」と自覚できた時点で、冷静さは50%戻っている。"
      ]
    },
    {
      part: "第1部：感情の科学と反すう思考のメカニズム",
      title: "過活動なデフォルト・モード・ネットワーク（DMN）の罠",
      subtitle: "休もうとした瞬間、なぜ頭の中で後悔と不安の連鎖が始まるのか？",
      takeaways: [
        "何もしていない時、脳は過去の後悔と未来の不安をデフォルトで再生する。",
        "五感へのグラウンディングが思考の暴走ループを断ち切る。",
        "小さな行動こそが、思考の麻痺を解く最高の解毒剤である。"
      ]
    },
    {
      part: "第2部：認知行動療法（CBT）による思考の再構築",
      title: "心を苦しめる「5つの認知の歪み」を見破る",
      subtitle: "破局的思考、読心術の罠、感情的理由づけ、白黒思考、そして「〜すべき」思考の正体。",
      takeaways: [
        "感情は真実のように感じるが、現実の事実そのものではない。",
        "「〜しなければならない」を「〜することを選ぶ」に言い換える。",
        "認知の再評価によって、漠然とした恐怖は解決可能な課題へと変わる。"
      ]
    },
    {
      part: "第3部：ストア派哲学と感情のコントロール",
      title: "コントロールの二分法：変えられないものを手放す技術",
      subtitle: "エピクテトスが説いた、現代人のための絶対的メンタル平静の公式。",
      takeaways: [
        "自分の言動と反応だけに全エネルギーを注ぎ込む。",
        "他者の評価や不確実な未来など、変えられないものは手放す。",
        "すべてを支配したいという執着を手放した時、本当の自由が訪れる。"
      ]
    },
    {
      part: "第3部：ストア派哲学と感情のコントロール",
      title: "内なる感情バッテリーを回復させる方法",
      subtitle: "肉体的な疲れと、情報過多による精神的・感覚的枯渇を見極める。",
      takeaways: [
        "感覚の過負荷には、SNSを見るのではなく完全な静けさが必要。",
        "消耗する誘いを断ることは、自分を守るための当然の権利である。",
        "休息は自分を罰した後のご褒美ではなく、生きるための基本条件である。"
      ]
    },
    {
      part: "第4部：セルフ・コンパッション（自己慈悲）の力",
      title: "自分自身の一番の味方になる技術",
      subtitle: "心の中の残酷な批評家を静め、揺るぎない優しさを育てる。",
      takeaways: [
        "厳しい自己批判よりも、温かい自己受容の方が長期的な回復力を高める。",
        "大切な親友にかける言葉と同じ温かさで、自分自身に話しかける。",
        "完璧さは幻想であり、不完全なまま進む自分こそが愛おしい。"
      ]
    }
  ]
};

export function getLocalizedEbookChapters(langCode: string): EbookChapter[] {
  const code = (langCode || "").toLowerCase();
  const localized = LOCALIZED_CHAPTER_TRANSLATIONS[code] || LOCALIZED_CHAPTER_TRANSLATIONS.en;

  if (code === "id" || !localized) {
    return EBOOK_CHAPTERS;
  }

  return EBOOK_CHAPTERS.map((ch, idx) => {
    const override = localized[idx];
    if (!override) return ch;
    return {
      ...ch,
      part: override.part || ch.part,
      title: override.title || ch.title,
      subtitle: override.subtitle || ch.subtitle,
      keyTakeaways: override.takeaways || ch.keyTakeaways,
    };
  });
}

export function getLocalizedEbookPrompts(langCode: string): EbookDailyPrompt[] {
  const code = (langCode || "").toLowerCase();
  if (code === "id") return EBOOK_DAILY_PROMPTS;

  // For non-Indonesian languages, return localized English prompts as global lingua franca
  const englishPromptThemes: Record<number, { theme: string; prompt: string; juInsight: string; mantra: string }> = {
    1: {
      theme: "Unpacking Hidden Burdens",
      prompt: "If my body could speak honestly tonight without pretending to be strong, which part feels heaviest and what does it need?",
      juInsight: "Emotional fatigue often disguises itself as neck tension, locked shoulders, or clenching your jaw unconsciously.",
      mantra: "I am safe to set this heavy burden down tonight. Tomorrow has its own time."
    },
    2: {
      theme: "Naming the Inner Critic",
      prompt: "What is the harshest sentence my inner critic whispered today, and whose voice did I first learn that tone from?",
      juInsight: "Often our inner critic is not our own voice, but echoes of demanding parents, teachers, or bosses from our past.",
      mantra: "I am not the critical voice in my head. I am the conscious observer hearing it."
    },
    3: {
      theme: "The Dichotomy of Control Filter",
      prompt: "Write down 3 things making you anxious today. Divide them into two columns: 'Within My Power' vs 'Beyond My Control'.",
      juInsight: "Worrying about things outside your power is like holding hot coals hoping someone else gets burned.",
      mantra: "I release what I cannot change, and devote my focus to my action right now."
    },
    4: {
      theme: "Resting Without Guilt",
      prompt: "Why do I feel I must always be productive to feel worthy? What happens if today I simply breathe?",
      juInsight: "Your worth as a human is never determined by the number of tasks you crossed off a checklist today.",
      mantra: "Rest is my biological right, not a prize I must earn by torturing myself."
    },
    5: {
      theme: "Untangling the Fear of Rejection",
      prompt: "Have I changed parts of my personality just to be liked by others? What silent emotional tax did I pay for that?",
      juInsight: "Being liked by everyone is impossible. It is better to be rejected for who you are than praised for who you are not.",
      mantra: "I do not need everyone's approval to be complete."
    },
    6: {
      theme: "Social Energy Audit",
      prompt: "Which interactions this week drained my battery to zero, and which conversations left my spirit feeling nourished?",
      juInsight: "Boundaries are not walls to shut people out, but gates to regulate who earns access to your peace.",
      mantra: "Saying 'no' to draining things is saying 'yes' to my mental health."
    },
    7: {
      theme: "Week 1 Reflection: Small Victories",
      prompt: "What small challenge did I survive this week even when it felt overwhelming in the moment?",
      juInsight: "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day whispering: 'I will try again tomorrow.'",
      mantra: "I am more resilient than I realize. I have proven this countless times."
    },
    8: {
      theme: "De-catastrophizing the Spiral",
      prompt: "What worst-case scenario am I replaying in my mind? What is the actual, objective percentage chance it happens?",
      juInsight: "The human amygdala is calibrated to survive predators, not to seek happiness. It magnifies threats tenfold.",
      mantra: "My thoughts are mere hypotheses, not prophetic visions of the future."
    },
    9: {
      theme: "Body Memory of Emotion",
      prompt: "Close your eyes for a moment. Unclench your jaw and drop your shoulders. What tension is your body holding onto?",
      juInsight: "Emotions we refuse to express in words shout through physical symptoms: stomach aches, stiff shoulders, or insomnia.",
      mantra: "I give my body permission to soften. The danger has passed."
    },
    10: {
      theme: "The Comparison Trap",
      prompt: "Whose social media life made me feel inadequate or behind today? What curated illusion am I believing?",
      juInsight: "Never compare someone else's public highlight reel with your messy behind-the-scenes reality.",
      mantra: "My timeline is mine alone. I move at my own graceful pace."
    },
    11: {
      theme: "Unspoken Expectations",
      prompt: "Am I resentful towards someone for not treating me how I hoped, even though I never communicated my need honestly?",
      juInsight: "Other people do not possess telepathy. Unspoken expectations are a direct recipe for disappointment.",
      mantra: "I have the right to express my needs with calm clarity."
    },
    12: {
      theme: "Releasing the Need to Control Tomorrow",
      prompt: "If I knew with certainty that 5 years from now everything will work out, what would I do differently today?",
      juInsight: "Uncertainty is not the enemy; it is the fertile void where new possibilities take root.",
      mantra: "I trust my future self to handle challenges when their time comes."
    },
    13: {
      theme: "Forgiving Past Versions of Myself",
      prompt: "What past decision do I still regret? Can I view that former self as someone who simply tried to survive with limited tools?",
      juInsight: "You made the best decision you could make with the mental, emotional, and psychological resources you had at that time.",
      mantra: "I forgive my past self. They brought me safely to this moment."
    },
    14: {
      theme: "Week 2 Reflection: Dropping False Burdens",
      prompt: "What emotional baggage am I carrying around that was never mine to fix or carry in the first place?",
      juInsight: "You are responsible for your own inner peace, but you are not the savior responsible for managing the whole world's emotions.",
      mantra: "I lay down the burdens that do not belong to me."
    },
    15: {
      theme: "Shame vs. Guilt",
      prompt: "Do I feel 'I made a mistake' (guilt) or 'I am inherently broken' (shame)? How does this difference affect how I treat myself?",
      juInsight: "Guilt says 'I made an error'. Shame says 'I am a failure'. Never let a single mistake define your sacred worth.",
      mantra: "I am a human who can stumble, yet my existence remains unconditionally worthy."
    },
    16: {
      theme: "The Grace of Saying 'No'",
      prompt: "What invitation or request do I genuinely wish to decline this week? What is the worst that happens if I say no kindly?",
      juInsight: "Every time you force a 'yes' to please someone else, you are whispering 'no' to your own tranquility.",
      mantra: "Healthy boundaries are an act of mutual respect."
    },
    17: {
      theme: "Taming Toxic Perfectionism",
      prompt: "What task am I procrastinating out of fear it won't be flawless? What if 'good enough and finished' is my target today?",
      juInsight: "Done is better than perfect. Perfectionism is merely fear wearing the polished mask of ambition.",
      mantra: "Imperfect progress holds infinite value over stagnant perfection."
    },
    18: {
      theme: "Finding Your Anchor of Peace",
      prompt: "What simple sensory anchor (a cup of tea, cool breeze, gentle melody) reliably slows down your heartbeat?",
      juInsight: "The nervous system requires small islands of stillness amidst the rush of daily life. Schedule your anchor today.",
      mantra: "Serenity is a sanctuary that always lives inside my chest."
    },
    19: {
      theme: "Rewriting 'I Must' to 'I Choose'",
      prompt: "What is my heavy list of 'I musts' today? Rephrase them to 'I choose to...' and observe how your power returns.",
      juInsight: "The word 'must' imposes external tyranny. The word 'choose' restores your rightful agency.",
      mantra: "I possess the sovereign freedom to decide how I respond to my world."
    },
    20: {
      theme: "Celebrating Vulnerability",
      prompt: "When did I last allow myself to weep or show my fragile side to someone? What did I feel afterward?",
      juInsight: "Vulnerability is not weakness; it is the most accurate measurement of human emotional bravery.",
      mantra: "Being tender and open is an essential part of being alive."
    },
    21: {
      theme: "Week 3 Reflection: Transformation Map",
      prompt: "What shift in my mindset has become noticeable over the past 21 days when storms of overthinking arrive?",
      juInsight: "Anxiety might still visit, but the sacred pause between trigger and reaction is widening with quiet grace.",
      mantra: "Every conscious breath is a monumental step toward inner freedom."
    },
    22: {
      theme: "Greeting the Inner Child",
      prompt: "If the 8-year-old child within you stood before you right now, what warm words do they long to hear?",
      juInsight: "Often the most anxious part of us is simply a frightened child who once felt unsafe or unheard.",
      mantra: "I am here with you now. You are completely safe with me."
    },
    23: {
      theme: "Reciprocal Relationships",
      prompt: "Who are the friends with whom a conversation leaves your emotional battery recharged? Have I nurtured them lately?",
      juInsight: "Healthy relationships are cozy shelters, not demanding examination halls.",
      mantra: "I nourish the genuine connections that gently hold my heart."
    },
    24: {
      theme: "De-identifying from Thoughts",
      prompt: "Reframe 'I am an anxious mess' into 'I notice a thought claiming that I am anxious'. What shifts inside you?",
      juInsight: "Thoughts are transient weather patterns drifting across the vast, undisturbed blue sky of your awareness.",
      mantra: "My thoughts are the passing weather; I am the boundless sky."
    },
    25: {
      theme: "Granular Gratitude",
      prompt: "Name 3 mundane miracles from today (the warmth of hot coffee, a stranger's smile, the evening breeze).",
      juInsight: "Profound gratitude is not about grand milestones; it is the art of noticing ordinary beauty.",
      mantra: "Amidst life's chaos, simple goodness is always waiting to be noticed."
    },
    26: {
      theme: "Comfort with Discomfort",
      prompt: "What uncomfortable emotion am I trying to avoid today? Can I sit with it for 3 minutes without escaping to my screen?",
      juInsight: "Emotional pain only amplifies when we resist it. When welcomed with curiosity, its grip evaporates.",
      mantra: "I have the quiet strength to sit through discomfort with gentle breath."
    },
    27: {
      theme: "Redefining Success on Your Terms",
      prompt: "If no one on social media could ever evaluate or validate your life, what does a peaceful, successful life look like to you?",
      juInsight: "True success is when what you think, feel, and do exist in seamless harmony.",
      mantra: "I measure my success by the tranquility of my soul."
    },
    28: {
      theme: "Assertiveness Wrapped in Kindness",
      prompt: "How can I communicate my disagreement or boundaries firmly without becoming defensive or aggressive?",
      juInsight: "Honesty without empathy is cruelty. Empathy without honesty is flattery. Assertiveness is their golden center.",
      mantra: "I speak my truth with steady conviction and a soft voice."
    },
    29: {
      theme: "Nightly Restoration Ritual",
      prompt: "What 5-minute wind-down ritual before sleep will I fiercely protect to guard my sanity and rest?",
      juInsight: "How you close your evening determines how your subconscious mind processes information throughout the night.",
      mantra: "Tonight, I leave the clamor of the world outside my bedroom door."
    },
    30: {
      theme: "A Vow of Lifelong Kindness",
      prompt: "A brief letter to the self who completed this journey: What promise will you seal with Ju and Nuju for the days ahead?",
      juInsight: "The journey of self-discovery never ends. But now, you hold a compass, a journal, and an unwavering friend for every step.",
      mantra: "I promise to always remain the most faithful and gentle friend to myself."
    }
  };

  return EBOOK_DAILY_PROMPTS.map((dp) => {
    const override = englishPromptThemes[dp.day];
    if (!override) return dp;
    return {
      ...dp,
      theme: override.theme,
      prompt: override.prompt,
      juInsight: override.juInsight,
      groundingMantra: override.mantra,
    };
  });
}
