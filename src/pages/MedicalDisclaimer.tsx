import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MedicalDisclaimer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Go back to Settings in /app (not browser back which might go to landing)
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

        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Medical Disclaimer</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: April 7, 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Important: Please Read</h2>
            <p>Nuju is a journaling and mood-tracking application designed to help you reflect on your emotions and discover patterns in your emotional well-being. <strong>Nuju is NOT a substitute for professional mental health treatment, therapy, counseling, or medical care.</strong></p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">What Nuju Is</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>A personal journaling tool to capture and reflect on your emotions</li>
              <li>An AI companion that provides supportive responses based on your entries</li>
              <li>A mood tracker to help you identify patterns over time</li>
              <li>A wellness app designed to complement your mental health journey</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">What Nuju Is NOT</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>A medical diagnosis tool</li>
              <li>Mental health treatment or therapy</li>
              <li>A crisis intervention service</li>
              <li>A replacement for professional medical or mental health care</li>
              <li>Medical advice or psychiatric counseling</li>
            </ul>
          </section>

          <section className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <h2 className="font-serif text-xl font-semibold text-red-600 mb-3">⚠️ If You Are In Crisis</h2>
            <p className="mb-4 font-semibold text-foreground">If you are experiencing a mental health crisis, suicidal thoughts, or need immediate help, please:</p>
            <ul className="space-y-2 text-foreground">
              <li><strong>Call emergency services immediately:</strong> 911 (US), 999 (UK), 112 (EU)</li>
              <li><strong>National Suicide Prevention Lifeline (US):</strong> 988 (call or text)</li>
              <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
              <li><strong>International Crisis Lines:</strong> <a href="https://www.iasp.info/resources/Crisis_Centres/" className="text-primary hover:underline">Find help here</a></li>
              <li><strong>Go to your nearest emergency room</strong> or call emergency services in your country</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Use of AI Responses</h2>
            <p>Nuju uses AI to generate supportive responses to your journal entries. These responses are:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Not the same as therapy or professional counseling</li>
              <li>Generated based on patterns in your entries, not clinical evaluation</li>
              <li>Intended to be supportive and reflective, not diagnostic or prescriptive</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Your Responsibility</h2>
            <p>By using Nuju, you acknowledge that you:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Understand this is a journaling app, not a medical or mental health service</li>
              <li>Will seek professional help if you are experiencing mental health concerns that require clinical care</li>
              <li>Will contact emergency services or a mental health professional if you are in crisis</li>
              <li>Take full responsibility for your own mental health and well-being</li>
              <li>Use Nuju as a supplement to, not a replacement for, professional mental health care</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">No Medical Warranty</h2>
            <p>Nuju makes no medical claims, diagnoses, or guarantees about mental health outcomes. The app is provided "as is" without warranty that it will improve your mental health or resolve any emotional or psychological challenges. Your use of Nuju is at your own risk.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Seek Professional Help</h2>
            <p>If you are struggling with mental health, depression, anxiety, suicidal thoughts, or any other emotional difficulty, please reach out to a qualified mental health professional such as:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Therapist or counselor</li>
              <li>Psychiatrist or psychologist</li>
              <li>Your primary care physician</li>
              <li>A mental health crisis service in your area</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Questions?</h2>
            <p>If you have questions about this disclaimer or how to use Nuju safely, please <Link to="/contact" className="text-primary hover:underline">contact us</Link>.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">© 2026 Nuju. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
            <Link to="/support" className="text-primary hover:underline">Support</Link>
            <Link to="/contact" className="text-primary hover:underline">Contact</Link>
            <Link to="/about" className="text-primary hover:underline">About</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;
