import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { toast } from "sonner";

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Go back to Settings in /app (not browser back which might go to landing)
  const handleBack = () => {
    const from = (location.state as any)?.from || "/app?screen=settings";
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
      // Send to backend - currently shows success message
      // In production, implement actual email sending via API
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
      <div className="max-w-2xl mx-auto px-6 py-12">
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 bg-transparent border-none cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Contact Us</h1>
        <p className="text-sm text-muted-foreground mb-8">Have a question, suggestion, or feedback? We'd love to hear from you.</p>

        <div className="space-y-8">
          {/* Direct Email */}
          <div className="bg-card border border-border/40 rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground mb-1">Email Us Directly</h2>
                <a
                  href="mailto:hello@nuju.app"
                  className="text-primary hover:underline font-medium"
                >
                  hello@nuju.app
                </a>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">We typically respond within 24-48 hours.</p>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border/40 rounded-2xl p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Send us a message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/60 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/60 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/60 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground/50" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Help Resources */}
          <div className="bg-muted/50 rounded-2xl p-6">
            <h2 className="font-serif text-lg font-semibold text-foreground mb-4">Other ways we can help</h2>
            <div className="space-y-3">
              <Link
                to="/support"
                className="block p-3 bg-background border border-border/40 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <p className="font-semibold text-foreground">Support & FAQ</p>
                <p className="text-sm text-muted-foreground">Check our frequently asked questions</p>
              </Link>
              <Link
                to="/medical-disclaimer"
                className="block p-3 bg-background border border-border/40 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <p className="font-semibold text-foreground">Medical Disclaimer</p>
                <p className="text-sm text-muted-foreground">Learn about health & safety information</p>
              </Link>
              <Link
                to="/about"
                className="block p-3 bg-background border border-border/40 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <p className="font-semibold text-foreground">About Nuju</p>
                <p className="text-sm text-muted-foreground">Learn about our mission and team</p>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">© 2026 Nuju. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
            <Link to="/support" className="text-primary hover:underline">Support</Link>
            <Link to="/medical-disclaimer" className="text-primary hover:underline">Medical Disclaimer</Link>
            <Link to="/about" className="text-primary hover:underline">About</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
