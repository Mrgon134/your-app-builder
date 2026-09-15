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
