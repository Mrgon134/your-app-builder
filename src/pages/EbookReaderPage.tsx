import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Download,
  Sparkles,
  Printer,
  ChevronLeft,
  ChevronRight,
  Check,
  Copy,
  Heart,
  Brain,
  Share2,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import {
  EBOOK_METADATA,
  EBOOK_CHAPTERS,
  EBOOK_DAILY_PROMPTS,
  EbookChapter,
} from "@/data/ebook-content";
import { toast } from "sonner";

export const EbookReaderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"chapters" | "prompts">("chapters");
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activePromptDay, setActivePromptDay] = useState(1);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const activeChapter: EbookChapter = EBOOK_CHAPTERS[activeChapterIndex] || EBOOK_CHAPTERS[0];
  const activePrompt =
    EBOOK_DAILY_PROMPTS.find((p) => p.day === activePromptDay) || EBOOK_DAILY_PROMPTS[0];

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    toast.success("Prompt journaling berhasil disalin!");
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 selection:bg-amber-200 print:bg-white print:text-black">
      <SEOHead
        title={`Baca: ${activeChapter.title} | eBook Nuju`}
        description={activeChapter.subtitle}
        canonical="https://nuju.app/ebook/read"
        language="id"
      />

      {/* Reader Top Navbar (Hidden on Print) */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-[#FAF8F5]/90 backdrop-blur-md print:hidden">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            to="/ebook"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Info Buku</span>
          </Link>

          <div className="flex items-center gap-2 font-serif text-sm sm:text-base font-bold text-neutral-900">
            <span>Berdamai dengan Pikiran Sendiri</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition shadow-2xs"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Cetak / Simpan PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Purchase Success Banner */}
      {searchParams.get("purchased") === "true" && (
        <div className="bg-emerald-600 text-white px-4 py-3 text-center text-xs sm:text-sm font-bold shadow-sm print:hidden">
          🎉 Pembayaran Berhasil! Selamat membaca buku "Berdamai dengan Pikiran Sendiri". Akses bacaan interaktifmu telah aktif.
        </div>
      )}

      {/* VIP Welcome Banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 text-center text-xs text-amber-900 font-medium print:hidden">
        <span>
          🎁 Bonus Khusus Pembaca: Gunakan kode voucher <strong className="font-mono bg-amber-200/60 px-2 py-0.5 rounded text-amber-950 font-bold">{EBOOK_METADATA.discountVoucherCode}</strong> saat checkout di aplikasi Nuju untuk akses diskon VIP!
        </span>
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Reader Mode Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10 print:hidden">
          <button
            onClick={() => setActiveTab("chapters")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition shadow-xs ${
              activeTab === "chapters"
                ? "bg-neutral-900 text-white"
                : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>12 Bab Buku &amp; Sains CBT</span>
          </button>

          <button
            onClick={() => setActiveTab("prompts")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition shadow-xs ${
              activeTab === "prompts"
                ? "bg-neutral-900 text-white"
                : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>30 Hari Prompt Refleksi Ju</span>
          </button>
        </div>

        {/* TAB 1: CHAPTERS READER */}
        {activeTab === "chapters" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Chapter Selector (Print: Hidden) */}
            <div className="lg:col-span-4 rounded-3xl border border-neutral-200 bg-white p-5 shadow-xs print:hidden space-y-2 max-h-[600px] overflow-y-auto">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 px-2 mb-2">
                Daftar Bab
              </h3>
              {EBOOK_CHAPTERS.map((ch, idx) => {
                const isActive = idx === activeChapterIndex;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChapterIndex(idx)}
                    className={`w-full text-left p-3 rounded-2xl transition text-xs sm:text-sm flex flex-col gap-0.5 ${
                      isActive
                        ? "bg-amber-100/70 border border-amber-300 text-amber-950 font-bold"
                        : "hover:bg-neutral-50 text-neutral-700"
                    }`}
                  >
                    <span className="text-[10px] font-bold text-amber-700 uppercase">
                      Bab {ch.chapterNumber}
                    </span>
                    <span className="leading-snug">{ch.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Chapter Reading Canvas */}
            <article className="lg:col-span-8 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-12 shadow-xs space-y-6">
              <div className="border-b border-neutral-100 pb-6">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  {activeChapter.part}
                </span>
                <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-neutral-900 mt-2 leading-tight">
                  {activeChapter.title}
                </h1>
                <p className="mt-2 text-sm sm:text-base text-neutral-500 italic">
                  {activeChapter.subtitle}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-neutral-400">
                  <span>Estimasi baca: {activeChapter.readingTimeMinutes} menit</span>
                  <span>•</span>
                  <span>Oleh {EBOOK_METADATA.authors[0]}</span>
                </div>
              </div>

              {/* Chapter Paragraphs */}
              <div className="prose prose-neutral max-w-none text-sm sm:text-base leading-relaxed text-neutral-800 space-y-4 font-serif">
                {activeChapter.content.map((p, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {/* Key Takeaways Box */}
              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-6 space-y-3">
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <span>Rangkuman Inti Bab Ini:</span>
                </h4>
                <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-neutral-800">
                  {activeChapter.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx}>{takeaway}</li>
                  ))}
                </ul>
              </div>

              {/* Actionable Exercise (if present) */}
              {activeChapter.actionableExercise && (
                <div className="rounded-2xl border border-indigo-200/80 bg-indigo-50/40 p-6 space-y-4">
                  <h4 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
                    <Brain className="h-4 w-4 text-indigo-600" />
                    <span>{activeChapter.actionableExercise.title}</span>
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-neutral-700">
                    {activeChapter.actionableExercise.instructions.map((inst, idx) => (
                      <p key={idx}>{idx + 1}. {inst}</p>
                    ))}
                  </div>
                  <div className="rounded-xl border border-indigo-200 bg-white p-4">
                    <span className="text-[11px] font-bold text-indigo-800 uppercase block mb-1">
                      Prompt Jurnal untuk Bab Ini:
                    </span>
                    <p className="text-xs sm:text-sm font-mono text-neutral-800 leading-relaxed">
                      "{activeChapter.actionableExercise.samplePrompt}"
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleCopyPrompt(activeChapter.actionableExercise!.samplePrompt)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-700 hover:text-indigo-800"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span>Salin Prompt</span>
                      </button>
                      <span className="text-neutral-300">•</span>
                      <Link
                        to={`/app?screen=journal&prompt=${encodeURIComponent(
                          activeChapter.actionableExercise.samplePrompt
                        )}`}
                        className="text-xs font-bold text-indigo-700 hover:underline"
                      >
                        Tulis di Nuju App →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Chapter Navigation Buttons */}
              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between print:hidden">
                <button
                  disabled={activeChapterIndex === 0}
                  onClick={() => setActiveChapterIndex((i) => Math.max(0, i - 1))}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Bab Sebelumnya</span>
                </button>

                <button
                  disabled={activeChapterIndex === EBOOK_CHAPTERS.length - 1}
                  onClick={() => setActiveChapterIndex((i) => Math.min(EBOOK_CHAPTERS.length - 1, i + 1))}
                  className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 disabled:opacity-40"
                >
                  <span>Bab Selanjutnya</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          </div>
        )}

        {/* TAB 2: 30-DAY PROMPTS PLAYBOOK */}
        {activeTab === "prompts" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                The 30-Day Guided Playbook
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
                Refleksi 5 Menit Malam Hari Bersama Ju
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2">
                Pilih hari di bawah ini untuk membuka lembar refleksi malam ini. Setiap prompt dirancang khusus untuk memulihkan amigdala yang lelah.
              </p>
            </div>

            {/* Day Selector Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
              {EBOOK_DAILY_PROMPTS.map((dp) => {
                const isSelected = dp.day === activePromptDay;
                return (
                  <button
                    key={dp.day}
                    onClick={() => setActivePromptDay(dp.day)}
                    className={`h-9 w-9 rounded-xl text-xs font-bold transition flex items-center justify-center ${
                      isSelected
                        ? "bg-amber-600 text-white shadow-xs"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    {dp.day}
                  </button>
                );
              })}
            </div>

            {/* Prompt Card */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    Hari ke-{activePrompt.day} • Kategori: {activePrompt.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
                    {activePrompt.theme}
                  </h3>
                </div>
              </div>

              {/* Main Prompt */}
              <div className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-6">
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block mb-2">
                  Pertanyaan Refleksi Malam Ini:
                </span>
                <p className="font-serif text-base sm:text-lg text-neutral-900 leading-relaxed italic">
                  "{activePrompt.prompt}"
                </p>
              </div>

              {/* Ju Insight */}
              <div className="rounded-2xl border border-neutral-200 bg-[#FAF8F5] p-5 space-y-2">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                  <span>Catatan Hangat dari Ju:</span>
                </span>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {activePrompt.juInsight}
                </p>
              </div>

              {/* Grounding Mantra */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 space-y-1.5">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  Mantra Penenang Sebelum Tidur:
                </span>
                <p className="text-xs sm:text-sm font-medium text-emerald-950 italic">
                  "{activePrompt.groundingMantra}"
                </p>
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100">
                <button
                  onClick={() => handleCopyPrompt(activePrompt.prompt)}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition shadow-2xs"
                >
                  {copiedText === activePrompt.prompt ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-700">Prompt Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-neutral-500" />
                      <span>Salin Prompt Hari ke-{activePrompt.day}</span>
                    </>
                  )}
                </button>

                <Link
                  to={`/app?screen=journal&prompt=${encodeURIComponent(activePrompt.prompt)}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-700 active:scale-95 transition"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Buka di Nuju App (Prompt Terisi) →</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EbookReaderPage;
