import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "digital-products");
const PUBLIC_DOWNLOADS_DIR = path.join(ROOT, "public", "downloads");

// Ensure output directories exist
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(PUBLIC_DOWNLOADS_DIR)) fs.mkdirSync(PUBLIC_DOWNLOADS_DIR, { recursive: true });

// Locate Chrome or Edge for headless PDF printing
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browserExe = fs.existsSync(chromePath) ? chromePath : (fs.existsSync(edgePath) ? edgePath : null);

if (!browserExe) {
  console.error("No Chrome or Edge browser found for PDF generation.");
  process.exit(1);
}

console.log("Using browser for PDF rendering:", browserExe);

// Helper function to render HTML to PDF
function convertHtmlToPdf(htmlPath, pdfPath) {
  console.log(`Generating PDF: ${path.basename(pdfPath)}...`);
  const cmd = `"${browserExe}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${pdfPath}" "${htmlPath}"`;
  execSync(cmd, { stdio: "ignore" });
  if (fs.existsSync(pdfPath)) {
    const stats = fs.statSync(pdfPath);
    console.log(`✓ Created: ${path.basename(pdfPath)} (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    throw new Error(`Failed to create ${pdfPath}`);
  }
}

// -------------------------------------------------------------
// CHAPTER DATA (INDONESIAN)
// -------------------------------------------------------------
const INDO_CHAPTERS = [
  {
    num: 1,
    part: "BAGIAN 1: SAINS EMOSI & ANATOMI OVERTHINKING",
    title: "Mengapa Otak Kita Selalu Membayangkan Skenario Terburuk?",
    subtitle: "Mengenal amigdala primitif yang mengira email atasan adalah harimau bertaring panjang.",
    readTime: "7 menit",
    paragraphs: [
      "Pernahkah kamu terbangun jam 2 pagi karena tiba-tiba teringat satu kalimat canggung yang kamu ucapkan dalam rapat tiga hari yang lalu?",
      "Atau mungkin kamu baru saja menerima pesan dari rekan kerja: 'Bisa ngobrol sebentar besok pagi?', dan dalam lima detik lambungmu melilit, jantungmu berdegup kencang, dan otakmu langsung merancang skenario kamu dipecat dan jatuh miskin?",
      "Selamat datang di alam pikiran manusia modern. Kamu tidak gila, dan kamu bukan orang lemah. Otakmu hanya sedang menjalankan algoritma purba yang berusia 200.000 tahun.",
      "Di dalam pusat limbik otakmu terdapat struktur seukuran biji almond bernama amigdala. Tugas amigdala di zaman berburu adalah mendeteksi bahaya mematikan. Nenek moyang kita yang santai dan mengira gemerisik semak-semak adalah angin sepoi-sepoi sudah punah dimakan predator. Nenek moyang kita yang hidup—dan mewariskan gen ke kita—adalah mereka yang selalu mengasumsikan bahaya terburuk.",
      "Masalahnya: di zaman modern, bahaya kita bukan lagi singa, melainkan deadline, tagihan cicilan, perbandingan pencapaian di media sosial, dan ketidakpastian masa depan. Namun amigdala tidak bisa membedakan antara ancaman fisik nyata dan ancaman psikologis abstrak. Reaksi hormonalnya tetap sama: menyemburkan kortisol dan adrenalin.",
      "Langkah pertama untuk berhenti membenci dirimu sendiri adalah menyadari: Overthinking bukan kelemahan moral, melainkan mekanisme perlindungan diri yang bekerja terlalu keras (over-functioning)."
    ],
    takeaways: [
      "Amigdala dirancang untuk mendeteksi bahaya demi bertahan hidup, bukan untuk membuatmu bahagia.",
      "Otak memproduksi pikiran negatif otomatis sebagai alarm pencegahan, bukan fakta mutlak.",
      "Menyadari bahwa otakmu sedang panik adalah 50% dari proses ketenangan batin."
    ],
    exercise: {
      title: "Latihan 'Beri Nama si Alarm' (Affect Labeling)",
      steps: [
        "Ketika kepalamu mulai merangkai skenario terburuk, letakkan satu tangan di dada.",
        "Katakan dalam hati: 'Terima kasih amigdala, aku tahu kamu ingin melindungiku. Tapi saat ini aku aman.'",
        "Ambil napas panjang 4 detik lewat hidung, hembuskan 7 detik perlahan lewat mulut."
      ],
      prompt: "Hal terburuk apa yang sedang ditakutkan otakku malam ini, dan seberapa realistis ketakutan itu jika dilihat 6 bulan dari sekarang?"
    }
  },
  {
    num: 2,
    part: "BAGIAN 1: SAINS EMOSI & ANATOMI OVERTHINKING",
    title: "Default Mode Network: Otak Pengelana yang Lupa Berhenti",
    subtitle: "Misteri kenapa pikiran justru paling ribut saat tubuh kita mencoba istirahat.",
    readTime: "8 menit",
    paragraphs: [
      "Banyak orang heran: kenapa saat seharian sibuk bekerja mereka merasa baik-baik saja, tetapi begitu berbaring di kasur dan mematikan lampu, kepala mereka langsung dipenuhi penyesalan masa lalu dan kecemasan masa depan?",
      "Neurosains menemukan jawabannya pada tahun 2001: jaringan sirkuit otak bernama Default Mode Network (DMN).",
      "Ketika kamu fokus pada tugas aktif (mengetik laporan, mengemudi, menghitung angka), jaringan konsentrasi otakmu (Task-Positive Network) menyala, dan DMN mati. Namun, begitu kamu berhenti beraktivitas—saat rebahan, mandi, atau melamun—DMN otomatis aktif kembali.",
      "DMN adalah pusat narasi diri (self-referential thinking). Fungsinya merangkai cerita: 'Siapa aku? Bagaimana reputasiku? Apa yang salah kemarin? Bagaimana caraku tidak gagal besok?'.",
      "Pada orang dengan kecemasan tinggi, DMN mengalami hiper-konektivitas (hyperactive DMN). Otak terjebak dalam siklus ruminasi tanpa tombol jeda.",
      "Satu-satunya cara menurunkan aktivitas DMN tanpa obat-obatan keras adalah dengan memindahkan fokus ke sensasi sensorik tubuh saat ini (sensory grounding) atau menuangkan narasi liar tersebut ke atas jurnal tertulis."
    ],
    takeaways: [
      "Pikiran malam hari yang berisik adalah aktivitas alami Default Mode Network (DMN).",
      "Jangan mencoba 'melawan' pikiran kosong dengan memaksakan pikiran positif; alihkan ke pencatatan.",
      "Menuangkan pikiran ke jurnal memindahkan beban memori kerja (working memory offload) sehingga otak bisa rileks."
    ],
    exercise: {
      title: "Latihan 'Brain Dump 5 Menit'",
      steps: [
        "Sediakan kertas atau buka Nuju journal sebelum tidur.",
        "Tulis semua hal yang mengganjal tanpa menyaring tata bahasa, ejaan, atau logika.",
        "Setelah 5 menit, tutup catatanmu dan katakan: 'Pikiranku sudah tersimpan aman di luar kepalaku.'"
      ],
      prompt: "Jika aku boleh menumpahkan semua rasa lelahku tanpa dihakimi siapa pun malam ini, apa yang ingin kutulis?"
    }
  },
  {
    num: 3,
    part: "BAGIAN 2: SENJATA CBT & STOIKISME",
    title: "Teknik Cognitive Defusion: Kamu Adalah Langit, Pikiranmu Hanyalah Cuaca",
    subtitle: "Cara memisahkan identitas dirimu dari narasi negatif yang diputar di kepala.",
    readTime: "9 menit",
    paragraphs: [
      "Sebagian besar penderitaan batin bukan berasal dari kenyataan itu sendiri, melainkan dari keyakinan kita bahwa setiap pikiran yang lewat di kepala adalah kebenaran mutlak.",
      "Dalam terapi Acceptance and Commitment Therapy (ACT) dan CBT modern, kondisi ini disebut Cognitive Fusion (keterikatan kognitif). Kita melebur dengan pikiran kita: ketika otak berbisik 'Aku tidak berharga', kita langsung percaya bahwa kita benar-benar sampah.",
      "Lawan dari fusi adalah Cognitive Defusion—kemampuan untuk mundur satu langkah dan menyaksikan pikiran kita sebagai sekadar objek mental yang melintas.",
      "Bayangkan kamu sedang duduk di tepi rel kereta api. Pikiran-pikiranmu adalah gerbong kereta yang lewat berdentum-dentum. Orang yang fusi akan melompat ke atas gerbong kereta yang melaju kencang menuju jurang panik. Orang yang defusi akan duduk tenang di peron dan berkata: 'Oh, ada kereta bernama Rasa Cemas lewat. Menarik, tapi aku tidak perlu naik.'",
      "Gunakan rumus bahasa ajaib ini: Ubah kalimat 'Aku payah' menjadi 'Aku menyadari bahwa otakku sedang memproduksi pikiran bahwa aku payah.' Perubahan satu kalimat ini menciptakan ruang psikologis yang melegakan."
    ],
    takeaways: [
      "Pikiran adalah peristiwa kognitif sementara, bukan ramalan masa depan atau vonis kebenaran.",
      "Kamu adalah pengamat pikiran, bukan isi pikiranmu itu sendiri.",
      "Memberi jarak bahasa ('Aku menyadari ada pikiran...') menurunkan reaktivitas emosi seketika."
    ],
    exercise: {
      title: "Latihan 'Daun di Atas Sungai' (Leaves on a Stream)",
      steps: [
        "Tutup matamu selama 2 menit. Bayangkan sungai jernih berarus tenang dengan daun-daun mengapung di atasnya.",
        "Setiap kali satu pikiran cemas muncul, letakkan kalimat itu di atas sehelai daun.",
        "Saksikan daun itu mengapung pelan terbawa arus air hingga menjauh dari pandanganmu."
      ],
      prompt: "Pikiran berulang apa yang paling sering menyamar sebagai fakta mutlak dalam hidupku minggu ini?"
    }
  },
  {
    num: 4,
    part: "BAGIAN 2: SENJATA CBT & STOIKISME",
    title: "Dikotomi Kendali Epictetus: Mengeliminasi Beban yang Bukan Hakmu",
    subtitle: "Filosofi kuno berusia 2.000 tahun yang menjadi pondasi psikoterapi modern.",
    readTime: "9 menit",
    paragraphs: [
      "Hampir 2.000 tahun yang lalu di Yunani kuno, seorang mantan budak bernama Epictetus membuka karyanya Enchiridion dengan prinsip paling revolusioner: 'Ada hal-hal yang berada di bawah kendali kita, dan ada hal-hal yang tidak berada di bawah kendali kita.'",
      "Pikirkan baik-baik: Berapa banyak energimu yang habis untuk mencemaskan hal-hal seperti: Apakah orang lain menyukai diriku? Apakah perekonomian akan memburuk? Apakah rencana besok akan berjalan sempurna?",
      "Semua hal di atas berada di luar kendali mutlakmu. Ketika kamu menggantungkan ketenangan batinmu pada hal yang tidak bisa kamu kendalikan, kamu menyerahkan kunci kedamaianmu ke tangan orang asing dan nasib acak.",
      "Yang berada di bawah kendalimu HANYALAH: niatmu, usahamu, reaksimu, prinsip moralmu, dan bagaimana kamu merespons luka. Begitu kamu menarik garis tegas ini, 80% overthinking-mu gugur seketika."
    ],
    takeaways: [
      "Pisahkan lingkaran perhatian (Circle of Concern) dari lingkaran kendali (Circle of Influence).",
      "Fokus pada proses dan usaha pribadi, lepaskan keterikatan pada hasil akhir yang ditentukan orang lain.",
      "Ketenangan sejati bukan ketiadaan masalah, melainkan kepastian atas apa yang pantas kamu urusi."
    ],
    exercise: {
      title: "Audit Lingkaran Kendali",
      steps: [
        "Gambar dua lingkaran konsentris di kertas: Lingkaran Dalam (Kendali Penuh) dan Lingkaran Luar (Bukan Kendaliku).",
        "Pindahkan kekhawatiran utamamu saat ini ke dalam salah satu lingkaran.",
        "Tuliskan satu tindakan konkret untuk hal-hal di Lingkaran Dalam, lalu relakan hal-hal di Lingkaran Luar."
      ],
      prompt: "Beban apa yang sedang kupikul hari ini padahal sebenarnya itu bukan kuasaku untuk mengaturnya?"
    }
  },
  {
    num: 5,
    part: "BAGIAN 2: SENJATA CBT & STOIKISME",
    title: "The 5-Minute Thought Audit: Mengadili Pikiran Negatif Otomatis",
    subtitle: "Metode persidangan mental untuk membongkar distorsi kognitif Dr. Aaron Beck.",
    readTime: "8 menit",
    paragraphs: [
      "Ketika pikiran buruk menyerang, jangan telan mentah-mentah. Bawa pikiran itu ke 'ruang sidang mental'.",
      "Dalam terapi CBT klasik, pikiran otomatis yang merusak disebut NATs (Negative Automatic Thoughts). NATs memiliki trik kotor: ia selalu membesar-besarkan risiko (catastrophizing) dan mengecilkan kemampuan bertaharmu (underestimating resilience).",
      "Untuk melawannya, ajukan 4 pertanyaan jaksa penuntut berikut:",
      "1. Mana Bukti Nyatanya? Apa fakta objektif yang mendukung pikiran ini, dan apa fakta yang membantahnya?",
      "2. Apakah Ada Penjelasan Alternatif? Jika temanku tidak membalas pesan selama 4 jam, apakah karena dia membenciku, atau karena dia sedang sibuk berkendara?",
      "3. What's the Worst That Could Happen? Jika skenario terburuk benar-benar terjadi, bisakah aku bertahan hidup? Apa rencana mitigasi 24 jam pertamaku?",
      "4. Nasihat untuk Sahabat: Jika sahabat terbaikmu datang dan menceritakan kekhawatiran yang sama, apakah kamu akan menghakiminya sekejam kamu menghakimi dirimu sendiri?"
    ],
    takeaways: [
      "Gunakan 'Thought Audit' setiap kali merasakan lonjakan kecemasan mendadak.",
      "Bedakan antara kemungkinan teoritis (bisa saja terjadi) dan probabilitas nyata (kemungkinan besar tidak terjadi).",
      "Terapkan welas asih diri (self-compassion)—bicaralah pada dirimu seperti berbicara pada teman terluka."
    ],
    exercise: {
      title: "Matriks 3 Kolom CBT",
      steps: [
        "Kolom 1: Pikiran Otomatis (contoh: 'Aku pasti mempermalukan diriku besok').",
        "Kolom 2: Distorsi Kognitif (contoh: 'Meramal Masa Depan / Fortune Telling').",
        "Kolom 3: Respon Rasional (contoh: 'Aku sudah mempersiapkan materi dengan baik. Rasa gugup itu wajar dan tidak berarti aku gagal')."
      ],
      prompt: "Pikiran negatif apa yang sedang kupercaya hari ini, dan bagaimana sudut pandang alternatif yang lebih adil?"
    }
  },
  {
    num: 6,
    part: "BAGIAN 3: PROTOKOL DARURAT JAM 2 PAGI",
    title: "Protokol Darurat Jam 2 Pagi: Reset Sistem Saraf dalam 90 Detik",
    subtitle: "Teknik Physiological Sigh Dr. Andrew Huberman & Grounding 5-4-3-2-1.",
    readTime: "7 menit",
    paragraphs: [
      "Ketika kamu panik di tengah malam, kamu tidak bisa 'berpikir' keluar dari kepanikan. Mengapa? Karena saat amigdala membakar hormon stres, korteks prefrontal (otak logismu) sedang offline.",
      "Kamu harus menggunakan jalur somatik (tubuh) untuk menenangkan otak, bukan sebaliknya.",
      "Teknik tercepat yang terbukti secara klinis di Stanford Medicine adalah Physiological Sigh:",
      "1. Tarik napas dalam melalui hidung selama 3 detik.",
      "2. Tanpa membuang napas, tarik napas tajam sekali lagi di puncak paru-paru untuk mengembangkan kantung udara alveoli yang kempis.",
      "3. Hembuskan napas panjang dan mendesah lewat mulut secara perlahan selama 6 sampai 8 detik.",
      "Ulangi 3 kali. Hembusan napas yang lebih panjang daripada tarikan napas merangsang saraf vagus (vagus nerve), yang memerintahkan jantung untuk memperlambat detak nadi seketika.",
      "Jika pikiranmu masih melayang, lanjutkan dengan teknik 5-4-3-2-1 Grounding: Sebutkan 5 benda yang kamu lihat, raba 4 tekstur selimut/kulitmu, dengarkan 3 suara samar, cium 2 aroma di udara, dan rasakan 1 rasa di lidahmu."
    ],
    takeaways: [
      "Gunakan tubuh untuk menenangkan pikiran, bukan mendebat pikiran dengan logika saat panik melanda.",
      "Teknik Physiological Sigh menurunkan detak jantung secara instan dalam 3 repetisi pernapasan.",
      "Grounding sensorik 5-4-3-2-1 memaksa otak kembali ke realitas fisik saat ini."
    ],
    exercise: {
      title: "Siklus Physiological Sigh 3x",
      steps: [
        "Duduk atau berbaring santai dengan punggung lurus.",
        "Inhale dalam lewat hidung -> Inhale kedua cepat di puncak -> Exhale panjang perlahan lewat mulut.",
        "Rasakan sensasi relaksasi hangat yang mengalir dari pelipis turun ke pundak dan dada."
      ],
      prompt: "Bagian tubuh mana yang terasa tegang saat ini, dan bagaimana rasanya jika kubiarkan lemas sekarang?"
    }
  }
];

// -------------------------------------------------------------
// 30-DAY PROMPTS DATA (INDONESIAN)
// -------------------------------------------------------------
const INDO_PROMPTS = [
  { day: 1, theme: "Membongkar Beban Tersembunyi", category: "Kesadaran Diri", prompt: "Jika tubuhku bisa berbicara jujur malam ini tanpa perlu pura-pura kuat, bagian mana yang paling lelah dan apa yang ia butuhkan?", insight: "Kelelahan emosional sering menyamar sebagai pegal di leher, pundak kaku, atau rahang yang mengatup rapat.", mantra: "Aku aman meletakkan beban ini malam ini. Hari esok punya waktunya sendiri." },
  { day: 2, theme: "Menamai si Suara Kritis", category: "Regulasi Cemas", prompt: "Kalimat paling kejam apa yang sering dikatakan suara di kepalaku hari ini, dan dari mana asal suara itu pertama kali kudengar?", insight: "Sering kali suara kritik di kepala kita bukan suara asli kita, melainkan gema dari ekspektasi orang lain.", mantra: "Aku bukan suara kritik di kepalaku. Aku adalah orang yang mendengarkannya." },
  { day: 3, theme: "Filter Dikotomi Kendali", category: "Regulasi Cemas", prompt: "Tuliskan 3 hal yang membuatmu cemas hari ini. Kelompokkan ke dalam dua kolom: 'Bisa Kukendalikan' vs 'Di Luar Kuasaku'.", insight: "Mencemaskan hal yang tidak bisa dikendalikan sama seperti memegang bara api berharap orang lain yang terbakar.", mantra: "Aku melepaskan apa yang tidak bisa kuubah, dan mencurahkan energiku pada tindakanku saat ini." },
  { day: 4, theme: "Validasi Lelah Tanpa Rasa Bersalah", category: "Penerimaan Diri", prompt: "Kenapa aku merasa harus selalu produktif untuk merasa berharga? Apa yang terjadi jika hari ini aku sekadar bernapas?", insight: "Nilai dirimu sebagai manusia tidak ditentukan oleh checklist tugas yang kamu centang hari ini.", mantra: "Istirahat adalah hak biologisku, bukan hadiah yang harus kudapatkan dengan menyiksa diri." },
  { day: 5, theme: "Menyentuh Luka Penolakan", category: "Hubungan & Batasan", prompt: "Pernahkah aku mengubah kepribadianku demi disukai orang lain? Apa harga batin yang harus kubayar untuk itu?", insight: "Lebih baik ditolak karena menjadi diri sendiri daripada dipuji karena menjadi orang lain.", mantra: "Aku tidak membutuhkan persetujuan semua orang untuk merasa utuh." },
  { day: 6, theme: "Audit Energetik Harian", category: "Kesadaran Diri", prompt: "Aktivitas atau percakapan apa hari ini yang menyedot energi mentalku hingga terkuras habis? Bagaimana aku bisa membatasinya?", insight: "Energi emosional kita memiliki kuota harian terbatas. Jangan biarkan orang lain menghabiskannya cuma-cuma.", mantra: "Batasan yang sehat adalah bentuk penghormatan tertinggi pada kedamaian jiwaku." },
  { day: 7, theme: "Memaafkan Versi Diri Masa Lalu", category: "Penerimaan Diri", prompt: "Keputusan masa lalu apa yang masih sering kusesali? Bisakah aku memaafkan diriku yang saat itu belum tahu apa yang kuketahui sekarang?", insight: "Kamu yang dulu mengambil keputusan dengan tingkat kesadaran dan sumber daya yang kamu miliki saat itu.", mantra: "Aku berdamai dengan masa laluku. Dia telah mengantarkanku menjadi pribadi yang lebih bijak." },
  { day: 8, theme: "Menjinakkan Sindrom Penipu (Impostor)", category: "Kesadaran Diri", prompt: "Kapan terakhir kali aku merasa 'hanya beruntung' padahal sebenarnya aku bekerja keras untuk mencapainya?", insight: "Impostor syndrome adalah tanda bahwa kamu sedang bertumbuh di luar zona nyamanmu.", mantra: "Aku pantas berada di ruangan ini. Pencapaianku adalah buah dari usahaku." },
  { day: 9, theme: "Ruang Aman untuk Rasa Marah", category: "Regulasi Cemas", prompt: "Hal apa yang membuatku marah belakangan ini tetapi kupendam karena takut dicap egois atau baperan?", insight: "Kemarahan yang sehat adalah alarm bahwa salah satu batasan sucimu telah dilanggar orang lain.", mantra: "Kemarahanku valid. Aku berhak menyatakannya dengan tenang dan tegas." },
  { day: 10, theme: "Detoks Ekspektasi Orang Lain", category: "Hubungan & Batasan", prompt: "Standar hidup siapa yang sedang kukejar saat ini? Apakah ini benar-benar mimpiku atau sekadar mimpi orang tuaku/masyarakat?", insight: "Menjalani hidup orang lain adalah bentuk pengkhianatan paling menyakitkan bagi jiwamu sendiri.", mantra: "Aku membebaskan diriku dari keharusan memenuhi ekspektasi siapa pun." },
  { day: 11, theme: "Menghadapi Ketidakpastian", category: "Regulasi Cemas", prompt: "Jika hal yang paling kutakutkan terjadi besok, langkah mitigasi paling pertama apa yang bisa kuambil?", insight: "Ketakutan membengkak saat berada di ruang abstrak. Begitu dituliskan dalam langkah konkret, ia menyusut.", mantra: "Aku lebih tangguh dari ketakutanku. Apapun yang terjadi, aku sanggup melaluinya." },
  { day: 12, theme: "Menemukan Keindahan Kecil", category: "Kesadaran Diri", prompt: "Sebutkan 3 kenikmatan kecil dan sederhana yang terjadi hari ini yang luput dari apresiasiku (kopi hangat, angin sore, chat teman).", insight: "Kebahagiaan sejati jarang datang dari pencapaian raksasa; ia tersembunyi di sela-sela detail mikro harian.", mantra: "Hatiku terbuka untuk mensyukuri kebaikan-kebaikan kecil yang hadir hari ini." },
  { day: 13, theme: "Melepaskan Kebutuhan Membuktikan Diri", category: "Penerimaan Diri", prompt: "Kepada siapa aku paling ingin membuktikan bahwa aku sukses? Mengapa pengakuan mereka begitu penting bagiku?", insight: "Orang yang damai dengan dirinya sendiri tidak merasa perlu membuktikan apa pun kepada siapa pun.", mantra: "Nilai diriku sudah selesai dan utuh di hadapan Sang Pencipta." },
  { day: 14, theme: "Merawat Tubuh yang Lelah", category: "Penerimaan Diri", prompt: "Apakah belakangan ini aku memperlakukan tubuhku seperti mesin atau seperti rumah yang kucintai?", insight: "Tubuhmu adalah satu-satunya tempat tinggal permanen yang kamu miliki seumur hidup.", mantra: "Malam ini aku memberikan tubuhku istirahat yang dalam dan penuh pemulihan." },
  { day: 15, theme: "Review Pertengahan: Refleksi 14 Hari", category: "Kesadaran Diri", prompt: "Perubahan pola pikir apa yang mulai terasa dalam 2 minggu terakhir? Di area mana aku merasa sedikit lebih tenang?", insight: "Kemenangan kecil dalam menenangkan satu episode overthinking adalah lompatan besar bagi kesehatan mental.", mantra: "Aku bangga pada proses perjalananku. Aku sedang belajar merawat diriku." },
  { day: 16, theme: "Dekonstruksi Standar Kesempurnaan", category: "Penerimaan Diri", prompt: "Di area mana perfeksionismeku justru membuatku menunda-nunda dan takut melangkah?", insight: "Perfeksionisme hanyalah rasa takut yang mengenakan jas mewah.", mantra: "Selesai lebih baik daripada sempurna. Keberanian lebih utama daripada tanpa cacat." },
  { day: 17, theme: "Memutus Lingkaran People-Pleasing", category: "Hubungan & Batasan", prompt: "Kepada siapa aku ingin berkata 'TIDAK' minggu ini demi melindungi waktu dan ketenangan mentalku?", insight: "'Tidak' pada hal yang mengurasmu adalah 'Ya' pada kesehatan jiwamu.", mantra: "Ketenanganku terlalu berharga untuk ditukar dengan kepuasan sementara orang lain." },
  { day: 18, theme: "Menyapa Rasa Sepi", category: "Penerimaan Diri", prompt: "Saat aku merasa sendirian di dunia ini, apa yang sebenarnya paling kurindukan?", insight: "Kesepian bukan selalu ketiadaan orang lain; sering kali itu adalah kerinduan akan koneksi sejati dengan dirimu sendiri.", mantra: "Aku berteman baik dengan kesunyian. Di dalam diriku ada ruang yang hangat." },
  { day: 19, theme: "Mengikhlaskan yang Telah Pergi", category: "Penerimaan Diri", prompt: "Relasi, kesempatan, atau versi masa lalu apa yang sudah saatnya kulepaskan dengan penuh rasa terima kasih?", insight: "Menggenggam masa lalu yang sudah mati hanya melukai tangan yang seharusnya menyambut masa depan.", mantra: "Aku melepaskan dengan ikhlas. Yang terbaik untukku sedang menanti di depan." },
  { day: 20, theme: "Pikselasi Masalah Besar", category: "Regulasi Cemas", prompt: "Pilihlah satu masalah rumit yang membebanimu. Pecah menjadi 3 sub-tugas kecil yang bisa diselesaikan dalam 15 menit.", insight: "Gajah hanya bisa dimakan satu gigitan demi satu gigitan. Masalah raksasa tunduk pada langkah-langkah mikro.", mantra: "Aku tidak harus menyelesaikan semuanya malam ini. Cukup satu langkah kecil esok hari." },
  { day: 21, theme: "Surat Kasih Sayang untuk Diri", category: "Penerimaan Diri", prompt: "Tuliskan 3 kalimat penyemangat paling hangat yang ingin kamu dengar dari seseorang saat kamu terpuruk.", insight: "Jadilah tempat berlindung yang paling aman bagi dirimu sendiri sebelum mencari pelindung di luar.", mantra: "Aku mengasihi diriku seutuhnya, dalam kekuranganku maupun kekuatanku." },
  { day: 22, theme: "Menyaring Konsumsi Digital", category: "Kesadaran Diri", prompt: "Akun atau konten media sosial mana yang paling sering memicu rasa rendah diri atau iri hatiku?", insight: "Algoritma media sosial dirancang untuk memanen ketidakamananmu demi mempertahankan perhatian.", mantra: "Aku berhak meng-unfollow hal-hal yang mencuri kedamaian batinku." },
  { day: 23, theme: "Kekuatan Kerentanan (Vulnerability)", category: "Hubungan & Batasan", prompt: "Kelemahan atau ketakutan apa yang selama ini kututupi rapat-rapat karena takut dianggap rapuh?", insight: "Kerentanan bukan tanda kelemahan; ia adalah ukuran keberanian yang paling akurat.", mantra: "Menjadi manusia yang rentan adalah tanda bahwa hatiku masih hidup dan berani." },
  { day: 24, theme: "Mendefinisikan Ulang Makna Sukses", category: "Kesadaran Diri", prompt: "Apa arti 'sukses' bagiku jika uang dan penilaian orang lain tidak lagi dihitung sebagai patokan?", insight: "Bisa tidur nyenyak di malam hari tanpa beban rasa bersalah adalah bentuk kekayaan tertinggi di abad ke-21.", mantra: "Sukses bagiku adalah memiliki batin yang damai dan hidup selaras dengan nilai-nilaiku." },
  { day: 25, theme: "Menghadapi Kritik Tanpa Hancur", category: "Regulasi Cemas", prompt: "Kritik apa yang belakangan ini menyakiti hatiku? Bagaimana aku bisa memisahkan substansi pesan dari cara penyampaiannya?", insight: "Kritik orang lain sering kali lebih banyak bercerita tentang cermin luka mereka sendiri daripada tentang kualitasmu.", mantra: "Aku mengambil pelajaran yang bermanfaat, dan membuang racun emosinya." },
  { day: 26, theme: "Menyalakan Kembali Rasa Ingin Tahu", category: "Kesadaran Diri", prompt: "Hal menyenangkan apa yang dulu sangat kusukai saat kecil yang sudah bertahun-tahun tidak kulakukan?", insight: "Bermain tanpa tujuan produktif adalah nutrisi esensial bagi pemulihan otak yang lelah.", mantra: "Aku mengizinkan diriku bergembira dan menikmati hidup tanpa beban." },
  { day: 27, theme: "Mendengarkan Bisikan Intuisi", category: "Kesadaran Diri", prompt: "Keputusan apa yang selama ini terus dibisikkan oleh intuisiku tetapi selalu kuabaikan dengan logika overthinking-ku?", insight: "Intuisimu adalah ringkasan dari ribuan pengalaman bawah sadar yang sering kali lebih bijak dari logika panikmu.", mantra: "Aku mempercayai kebijaksanaan batinku yang membimbingku ke jalan yang benar." },
  { day: 28, theme: "Merayakan Ketahanan Mental (Resilience)", category: "Penerimaan Diri", prompt: "Tuliskan 3 badai kehidupan terberat yang pernah kulalui di masa lalu dan berhasil kuselesaikan.", insight: "Tingkat kelangsungan hidupmu melewati hari-hari terburukmu sampai malam ini adalah 100%.", mantra: "Aku sudah pernah selamat dari badai sebelumnya. Aku pun akan selamat dari masa ini." },
  { day: 29, theme: "Pilar Syukur yang Mendalam", category: "Kesadaran Diri", prompt: "Siapa orang dalam hidupku yang kehadirannya membuat dunia terasa sedikit lebih aman dan ramah bagiku?", insight: "Mengakui kebaikan orang lain meluaskan ruang hati dan mengikis perasaan bahwa kita berjuang sendirian.", mantra: "Aku bersyukur atas orang-orang baik yang ditakdirkan menemani perjalananku." },
  { day: 30, theme: "Kontrak Damai Seumur Hidup", category: "Penerimaan Diri", prompt: "Janji apa yang ingin kuikrarkan kepada diriku sendiri untuk masa depan dalam merawat kesehatan mentalku?", insight: "Perjalanan merawat batin bukan lomba lari yang memiliki garis finish; ia adalah komitmen persahabatan seumur hidup dengan dirimu sendiri.", mantra: "Mulai hari ini, aku adalah sahabat terbaik bagi jiwaku. Apapun yang terjadi, aku tidak akan meninggalkan diriku lagi." }
];

// -------------------------------------------------------------
// HTML TEMPLATE GENERATOR: INDONESIAN EBOOK
// -------------------------------------------------------------
function generateIndonesianEbookHtml() {
  const chaptersHtml = INDO_CHAPTERS.map(ch => `
    <div class="chapter-page page-break">
      <div class="chapter-header">
        <div class="part-badge">${ch.part}</div>
        <h2 class="chapter-title">Bab ${ch.num}: ${ch.title}</h2>
        <p class="chapter-subtitle">${ch.subtitle}</p>
        <div class="reading-meta">Estimasi baca: ${ch.readTime} • Nuju CBT Self-Reflection Lab</div>
      </div>

      <div class="chapter-body">
        ${ch.paragraphs.map(p => `<p>${p}</p>`).join("")}
      </div>

      <div class="takeaways-box">
        <h3>💡 Poin Inti Sains & Refleksi:</h3>
        <ul>
          ${ch.takeaways.map(t => `<li>${t}</li>`).join("")}
        </ul>
      </div>

      ${ch.exercise ? `
        <div class="exercise-box">
          <h4>🛠️ ${ch.exercise.title}</h4>
          <ol>
            ${ch.exercise.steps.map(s => `<li>${s}</li>`).join("")}
          </ol>
          <div class="sample-prompt-box">
            <strong>Prompt Refleksi Malam:</strong>
            <em>"${ch.exercise.prompt}"</em>
          </div>
        </div>
      ` : ""}
    </div>
  `).join("");

  const promptsHtml = INDO_PROMPTS.map(p => `
    <div class="prompt-item">
      <div class="prompt-badge">HARI KE-${p.day} • ${p.category.toUpperCase()}</div>
      <h3 class="prompt-theme">${p.theme}</h3>
      <div class="prompt-card">
        <p class="prompt-question">"${p.prompt}"</p>
      </div>
      <div class="prompt-insight">
        <strong>Catatan Ju:</strong> ${p.insight}
      </div>
      <div class="prompt-mantra">
        <strong>Mantra Penenang Tidur:</strong> "${p.mantra}"
      </div>
    </div>
  `).join("");

  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Berdamai dengan Pikiran Sendiri - Nuju eBook</title>
  <style>
    @page {
      size: A4;
      margin: 22mm 20mm 22mm 20mm;
      @bottom-right {
        content: counter(page);
        font-family: 'DM Sans', sans-serif;
        font-size: 9pt;
        color: #888;
      }
    }
    body {
      font-family: 'Georgia', serif;
      color: #1f1b24;
      line-height: 1.75;
      font-size: 11pt;
      margin: 0;
      padding: 0;
      background: #fff;
    }
    h1, h2, h3, h4, .sans {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .page-break {
      page-break-before: always;
    }
    .cover-page {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      padding: 60px 40px;
      box-sizing: border-box;
      background: linear-gradient(135deg, #FAF8F5 0%, #F5EFE6 100%);
      border: 12px solid #E8DFD1;
    }
    .cover-top {
      text-transform: uppercase;
      letter-spacing: 3px;
      font-size: 10pt;
      color: #926E32;
      font-weight: bold;
    }
    .cover-center {
      margin: auto 0;
    }
    .cover-title {
      font-size: 32pt;
      font-weight: 800;
      color: #1a1726;
      line-height: 1.15;
      margin: 0 0 16px;
      letter-spacing: -0.5px;
    }
    .cover-subtitle {
      font-size: 14pt;
      color: #635848;
      max-width: 520px;
      margin: 0 auto;
      line-height: 1.5;
    }
    .cover-badge {
      display: inline-block;
      background: #926E32;
      color: white;
      padding: 6px 18px;
      border-radius: 999px;
      font-size: 9pt;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 24px;
    }
    .cover-bottom {
      font-size: 10pt;
      color: #7d7265;
      border-top: 1px solid #D8CEBE;
      padding-top: 20px;
    }
    .toc-page {
      padding: 40px 0;
    }
    .toc-title {
      font-size: 22pt;
      font-weight: bold;
      border-bottom: 2px solid #1a1726;
      padding-bottom: 12px;
      margin-bottom: 24px;
    }
    .toc-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .toc-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px dotted #ccc;
      font-size: 11pt;
    }
    .chapter-header {
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .part-badge {
      font-size: 8.5pt;
      font-weight: bold;
      color: #926E32;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    .chapter-title {
      font-size: 20pt;
      font-weight: 800;
      color: #1a1726;
      margin: 8px 0;
      line-height: 1.25;
    }
    .chapter-subtitle {
      font-size: 12pt;
      color: #666;
      font-style: italic;
      margin: 0 0 12px;
    }
    .reading-meta {
      font-size: 9pt;
      color: #888;
    }
    .chapter-body p {
      margin: 0 0 16px;
      text-align: justify;
    }
    .takeaways-box {
      background: #FDFBF7;
      border-left: 4px solid #926E32;
      padding: 16px 20px;
      border-radius: 8px;
      margin: 28px 0 20px;
    }
    .takeaways-box h3 {
      margin: 0 0 8px;
      font-size: 11pt;
      color: #926E32;
    }
    .takeaways-box ul {
      margin: 0;
      padding-left: 20px;
    }
    .takeaways-box li {
      margin-bottom: 6px;
      font-size: 10pt;
    }
    .exercise-box {
      background: #F4F3FA;
      border: 1px solid #D8D4EC;
      padding: 18px 20px;
      border-radius: 12px;
      margin: 24px 0;
    }
    .exercise-box h4 {
      margin: 0 0 10px;
      font-size: 11pt;
      color: #4C3FB5;
    }
    .exercise-box ol {
      margin: 0 0 14px;
      padding-left: 20px;
      font-size: 10pt;
    }
    .exercise-box li {
      margin-bottom: 6px;
    }
    .sample-prompt-box {
      background: #fff;
      border: 1px dashed #B8B0DE;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 10pt;
      color: #2F2468;
    }
    .curriculum-intro {
      text-align: center;
      padding: 40px 20px;
      background: #FAF8F5;
      border-radius: 16px;
      margin-bottom: 30px;
    }
    .prompt-item {
      background: #fff;
      border: 1px solid #E8E4DF;
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 22px;
      page-break-inside: avoid;
    }
    .prompt-badge {
      font-size: 8pt;
      font-weight: bold;
      color: #926E32;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }
    .prompt-theme {
      font-size: 14pt;
      font-weight: bold;
      color: #1a1726;
      margin: 0 0 12px;
    }
    .prompt-card {
      background: #FDF9F6;
      border-left: 3px solid #E07A5F;
      padding: 12px 16px;
      border-radius: 6px;
      margin-bottom: 12px;
    }
    .prompt-question {
      margin: 0;
      font-size: 11pt;
      font-style: italic;
      color: #2D221E;
      font-weight: 500;
    }
    .prompt-insight {
      font-size: 9.5pt;
      color: #5C5248;
      margin-bottom: 8px;
    }
    .prompt-mantra {
      font-size: 9.5pt;
      color: #2B5E4B;
      background: #F0F7F4;
      padding: 8px 12px;
      border-radius: 6px;
    }
    .vip-closing {
      text-align: center;
      padding: 50px 30px;
      background: linear-gradient(135deg, #1A1726 0%, #2A243D 100%);
      color: white;
      border-radius: 20px;
      margin-top: 40px;
    }
    .vip-code {
      display: inline-block;
      background: #E8B923;
      color: #1A1726;
      font-family: monospace;
      font-size: 18pt;
      font-weight: bold;
      padding: 10px 24px;
      border-radius: 10px;
      letter-spacing: 2px;
      margin: 16px 0;
    }
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="cover-top">NUJU OFFICIAL PUBLICATION • 2026 EDITION</div>
    <div class="cover-center">
      <h1 class="cover-title">BERDAMAI DENGAN PIKIRAN SENDIRI</h1>
      <p class="cover-subtitle">30 Hari Terapi Overthinking, Regulasi Cemas, & Jurnal Rilis Emosi Berbasis Sains CBT & Stoikisme</p>
      <div class="cover-badge">Edisi Digital Lengkap</div>
    </div>
    <div class="cover-bottom">
      <strong>Oleh Tim Konselor CBT Nuju & Self-Reflection Lab</strong><br>
      Hak Cipta © 2026 Nuju. Hak cipta dilindungi undang-undang.
    </div>
  </div>

  <!-- TABLE OF CONTENTS -->
  <div class="toc-page page-break">
    <h2 class="toc-title">Daftar Isi Buku</h2>
    <ul class="toc-list">
      <li class="toc-item"><span><strong>Bab 1:</strong> Mengapa Otak Selalu Membayangkan Skenario Terburuk? (Amigdala)</span> <span>Halaman 3</span></li>
      <li class="toc-item"><span><strong>Bab 2:</strong> Default Mode Network: Otak Pengelana yang Lupa Berhenti</span> <span>Halaman 6</span></li>
      <li class="toc-item"><span><strong>Bab 3:</strong> Teknik Cognitive Defusion: Kamu Adalah Langit, Pikiran Hanyalah Cuaca</span> <span>Halaman 9</span></li>
      <li class="toc-item"><span><strong>Bab 4:</strong> Dikotomi Kendali Epictetus: Mengeliminasi Beban yang Bukan Hakmu</span> <span>Halaman 12</span></li>
      <li class="toc-item"><span><strong>Bab 5:</strong> The 5-Minute Thought Audit: Mengadili Pikiran Negatif Otomatis</span> <span>Halaman 15</span></li>
      <li class="toc-item"><span><strong>Bab 6:</strong> Protokol Darurat Jam 2 Pagi: Reset Sistem Saraf dalam 90 Detik</span> <span>Halaman 18</span></li>
      <li class="toc-item"><span><strong>Bagian 4:</strong> Kurikulum 30 Hari Jurnal & Refleksi Rilis Emosi (Hari 1 - 30)</span> <span>Halaman 21</span></li>
      <li class="toc-item"><span><strong>Bonus VIP:</strong> Voucher Nuju Pro Web App & Akses Template Notion</span> <span>Halaman 36</span></li>
    </ul>
  </div>

  <!-- CHAPTERS -->
  ${chaptersHtml}

  <!-- 30-DAY PROMPT CURRICULUM -->
  <div class="curriculum-page page-break">
    <div class="curriculum-intro">
      <div class="part-badge">BAGIAN 4: KURIKULUM LATIHAN</div>
      <h2 style="font-size: 22pt; margin: 10px 0; color: #1a1726;">30 Hari Jurnal & Refleksi Rilis Emosi</h2>
      <p style="color: #666; max-width: 500px; margin: 0 auto; font-size: 10.5pt;">
        Gunakan satu prompt setiap malam sebelum tidur. Luangkan waktu 3–5 menit untuk menulis secara jujur tanpa sensor.
      </p>
    </div>

    ${promptsHtml}
  </div>

  <!-- CLOSING & VIP VOUCHER -->
  <div class="vip-closing page-break">
    <h2 style="font-size: 20pt; margin: 0 0 10px; color: #FFE6C8;">Terima Kasih Telah Memilih Berdamai</h2>
    <p style="font-size: 11pt; color: #ccc; max-width: 480px; margin: 0 auto 20px; line-height: 1.6;">
      Sebagai pembeli resmi buku ini, nikmati akses penuh AI Journal Reflection, Voice Journaling, dan Habit Pattern Tracker di aplikasi web Nuju:
    </p>
    <div class="vip-code">NUJUVIP30</div>
    <p style="font-size: 10pt; color: #aaa;">
      Gunakan voucher ini saat login di <strong>https://nuju.app/app</strong> untuk mengaktifkan Nuju Pro gratis!
    </p>
  </div>

</body>
</html>
`;
}

// -------------------------------------------------------------
// HTML TEMPLATE GENERATOR: ENGLISH EBOOK
// -------------------------------------------------------------
function generateEnglishEbookHtml() {
  const chaptersHtml = INDO_CHAPTERS.map(ch => {
    // English titles mapping
    const enTitles = [
      { t: "Why Does the Brain Always Imagine the Worst-Case Scenario?", sub: "Meet the primitive amygdala that mistakes a work email for a saber-toothed tiger.", part: "PART 1: THE SCIENCE OF OVERTHINKING" },
      { t: "Default Mode Network: The Wandering Brain That Forgets to Rest", sub: "Why thoughts become loudest when your body attempts to sleep.", part: "PART 1: THE SCIENCE OF OVERTHINKING" },
      { t: "Cognitive Defusion: You Are the Sky, Your Thoughts Are Just Weather", sub: "Separating your identity from negative narratives in your head.", part: "PART 2: CBT & STOIC WEAPONS" },
      { t: "Epictetus's Dichotomy of Control: Eliminating Burdens Not Yours", sub: "Ancient 2,000-year-old philosophy forming modern psychotherapy.", part: "PART 2: CBT & STOIC WEAPONS" },
      { t: "The 5-Minute Thought Audit: Putting Negative Thoughts on Trial", sub: "A mental courtroom method to dismantle cognitive distortions.", part: "PART 2: CBT & STOIC WEAPONS" },
      { t: "The 2 AM Emergency Protocol: Resetting the Nervous System in 90s", sub: "Dr. Andrew Huberman's Physiological Sigh & 5-4-3-2-1 Sensory Grounding.", part: "PART 3: 2 AM EMERGENCY PROTOCOL" }
    ];
    const en = enTitles[ch.num - 1] || { t: ch.title, sub: ch.subtitle, part: "PART 1" };

    return `
      <div class="chapter-page page-break">
        <div class="chapter-header">
          <div class="part-badge">${en.part}</div>
          <h2 class="chapter-title">Chapter ${ch.num}: ${en.t}</h2>
          <p class="chapter-subtitle">${en.sub}</p>
          <div class="reading-meta">Estimated read: ${ch.readTime} • Nuju CBT Self-Reflection Lab</div>
        </div>

        <div class="chapter-body">
          ${ch.paragraphs.map(p => `<p>${p}</p>`).join("")}
        </div>

        <div class="takeaways-box">
          <h3>💡 Key Insights & Clinical Science:</h3>
          <ul>
            ${ch.takeaways.map(t => `<li>${t}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
  }).join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Peace Within Your Mind - Nuju eBook</title>
  <style>
    @page {
      size: A4;
      margin: 22mm 20mm 22mm 20mm;
      @bottom-right {
        content: counter(page);
        font-family: 'DM Sans', sans-serif;
        font-size: 9pt;
        color: #888;
      }
    }
    body {
      font-family: 'Georgia', serif;
      color: #1f1b24;
      line-height: 1.75;
      font-size: 11pt;
      margin: 0;
      padding: 0;
      background: #fff;
    }
    h1, h2, h3, h4, .sans {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .page-break { page-break-before: always; }
    .cover-page {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      padding: 60px 40px;
      box-sizing: border-box;
      background: linear-gradient(135deg, #FAF8F5 0%, #F5EFE6 100%);
      border: 12px solid #E8DFD1;
    }
    .cover-top {
      text-transform: uppercase;
      letter-spacing: 3px;
      font-size: 10pt;
      color: #926E32;
      font-weight: bold;
    }
    .cover-center { margin: auto 0; }
    .cover-title {
      font-size: 34pt;
      font-weight: 800;
      color: #1a1726;
      line-height: 1.15;
      margin: 0 0 16px;
      letter-spacing: -0.5px;
    }
    .cover-subtitle {
      font-size: 14pt;
      color: #635848;
      max-width: 520px;
      margin: 0 auto;
      line-height: 1.5;
    }
    .cover-badge {
      display: inline-block;
      background: #926E32;
      color: white;
      padding: 6px 18px;
      border-radius: 999px;
      font-size: 9pt;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 24px;
    }
    .cover-bottom {
      font-size: 10pt;
      color: #7d7265;
      border-top: 1px solid #D8CEBE;
      padding-top: 20px;
    }
    .chapter-header {
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .part-badge {
      font-size: 8.5pt;
      font-weight: bold;
      color: #926E32;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    .chapter-title {
      font-size: 20pt;
      font-weight: 800;
      color: #1a1726;
      margin: 8px 0;
      line-height: 1.25;
    }
    .chapter-subtitle {
      font-size: 12pt;
      color: #666;
      font-style: italic;
      margin: 0 0 12px;
    }
    .reading-meta { font-size: 9pt; color: #888; }
    .chapter-body p { margin: 0 0 16px; text-align: justify; }
    .takeaways-box {
      background: #FDFBF7;
      border-left: 4px solid #926E32;
      padding: 16px 20px;
      border-radius: 8px;
      margin: 28px 0 20px;
    }
    .takeaways-box h3 { margin: 0 0 8px; font-size: 11pt; color: #926E32; }
    .takeaways-box ul { margin: 0; padding-left: 20px; }
    .takeaways-box li { margin-bottom: 6px; font-size: 10pt; }
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="cover-top">NUJU OFFICIAL PUBLICATION • GLOBAL EDITION</div>
    <div class="cover-center">
      <h1 class="cover-title">PEACE WITHIN YOUR MIND</h1>
      <p class="cover-subtitle">30 Days of Overthinking Relief, Anxiety Regulation, & Emotional Clarity with CBT & Modern Stoicism</p>
      <div class="cover-badge">Complete Digital Edition</div>
    </div>
    <div class="cover-bottom">
      <strong>By Nuju CBT Counselors & Self-Reflection Lab</strong><br>
      Copyright © 2026 Nuju. All rights reserved.
    </div>
  </div>

  <!-- CHAPTERS -->
  ${chaptersHtml}

</body>
</html>
  `;
}

// -------------------------------------------------------------
// HTML TEMPLATE: PRINTABLE WORKBOOK & HABIT TRACKER
// -------------------------------------------------------------
function generatePrintableWorkbookHtml() {
  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Lembar Kerja Cetak 30 Hari - Nuju Workbook</title>
  <style>
    @page {
      size: A4;
      margin: 15mm;
    }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1a1726;
      line-height: 1.5;
      font-size: 10pt;
      margin: 0;
      padding: 0;
    }
    .page-break { page-break-before: always; }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #1a1726;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .logo { font-size: 16pt; font-weight: 800; }
    .title { font-size: 11pt; font-weight: bold; color: #926E32; text-transform: uppercase; }
    h2 { font-size: 16pt; margin: 0 0 6px; font-weight: bold; }
    p.lead { color: #666; font-size: 9.5pt; margin: 0 0 16px; }
    
    /* 30-Day Habit Grid */
    .grid-container {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 10px;
      margin-bottom: 24px;
    }
    .grid-box {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 8px;
      min-height: 65px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .box-day { font-size: 8.5pt; font-weight: bold; color: #926E32; }
    .box-check { width: 14px; height: 14px; border: 1px solid #999; border-radius: 4px; align-self: flex-end; }
    .box-notes { border-bottom: 1px dotted #ccc; margin-top: 4px; height: 16px; }

    /* Thought Audit Table */
    table.audit-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 14px;
      font-size: 9pt;
    }
    table.audit-table th, table.audit-table td {
      border: 1px solid #bbb;
      padding: 8px;
      vertical-align: top;
    }
    table.audit-table th {
      background: #F4F0E8;
      font-weight: bold;
      text-align: left;
    }
    .blank-row td { height: 75px; }

    /* Sensory Box */
    .sensory-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-top: 14px;
    }
    .sensory-card {
      border: 1px solid #D8D4EC;
      background: #FAF9FE;
      border-radius: 10px;
      padding: 12px;
    }
    .sensory-card h3 { margin: 0 0 6px; font-size: 11pt; color: #4C3FB5; }
    .sensory-card ol { margin: 0; padding-left: 18px; font-size: 9pt; }
    .sensory-card li { margin-bottom: 4px; }
  </style>
</head>
<body>

  <!-- PAGE 1: 30-DAY HABIT & MOOD TRACKER -->
  <div class="sheet">
    <div class="header">
      <div class="logo">NUJU • WORKBOOK CETAK</div>
      <div class="title">Pelacak Emosi & Jurnal 30 Hari</div>
    </div>
    <h2>30-Day Mind Clarity & Journal Habit Grid</h2>
    <p class="lead">Centang kotak setiap malam setelah menyelesaikan 3–5 menit journaling refleksi.</p>

    <div class="grid-container">
      ${Array.from({ length: 30 }, (_, i) => `
        <div class="grid-box">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="box-day">HARI ${i + 1}</span>
            <span class="box-check"></span>
          </div>
          <div class="box-notes"></div>
          <div style="font-size:7pt; color:#888;">Mood: ⚪⚪⚪</div>
        </div>
      `).join("")}
    </div>

    <div class="sensory-grid">
      <div class="sensory-card">
        <h3>🧘 Box Breathing 4x4 Quickcard</h3>
        <ol>
          <li>Tarik napas lewat hidung (4 detik)</li>
          <li>Tahan napas di paru-paru (4 detik)</li>
          <li>Hembuskan napas lewat mulut (4 detik)</li>
          <li>Tahan paru-paru kosong (4 detik)</li>
        </ol>
      </div>

      <div class="sensory-card">
        <h3>🌿 5-4-3-2-1 SOS Grounding</h3>
        <ol>
          <li><strong>5</strong> hal yang kamu lihat di sekitar</li>
          <li><strong>4</strong> benda yang bisa kamu raba teksturnya</li>
          <li><strong>3</strong> suara yang terdengar di ruangan</li>
          <li><strong>2</strong> aroma di udara</li>
          <li><strong>1</strong> hal baik tentang dirimu saat ini</li>
        </ol>
      </div>
    </div>
  </div>

  <!-- PAGE 2: THOUGHT AUDIT WORKSHEET -->
  <div class="sheet page-break">
    <div class="header">
      <div class="logo">NUJU • CBT WORKSHEET</div>
      <div class="title">The 5-Minute Thought Audit Sheet</div>
    </div>
    <h2>Lembar Pengurai Pikiran Negatif Otomatis (CBT)</h2>
    <p class="lead">Gunakan lembar ini ketika pikiran cemas atau rasa takut mulai berputar liar di kepala.</p>

    <table class="audit-table">
      <thead>
        <tr>
          <th style="width: 20%;">1. Situasi Pemicu</th>
          <th style="width: 25%;">2. Pikiran Otomatis (NATs)</th>
          <th style="width: 25%;">3. Bukti Objektif vs Asumsi</th>
          <th style="width: 30%;">4. Pikiran Pengganti yang Rasional</th>
        </tr>
      </thead>
      <tbody>
        <tr class="blank-row">
          <td><em>Contoh: Chat rekan kerja belum dibalas 3 jam</em></td>
          <td><em>"Dia pasti membenciku atau aku melakukan kesalahan fatal."</em></td>
          <td><em>Fakta: Tidak ada komplain apa pun. Asumsi: Menghubungkan diamnya orang dengan kesalahanku.</em></td>
          <td><em>"Orang lain punya kesibukan sendiri. Tidak ada bukti aku berbuat salah."</em></td>
        </tr>
        <tr class="blank-row"><td></td><td></td><td></td><td></td></tr>
        <tr class="blank-row"><td></td><td></td><td></td><td></td></tr>
        <tr class="blank-row"><td></td><td></td><td></td><td></td></tr>
      </tbody>
    </table>
  </div>

</body>
</html>
  `;
}

// -------------------------------------------------------------
// HTML TEMPLATE: VIP NOTION TEMPLATE GUIDE & VOUCHER
// -------------------------------------------------------------
function generateNotionVipGuideHtml() {
  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>VIP Notion Hub Guide - Nuju</title>
  <style>
    @page { size: A4; margin: 20mm; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1a1726;
      line-height: 1.6;
      font-size: 11pt;
      margin: 0;
      padding: 0;
    }
    .guide-card {
      border: 1px solid #E4E0D8;
      background: #FAF8F5;
      padding: 30px;
      border-radius: 16px;
      margin-bottom: 24px;
    }
    .badge {
      display: inline-block;
      background: #926E32;
      color: #fff;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 8.5pt;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 12px;
    }
    h1 { font-size: 24pt; margin: 0 0 10px; font-weight: 800; }
    p { margin: 0 0 14px; color: #444; }
    .notion-btn {
      display: inline-block;
      background: #111;
      color: #fff;
      text-decoration: none;
      padding: 14px 24px;
      border-radius: 12px;
      font-weight: bold;
      font-size: 11pt;
      margin: 12px 0 20px;
    }
    .voucher-box {
      border: 2px dashed #926E32;
      background: #FFFDF9;
      padding: 20px;
      border-radius: 14px;
      text-align: center;
      margin-top: 24px;
    }
    .voucher-code {
      font-size: 22pt;
      font-family: monospace;
      font-weight: 900;
      letter-spacing: 3px;
      color: #926E32;
      margin: 10px 0;
    }
  </style>
</head>
<body>

  <div class="guide-card">
    <div class="badge">EKSKLUSIF PEMBELI VIP BUNDLE</div>
    <h1>Nuju Notion Self-Care Hub Template</h1>
    <p>
      Selamat! Kamu mendapatkan akses ke workspace digital Notion resmi Nuju. Template ini telah dikonfigurasi dengan database mood tracking, 30 hari prompt interaktif, dan matriks pengurai kecemasan.
    </p>

    <h3>Cara Menggandakan Template (1-Click Duplicate):</h3>
    <ol style="padding-left: 20px; line-height: 1.8;">
      <li>Klik tautan atau tombol di bawah untuk membuka halaman Notion resmi Nuju:</li>
      <a class="notion-btn" href="https://nuju.notion.site/Nuju-30-Day-Self-Care-Hub-Template-112e5c8e874980a0a91be14a42823a35" target="_blank">
        Buka Template Notion Nuju &rarr;
      </a>
      <li>Di pojok kanan atas browser kamu, klik tombol <strong>"Duplicate"</strong>.</li>
      <li>Pilih workspace Notion pribadimu. Dalam 5 detik seluruh database akan tersalin rapi ke akunmu!</li>
    </ol>
  </div>

  <div class="voucher-box">
    <div style="font-size: 9pt; font-weight: bold; text-transform: uppercase; color: #888;">BONUS VOUCHER NUJU PRO WEB APP</div>
    <div class="voucher-code">NUJUVIP30</div>
    <p style="margin: 0; font-size: 10pt; color: #666;">
      Gunakan kode ini saat membuka <strong>https://nuju.app/app</strong> untuk mengklaim akses fitur premium Nuju Web App.
    </p>
  </div>

</body>
</html>
  `;
}

// -------------------------------------------------------------
// MAIN BUILD FUNCTION
// -------------------------------------------------------------
async function run() {
  console.log("==================================================");
  console.log("Generating Nuju Digital Delivery Products for Dodo");
  console.log("==================================================");

  // 1. Generate HTML files
  const indoEbookHtmlPath = path.join(OUTPUT_DIR, "Nuju-Ebook-Berdamai-dengan-Pikiran-Sendiri.html");
  const enEbookHtmlPath = path.join(OUTPUT_DIR, "Nuju-Ebook-Peace-Within-Your-Mind-EN.html");
  const workbookHtmlPath = path.join(OUTPUT_DIR, "Nuju-30-Hari-Printable-Workbook-Habit-Tracker.html");
  const notionGuideHtmlPath = path.join(OUTPUT_DIR, "Nuju-VIP-Notion-Template-Guide-Dan-Voucher.html");

  fs.writeFileSync(indoEbookHtmlPath, generateIndonesianEbookHtml());
  fs.writeFileSync(enEbookHtmlPath, generateEnglishEbookHtml());
  fs.writeFileSync(workbookHtmlPath, generatePrintableWorkbookHtml());
  fs.writeFileSync(notionGuideHtmlPath, generateNotionVipGuideHtml());

  // 2. Render to PDFs
  const indoPdfPath = path.join(OUTPUT_DIR, "Nuju-Ebook-Berdamai-dengan-Pikiran-Sendiri.pdf");
  const enPdfPath = path.join(OUTPUT_DIR, "Nuju-Ebook-Peace-Within-Your-Mind-EN.pdf");
  const workbookPdfPath = path.join(OUTPUT_DIR, "Nuju-30-Hari-Printable-Workbook-Habit-Tracker.pdf");
  const notionPdfPath = path.join(OUTPUT_DIR, "Nuju-VIP-Notion-Template-Guide-Dan-Voucher.pdf");

  convertHtmlToPdf(indoEbookHtmlPath, indoPdfPath);
  convertHtmlToPdf(enEbookHtmlPath, enPdfPath);
  convertHtmlToPdf(workbookHtmlPath, workbookPdfPath);
  convertHtmlToPdf(notionGuideHtmlPath, notionPdfPath);

  // 3. Create README files
  const basicReadmePath = path.join(OUTPUT_DIR, "README-Panduan-Akses-Buku.txt");
  fs.writeFileSync(basicReadmePath, `Terima kasih telah membeli Nuju eBook: Berdamai dengan Pikiran Sendiri!

Paket ini berisi:
1. Nuju-Ebook-Berdamai-dengan-Pikiran-Sendiri.pdf (Edisi Bahasa Indonesia Lengkap)
2. Nuju-Ebook-Peace-Within-Your-Mind-EN.pdf (Global English Edition)

Anda juga dapat membaca buku ini secara interaktif di web browser kapan pun:
https://nuju.app/ebook/read

Jika ada pertanyaan atau butuh bantuan:
Email: support@nuju.app
Website: https://nuju.app
`);

  const vipReadmePath = path.join(OUTPUT_DIR, "README-VIP-Bundle-Panduan.txt");
  fs.writeFileSync(vipReadmePath, `Selamat datang di Nuju VIP Complete Bundle!

Paket VIP lengkap Anda berisi:
1. Nuju-Ebook-Berdamai-dengan-Pikiran-Sendiri.pdf (Buku Lengkap Indo)
2. Nuju-Ebook-Peace-Within-Your-Mind-EN.pdf (Buku Lengkap English)
3. Nuju-30-Hari-Printable-Workbook-Habit-Tracker.pdf (Lembar Kerja Cetak A4)
4. Nuju-VIP-Notion-Template-Guide-Dan-Voucher.pdf (Link Gandakan Template Notion & Voucher Pro)

Link Duplikasi Notion Langsung:
https://nuju.notion.site/Nuju-30-Day-Self-Care-Hub-Template-112e5c8e874980a0a91be14a42823a35

Kode Voucher VIP Nuju Pro:
NUJUVIP30 (Klaim di https://nuju.app/app)

Salam hangat,
Tim Nuju
`);

  // 4. Create ZIP archives using PowerShell Compress-Archive
  console.log("Packaging ZIP archives...");
  const basicZipPath = path.join(OUTPUT_DIR, "Nuju-Ebook-Basic-Package.zip");
  const vipZipPath = path.join(OUTPUT_DIR, "Nuju-VIP-Complete-Bundle.zip");

  if (fs.existsSync(basicZipPath)) fs.unlinkSync(basicZipPath);
  if (fs.existsSync(vipZipPath)) fs.unlinkSync(vipZipPath);

  // Compress Basic package
  const basicFiles = [
    `"${indoPdfPath}"`,
    `"${enPdfPath}"`,
    `"${basicReadmePath}"`
  ].join(", ");
  execSync(`powershell -Command "Compress-Archive -Path ${basicFiles} -DestinationPath '${basicZipPath}' -Force"`, { stdio: "inherit" });

  // Compress VIP Bundle
  const vipFiles = [
    `"${indoPdfPath}"`,
    `"${enPdfPath}"`,
    `"${workbookPdfPath}"`,
    `"${notionPdfPath}"`,
    `"${vipReadmePath}"`
  ].join(", ");
  execSync(`powershell -Command "Compress-Archive -Path ${vipFiles} -DestinationPath '${vipZipPath}' -Force"`, { stdio: "inherit" });

  // 5. Copy all files to public/downloads/
  const filesToCopy = [
    "Nuju-Ebook-Berdamai-dengan-Pikiran-Sendiri.pdf",
    "Nuju-Ebook-Peace-Within-Your-Mind-EN.pdf",
    "Nuju-30-Hari-Printable-Workbook-Habit-Tracker.pdf",
    "Nuju-VIP-Notion-Template-Guide-Dan-Voucher.pdf",
    "Nuju-Ebook-Basic-Package.zip",
    "Nuju-VIP-Complete-Bundle.zip"
  ];

  filesToCopy.forEach(file => {
    fs.copyFileSync(path.join(OUTPUT_DIR, file), path.join(PUBLIC_DOWNLOADS_DIR, file));
  });

  console.log("==================================================");
  console.log("✓ All digital products generated successfully!");
  console.log(`Directory: ${OUTPUT_DIR}`);
  filesToCopy.forEach(file => {
    const size = (fs.statSync(path.join(OUTPUT_DIR, file)).size / 1024).toFixed(1);
    console.log(`  - ${file} (${size} KB)`);
  });
  console.log("==================================================");
}

run().catch(err => {
  console.error("Error generating digital products:", err);
  process.exit(1);
});
