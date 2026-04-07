import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const Support: React.FC = () => {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState<number | null>(0);

  // Go back to the previous page, or to app if no referrer
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/app");
    }
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is Nuju?",
      answer: "Nuju is a 30-second AI journal companion that helps you capture your emotions, discover patterns, and get personalized support from Ju. It combines journaling with AI insights to help you understand yourself better.",
    },
    {
      question: "How do I get started?",
      answer: "Create an account using email or Google, then select your mood for the day. You can either write a quick note or record your thoughts. That's it! Ju will respond with supportive insights.",
    },
    {
      question: "Is my data safe?",
      answer: "Yes. Your journal entries are encrypted and stored securely using Supabase (a trusted backend service). Only you can access your entries—we use row-level security to ensure privacy. We never sell your data or use your journal for AI training.",
    },
    {
      question: "Can I export my data?",
      answer: <>Yes! Go to Settings → Export Data to download your entire journal as a text file. You can also request data export through our <Link to="/contact" className="text-primary hover:underline">contact page</Link>.</>,
    },
    {
      question: "What can Plus unlock?",
      answer: "Plus gives you: unlimited journal entries (Free is limited), full history of all past entries, advanced mood trends and insights, and the ability to see relationship mood maps. Plus costs $4.99/month or $39.99/year (save 33%).",
    },
    {
      question: "What can Pro unlock?",
      answer: "Pro includes everything in Plus, plus: unlimited AI coach conversations, voice journaling, advanced analytics, and early access to new features. Pro costs $9.99/month or $79.99/year (save 33%).",
    },
    {
      question: "How does the AI coach work?",
      answer: "The AI coach (Ju) reads your journal entry and responds with supportive, personalized feedback. You can choose from 4 coach personalities: Gentle Guide (nurturing), Tough Coach (motivating), Wise Sage (philosophical), or Fun Friend (playful). Each personality responds differently to your entries.",
    },
    {
      question: "Can I change my mood or edit an entry?",
      answer: "You can edit an entry right after you write it. To edit past entries, go to your journal history and tap the entry to make changes.",
    },
    {
      question: "What is the mood map?",
      answer: "The mood map (Pro feature) is a visual network that shows how the people in your life affect your mood. It helps you see which relationships are energizing vs. draining, so you can make more intentional choices about your time.",
    },
    {
      question: "Can I use voice journaling?",
      answer: "Voice journaling is a Pro feature. Just tap the mic button instead of typing, record your thoughts for up to 3 minutes, and Ju will transcribe and respond to your entry.",
    },
    {
      question: "How often should I journal?",
      answer: "There's no pressure to journal daily. Even once a week helps Ju learn your patterns. The more you journal, the better the insights, but it's completely your choice. Free accounts can journal up to 3 times per week.",
    },
    {
      question: "Is there a free trial for Plus or Pro?",
      answer: "Yes! You get a 3-day free trial of Plus or Pro when you sign up. No credit card required. After the trial, you can subscribe or go back to Free.",
    },
    {
      question: "Will my subscription auto-renew?",
      answer: "Yes, subscriptions auto-renew monthly or yearly depending on your plan. You can cancel anytime from Settings → Subscription. Cancellation takes effect at the end of your current billing cycle.",
    },
    {
      question: "What if I want to delete my account?",
      answer: "Go to Settings → Account → Delete Account. Your data will be permanently deleted within 30 days. This action cannot be undone, so please be sure before confirming.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 bg-transparent border-none cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Support & FAQ</h1>
        <p className="text-sm text-muted-foreground mb-8">Got a question? We are here to help.</p>

        {/* FAQ Section */}
        <div className="space-y-3 mb-12">
          {faqItems.map((item, idx) => (
            <div key={idx} className="border border-border/40 rounded-lg overflow-hidden transition-all">
              <button
                onClick={() => setOpenId(openId === idx ? null : idx)}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-foreground text-left">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ml-3 ${
                    openId === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openId === idx && (
                <div className="px-4 pb-4 border-t border-border/40 text-muted-foreground">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-card border border-border/40 rounded-2xl p-6 mb-8">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Still need help?</h2>
          <p className="text-muted-foreground mb-4">
            We respond to all inquiries within 24-48 hours. Feel free to reach out with questions, bug reports, or feedback.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Contact Us →
          </Link>
        </div>

        {/* Health Disclaimer Notice */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-8">
          <p className="text-sm text-foreground">
            <strong>Important:</strong> Nuju is not a medical service. If you are in crisis or need immediate mental health support, please <Link to="/medical-disclaimer" className="text-primary hover:underline">read our medical disclaimer</Link> and contact emergency services or a mental health professional.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">© 2026 Nuju. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
            <Link to="/medical-disclaimer" className="text-primary hover:underline">Medical Disclaimer</Link>
            <Link to="/contact" className="text-primary hover:underline">Contact</Link>
            <Link to="/about" className="text-primary hover:underline">About</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
