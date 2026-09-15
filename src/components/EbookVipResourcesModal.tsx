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
    toast.success("VIP Voucher code copied to clipboard!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

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
                VIP Resource Toolkit & Bonus Hub
              </h3>
              <p className="text-xs text-neutral-500">
                Exclusive Notion templates, printable workbooks, and Nuju Pro VIP voucher
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
            { id: "printable", label: "Printable Workbook", icon: FileText },
            { id: "voucher", label: "Nuju Pro Voucher", icon: Sparkles },
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
                  Ready-to-Use Notion Template
                </span>
                <h4 className="text-base font-bold text-neutral-900">
                  Nuju Self-Care Hub & 30-Day Mind Journal
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Full Notion workspace template featuring daily emotional logs, 30-day CBT/Stoic prompts database, and a decatastrophizing thought record matrix.
                </p>
              </div>

              <div className="space-y-2 text-xs text-neutral-700 bg-white p-4 rounded-2xl border border-neutral-200">
                <p className="font-bold text-neutral-900">
                  Template Key Features:
                </p>
                <ul className="list-disc list-inside space-y-1 text-neutral-600">
                  <li>Daily Mood & Energy Slider Tracker</li>
                  <li>30 Days Interactive Prompt Check-ins</li>
                  <li>Cognitive Distortion Thought Record</li>
                  <li>Self-Compassion & Bedtime Affirmations Board</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href="https://nuju.notion.site/Nuju-30-Day-Self-Care-Hub-Template-112e5c8e874980a0a91be14a42823a35"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-4 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-neutral-800 transition active:scale-98"
                >
                  <span>Duplicate Notion Template</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="/downloads/Nuju-VIP-Notion-Template-Guide-Dan-Voucher.pdf"
                  download="Nuju-VIP-Notion-Template-Guide-Dan-Voucher.pdf"
                  className="flex items-center justify-center gap-1.5 rounded-2xl border border-neutral-300 bg-white px-4 py-3.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition"
                  title="Download Guide PDF"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Guide PDF</span>
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: PRINTABLE WORKBOOK */}
          {activeTab === "printable" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-3">
                <h4 className="text-base font-bold text-neutral-900">
                  30-Day Printable Habit & Reflection Sheet
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  For readers who prefer tactile journaling with pen and paper. Formatted for high-quality A4/Letter home printing.
                </p>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-xs space-y-1 text-neutral-600">
                  <p className="font-semibold text-neutral-800">
                    How to Print / Save as PDF:
                  </p>
                  <p>
                    1. Click the 'Download Workbook PDF' button below.
                  </p>
                  <p>
                    2. Or choose 'Print Dialog' to print immediately from your browser.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <a
                    href="/downloads/Nuju-30-Hari-Printable-Workbook-Habit-Tracker.pdf"
                    download="Nuju-30-Hari-Printable-Workbook-Habit-Tracker.pdf"
                    className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-amber-600 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-amber-700 transition active:scale-98 text-center"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Workbook PDF (280 KB)</span>
                  </a>
                  <button
                    onClick={() => {
                      onClose();
                      window.print();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-neutral-800 transition active:scale-98"
                  >
                    <span>Print Dialog</span>
                  </button>
                </div>
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
                    Nuju Pro Web App VIP Access
                  </h4>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  As a verified reader, unlock unlimited AI reflections, voice journaling, and weekly emotional pattern tracking in the Nuju Web App.
                </p>

                <div className="flex items-center justify-between rounded-xl bg-white border border-amber-200 p-3.5">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                      VIP Voucher Code
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
                    <span>{copiedCode ? "Copied!" : "Copy"}</span>
                  </button>
                </div>

                <a
                  href="/app?source=ebook_vip_claim"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-neutral-800 transition"
                >
                  <span>Open Nuju Web App & Activate</span>
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
                    5-4-3-2-1 Sensory Grounding
                  </h4>
                </div>
                <p className="text-xs text-neutral-600">
                  Use this when racing thoughts or panic strike. Pull your attention back to the physical present:
                </p>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-neutral-200">
                    <span className="font-bold text-indigo-600 min-w-[20px]">5</span>
                    <span>Notice 5 things you can SEE around you right now.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-neutral-200">
                    <span className="font-bold text-indigo-600 min-w-[20px]">4</span>
                    <span>Notice 4 things you can physically TOUCH (fabric, table, phone).</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-neutral-200">
                    <span className="font-bold text-indigo-600 min-w-[20px]">3</span>
                    <span>Notice 3 distinct SOUNDS you can hear (fan, breath, ambient chime).</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-neutral-200">
                    <span className="font-bold text-indigo-600 min-w-[20px]">2</span>
                    <span>Notice 2 SMELLS you can detect in the air.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-neutral-200">
                    <span className="font-bold text-indigo-600 min-w-[20px]">1</span>
                    <span>Notice 1 TASTE or whisper one kind word of compassion to yourself.</span>
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
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EbookVipResourcesModal;
