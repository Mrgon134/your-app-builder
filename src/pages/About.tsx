import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Shield, Sparkles, Code } from "lucide-react";

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 bg-transparent border-none cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">About Nuju</h1>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground/90">
          {/* Mission Section */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg">
              <strong>The 30-second AI journal that understands your life.</strong>
            </p>
            <p className="mt-4">
              Nuju helps you capture your emotions quickly, discover patterns you'd never notice on your own, and get personalized support from Ju, your AI coach companion.
            </p>
            <p className="mt-4">
              We believe mental wellness doesn't require perfection. It just requires showing up—for yourself, for 30 seconds at a time.
            </p>
          </section>

          {/* Why We Built It */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Why We Built This</h2>
            <p>
              Traditional journaling apps feel like homework. Therapy is expensive and hard to access. We wanted to build something in the middle: a tool that's fast enough for real life, safe enough to be honest in, and smart enough to help you understand yourself better.
            </p>
            <p className="mt-4">
              Nuju is for the 3am thought spirals. For the days when you're too overwhelmed to "journal properly." For the moments when you just need someone to listen and reflect back what you're carrying.
            </p>
          </section>

          {/* Our Values */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Our Values</h2>
            <div className="space-y-4 mt-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Privacy First</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your journal is yours alone. We don't sell data, use your entries for AI training, or share with third parties without consent. End-to-end encryption and row-level security by default.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Empowering</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Understand yourself better through reflection, AI-powered insights, and pattern recognition. The goal is clarity—so you can make better decisions about your life.
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
                    Nuju complements—never replaces—professional mental health care. If you're struggling, we encourage you to seek professional support alongside using our app.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Built With */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Built With</h2>
            <div className="flex gap-4 mt-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><strong className="text-foreground">Frontend:</strong> React with TypeScript for a fast, responsive experience</li>
                  <li><strong className="text-foreground">Backend:</strong> Supabase for secure data storage and real-time sync</li>
                  <li><strong className="text-foreground">AI:</strong> Google Gemini for intelligent, empathetic coach responses</li>
                  <li><strong className="text-foreground">Platform:</strong> Available on web, iOS, and Android</li>
                </ul>
              </div>
            </div>
          </section>

          {/* What Makes Us Different */}
          <section className="bg-card border border-border/40 rounded-lg p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">What Makes Nuju Different</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <span className="text-primary font-bold">→</span>
                <span><strong>Fast enough for real life.</strong> Log your mood in 30 seconds, not 30 minutes.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">→</span>
                <span><strong>Safe to be honest.</strong> Your entries are encrypted and private. No judgment, no algorithms selling to advertisers.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">→</span>
                <span><strong>Actually helpful insights.</strong> AI finds patterns humans miss: what affects your mood, who energizes you, what helps you feel better.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">→</span>
                <span><strong>Designed to become a habit.</strong> Not through manipulation—through genuinely being helpful and feeling good to use.</span>
              </li>
            </ul>
          </section>

          {/* Get In Touch */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Get In Touch</h2>
            <p>
              Have feedback, ideas, or just want to say hi? We'd love to hear from you.
            </p>
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

          {/* Footer Note */}
          <section className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Built with ❤️ for people who deserve mental wellness without the pressure.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">© 2026 Nuju. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
            <Link to="/support" className="text-primary hover:underline">Support</Link>
            <Link to="/contact" className="text-primary hover:underline">Contact</Link>
            <Link to="/medical-disclaimer" className="text-primary hover:underline">Medical Disclaimer</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
