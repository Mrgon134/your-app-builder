import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
  plainAnswer?: string;
}

const Support: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openId, setOpenId] = useState<number | null>(0);
  const from = (location.state as any)?.from || "/app?screen=settings";
  const linkState = { from };

  const handleBack = () => {
    navigate(from);
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is Nuju?",
      answer:
        "Nuju is an AI journal companion that helps you capture emotions quickly, discover patterns, and get personalized support from Ju. It combines journaling with AI reflections to help you understand yourself better.",
    },
    {
      question: "How do I get started?",
      answer:
        "Start with the Ju Gets You reveal. You answer a few quick prompts, get a first emotional read, and then decide whether you want to keep going with a full account and ongoing support.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Yes. Your journal entries are stored securely, and we do not sell your data or use your private entries to train general-purpose AI models. Access to account data is limited to you.",
    },
    {
      question: "Can I export my data?",
      answer: (
        <>
          Yes. Go to Settings - Export Data to download your journal. You can
          also request help through our{" "}
          <Link
            to="/contact"
            state={linkState}
            className="text-primary hover:underline"
          >
            contact page
          </Link>
          .
        </>
      ),
      plainAnswer:
        "Yes. Go to Settings - Export Data to download your journal. You can also request help through our contact page.",
    },
    {
      question: "What does paid access unlock?",
      answer:
        "Paid access keeps the full Ju experience open, including deeper reflection, longer history, and more ongoing support after your reveal.",
    },
    {
      question: "What is the difference between annual and lifetime?",
      answer:
        "Annual access renews once per year unless you cancel before renewal. Lifetime is a one-time purchase that keeps Ju unlocked without renewal. Pricing can vary by region.",
    },
    {
      question: "How does the AI companion work?",
      answer:
        "Ju reads your reveal or journal entry and responds with supportive, personalized reflection. The goal is to help you name what is happening, notice patterns, and decide on a gentle next step.",
    },
    {
      question: "Can I edit an entry?",
      answer:
        "You can edit an entry right after you write it. To edit older entries, open your journal history and select the entry you want to update.",
    },
    {
      question: "What is the mood map?",
      answer:
        "The mood map is a visual view of the people, themes, or situations that tend to affect how you feel over time. It helps turn scattered entries into something you can read more clearly.",
    },
    {
      question: "Can I use voice journaling?",
      answer:
        "Yes. On supported plans, you can record your thoughts instead of typing. Ju can transcribe what you say and reflect it back in a more structured way.",
    },
    {
      question: "How often should I journal?",
      answer:
        "There is no pressure to journal every day. Even a few honest check-ins can start showing patterns. The more consistently you use Nuju, the clearer the insights usually become.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "The main onboarding flow starts with the free Ju Gets You reveal. Depending on the offer shown in your region, annual access may include a trial before paid billing begins. Lifetime access is a one-time purchase and does not renew.",
    },
    {
      question: "Will my subscription auto-renew?",
      answer:
        "Annual access renews automatically unless you cancel before renewal. Lifetime access is a one-time payment and does not auto-renew.",
    },
    {
      question: "What if I want to delete my account?",
      answer:
        "Go to Settings - Account - Delete Account. Your data will be permanently deleted within 30 days. This action cannot be undone.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          item.plainAnswer ||
          (typeof item.answer === "string" ? item.answer : ""),
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Support & FAQ"
        description="Get help with Nuju - frequently asked questions, contact info, and guidance for getting the most out of your AI journal."
        canonical="https://nuju.app/support"
        breadcrumbs={[
          { name: "Home", url: "https://nuju.app/" },
          { name: "Support & FAQ", url: "https://nuju.app/support" },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
          Support & FAQ
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Got a question? We are here to help.
        </p>

        <div className="space-y-3 mb-12">
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              className="border border-border/40 rounded-lg overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenId(openId === idx ? null : idx)}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-foreground text-left">
                  {item.question}
                </span>
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

        <div className="bg-card border border-border/40 rounded-2xl p-6 mb-8">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-3">
            Still need help?
          </h2>
          <p className="text-muted-foreground mb-4">
            We respond to inquiries within 24 to 48 hours. Reach out with
            questions, bug reports, or feedback.
          </p>
          <Link
            to="/contact"
            state={linkState}
            className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-8">
          <p className="text-sm text-foreground">
            <strong>Important:</strong> Nuju is not a medical service. If you
            are in crisis or need immediate mental health support, please{" "}
            <Link
              to="/medical-disclaimer"
              state={linkState}
              className="text-primary hover:underline"
            >
              read our medical disclaimer
            </Link>{" "}
            and contact emergency services or a mental health professional.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            &copy; 2026 Nuju. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
            <Link
              to="/privacy"
              state={linkState}
              className="text-primary hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              state={linkState}
              className="text-primary hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              to="/medical-disclaimer"
              state={linkState}
              className="text-primary hover:underline"
            >
              Medical Disclaimer
            </Link>
            <Link
              to="/contact"
              state={linkState}
              className="text-primary hover:underline"
            >
              Contact
            </Link>
            <Link
              to="/about"
              state={linkState}
              className="text-primary hover:underline"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
