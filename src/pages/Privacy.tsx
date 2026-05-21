import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import PublicNextSteps from "@/components/PublicNextSteps";

const Privacy: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const from = (location.state as { from?: string } | null)?.from || "/";
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Privacy Policy and Data Handling"
        description="Learn how Nuju collects, stores, and protects journal data, account details, and AI-generated insights, plus what happens if you export or delete your account."
        canonical="https://nuju.app/privacy"
        breadcrumbs={[
          { name: "Home", url: "https://nuju.app/" },
          { name: "Privacy Policy", url: "https://nuju.app/privacy" },
        ]}
      />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: April 25, 2026
        </p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              1. Introduction
            </h2>
            <p>
              Nuju ("we," "our," or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, store,
              and share information when you use Nuju's AI journaling app,
              website, and related services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              2. Information We Collect
            </h2>
            <h3 className="font-semibold text-foreground mt-4">
              2.1 Information You Provide
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Account information:</strong> Email address, display
                name, authentication credentials, and optional sign-in provider
                details such as Apple or Google, depending on the platform.
              </li>
              <li>
                <strong>Journal information:</strong> Mood ratings, energy
                levels, text entries, prompts, voice recordings, transcripts,
                photos, selfies, optional location details, and timestamps that
                you choose to save.
              </li>
              <li>
                <strong>AI-generated information:</strong> Reflections,
                summaries, sentiment signals, themes, relationship insights,
                and pattern notes created from your entries.
              </li>
              <li>
                <strong>Preferences:</strong> Language, theme, coach persona,
                notification choices, onboarding answers, and selected plan.
              </li>
              <li>
                <strong>Billing information:</strong> Plan, purchase status,
                product identifiers, and processor references. Full payment
                details are handled by Apple, RevenueCat, Dodo Payments, or
                their payment partners.
              </li>
            </ul>

            <h3 className="font-semibold text-foreground mt-4">
              2.2 Information Collected Automatically
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Usage data:</strong> App interactions, feature usage,
                session timing, streak data, and basic diagnostic events.
              </li>
              <li>
                <strong>Device information:</strong> Browser type, operating
                system, device type, app platform, and approximate region.
              </li>
              <li>
                <strong>Analytics and attribution:</strong> We use product
                analytics to understand app behavior. Marketing attribution
                tools such as the TikTok pixel are used only on web pages, not
                inside the native iOS app.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide journaling, mood tracking, and AI companion features.</li>
              <li>Generate personalized reflections, trends, and summaries.</li>
              <li>Maintain account history, streaks, settings, and saved media.</li>
              <li>Process paid access, subscriptions, refunds, and support requests.</li>
              <li>Send reminders and service messages when you enable them.</li>
              <li>Improve reliability, safety, fraud prevention, and abuse detection.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              4. AI Processing
            </h2>
            <p>
              Nuju processes journal content with AI models to provide
              reflections, supportive responses, transcription, pattern
              recognition, and mood insights. AI-generated insights are stored
              in your account and are intended for your use. We do not use your
              personal journal content to train general-purpose AI models.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              5. Camera, Microphone, Photos, and Location
            </h2>
            <p>
              Nuju asks for camera, microphone, photo library, or location
              permission only when you choose a feature that needs it, such as
              voice journaling, transcription, attaching a photo, taking a
              selfie, or saving a location with a journal moment. You can
              decline these permissions and still use text journaling.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              6. Data Sharing
            </h2>
            <p>
              We do not sell your personal data or raw journal content. We may
              share limited information with:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Service providers:</strong> Supabase for hosting,
                authentication, database, and storage; AI providers for
                reflections and transcription; RevenueCat and Apple for iOS
                purchases; Dodo Payments for web purchases; and PostHog for
                product analytics.
              </li>
              <li>
                <strong>Marketing tools:</strong> Web landing pages may use
                attribution pixels to measure campaign performance. These tools
                are not loaded in the native iOS app.
              </li>
              <li>
                <strong>Voluntary sharing:</strong> If you share a card or
                insight to another platform, only the content you choose to
                share is sent.
              </li>
              <li>
                <strong>Legal requirements:</strong> We may disclose
                information when required by law, court order, or to protect
                our rights, users, and service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              7. Data Storage and Security
            </h2>
            <p>
              Your data is stored with access controls intended to limit access
              to your own account. We use HTTPS for data transmission and
              user-scoped database and storage rules for journal content and
              media. No internet-connected system can be guaranteed perfectly
              secure, but we work to keep the amount of data we collect limited
              and protected.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              8. Data Retention and Account Deletion
            </h2>
            <p>
              We retain your data while your account is active. When you delete
              your account in Settings, Nuju removes your profile, journal
              entries, AI memories, coach messages, onboarding data, and stored
              voice or photo media tied to your account. Some payment,
              security, backup, or legal records may be retained for a limited
              time when required by law or processor obligations.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              9. Your Rights
            </h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access and download your personal data.</li>
              <li>Correct inaccurate data.</li>
              <li>Delete your account and associated data.</li>
              <li>Withdraw consent for optional processing.</li>
              <li>Object to or restrict certain processing activities.</li>
              <li>Request data portability.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              10. Children's Privacy
            </h2>
            <p>
              Nuju is not intended for children under 13 years of age. We do
              not knowingly collect personal information from children under 13.
              If we discover that we have collected such information, we will
              delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              11. Cookies and Local Storage
            </h2>
            <p>
              We use browser storage to save preferences such as theme,
              language, and notification settings. On the web, we may use
              analytics cookies or attribution technologies to understand
              product usage and measure marketing performance. The native iOS
              app does not load web marketing pixels.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              12. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you
              of significant changes via email or in-app notification. The "Last
              updated" date at the top reflects the most recent revision.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              13. Contact Us
            </h2>
            <p>
              If you have questions or concerns about this Privacy Policy or
              your data, contact us at{" "}
              <a href="mailto:hello@nuju.app" className="text-primary hover:underline">
                hello@nuju.app
              </a>
              .
            </p>
          </section>
        </div>

        <PublicNextSteps
          state={{ from: "/privacy" }}
          title="Explore the trust pages around this policy"
          description="If you want the practical details behind privacy, these pages explain support, account rules, and how to use Nuju safely."
          links={[
            {
              to: "/terms",
              title: "Terms of Service",
              description: "Review account rules, paid access terms, and how Nuju should be used.",
              badge: "Policy",
            },
            {
              to: "/support",
              title: "Support and FAQ",
              description: "Find help with export, billing, account access, and everyday questions.",
              badge: "Help",
            },
            {
              to: "/contact",
              title: "Contact Nuju",
              description: "Reach the team if you need help with data, account requests, or feedback.",
              badge: "Support",
            },
            {
              to: "/medical-disclaimer",
              title: "Medical Disclaimer",
              description: "See the safety boundary between journaling support and professional mental health care.",
              badge: "Safety",
            },
          ]}
        />

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            &copy; 2026 Nuju. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
