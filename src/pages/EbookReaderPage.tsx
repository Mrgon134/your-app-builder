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
  Gift,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import EbookLanguageSelector from "@/components/EbookLanguageSelector";
import EbookAudioWidget from "@/components/EbookAudioWidget";
import EbookVipResourcesModal from "@/components/EbookVipResourcesModal";
import {
  EBOOK_METADATA,
  getLocalizedEbookChapters,
  getLocalizedEbookPrompts,
  EbookChapter,
} from "@/data/ebook-content";
import {
  getEbookTranslations,
  getEbookLanguageMeta,
  EbookLanguageCode,
  EBOOK_LANGUAGES,
} from "@/data/ebook-i18n";
import { toast } from "sonner";

export const EbookReaderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"chapters" | "prompts">("chapters");
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activePromptDay, setActivePromptDay] = useState(1);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isVipModalOpen, setIsVipModalOpen] = useState<boolean>(false);

  const [lang, setLang] = useState<EbookLanguageCode>(() => {
    const urlLang = searchParams.get("lang") as EbookLanguageCode;
    if (urlLang && EBOOK_LANGUAGES.some((l) => l.code === urlLang)) return urlLang;
    try {
      const saved = localStorage.getItem("nuju-ebook-lang") as EbookLanguageCode;
      if (saved && EBOOK_LANGUAGES.some((l) => l.code === saved)) return saved;
      const browserLang = navigator.language?.split("-")[0]?.toLowerCase() as EbookLanguageCode;
      if (browserLang && EBOOK_LANGUAGES.some((l) => l.code === browserLang)) return browserLang;
    } catch {}
    return "id";
  });

  const t = getEbookTranslations(lang);
  const chapters = getLocalizedEbookChapters(lang);
  const prompts = getLocalizedEbookPrompts(lang);

  const activeChapter: EbookChapter = chapters[activeChapterIndex] || chapters[0];
  const activePrompt = prompts.find((p) => p.day === activePromptDay) || prompts[0];

  const currentText =
    activeTab === "chapters"
      ? `${activeChapter.title}. ${activeChapter.subtitle}. ${activeChapter.content.join(" ")}. ${activeChapter.keyTakeaways.join(". ")}`
      : `${activePrompt.theme}. ${activePrompt.prompt}. Catatan Ju: ${activePrompt.juInsight}. Mantra tidur: ${activePrompt.groundingMantra}`;

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    toast.success(t.copiedNotice);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 selection:bg-amber-200 print:bg-white print:text-black pb-24">
      <SEOHead
        title={`Baca: ${activeChapter.title} | ${t.bookTitle}`}
        description={activeChapter.subtitle}
        canonical="https://nuju.app/ebook/read"
        language={lang}
      />

      {/* Reader Top Navbar (Hidden on Print) */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-[#FAF8F5]/90 backdrop-blur-md print:hidden">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            to="/ebook"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t.backToInfo}</span>
          </Link>

          <div className="flex items-center gap-2 font-serif text-sm sm:text-base font-bold text-neutral-900 truncate max-w-[180px] sm:max-w-xs">
            <span>{t.bookTitle}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVipModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 transition shadow-2xs"
            >
              <Gift className="h-3.5 w-3.5 text-amber-600" />
              <span className="hidden sm:inline">VIP Bonus</span>
            </button>
            <EbookLanguageSelector
              currentLang={lang}
              onSelectLang={(newLang) => setLang(newLang)}
              size="sm"
            />
            <a
              href={
                lang === "id"
                  ? "/downloads/Nuju-Ebook-Berdamai-dengan-Pikiran-Sendiri.pdf"
                  : "/downloads/Nuju-Ebook-Peace-Within-Your-Mind-EN.pdf"
              }
              download={
                lang === "id"
                  ? "Nuju-Ebook-Berdamai-dengan-Pikiran-Sendiri.pdf"
                  : "Nuju-Ebook-Peace-Within-Your-Mind-EN.pdf"
              }
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition shadow-2xs"
              title="Unduh File PDF Buku"
            >
              <Download className="h-3.5 w-3.5 text-amber-600" />
              <span className="hidden sm:inline">Unduh PDF</span>
            </a>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition shadow-2xs"
              title="Cetak via Browser"
            >
              <Printer className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Purchase Success Banner with Direct 1-Click Downloads */}
      {searchParams.get("purchased") === "true" && (
        <div className="bg-emerald-600 text-white px-4 py-4 print:hidden shadow-md">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="font-extrabold text-sm sm:text-base flex items-center gap-1.5">
                <span>🎉</span>
                <span>Pembayaran Sukses! Selamat Membaca.</span>
              </span>
              <p className="text-emerald-100 text-xs mt-0.5 max-w-xl leading-relaxed">
                Kamu bisa langsung membaca bukunya secara interaktif di halaman ini, atau unduh file offline-nya ke perangkatmu:
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={
                  lang === "id"
                    ? "/downloads/Nuju-Ebook-Berdamai-dengan-Pikiran-Sendiri.pdf"
                    : "/downloads/Nuju-Ebook-Peace-Within-Your-Mind-EN.pdf"
                }
                download
                className="inline-flex items-center gap-1.5 rounded-xl bg-white text-emerald-950 font-bold px-3.5 py-2 text-xs shadow-sm hover:bg-emerald-50 transition active:scale-95"
              >
                <Download className="h-3.5 w-3.5 text-emerald-700" />
                <span>Unduh PDF Buku</span>
              </a>
              <a
                href="/downloads/Nuju-VIP-Complete-Bundle.zip"
                download="Nuju-VIP-Complete-Bundle.zip"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-900/90 text-white font-bold px-3.5 py-2 text-xs shadow-sm hover:bg-emerald-800 transition active:scale-95"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Unduh Semua File (.ZIP)</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* VIP Welcome Banner */}
      <div
        onClick={() => setIsVipModalOpen(true)}
        className="cursor-pointer bg-amber-500/10 hover:bg-amber-500/20 border-b border-amber-500/20 px-4 py-2.5 text-center text-xs text-amber-900 font-medium print:hidden transition flex items-center justify-center gap-1.5"
      >
        <span>{t.vipVoucherBanner}</span>
        <span className="underline font-bold text-amber-950 ml-1">Klaim Toolkit &rarr;</span>
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
            <span>{t.tabChapters}</span>
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
            <span>{t.tabPrompts}</span>
          </button>
        </div>

        {/* TAB 1: CHAPTERS READER */}
        {activeTab === "chapters" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Chapter Selector (Print: Hidden) */}
            <div className="lg:col-span-4 rounded-3xl border border-neutral-200 bg-white p-5 shadow-xs print:hidden space-y-2 max-h-[600px] overflow-y-auto">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 px-2 mb-2">
                {t.listOfChapters}
              </h3>
              {chapters.map((ch, idx) => {
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
                  <span>Estimasi baca: {activeChapter.readingTimeMinutes} {t.chapterEstimatedRead}</span>
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
                  <span>{t.chapterKeyTakeawaysTitle}</span>
                </h4>
                <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-neutral-800 leading-relaxed">
                  {activeChapter.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx}>{takeaway}</li>
                  ))}
                </ul>
              </div>

              {/* Actionable Exercise (if available) */}
              {activeChapter.actionableExercise && (
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-neutral-900">
                      {activeChapter.actionableExercise.title}
                    </h4>
                  </div>
                  <div className="space-y-1.5 text-xs sm:text-sm text-neutral-600 pl-6 list-decimal">
                    {activeChapter.actionableExercise.instructions.map((ins, idx) => (
                      <p key={idx} className="leading-relaxed">
                        {idx + 1}. {ins}
                      </p>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/50 p-3.5 text-xs sm:text-sm italic text-indigo-950">
                    "{activeChapter.actionableExercise.samplePrompt}"
                  </div>
                </div>
              )}

              {/* Chapter Navigation Bottom */}
              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between print:hidden">
                <button
                  disabled={activeChapterIndex === 0}
                  onClick={() => setActiveChapterIndex(activeChapterIndex - 1)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:hover:bg-white transition"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Bab Sebelumnya</span>
                </button>

                <span className="text-xs text-neutral-400 font-medium">
                  Bab {activeChapterIndex + 1} dari {chapters.length}
                </span>

                <button
                  disabled={activeChapterIndex === chapters.length - 1}
                  onClick={() => setActiveChapterIndex(activeChapterIndex + 1)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-amber-700 disabled:opacity-40 disabled:hover:bg-amber-600 transition"
                >
                  <span>Bab Selanjutnya</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          </div>
        )}

        {/* TAB 2: 30-DAY PROMPTS READER */}
        {activeTab === "prompts" && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Day Selector Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
              {prompts.map((dp) => {
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
                    {lang === "id"
                      ? `Hari ke-${activePrompt.day} • Kategori: ${activePrompt.category}`
                      : `Day ${activePrompt.day} • Category: ${activePrompt.category}`}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
                    {activePrompt.theme}
                  </h3>
                </div>
              </div>

              {/* Main Prompt */}
              <div className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-6">
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block mb-2">
                  {t.reflectionPromptTitle}
                </span>
                <p className="font-serif text-base sm:text-lg text-neutral-900 leading-relaxed italic">
                  "{activePrompt.prompt}"
                </p>
              </div>

              {/* Ju Insight */}
              <div className="rounded-2xl border border-neutral-200 bg-[#FAF8F5] p-5 space-y-2">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                  <span>{t.juWarmNote}</span>
                </span>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {activePrompt.juInsight}
                </p>
              </div>

              {/* Grounding Mantra */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 space-y-1.5">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  {t.bedtimeMantra}
                </span>
                <p className="text-xs sm:text-sm font-medium text-emerald-950 italic">
                  "{activePrompt.groundingMantra}"
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100">
                <button
                  onClick={() => handleCopyPrompt(activePrompt.prompt)}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 active:scale-95 transition"
                >
                  {copiedText === activePrompt.prompt ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">{t.copiedNotice}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-neutral-500" />
                      <span>{t.copyPromptBtn} {activePrompt.day}</span>
                    </>
                  )}
                </button>

                <Link
                  to={`/app?screen=journal&prompt=${encodeURIComponent(activePrompt.prompt)}&lang=${lang}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-700 active:scale-95 transition"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{t.openInNujuApp}</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Ambient Sounds & Audiobook Voice Player */}
      <EbookAudioWidget
        currentText={currentText}
        title={activeTab === "chapters" ? activeChapter.title : activePrompt.theme}
        lang={lang}
        onOpenVipModal={() => setIsVipModalOpen(true)}
      />

      {/* VIP Resources & Bonus Modal */}
      <EbookVipResourcesModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
        lang={lang}
      />
    </div>
  );
};

export default EbookReaderPage;
