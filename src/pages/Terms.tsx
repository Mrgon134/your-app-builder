import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const from = (location.state as any)?.from || "/app?screen=settings";
    navigate(from);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 bg-transparent border-none cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: March 24, 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>By accessing or using Nuju ("the App"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the App.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">2. Description of Service</h2>
            <p>Nuju is an AI-powered journaling web application that helps users track their moods, write journal entries, receive AI-generated insights, and interact with an AI coach companion named "Ju." The App is available as a progressive web app (PWA) and may be available on mobile app stores.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">3. User Accounts</h2>
            <p>To use certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate and complete information during registration.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">4. User Content</h2>
            <p>You retain ownership of all journal entries, text, and content you create ("User Content"). By using the App, you grant Nuju a limited license to process your User Content solely for the purpose of providing the service, including AI analysis and insights. We do not sell or share your User Content with third parties for advertising purposes.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">5. AI Features</h2>
            <p>The App uses artificial intelligence to provide mood insights, journal analysis, and coaching conversations. AI-generated content is for informational and wellness purposes only and should not be considered medical, psychological, or therapeutic advice. If you are in crisis, please contact a mental health professional or emergency service.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">6. Subscription & Payments</h2>
            <p>Nuju offers free and paid subscription plans. Paid subscriptions are billed on a recurring basis (monthly or annually). You may cancel at any time, and your subscription will remain active until the end of the current billing period. Refunds are handled in accordance with our payment processor's policies.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">7. Prohibited Conduct</h2>
            <p>You agree not to: (a) use the App for any unlawful purpose; (b) attempt to gain unauthorized access to any part of the App; (c) interfere with or disrupt the App's functionality; (d) use automated tools to scrape or collect data from the App; (e) impersonate any person or entity.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">8. Third-Party Integrations</h2>
            <p>The App may integrate with third-party services such as Google (for authentication), TikTok (for social sharing), and payment processors. Your use of these services is subject to their respective terms and privacy policies.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">9. Limitation of Liability</h2>
            <p>Nuju is provided "as is" without warranties of any kind. To the maximum extent permitted by law, Nuju and its operators shall not be liable for any indirect, incidental, or consequential damages arising from your use of the App.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">10. Changes to Terms</h2>
            <p>We may update these Terms from time to time. We will notify users of material changes via email or in-app notification. Continued use after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">11. Contact</h2>
            <p>For questions about these Terms, contact us at <a href="mailto:hello@nuju.app" className="text-primary hover:underline">hello@nuju.app</a>.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">© 2026 Nuju. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
