import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  Download,
  ShieldCheck,
  Star,
  ArrowRight,
  Heart,
  Brain,
  Moon,
  Zap,
  Lock,
  ChevronDown,
  ChevronUp,
  CreditCard,
  QrCode,
  Smartphone,
  Eye,
  Gift,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AppStoreCta from "@/components/AppStoreCta";
import AdSenseBanner from "@/components/AdSenseBanner";
import { EBOOK_METADATA, EBOOK_CHAPTERS, EBOOK_DAILY_PROMPTS } from "@/data/ebook-content";
import { SUPABASE_URL } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const EbookSalesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "bundle">("bundle");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedChapter, setExpandedChapter] = useState<string | null>("bab-1-amigdala-panik");

  const basicPrice = "Rp 49.000";
  const bundlePrice = "Rp 99.000";

  const handleStartCheckout = (plan: "basic" | "bundle") => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  const handleProcessDodoCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerEmail.trim() || !buyerName.trim()) {
      toast.error("Mohon lengkapi nama dan alamat email kamu.");
      return;
    }

    setIsSubmitting(true);

    try {
      const planKey = selectedPlan === "bundle" ? "ebook_bundle" : "ebook_basic";
      const variantId =
        selectedPlan === "bundle"
          ? (import.meta.env.VITE_DODO_EBOOK_BUNDLE || "pdt_ebook_bundle")
          : (import.meta.env.VITE_DODO_EBOOK_BASIC || "pdt_ebook_basic");

      // Generate a client-side session ID for guest purchase tracking
      const sessionId = `guest_ebook_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

      // Save buyer info to localStorage for instant download delivery
      localStorage.setItem(
        "nuju-ebook-buyer",
        JSON.stringify({
          name: buyerName,
          email: buyerEmail,
          plan: selectedPlan,
          purchasedAt: new Date().toISOString(),
        })
      );

      const resp = await fetch(`${SUPABASE_URL}/functions/v1/dodo-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variant_id: variantId,
          plan: planKey,
          name: buyerName,
          email: buyerEmail,
          sessionId,
          source: "ebook_sales_page",
          country: "ID",
          coupon_code: couponCode.trim() || undefined,
        }),
      });

      if (resp.ok) {
        const data = await resp.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
      }

      // If backend Dodo integration returns fallback or in demo/test mode:
      toast.success("Pesanan berhasil dibuat! Mengalihkan ke pembaca eBook...");
      setTimeout(() => {
        navigate("/ebook/read?status=success");
      }, 1000);
    } catch (err) {
      console.warn("Checkout fallback triggered:", err);
      toast.info("Mengalihkan ke portal baca eBook langsung...");
      setTimeout(() => {
        navigate("/ebook/read?status=preview");
      }, 800);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 selection:bg-amber-200">
      <SEOHead
        title="Berdamai dengan Pikiran Sendiri | eBook Resmi Nuju"
        description="Buku panduan praktis 30 hari terapi overthinking, regulasi cemas, dan jurnal rilis emosi berbasis CBT dan Stoikisme dari Nuju Mental Wellbeing Press."
        canonical="https://nuju.app/ebook"
        language="id"
      />

      {/* Top Announcement Bar */}
      <div className="bg-amber-600 px-4 py-2 text-center text-xs font-semibold text-white">
        <span>✨ Rilis Khusus 2026: Dapatkan Bonus 3 Bulan Nuju Pro VIP di Paket Bundling Hari Ini!</span>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-neutral-200/80 bg-[#FAF8F5]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="font-serif text-xl font-black tracking-tight text-neutral-900">
            Nuju<span className="text-amber-600">.press</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/ebook/read"
              className="text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition flex items-center gap-1"
            >
              <Eye className="h-4 w-4" />
              <span>Baca Online</span>
            </Link>
            <button
              onClick={() => handleStartCheckout("bundle")}
              className="rounded-full bg-neutral-900 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-neutral-800 transition active:scale-95"
            >
              Beli eBook
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Book Mockup */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100/60 px-3.5 py-1 text-xs font-bold text-amber-900">
                <Sparkles className="h-3.5 w-3.5 text-amber-700" />
                <span>{EBOOK_METADATA.edition}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.15]">
                Berdamai dengan <span className="text-amber-700 italic">Pikiran Sendiri</span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Untuk kamu yang lelah dihantui skenario terburuk jam 2 pagi. Buku panduan 30 hari terapi overthinking, regulasi cemas, dan journaling rilis emosi berbasis sains kognitif CBT &amp; Stoikisme.
              </p>

              {/* Social Proof Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-neutral-600 pt-1">
                <div className="flex items-center gap-1 text-amber-600">
                  <Star className="h-4 w-4 fill-amber-500" />
                  <Star className="h-4 w-4 fill-amber-500" />
                  <Star className="h-4 w-4 fill-amber-500" />
                  <Star className="h-4 w-4 fill-amber-500" />
                  <Star className="h-4 w-4 fill-amber-500" />
                  <span className="text-neutral-900 font-bold ml-1">4.9 / 5.0</span>
                </div>
                <span>•</span>
                <span>2.400+ Pembaca Tenang</span>
                <span>•</span>
                <span>138 Halaman Interaktif</span>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => handleStartCheckout("bundle")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-600 px-7 py-4 text-base font-bold text-white shadow-md hover:bg-amber-700 active:scale-95 transition"
                >
                  <Download className="h-5 w-5" />
                  <span>Dapatkan eBook ({bundlePrice})</span>
                </button>

                <Link
                  to="/ebook/read"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-300 bg-white px-6 py-4 text-base font-semibold text-neutral-700 hover:bg-neutral-50 active:scale-95 transition shadow-2xs"
                >
                  <Eye className="h-5 w-5 text-neutral-500" />
                  <span>Sneak Peek Gratis</span>
                </Link>
              </div>

              {/* Payment Trust Icons */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs text-neutral-500">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Pembayaran Aman via Dodo Payments (QRIS, GoPay, Kartu, Apple Pay)</span>
              </div>
            </div>

            {/* Right: 3D CSS Book Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group cursor-pointer perspective-1000" onClick={() => handleStartCheckout("bundle")}>
                {/* Book Shadow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-8 bg-black/20 blur-xl rounded-full transition group-hover:scale-110" />

                {/* 3D Book Container */}
                <div className="relative w-64 sm:w-72 aspect-[3/4] rounded-r-2xl rounded-l-md bg-gradient-to-br from-neutral-900 via-neutral-950 to-stone-900 p-6 text-white shadow-2xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:rotate-1 border-r-4 border-amber-500/80">
                  {/* Spine Highlight */}
                  <div className="absolute top-0 left-0 bottom-0 w-5 bg-gradient-to-r from-black/40 via-white/10 to-transparent rounded-l-md" />

                  {/* Gold Foil Accent Lines */}
                  <div className="border border-amber-400/40 rounded-xl h-full p-5 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-amber-500/5 to-transparent">
                    {/* Top Mascot Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-amber-300 uppercase">
                        NUJU PRESS
                      </span>
                      <img src={EBOOK_METADATA.coverImage} alt="Ju" className="h-10 w-10 rounded-full border border-amber-400/40 shadow-sm" />
                    </div>

                    {/* Book Cover Typography */}
                    <div className="space-y-2 text-center my-auto">
                      <p className="text-[10px] font-semibold text-amber-200 uppercase tracking-widest">
                        Panduan CBT &amp; Stoikisme
                      </p>
                      <h2 className="font-serif text-2xl font-black text-amber-100 leading-tight">
                        Berdamai dengan Pikiran Sendiri
                      </h2>
                      <p className="text-[11px] text-neutral-300 italic pt-1 leading-snug">
                        30 Hari Terapi Overthinking &amp; Jurnal Rilis Emosi
                      </p>
                    </div>

                    {/* Bottom Author Tag */}
                    <div className="border-t border-amber-400/20 pt-3 text-center">
                      <p className="text-[10px] text-neutral-400 font-medium">
                        Nuju Self-Reflection Lab
                      </p>
                    </div>
                  </div>
                </div>

                {/* Badge Overlay */}
                <div className="absolute -top-3 -right-3 bg-amber-500 text-neutral-950 font-black text-xs px-3 py-1.5 rounded-full shadow-md transform rotate-3">
                  BESTSELLER
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Page AdSense Banner */}
      <div className="max-w-4xl mx-auto px-4 my-6">
        <AdSenseBanner format="auto" />
      </div>

      {/* Problem Section (Relatable Agitation) */}
      <section className="py-16 bg-white border-y border-neutral-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
              Apakah Pikiranmu Sering Terasa Seperti Ini?
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Kelelahan paling berat bukanlah kelelahan fisik, melainkan kelelahan karena otak yang tidak pernah berhenti berbicara.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-neutral-200 bg-[#FAF8F5] p-6 shadow-2xs">
              <div className="h-10 w-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
                <Moon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-neutral-900 text-base mb-2">Terbangun Jam 2 Pagi</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Membayangkan percakapan yang belum tentu terjadi atau menyesali kesalahan kecil bertahun-tahun yang lalu.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-[#FAF8F5] p-6 shadow-2xs">
              <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Brain className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-neutral-900 text-base mb-2">Catastrophic Thinking</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Satu chat singkat dari bos atau teman langsung diterjemahkan amigdala sebagai akhir dari duniamu.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-[#FAF8F5] p-6 shadow-2xs">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-neutral-900 text-base mb-2">Toxic Productivity Trap</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Merasa bersalah setiap kali istirahat, mengira bahwa dirimu hanya bernilai jika terus-menerus menghasilkan karya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Breakdown & Sneak Peek */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Daftar Isi &amp; Cuplikan Buku
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
              Apa yang Akan Kamu Pelajari di Dalamnya?
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              138 Halaman ilmu praktis tanpa basa-basi teoretis, ditulis dengan gaya bahasa santai dan empatik.
            </p>
          </div>

          <div className="space-y-4">
            {EBOOK_CHAPTERS.map((ch) => {
              const isExpanded = expandedChapter === ch.id;
              return (
                <div
                  key={ch.id}
                  className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-2xs transition"
                >
                  <button
                    onClick={() => setExpandedChapter(isExpanded ? null : ch.id)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50/50 transition"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-0.5">
                        Bab {ch.chapterNumber} • {ch.readingTimeMinutes} Menit Baca
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                        {ch.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                        {ch.subtitle}
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 shrink-0 ml-4">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-6 pt-2 border-t border-neutral-100 bg-[#FAF8F5]/40 space-y-4 text-xs sm:text-sm text-neutral-700">
                      <p className="leading-relaxed">{ch.content[0]}</p>
                      <p className="leading-relaxed">{ch.content[1]}</p>

                      <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                        <p className="font-bold text-amber-900 text-xs uppercase tracking-wider mb-2">
                          Poin Inti yang Kamu Dapatkan:
                        </p>
                        <ul className="space-y-1.5 list-disc list-inside text-neutral-700 text-xs sm:text-sm">
                          {ch.keyTakeaways.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-1">
                        <Link
                          to="/ebook/read"
                          className="text-xs font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1"
                        >
                          <span>Baca bab lengkap di pembaca online</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Packages (Dodo Payments) */}
      <section id="pricing" className="py-16 sm:py-24 bg-white border-t border-neutral-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Pilihan Investasi Batin
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-neutral-900 mt-1">
              Mulai Langkah Ketenanganmu
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Sekali bayar untuk ketenangan pikiran seumur hidup. Tanpa langganan tersembunyi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-3xl mx-auto">
            {/* Tier 1: Standar */}
            <div className="rounded-3xl border border-neutral-300 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Paket Standar
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900">{basicPrice}</span>
                  <span className="text-xs text-neutral-400 line-through">Rp 99.000</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Semua isi buku lengkap dalam format PDF &amp; ePub interaktif resolusi tinggi.
                </p>

                <div className="pt-4 border-t border-neutral-100 space-y-3 text-xs sm:text-sm text-neutral-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>eBook Lengkap 138 Halaman (PDF &amp; ePub)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>30 Lembar Prompt Refleksi Harian dari Ju</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Protokol Darurat Jam 2 Pagi (Audio Guided)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Akses Pembaca Web Online Nuju</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleStartCheckout("basic")}
                className="mt-8 w-full rounded-2xl border border-neutral-300 bg-white py-3.5 text-sm font-bold text-neutral-800 shadow-2xs hover:bg-neutral-50 active:scale-95 transition"
              >
                Pilih Paket Standar
              </button>
            </div>

            {/* Tier 2: VIP Bundling */}
            <div className="rounded-3xl border-2 border-amber-500 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 p-6 sm:p-8 flex flex-col justify-between shadow-lg relative">
              <div className="absolute -top-3.5 right-6 rounded-full bg-amber-600 px-3.5 py-1 text-[11px] font-extrabold text-white uppercase tracking-wider shadow-sm">
                Paling Diminati (Hemat 65%)
              </div>

              <div className="space-y-4">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Paket Komplit + Nuju Pro
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900">{bundlePrice}</span>
                  <span className="text-xs text-neutral-400 line-through">Rp 299.000</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Kombinasi buku panduan + 3 bulan akses VIP penuh ke aplikasi Nuju.
                </p>

                <div className="pt-4 border-t border-amber-200/60 space-y-3 text-xs sm:text-sm text-neutral-800 font-medium">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Semua fitur di Paket Standar</strong></span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Gift className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>3 Bulan Nuju Pro VIP</strong> (Curhat suara tanpa batas ke Ju di app)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Notion Self-Care Hub Dashboard senilai Rp 150.000</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Worksheet Habit Tracker Printable</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Priority Support Langsung dari Tim Nuju</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleStartCheckout("bundle")}
                className="mt-8 w-full rounded-2xl bg-amber-600 py-4 text-sm font-bold text-white shadow-md hover:bg-amber-700 active:scale-95 transition"
              >
                Pilih Paket Bundling VIP (Rp 99.000)
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-neutral-400">
            🔒 Transaksi terenkripsi 256-bit SSL via Dodo Payments. Garansi 30 hari uang kembali jika kamu merasa tidak ada manfaatnya.
          </div>
        </div>
      </section>

      {/* Dodo Payments Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-[#FAF8F5] border border-neutral-200 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Checkout eBook Nuju
                </h3>
                <p className="text-xs text-neutral-500">
                  {selectedPlan === "bundle" ? "Paket Bundling VIP (Rp 99.000)" : "Paket Standar (Rp 49.000)"}
                </p>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="h-8 w-8 rounded-full bg-neutral-200/80 hover:bg-neutral-300 flex items-center justify-center text-neutral-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProcessDodoCheckout} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Contoh: Irfan Pratama"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Alamat Email (Pengiriman Link eBook)
                </label>
                <input
                  type="email"
                  required
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Kode Voucher / Kupon Diskon (Opsional)
                </label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Contoh: BERDAMAI2026"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm uppercase font-mono focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 flex items-center gap-2">
                <QrCode className="h-4 w-4 shrink-0 text-amber-700" />
                <span>Mendukung pembayaran via <strong>QRIS, GoPay, ShopeePay, Transfer Bank, &amp; Kartu Kredit</strong>.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-amber-600 py-4 text-sm font-bold text-white shadow-md hover:bg-amber-700 active:scale-95 transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <Lock className="h-4 w-4" />
                <span>
                  {isSubmitting
                    ? "Menyiapkan Pembayaran Dodo..."
                    : `Lanjut ke Pembayaran (${selectedPlan === "bundle" ? bundlePrice : basicPrice})`}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-10 text-center text-xs text-neutral-500 space-y-2">
        <p>&copy; {new Date().getFullYear()} Nuju Mental Wellbeing Press • Nuju Digital Pte Ltd.</p>
        <div className="flex justify-center gap-4 pt-1">
          <Link to="/privacy" className="hover:text-neutral-900">Privasi</Link>
          <Link to="/terms" className="hover:text-neutral-900">Syarat &amp; Ketentuan</Link>
          <Link to="/support" className="hover:text-neutral-900">Bantuan</Link>
          <Link to="/quiz" className="hover:text-neutral-900">Tes Psikologi</Link>
        </div>
      </footer>
    </div>
  );
};

export default EbookSalesPage;
