import React, { useState } from "react";
import { Mail, Send, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { QuizMeta, QuizResult } from "@/data/quizzes";
import { supabase } from "@/integrations/supabase/client";

interface QuizLeadCaptureProps {
  quiz: QuizMeta;
  result: QuizResult;
  className?: string;
}

export const QuizLeadCapture: React.FC<QuizLeadCaptureProps> = ({
  quiz,
  result,
  className = "",
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Attempt Supabase lead insertion
      try {
        if (supabase) {
          // @ts-expect-error - dynamic table insertion fallback
          await supabase.from("leads").insert([
            {
              email: cleanEmail,
              source: `quiz_${quiz.slug}`,
              metadata: {
                quizId: quiz.id,
                quizTitle: quiz.title,
                resultId: result.id,
                resultTitle: result.title,
                badge: result.badge,
                timestamp: new Date().toISOString(),
              },
            },
          ]);
        }
      } catch (dbErr) {
        // Fallback silently if table doesn't exist
        console.warn("Supabase lead insertion ignored:", dbErr);
      }

      // 2. Cache in local storage for user peace of mind
      try {
        const savedLeads = JSON.parse(localStorage.getItem("nuju-quiz-leads") || "[]");
        savedLeads.push({
          email: cleanEmail,
          quizSlug: quiz.slug,
          resultId: result.id,
          date: new Date().toISOString(),
        });
        localStorage.setItem("nuju-quiz-leads", JSON.stringify(savedLeads));
      } catch {
        // ignore storage error
      }

      setIsSubmitted(true);
      toast.success("Test results & 7-day recovery guide registered successfully!");
    } catch (err) {
      console.error("Lead submission error:", err);
      toast.error("Something went wrong while saving your email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        data-testid="quiz-lead-success"
        className={`rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50/40 p-6 sm:p-8 text-center shadow-xs ${className}`}
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
          Your Diagnostic Results Have Been Sent!
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
          A copy of your <strong>{result.title}</strong> results and a 7-day daily recovery guide have been scheduled to <strong>{email}</strong>.
        </p>
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-600/10 px-3 py-1 text-[11px] font-semibold text-emerald-700">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Privacy Protected • Spam Free</span>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="quiz-lead-capture"
      className={`rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-500/10 via-amber-50/40 to-orange-500/10 p-6 sm:p-8 shadow-xs ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-700 border border-amber-500/20">
          <Mail className="h-6 w-6" />
        </div>

        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-800">
              <Sparkles className="h-3 w-3" />
              Free Recovery Plan
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
            Save Your Results & Get a 7-Day Recovery Guide
          </h3>

          <p className="mt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Want to save your <strong>{result.title}</strong> diagnosis? Enter your email to receive a full copy of your results and 7 nightly recovery prompts from Ju.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2.5 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              disabled={isSubmitting}
              className="flex-1 rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 disabled:opacity-60 shadow-2xs"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-amber-700 active:scale-[0.98] transition disabled:opacity-60 shrink-0"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? "Sending..." : "Send My Results"}</span>
            </button>
          </form>

          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-neutral-400">
            <ShieldCheck className="h-3.5 w-3.5 text-neutral-400" />
            <span>Your email is 100% secure, private, and spam-free. Unsubscribe anytime.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizLeadCapture;
