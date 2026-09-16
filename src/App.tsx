import React, { Suspense, lazy, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth";
import { LangProvider } from "@/lib/i18n";
import { GeoPricingProvider } from "@/hooks/use-geo-pricing";

// Lazy-load all routes — each page is only downloaded when first visited.
// This splits the bundle and dramatically improves LCP on the landing page.
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const JournalingGuide = lazy(() => import("./pages/JournalingGuide.tsx"));
const Index = lazy(() => import("./pages/Index.tsx"));
const AppPage = lazy(() => import("./pages/AppPage.tsx"));
const AuthPage = lazy(() => import("./pages/AuthPage.tsx"));
const CheckoutComplete = lazy(() => import("./pages/CheckoutComplete.tsx"));
const OnboardingScreen = lazy(() => import("@/components/app/OnboardingScreen"));
const Install = lazy(() => import("./pages/Install.tsx"));
const Terms = lazy(() => import("./pages/Terms.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const MedicalDisclaimer = lazy(() => import("./pages/MedicalDisclaimer.tsx"));
const Support = lazy(() => import("./pages/Support.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const AiJournal = lazy(() => import("./pages/AiJournal.tsx"));
const MoodTracker = lazy(() => import("./pages/MoodTracker.tsx"));
const VoiceJournaling = lazy(() => import("./pages/VoiceJournaling.tsx"));
const QuizHub = lazy(() => import("./pages/QuizHub.tsx"));
const QuizRunner = lazy(() => import("./pages/QuizRunner.tsx"));
const MentalHealthTest = lazy(() => import("./pages/MentalHealthTest.tsx"));
const AttachmentStyleTest = lazy(() => import("./pages/AttachmentStyleTest.tsx"));
const AdhdScreenerTest = lazy(() => import("./pages/AdhdScreenerTest.tsx"));
const SoundSanctuary = lazy(() => import("./pages/SoundSanctuary.tsx"));
const DailyOracleGame = lazy(() => import("./pages/DailyOracleGame.tsx"));
const PanicSosScreen = lazy(() => import("./pages/PanicSosScreen.tsx"));
const InnerChildTest = lazy(() => import("./pages/InnerChildTest.tsx"));
const BurnoutScreenerTest = lazy(() => import("./pages/BurnoutScreenerTest.tsx"));
const BreathworkLab = lazy(() => import("./pages/BreathworkLab.tsx"));
const LoveLanguagesTest = lazy(() => import("./pages/LoveLanguagesTest.tsx"));
const PeoplePleaserTest = lazy(() => import("./pages/PeoplePleaserTest.tsx"));
const BilateralStimulationLab = lazy(() => import("./pages/BilateralStimulationLab.tsx"));
const HspTest = lazy(() => import("./pages/HspTest.tsx"));
const ShadowWorkTest = lazy(() => import("./pages/ShadowWorkTest.tsx"));
const SensoryGroundingLab = lazy(() => import("./pages/SensoryGroundingLab.tsx"));
const ZenBubbleGame = lazy(() => import("./pages/ZenBubbleGame.tsx"));
const EbookSalesPage = lazy(() => import("./pages/EbookSalesPage.tsx"));
const EbookReaderPage = lazy(() => import("./pages/EbookReaderPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const AuthCallback = lazy(() => import("./pages/AuthCallback.tsx"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

// Dark mode is only valid for the in-app screens. On any public marketing
// or content route, strip the `dark` class so light-only layouts (Landing,
// Onboarding, blog, etc.) are not pulled into the dark CSS-variable theme
// the in-app screens use.
const ThemeScope: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!pathname.startsWith("/app")) {
      document.documentElement.classList.remove("dark");
    }
  }, [pathname]);
  return null;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <GeoPricingProvider>
        <LangProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
            <Sonner />
            <BrowserRouter>
              <ThemeScope />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/guides/journaling" element={<JournalingGuide />} />
                  <Route path="/onboarding" element={<OnboardingScreen />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="/checkout/complete" element={<CheckoutComplete />} />
                  <Route path="/install" element={<Install />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/medical-disclaimer" element={<MedicalDisclaimer />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/ai-journal" element={<AiJournal />} />
                  <Route path="/mood-tracker" element={<MoodTracker />} />
                  <Route path="/voice-journaling" element={<VoiceJournaling />} />
                  <Route path="/quiz" element={<QuizHub />} />
                  <Route path="/quiz/mental-health-test" element={<MentalHealthTest />} />
                  <Route path="/quiz/dass-21" element={<MentalHealthTest />} />
                  <Route path="/quiz/tes-kesehatan-mental" element={<MentalHealthTest defaultLang="id" />} />
                  <Route path="/mental-health-test" element={<MentalHealthTest />} />
                  <Route path="/tes-kesehatan-mental" element={<MentalHealthTest defaultLang="id" />} />
                  <Route path="/quiz/attachment-style" element={<AttachmentStyleTest />} />
                  <Route path="/attachment-style-test" element={<AttachmentStyleTest />} />
                  <Route path="/quiz/adhd-screener" element={<AdhdScreenerTest />} />
                  <Route path="/quiz/adhd-test" element={<AdhdScreenerTest />} />
                  <Route path="/adhd-test" element={<AdhdScreenerTest />} />
                  <Route path="/tes-adhd" element={<AdhdScreenerTest defaultLang="id" />} />
                  <Route path="/soundscapes" element={<SoundSanctuary />} />
                  <Route path="/tools/soundscapes" element={<SoundSanctuary />} />
                  <Route path="/focus-sounds" element={<SoundSanctuary />} />
                  <Route path="/game/daily-card" element={<DailyOracleGame />} />
                  <Route path="/game/oracle" element={<DailyOracleGame />} />
                  <Route path="/oracle" element={<DailyOracleGame />} />
                  <Route path="/emergency" element={<PanicSosScreen />} />
                  <Route path="/sos" element={<PanicSosScreen />} />
                  <Route path="/anti-panic" element={<PanicSosScreen />} />
                  <Route path="/quiz/inner-child" element={<InnerChildTest />} />
                  <Route path="/quiz/luka-inner-child" element={<InnerChildTest defaultLang="id" />} />
                  <Route path="/quiz/burnout" element={<BurnoutScreenerTest />} />
                  <Route path="/quiz/burnout-test" element={<BurnoutScreenerTest />} />
                  <Route path="/tes-burnout" element={<BurnoutScreenerTest defaultLang="id" />} />
                  <Route path="/tools/breathwork" element={<BreathworkLab />} />
                  <Route path="/breathe" element={<BreathworkLab />} />
                  <Route path="/quiz/love-languages" element={<LoveLanguagesTest />} />
                  <Route path="/quiz/love-language" element={<LoveLanguagesTest />} />
                  <Route path="/tes-love-language" element={<LoveLanguagesTest defaultLang="id" />} />
                  <Route path="/quiz/people-pleasing" element={<PeoplePleaserTest />} />
                  <Route path="/quiz/boundaries" element={<PeoplePleaserTest />} />
                  <Route path="/tes-people-pleaser" element={<PeoplePleaserTest defaultLang="id" />} />
                  <Route path="/tools/bilateral" element={<BilateralStimulationLab />} />
                  <Route path="/tools/emdr" element={<BilateralStimulationLab />} />
                  <Route path="/emdr" element={<BilateralStimulationLab />} />
                  <Route path="/quiz/hsp" element={<HspTest />} />
                  <Route path="/quiz/highly-sensitive-person" element={<HspTest />} />
                  <Route path="/quiz/sensory-overload" element={<HspTest />} />
                  <Route path="/tes-hsp" element={<HspTest defaultLang="id" />} />
                  <Route path="/quiz/shadow-work" element={<ShadowWorkTest />} />
                  <Route path="/quiz/shadow-test" element={<ShadowWorkTest />} />
                  <Route path="/tes-shadow-work" element={<ShadowWorkTest defaultLang="id" />} />
                  <Route path="/tools/grounding" element={<SensoryGroundingLab />} />
                  <Route path="/tools/54321" element={<SensoryGroundingLab />} />
                  <Route path="/grounding" element={<SensoryGroundingLab />} />
                  <Route path="/game/zen-pop" element={<ZenBubbleGame />} />
                  <Route path="/games/stress-pop" element={<ZenBubbleGame />} />
                  <Route path="/quiz/:quizId" element={<QuizRunner />} />
                  <Route path="/test-psikologi" element={<QuizHub />} />
                  <Route path="/test-psikologi/:quizId" element={<QuizRunner />} />
                  <Route path="/tes-psikologi" element={<QuizHub />} />
                  <Route path="/tes-psikologi/:quizId" element={<QuizRunner />} />
                  <Route path="/ebook" element={<EbookSalesPage />} />
                  <Route path="/buku" element={<EbookSalesPage />} />
                  <Route path="/ebook/read" element={<EbookReaderPage />} />
                  <Route
                    path="/app"
                    element={
                      <ProtectedRoute>
                        <AppPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
        </LangProvider>
      </GeoPricingProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
