import React, { useState } from "react";
import {
  X,
  Sparkles,
  Download,
  Copy,
  Check,
  ExternalLink,
  BookMarked,
  ShieldCheck,
  Heart,
  Wind,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { EbookLanguageCode } from "@/data/ebook-i18n";

interface EbookVipResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: EbookLanguageCode;
}

export const EbookVipResourcesModal: React.FC<EbookVipResourcesModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"notion" | "printable" | "sos" | "voucher">("notion");

  if (!isOpen) return null;

  const voucherCode = "NUJUVIP30";

  const handleCopyVoucher = () => {
    navigator.clipboard.writeText(voucherCode);
    setCopiedCode(true);
    toast.success("Kode voucher disalin!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const isId = lang === "id";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-[#FAF8F5] border border-neutral-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-200/80 bg-white px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              🎁
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-neutral-900">
                {isId ? "VIP Resource Toolkit & Bonus Hub" : "VIP Resource Toolkit & Bonus Hub"}
              </h3>
              <p className="text-xs text-neutral-500">
                {isId
                  ? "Akses eksklusif template Notion, lembar kerja cetak, dan voucher Nuju Pro"
                  : "Exclusive Notion templates, printable workbooks, and Nuju Pro voucher"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 bg-neutral-100/60 px-4 py-2 gap-2 overflow-x-auto">
          {[
            { id: "notion", label: "Notion Hub", icon: BookMarked },
            { id: "printable", label: isId ? "Lembar Kerja Cetak" : "Printable Workbook", icon: FileText },
            { id: "voucher", label: isId ? "Voucher Nuju Pro" : "Nuju Pro Voucher", icon: Sparkles },
            { id: "sos", label: "SOS Grounding", icon: Wind },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? "bg-white text-neutral-900 shadow-xs"
                    : "text-neutral-600 hover:bg-white/60"
                }`}
              >
                <Icon className="h-3.5 w-3.5 text-amber-600" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-neutral-800 text-sm">
          {/* TAB 1: NOTION */}
          {activeTab === "notion" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  {isId ? "Template Notion Siap Pakai" : "Ready-to-Use Notion Template"}
                </span>
                <h4 className="text-base font-bold text-neutral-900">
                  Nuju Self-Care Hub & 30-Day Mind Journal
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {isId
                    ? "Template workspace lengkap dengan database pelacak emosi harian, 30 hari prompt CBT & Stoicisme, serta matriks pengurai kecemasan (Catastrophizing Decatastrophizer)."
                    : "Full Notion workspace template featuring daily emotional logs, 30-day CBT/Stoic prompts database, and a decatastrophizing thought record matrix."}
                </p>
              </div>

              <div className="space-y-2 text-xs text-neutral-700 bg-white p-4 rounded-2xl border border-neutral-200">
                <p className="font-bold text-neutral-900">
                  {isId ? "Fitur Utama Template Notion:" : "Template Key Features:"}
                </p>
                <ul className="list-disc list-inside space-y-1 text-neutral-600">
                  <li>{isId ? "Daily Mood & Energy Slider Tracker" : "Daily Mood & Energy Slider Tracker"}</li>
                  <li>{isId ? "30 Days Interactive Prompt Check-ins" : "30 Days Interactive Prompt Check-ins"}</li>
                  <li>{isId ? "Thought Record (Analisis Distorsi Kognitif)" : "Cognitive Distortion Thought Record"}</li>
                  <li>{isId ? "Self-Compassion & Bedtime Affirmations Board" : "Self-Compassion & Bedtime Affirmations Board"}</li>
                </ul>
              </div>

              <a
                href="https://nuju.notion.site/Nuju-30-Day-Self-Care-Hub-Template-112e5c8e874980a0a91be14a42823a35"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-5 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-neutral-800 transition active:scale-98"
              >
                <span>{isId ? "Gandakan Template Notion (Duplicate)" : "Duplicate Notion Template"}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}

          {/* TAB 2: PRINTABLE WORKBOOK */}
          {activeTab === "printable" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-3">
                <h4 className="text-base font-bold text-neutral-900">
                  {isId ? "Lembar Latihan Cetak 30 Hari (Printable PDF)" : "30-Day Printable Habit & Reflection Sheet"}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {isId
                    ? "Bagi kamu yang lebih suka menulis dengan pena dan kertas, lembar kerja ini siap dicetak langsung dalam format A4 atau Letter untuk menemani jurnal fisikmu."
                    : "For readers who prefer tactile journaling with pen and paper. Formatted for high-quality A4/Letter home printing."}
                </p>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-xs space-y-1 text-neutral-600">
                  <p className="font-semibold text-neutral-800">
                    {isId ? "Cara Mengunduh / Mencetak:" : "How to Print / Save as PDF:"}
                  </p>
                  <p>
                    {isId
                      ? "1. Klik tombol 'Buka Mode Cetak PDF' di bawah."
                      : "1. Click the 'Open Printable Layout' button below."}
                  </p>
                  <p>
                    {isId
                      ? "2. Pilih 'Save as PDF' atau pilih printer fisikmu."
                      : "2. Select 'Save as PDF' in your browser's print dialog."}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    window.print();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-amber-700 transition active:scale-98"
                >
                  <Download className="h-4 w-4" />
                  <span>{isId ? "Cetak / Simpan Lembar PDF Sekarang" : "Print / Save PDF Now"}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: VOUCHER */}
          {activeTab === "voucher" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-amber-300/80 bg-gradient-to-br from-amber-500/10 to-amber-500/5 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-600" />
                  <h4 className="text-base font-bold text-neutral-900">
                    {isId ? "Akses VIP Nuju Pro Web App" : "Nuju Pro Web App VIP Access"}
                  </h4>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {isId
                    ? "Sebagai pembaca resmi ebook, kamu berhak menikmati refleksi AI pintar tanpa batas, voice journaling, dan pelacakan pola emosi mingguan."
                    : "As a verified reader, unlock unlimited AI reflections, voice journaling, and weekly emotional pattern tracking in the Nuju Web App."}
                </p>

                <div className="flex items-center justify-between rounded-xl bg-white border border-amber-200 p-3.5">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                      {isId ? "Kode Voucher VIP" : "VIP Voucher Code"}
                    </span>
                    <span className="font-mono text-base font-extrabold text-neutral-900 tracking-wider">
                      {voucherCode}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyVoucher}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800 transition"
                  >
                    {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedCode ? "Tersalin!" : "Salin"}</span>
                  </button>
                </div>

                <a
                  href="/app?source=ebook_vip_claim"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-neutral-800 transition"
                >
                  <span>{isId ? "Buka Nuju Web App & Aktifkan" : "Open Nuju Web App"}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 4: SOS GROUNDING */}
          {activeTab === "sos" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-indigo-600" />
                  <h4 className="text-base font-bold text-neutral-900">
                    {isId ? "Teknik Grounding Sensorik 5-4-3-2-1" : "5-4-3-2-1 Sensory Grounding"}
                  </h4>
                </div>
                <p className="text-xs text-neutral-600">
                  {isId
                    ? "Gunakan ini saat overthinking atau panik melanda. Kembalikan kesadaranmu ke ruang fisik sekarang:"
                    : "Use this when racing thoughts or panic strike. Pull your attention back to the physical present:"}
                </p>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-neutral-200">
                    <span className="font-bold text-indigo-600 min-w-[20px]">5</span>
                    <span>{isId ? "Sebutkan 5 benda yang bisa kamu LIHAT di sekitarmu sekarang." : "Notice 5 things you can SEE around you."}</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-neutral-200">
                    <span className="font-bold text-indigo-600 min-w-[20px]">4</span>
                    <span>{isId ? "Rasakan 4 benda yang bisa kamu SENTUH (tekstur kain baju, meja, lantai)." : "Notice 4 things you can physically TOUCH."}</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-neutral-200">
                    <span className="font-bold text-indigo-600 min-w-[20px]">3</span>
                    <span>{isId ? "Dengarkan 3 SUARA di ruangan atau kejauhan (angin, kipas, detak jam)." : "Notice 3 distinct SOUNDS you can hear."}</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-neutral-200">
                    <span className="font-bold text-indigo-600 min-w-[20px]">2</span>
                    <span>{isId ? "Sadar 2 AROMA di hidungmu (kopi, kayu, parfum lembut)." : "Notice 2 SMELLS you can detect."}</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-neutral-200">
                    <span className="font-bold text-indigo-600 min-w-[20px]">1</span>
                    <span>{isId ? "Katakan 1 RASA di lidahmu atau satu hal baik tentang dirimu saat ini." : "Notice 1 TASTE or whisper one kind word to yourself."}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-neutral-200 bg-white px-6 py-3 flex items-center justify-between">
          <span className="text-[11px] text-neutral-400">
            Nuju • Official Reader Companion
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-neutral-100 hover:bg-neutral-200 px-4 py-1.5 text-xs font-semibold text-neutral-700 transition"
          >
            {isId ? "Tutup" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EbookVipResourcesModal;
