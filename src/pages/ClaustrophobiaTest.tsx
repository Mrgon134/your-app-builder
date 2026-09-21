import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Share2,
  Layers,
  Heart,
  Activity,
  ShieldAlert,
  Shield,
  AlertCircle,
  Wind,
  Compass,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  CLAUSTROPHOBIA_QUESTIONS,
  CLAUSTROPHOBIA_OPTIONS,
  CLAUSTROPHOBIA_SUBSCALE_INFO,
  getClaustrophobiaResult,
  calculateClaustrophobiaSubscales,
  ClaustrophobiaCardLang,
} from "@/data/claustrophobia";
import { ClaustrophobiaShareCardModal } from "@/components/ClaustrophobiaShareCardModal";
import { ClaustrophobiaScoreResult } from "@/lib/generate-quiz-card";

export default function ClaustrophobiaTest() {
  const [lang, setLang] = useState<ClaustrophobiaCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = CLAUSTROPHOBIA_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return CLAUSTROPHOBIA_OPTIONS.map((opt) => ({
      val: opt.value,
      text: opt.label[lang] || opt.label.en,
    }));
  }, [lang]);

  const handleSelectAnswer = (score: number) => {
    const updated = { ...answers, [currentQuestion.id]: score };
    setAnswers(updated);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  const scoreResult: ClaustrophobiaScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getClaustrophobiaResult(total);
    const rawSubscales = calculateClaustrophobiaSubscales(answers);

    return {
      score: total,
      percentage,
      level: levelObj.level,
      profile: {
        title: levelObj.title,
        badge: levelObj.badge,
        summary: levelObj.summary,
        psychology: levelObj.psychology,
        actionProtocol: levelObj.actionProtocol,
      },
      subscales: {
        suffocation_fear_air_flow_panic: {
          score: rawSubscales.suffocation_fear_air_flow_panic,
          percentage: Math.round((rawSubscales.suffocation_fear_air_flow_panic / 12) * 100),
        },
        physical_restriction_entrapment_dread: {
          score: rawSubscales.physical_restriction_entrapment_dread,
          percentage: Math.round((rawSubscales.physical_restriction_entrapment_dread / 12) * 100),
        },
        anticipatory_avoidance_escape_monitoring: {
          score: rawSubscales.anticipatory_avoidance_escape_monitoring,
          percentage: Math.round((rawSubscales.anticipatory_avoidance_escape_monitoring / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const levelInfo = scoreResult.profile;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500/30">
      <SEOHead
        title="Claustrophobia Screener: Free 12-Item Enclosed Space Anxiety Test (CLQ Model)"
        description="Do you panic when elevator doors close, dread windowless rooms or MRI tubes, and avoid crowds? Screen claustrophobia and suffocation fears based on the Rachman CLQ model."
        canonicalUrl="/quiz/claustrophobia"
        schemaType="MedicalWebPage"
      />

      {/* Top Banner Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/test-psikologi"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-sky-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Screeners</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-sky-400 bg-sky-950/60 border border-sky-800/50 px-2.5 py-1 rounded-full">
              Card #112 · Rachman CLQ
            </span>

            {/* Language Selector */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as ClaustrophobiaCardLang)}
              className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg px-2 py-1 outline-hidden focus:border-sky-500"
            >
              <option value="en">English (US)</option>
              <option value="id">Bahasa Indonesia</option>
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* AdSense Top Banner */}
        <div className="mb-6">
          <AdSenseBanner slot="quiz-top" format="horizontal" />
        </div>

        {!isCompleted ? (
          /* ============================================================ */
          /* QUESTION FLOW                                                */
          /* ============================================================ */
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm animate-fade-in">
            {/* Header / Intro */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2">
                <span>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span>{progressPercent}% completed</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Subscale Badge */}
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 bg-sky-950/60 border border-sky-800/40 px-3 py-1 rounded-full">
                <Wind className="w-3.5 h-3.5" />
                {currentQuestion.subscale === "suffocation_fear_air_flow_panic"
                  ? "Suffocation Fear & Air Flow"
                  : currentQuestion.subscale === "physical_restriction_entrapment_dread"
                  ? "Physical Restriction & Entrapment"
                  : "Anticipatory Avoidance & Escape"}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
              {currentQuestion.text[lang] || currentQuestion.text.en}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {answerLabels.map((option) => (
                <button
                  key={option.val}
                  onClick={() => handleSelectAnswer(option.val)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                    answers[currentQuestion.id] === option.val
                      ? "bg-sky-950/70 border-sky-500 text-white shadow-md shadow-sky-950/50"
                      : "bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700"
                  }`}
                >
                  <span className="text-sm sm:text-base font-medium">{option.text}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                      answers[currentQuestion.id] === option.val
                        ? "border-sky-400 bg-sky-500 text-white"
                        : "border-slate-700 group-hover:border-slate-500"
                    }`}
                  >
                    {answers[currentQuestion.id] === option.val && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Back Button */}
            {currentQuestionIndex > 0 && (
              <button
                onClick={handleBack}
                className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous Question
              </button>
            )}
          </div>
        ) : (
          /* ============================================================ */
          /* EVALUATION / RESULTS VIEW                                    */
          /* ============================================================ */
          <div className="space-y-8 animate-fade-in">
            {/* Hero Result Card */}
            <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-sky-800/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                {/* Metric Circular Meter */}
                <div className="relative w-36 h-36 shrink-0 flex items-center justify-center rounded-full bg-slate-950 border-4 border-sky-500/40 shadow-inner">
                  <div className="text-center">
                    <span className="block text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">
                      {scoreResult.percentage}%
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      CLQ Index
                    </span>
                  </div>
                </div>

                {/* Title & Level Badge */}
                <div className="text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/50 text-sky-300 text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    {levelInfo.badge[lang] || levelInfo.badge.en}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    {levelInfo.title[lang] || levelInfo.title.en}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
                    {levelInfo.summary[lang] || levelInfo.summary.en}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => setShareModalOpen(true)}
                  className="flex items-center gap-2 py-2.5 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-lg shadow-sky-600/20 active:scale-95"
                >
                  <Share2 className="w-4 h-4" />
                  Share Instagram Story Card
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retake Test
                </button>
              </div>
            </div>

            {/* Subscale Breakdown */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                Claustrophobia Factor Analysis (CLQ Framework)
              </h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Prof. Jack Rachman's Claustrophobia Questionnaire reveals that enclosed space panic is
                driven by two primary branches: fear of suffocation (airway/ventilation anxiety) and
                fear of restriction (motor entrapment), maintained through anticipatory avoidance.
              </p>

              <div className="space-y-6">
                {/* Pillar 1: Suffocation */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-1">
                    <span className="text-sky-300">
                      {CLAUSTROPHOBIA_SUBSCALE_INFO.suffocation_fear_air_flow_panic.title[lang] ||
                        CLAUSTROPHOBIA_SUBSCALE_INFO.suffocation_fear_air_flow_panic.title.en}
                    </span>
                    <span className="text-slate-400">
                      {scoreResult.subscales.suffocation_fear_air_flow_panic.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mb-1.5">
                    <div
                      className="h-full bg-sky-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${scoreResult.subscales.suffocation_fear_air_flow_panic.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {CLAUSTROPHOBIA_SUBSCALE_INFO.suffocation_fear_air_flow_panic.description[lang] ||
                      CLAUSTROPHOBIA_SUBSCALE_INFO.suffocation_fear_air_flow_panic.description.en}
                  </p>
                </div>

                {/* Pillar 2: Physical Restriction */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-1">
                    <span className="text-amber-400">
                      {CLAUSTROPHOBIA_SUBSCALE_INFO.physical_restriction_entrapment_dread.title[lang] ||
                        CLAUSTROPHOBIA_SUBSCALE_INFO.physical_restriction_entrapment_dread.title.en}
                    </span>
                    <span className="text-slate-400">
                      {scoreResult.subscales.physical_restriction_entrapment_dread.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mb-1.5">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${scoreResult.subscales.physical_restriction_entrapment_dread.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {CLAUSTROPHOBIA_SUBSCALE_INFO.physical_restriction_entrapment_dread.description[
                      lang
                    ] ||
                      CLAUSTROPHOBIA_SUBSCALE_INFO.physical_restriction_entrapment_dread.description
                        .en}
                  </p>
                </div>

                {/* Pillar 3: Anticipatory Avoidance */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-1">
                    <span className="text-rose-400">
                      {CLAUSTROPHOBIA_SUBSCALE_INFO.anticipatory_avoidance_escape_monitoring.title[
                        lang
                      ] ||
                        CLAUSTROPHOBIA_SUBSCALE_INFO.anticipatory_avoidance_escape_monitoring.title.en}
                    </span>
                    <span className="text-slate-400">
                      {scoreResult.subscales.anticipatory_avoidance_escape_monitoring.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mb-1.5">
                    <div
                      className="h-full bg-rose-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${scoreResult.subscales.anticipatory_avoidance_escape_monitoring.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {CLAUSTROPHOBIA_SUBSCALE_INFO.anticipatory_avoidance_escape_monitoring
                      .description[lang] ||
                      CLAUSTROPHOBIA_SUBSCALE_INFO.anticipatory_avoidance_escape_monitoring
                        .description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Cognitive Neuroscience & Psychology */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-400" />
                The Neurobiology of Confinement Panic
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {levelInfo.psychology[lang] || levelInfo.psychology.en}
              </p>
            </div>

            {/* Action Protocol Checklist */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-400" />
                Evidence-Based Cognitive Exposure Protocol
              </h3>
              <ul className="space-y-3">
                {(levelInfo.actionProtocol[lang] || levelInfo.actionProtocol.en).map(
                  (item: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800 text-xs sm:text-sm text-slate-200"
                    >
                      <div className="w-5 h-5 rounded-full bg-sky-950 border border-sky-500/50 text-sky-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        {idx + 1}
                      </div>
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* In-Feed Google AdSense */}
            <div className="my-6">
              <AdSenseBanner slot="quiz-hub-feed" format="horizontal" />
            </div>

            {/* Nuju Voice App CTA */}
            <AppStoreCta />

            {/* Share Card Modal */}
            <ClaustrophobiaShareCardModal
              isOpen={shareModalOpen}
              onClose={() => setShareModalOpen(false)}
              result={scoreResult}
              lang={lang}
            />
          </div>
        )}

        {/* Bottom Auto AdSense Banner */}
        <div className="mt-8">
          <AdSenseBanner slot="auto" format="auto" />
        </div>
      </main>
    </div>
  );
}
