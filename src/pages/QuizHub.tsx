import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Clock, Heart, HelpCircle, Lock, ShieldCheck, Sparkles, Users } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import { getAllQuizzes, QuizMeta } from "@/data/quizzes";
import juMain from "@/assets/ju-main.webp";

const QuizHub: React.FC = () => {
  const quizzes = getAllQuizzes();
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const countries = [
    { id: "ALL", label: "Semua Negara 🌍" },
    { id: "ID", label: "🇮🇩 Indonesia" },
    { id: "US", label: "🇺🇸 United States" },
    { id: "DE", label: "🇩🇪🇨🇭 Deutschland / Schweiz" },
    { id: "NO", label: "🇳🇴 Norge" },
    { id: "NL", label: "🇳🇱 Nederland" },
    { id: "JP", label: "🇯🇵 日本" },
    { id: "KR", label: "🇰🇷 대한민국" },
  ];

  const categories = ["Semua", "Vitalitas Mental", "Pola Pikir & Tidur", "Karir & Produktivitas", "Psikologi Hubungan"];

  const filteredQuizzes = quizzes.filter((q) => {
    const matchCountry = selectedCountry === "ALL" || q.targetCountry === selectedCountry || (selectedCountry === "DE" && (q.targetCountry === "DE" || q.targetCountry === "CH"));
    const matchCat = selectedCategory === "Semua" || q.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(q.category.toLowerCase());
    return matchCountry && matchCat;
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-amber-200">
      <SEOHead
        title="Mini Tes Psikologi & Cek Baterai Emosi Gratis"
        description="Ikuti mini tes psikologi 1 menit: Cek sisa baterai emosimu, tipe overthinking malam, hingga screening burnout kerja. 100% gratis, privat, dan berbasis psikologi CBT."
        canonical="https://nuju.app/quiz"
        language="id"
      />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-[#FAF9F6]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={juMain} alt="Nuju mascot Ju" className="h-8 w-8 rounded-full object-cover shadow-sm transition group-hover:scale-105" />
            <span className="font-semibold text-lg tracking-tight text-neutral-900">nuju<span className="text-amber-600 font-bold">.quiz</span></span>
          </Link>

          <div className="flex items-center gap-3 text-sm">
            <Link to="/ebook" className="hidden text-amber-700 hover:text-amber-800 sm:inline-block font-semibold">
              Ebook & Workbook
            </Link>
            <Link to="/blog" className="hidden text-neutral-600 hover:text-neutral-900 sm:inline-block font-medium">
              Artikel & Panduan
            </Link>
            <Link to="/app" className="rounded-full bg-neutral-900 px-4 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 transition">
              Buka Web App
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Hero Section */}
        <section className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/80 px-3.5 py-1 text-xs font-semibold text-amber-900 mb-4 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Refleksi Cepat 45–60 Detik</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
            Bagaimana Kondisi Batinmu <span className="text-amber-600 underline decoration-amber-300 decoration-wavy">Hari Ini?</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Kenali sinyal kelelahan, pola overthinking malam, dan gaya koping emosimu lewat mini tes interaktif berbasis psikologi emosi & CBT. Gratis, tanpa login, dan 100% privat.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-neutral-500 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> 100% Rahasia & Tanpa Simpan Data
            </span>
            <span className="flex items-center gap-1.5">
              <Brain className="h-4 w-4 text-indigo-600" /> Validasi CBT & Emotion Science
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-amber-600" /> Diikuti 130.000+ Orang
            </span>
          </div>
        </section>

        {/* Country Filter Pills */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-neutral-400 mb-2 text-center uppercase tracking-wider">Pilih Wilayah / Bahasa:</div>
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {countries.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCountry(c.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition whitespace-nowrap ${
                  selectedCountry === c.id
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8 my-8">
            <p className="text-neutral-500 text-sm">Belum ada kuis untuk kombinasi filter ini.</p>
            <button
              onClick={() => { setSelectedCountry("ALL"); setSelectedCategory("Semua"); }}
              className="mt-3 text-xs font-semibold text-amber-700 underline"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredQuizzes.map((quiz: QuizMeta) => (
            <div
              key={quiz.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1.5">
                    {quiz.countryFlag && (
                      <span className="text-base">{quiz.countryFlag}</span>
                    )}
                    <span className="inline-block rounded-full bg-amber-100/70 px-3 py-0.5 text-xs font-bold text-amber-900">
                      {quiz.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{quiz.estimatedTime}</span>
                    <span>•</span>
                    <Users className="h-3.5 w-3.5 ml-1" />
                    <span>{quiz.takersCount}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="relative shrink-0">
                    <img
                      src={quiz.mascotImage}
                      alt={quiz.shortTitle}
                      className="h-16 w-16 rounded-2xl object-cover border border-amber-100 bg-amber-50/50 p-1 shadow-xs transition group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-amber-700 transition">
                      {quiz.title}
                    </h2>
                    <p className="text-xs font-semibold text-neutral-400 mt-0.5 uppercase tracking-wider">
                      {quiz.category}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3 mb-6">
                  {quiz.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-medium">
                  {quiz.questions.length} Pertanyaan Ringkas
                </span>
                <Link
                  to={`/quiz/${quiz.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition group-hover:bg-amber-600 shadow-sm"
                >
                  <span>Mulai Tes</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* In-Feed Google AdSense Banner */}
        <div className="my-8">
          <AdSenseBanner format="auto" />
        </div>

        {/* Why Self-Reflection Quizzes Work */}
        <section className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-white to-amber-50/40 p-8 sm:p-12 mb-16 shadow-xs">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Mengapa Mengetahui Kondisi Mentalmu Itu Penting?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              Kita tidak bisa mengobati luka yang tidak kita akui keberadaannya. Kuis refleksi Nuju dirancang untuk membantumu menyadari beban batin sebelum meledak menjadi krisis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs">
              <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h3 className="font-bold text-neutral-900 text-base mb-2">Affect Labeling (Penamaan Emosi)</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Penelitian neurosains UCLA membuktikan bahwa memberi nama spesifik pada rasa lelah atau cemas menurunkan reaktivitas amigdala secara instan hingga 40%.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h3 className="font-bold text-neutral-900 text-base mb-2">Cognitive Reframing (CBT)</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Hasil tes mengidentifikasi distorsi kognitif seperti katastrofisasi atau perfeksionisme, lalu mengarahkanmu pada sudut pandang pemulihan yang realistis.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                03
              </div>
              <h3 className="font-bold text-neutral-900 text-base mb-2">Langkah Aksi Nyata (Low Friction)</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Bukan cuma skor angka tanpa arti. Kamu mendapatkan 3 rekomendasi mikro dan template curhat suara/teks yang bisa langsung kamu praktekkan di Nuju.
              </p>
            </div>
          </div>
        </section>

        {/* Global Conversion CTA */}
        <section className="rounded-3xl bg-neutral-950 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-lg mb-16">
          <div className="relative z-10 max-w-xl mx-auto">
            <img src={juMain} alt="Ju mascot" className="h-16 w-16 mx-auto mb-4 rounded-full border-2 border-white/20" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ingin Tempat Curhat & Rilis Emosi Setiap Hari?
            </h2>
            <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
              Temui Ju di aplikasi Nuju. Cukup rekam suaramu selama 30 detik saat lelah, dan biarkan Ju merapikan pikiranmu dengan pelukan tanpa penghakiman.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <AppStoreCta label="Unduh Nuju di App Store" />
              <Link to="/app" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition">
                Coba Versi Web Gratis
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom Google AdSense Banner */}
        <div className="my-8">
          <AdSenseBanner format="auto" />
        </div>

        {/* Medical & Ethical Disclaimer */}
        <footer className="border-t border-neutral-200 pt-8 pb-12 text-center text-xs text-neutral-400 max-w-2xl mx-auto space-y-2">
          <p className="font-medium text-neutral-500">
            ⚠️ <strong>Catatan Etika & Medis:</strong> Mini tes dan kuis di nuju.app adalah instrumen psikoedukasi dan refleksi diri mandiri, bukan diagnosis klinis atau pengganti konsultasi dengan psikolog/psikiater profesional.
          </p>
          <p>
            Jika kamu mengalami krisis kejiwaan, pikiran untuk menyakiti diri, atau depresi berat, segera hubungi layanan darurat kesehatan mental terdekat atau hotline Sejiwa di 119 ext 8.
          </p>
          <p className="pt-4">
            &copy; {new Date().getFullYear()} Nuju (nuju.app) • All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default QuizHub;
