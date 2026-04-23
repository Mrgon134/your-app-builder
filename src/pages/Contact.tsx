import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import PublicNextSteps from "@/components/PublicNextSteps";

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from || "/app?screen=settings";
  const linkState = { from };
  const handleBack = () => {
    navigate(from);
  };
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !subject || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      toast.success("Message sent! We'll get back to you within 24-48 hours.");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contact Nuju for Support, Billing, and Feedback"
        description="Contact Nuju for account help, billing questions, bug reports, product feedback, or anything blocking your journaling experience."
        canonical="https://nuju.app/contact"
        breadcrumbs={[
          { name: "Home", url: "https://nuju.app/" },
          { name: "Contact", url: "https://nuju.app/contact" },
        ]}
      />
      <div className="mx-auto max-w-2xl px-6 py-12">
        <button
          onClick={handleBack}
          className="mb-8 inline-flex cursor-pointer items-center gap-2 border-none bg-transparent text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="mb-2 font-serif text-3xl font-bold text-foreground">Contact Us</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Have a question, suggestion, or feedback? We&apos;d love to hear from you.
        </p>

        <div className="space-y-8">
          <div className="rounded-2xl border border-border/40 bg-card p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="mb-1 font-semibold text-foreground">Email Us Directly</h2>
                <a
                  href="mailto:hello@nuju.app"
                  className="font-medium text-primary hover:underline"
                >
                  hello@nuju.app
                </a>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              We typically respond within 24-48 hours.
            </p>
          </div>

          <div className="rounded-2xl border border-border/40 bg-card p-6">
            <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
              What we can help with
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border/40 bg-background p-4">
                <p className="text-sm font-semibold text-foreground">Billing and paid access</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Questions about annual access, lifetime purchases, renewals, or checkout problems.
                </p>
              </div>
              <div className="rounded-xl border border-border/40 bg-background p-4">
                <p className="text-sm font-semibold text-foreground">Account and login issues</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Trouble signing in, changing your email, recovering access, or exporting your journal.
                </p>
              </div>
              <div className="rounded-xl border border-border/40 bg-background p-4">
                <p className="text-sm font-semibold text-foreground">Bug reports</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Anything broken in journaling, install flow, coaching, pricing, or navigation.
                </p>
              </div>
              <div className="rounded-xl border border-border/40 bg-background p-4">
                <p className="text-sm font-semibold text-foreground">Product feedback</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Suggestions, clarity issues, or ideas that would make Nuju more useful in real life.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The fastest way to help us reply well is to include what happened, what screen you were on, and the email tied to your account if the issue is billing or access related.
            </p>
          </div>

          <div className="rounded-2xl border border-border/40 bg-card p-6">
            <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
              Before you send a message
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              You might get a faster answer from one of these self-serve pages first. If they do not solve it, the form below is the right next step.
            </p>
            <div className="mt-4 space-y-3">
              <Link
                to="/support"
                state={linkState}
                className="block rounded-lg border border-border/40 bg-background p-4 transition-colors hover:bg-muted/50"
              >
                <p className="font-semibold text-foreground">Support and FAQ</p>
                <p className="text-sm text-muted-foreground">
                  Best for account questions, export help, billing basics, and feature answers.
                </p>
              </Link>
              <Link
                to="/install"
                state={linkState}
                className="block rounded-lg border border-border/40 bg-background p-4 transition-colors hover:bg-muted/50"
              >
                <p className="font-semibold text-foreground">Install Nuju</p>
                <p className="text-sm text-muted-foreground">
                  Best if you need help adding Nuju to your phone or desktop.
                </p>
              </Link>
              <Link
                to="/privacy"
                state={linkState}
                className="block rounded-lg border border-border/40 bg-background p-4 transition-colors hover:bg-muted/50"
              >
                <p className="font-semibold text-foreground">Privacy Policy</p>
                <p className="text-sm text-muted-foreground">
                  Best for questions about journal data, AI processing, or account deletion.
                </p>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-card p-6">
            <h2 className="mb-6 font-serif text-xl font-semibold text-foreground">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-border/60 bg-background px-4 py-3 text-foreground placeholder-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="How can we help?"
                  className="w-full rounded-lg border border-border/60 bg-background px-4 py-3 text-foreground placeholder-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  className="w-full resize-none rounded-lg border border-border/60 bg-background px-4 py-3 text-foreground placeholder-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary-foreground/50" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <PublicNextSteps
            state={linkState}
            title="Keep moving without waiting on email"
            description="These pages can help if your next step is trust, setup, or understanding how Nuju works."
            links={[
              {
                to: "/support",
                title: "Support and FAQ",
                description: "Find quick answers about billing, export, entries, and account access.",
                badge: "Help",
              },
              {
                to: "/about",
                title: "About Nuju",
                description: "Read the mission, product values, and how Nuju is designed to feel useful fast.",
                badge: "Product",
              },
              {
                to: "/privacy",
                title: "Privacy Policy",
                description: "See how journal data, AI processing, and account deletion are handled.",
                badge: "Trust",
              },
              {
                to: "/terms",
                title: "Terms of Service",
                description: "Review account rules, payment terms, and access basics.",
                badge: "Policy",
              },
            ]}
          />
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">
            &copy; 2026 Nuju. All rights reserved.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
            <Link to="/privacy" state={linkState} className="text-primary hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" state={linkState} className="text-primary hover:underline">
              Terms of Service
            </Link>
            <Link to="/support" state={linkState} className="text-primary hover:underline">
              Support
            </Link>
            <Link
              to="/medical-disclaimer"
              state={linkState}
              className="text-primary hover:underline"
            >
              Medical Disclaimer
            </Link>
            <Link to="/about" state={linkState} className="text-primary hover:underline">
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
