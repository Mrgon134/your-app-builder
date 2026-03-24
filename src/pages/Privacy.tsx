import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </Link>

        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: March 24, 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">1. Introduction</h2>
            <p>Nuju ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and share your personal information when you use our AI journaling application.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">2. Information We Collect</h2>
            <h3 className="font-semibold text-foreground mt-4">2.1 Information You Provide</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account Information:</strong> Email address, display name, and authentication credentials (including via Google OAuth).</li>
              <li><strong>Journal Entries:</strong> Mood ratings, energy levels, text entries, and voice recordings (if applicable).</li>
              <li><strong>Preferences:</strong> Language, dark mode setting, coach persona preference, and notification settings.</li>
            </ul>
            <h3 className="font-semibold text-foreground mt-4">2.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Usage Data:</strong> App interactions, feature usage, session duration, and streak data.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, and device type.</li>
              <li><strong>AI-Generated Data:</strong> Mood patterns, sentiment analysis, themes, and relationship insights derived from your entries.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide and improve the journaling and AI coaching services.</li>
              <li>Generate personalized mood insights, trends, and weekly summaries.</li>
              <li>Maintain your streak and progress statistics.</li>
              <li>Send notifications and reminders (with your consent).</li>
              <li>Process payments for subscription plans.</li>
              <li>Ensure security and prevent abuse.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">4. AI Processing</h2>
            <p>Your journal entries are processed by AI models to provide insights, coaching responses, and pattern recognition. This processing is done to deliver the core features of the App. AI-generated insights are stored in your account and are only accessible to you. We do not use your personal journal content to train AI models.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">5. Data Sharing</h2>
            <p>We do not sell your personal data. We may share limited information with:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Service Providers:</strong> Hosting (Supabase), authentication (Google), payment processing (Lemon Squeezy), and AI services used to operate the App.</li>
              <li><strong>Social Platforms:</strong> When you voluntarily share mood cards or insights to platforms like TikTok, WhatsApp, X/Twitter, or Telegram, only the generated image/text is shared — not your raw journal data.</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">6. Data Storage & Security</h2>
            <p>Your data is stored securely using industry-standard encryption. Journal entries and personal data are protected with row-level security, ensuring only you can access your own data. We use HTTPS for all data transmission.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">7. Data Retention</h2>
            <p>We retain your data for as long as your account is active. You may request deletion of your account and all associated data at any time by contacting us. Upon account deletion, your data will be permanently removed within 30 days.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">8. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access and download your personal data.</li>
              <li>Correct inaccurate data.</li>
              <li>Delete your account and data.</li>
              <li>Withdraw consent for data processing.</li>
              <li>Object to or restrict certain processing activities.</li>
              <li>Data portability.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">9. Children's Privacy</h2>
            <p>Nuju is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we discover that we have collected such information, we will delete it promptly.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">10. Cookies & Local Storage</h2>
            <p>We use browser local storage to save your preferences (theme, language, notification settings). We do not use third-party tracking cookies for advertising.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">11. Changes to This Policy</h2>
            <p>We may update this Privacy Policy periodically. We will notify you of significant changes via email or in-app notification. The "Last updated" date at the top reflects the most recent revision.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">12. Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy or your data, contact us at <a href="mailto:hello@nuju.app" className="text-primary hover:underline">hello@nuju.app</a>.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">© 2026 Nuju. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
