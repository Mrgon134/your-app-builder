import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ArrowLeft, Heart, Shield, Sparkles, Code } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const About: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from || "/app?screen=settings";
  const linkState = { from };

  const handleBack = () => {
    navigate(from);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About Nuju - AI Journaling App for Emotional Wellness"
        description="Learn how Nuju was built - an AI journaling app with mood tracking, private reflection, and a personal AI companion for emotional clarity."
        canonical="https://nuju.app/about"
        breadcrumbs={[
          { name: "Home", url: "https://nuju.app/" },
          { name: "About", url: "https://nuju.app/about" },
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
          About Nuju
        </h1>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground/90">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              Our Mission
            </h2>
            <p className="text-lg">
              <strong>The 30-second AI journal that understands your life.</strong>
            </p>
            <p className="mt-4">
              Nuju helps you capture your emotions quickly, discover patterns
              you would never notice on your own, and get personalized support
              from Ju, your AI companion.
            </p>
            <p className="mt-4">
              We believe mental wellness does not require perfection. It
              requires showing up for yourself, 30 seconds at a time.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              Why We Built This
            </h2>
            <p>
              Traditional journaling apps can feel like homework. Therapy is
              valuable but not always accessible. We wanted to build something
              in the middle: a tool that is fast enough for real life, safe
              enough to be honest in, and smart enough to help you understand
              yourself better.
            </p>
            <p className="mt-4">
              Nuju is for the 3am thought spirals, the days when you are too
              overwhelmed to journal properly, and the moments when you need a
              gentle reflection more than another blank page.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              Our Values
            </h2>
            <div className="space-y-4 mt-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Privacy First</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your journal is yours alone. We do not sell data, use your
                    entries for general AI training, or share private content
                    without consent.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Clarity Over Noise</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    We want reflection to feel useful fast. The goal is not more
                    content. The goal is one clearer read on what is happening
                    inside your life.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Wellness-Focused</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Nuju is designed to support reflection and self-awareness,
                    not replace professional mental health care.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              Built With
            </h2>
            <div className="flex gap-4 mt-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Frontend:</strong> React
                    with TypeScript for a fast, responsive experience
                  </li>
                  <li>
                    <strong className="text-foreground">Backend:</strong>{" "}
                    Supabase for secure data storage and sync
                  </li>
                  <li>
                    <strong className="text-foreground">AI:</strong> A private
                    AI workflow for supportive reflections and pattern discovery
                  </li>
                  <li>
                    <strong className="text-foreground">Platform:</strong> Web
                    first, installable as a progressive web app
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-card border border-border/40 rounded-lg p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              What Makes Nuju Different
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <span className="text-primary font-bold">-&gt;</span>
                <span>
                  <strong>Fast enough for real life.</strong> Log your mood in
                  under a minute, not half an hour.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">-&gt;</span>
                <span>
                  <strong>Safe to be honest.</strong> Private reflection comes
                  first, without pressure to perform.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">-&gt;</span>
                <span>
                  <strong>Actually helpful insight.</strong> Ju looks for
                  emotional patterns that are easy to miss on your own.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">-&gt;</span>
                <span>
                  <strong>Designed to become a habit.</strong> Not through
                  manipulation, but by feeling useful and gentle enough to come
                  back to.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              Get In Touch
            </h2>
            <p>Have feedback, ideas, or just want to say hi? We would love to hear from you.</p>
            <div className="mt-4 flex gap-3">
              <Link
                to="/contact"
                className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/support"
                className="inline-block border border-border/40 text-foreground px-4 py-2 rounded-lg font-semibold hover:bg-muted/50 transition-colors"
              >
                Support & FAQ
              </Link>
            </div>
          </section>

          <section className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Built with care for people who want emotional clarity without more pressure.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            &copy; 2026 Nuju. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
            <Link to="/privacy" state={linkState} className="text-primary hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" state={linkState} className="text-primary hover:underline">
              Terms of Service
            </Link>
            <Link to="/support" state={linkState} className="text-primary hover:underline">
              Support
            </Link>
            <Link to="/contact" state={linkState} className="text-primary hover:underline">
              Contact
            </Link>
            <Link
              to="/medical-disclaimer"
              state={linkState}
              className="text-primary hover:underline"
            >
              Medical Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
