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
const DopamineDetoxTest = lazy(() => import("./pages/DopamineDetoxTest.tsx"));
const NervousSystemTest = lazy(() => import("./pages/NervousSystemTest.tsx"));
const SleepPacerLab = lazy(() => import("./pages/SleepPacerLab.tsx"));
const ZenBubbleGame = lazy(() => import("./pages/ZenBubbleGame.tsx"));
const RsdScreenerTest = lazy(() => import("./pages/RsdScreenerTest.tsx"));
const CognitiveDistortionsTest = lazy(() => import("./pages/CognitiveDistortionsTest.tsx"));
const NsdrAudioLab = lazy(() => import("./pages/NsdrAudioLab.tsx"));
const DissociationScreenerTest = lazy(() => import("./pages/DissociationScreenerTest.tsx"));
const ImposterSyndromeTest = lazy(() => import("./pages/ImposterSyndromeTest.tsx"));
const SolfeggioHarmonicsLab = lazy(() => import("./pages/SolfeggioHarmonicsLab.tsx"));
const EmotionalAgilityTest = lazy(() => import("./pages/EmotionalAgilityTest.tsx"));
const HighFunctioningAnxietyTest = lazy(() => import("./pages/HighFunctioningAnxietyTest.tsx"));
const BoxBreathingLab = lazy(() => import("./pages/BoxBreathingLab.tsx"));
const ParentificationTest = lazy(() => import("./pages/ParentificationTest.tsx"));
const AlexithymiaTest = lazy(() => import("./pages/AlexithymiaTest.tsx"));
const VocalToningLab = lazy(() => import("./pages/VocalToningLab.tsx"));
const LimerenceTest = lazy(() => import("./pages/LimerenceTest.tsx"));
const SensoryTest = lazy(() => import("./pages/SensoryTest.tsx"));
const PhysiologicalSighLab = lazy(() => import("./pages/PhysiologicalSighLab.tsx"));
const PerfectionismTest = lazy(() => import("./pages/PerfectionismTest.tsx"));
const SocialBatteryTest = lazy(() => import("./pages/SocialBatteryTest.tsx"));
const GaslightingTest = lazy(() => import("./pages/GaslightingTest.tsx"));
const CortisolTest = lazy(() => import("./pages/CortisolTest.tsx"));
const EmotionalAvailabilityTest = lazy(() => import("./pages/EmotionalAvailabilityTest.tsx"));
const BedtimeProcrastinationTest = lazy(() => import("./pages/BedtimeProcrastinationTest.tsx"));
const ChronicGuiltTest = lazy(() => import("./pages/ChronicGuiltTest.tsx"));
const HyperIndependenceTest = lazy(() => import("./pages/HyperIndependenceTest.tsx"));
const EnmeshmentTest = lazy(() => import("./pages/EnmeshmentTest.tsx"));
const FearOfBeingPerceivedTest = lazy(() => import("./pages/FearOfBeingPerceivedTest.tsx"));
const DecisionFatigueTest = lazy(() => import("./pages/DecisionFatigueTest.tsx"));
const FomoTest = lazy(() => import("./pages/FomoTest.tsx"));
const AttachmentCompatibilityTest = lazy(() => import("./pages/AttachmentCompatibilityTest.tsx"));
const ExistentialDreadTest = lazy(() => import("./pages/ExistentialDreadTest.tsx"));
const EmotionalNumbnessTest = lazy(() => import("./pages/EmotionalNumbnessTest.tsx"));
const ToxicIndependenceTest = lazy(() => import("./pages/ToxicIndependenceTest.tsx"));
const CompassionFatigueTest = lazy(() => import("./pages/CompassionFatigueTest.tsx"));
const IntimacyAvoidanceTest = lazy(() => import("./pages/IntimacyAvoidanceTest.tsx"));
const FawnResponseTest = lazy(() => import("./pages/FawnResponseTest.tsx"));
const FinancialAnxietyTest = lazy(() => import("./pages/FinancialAnxietyTest.tsx"));
const SplittingTest = lazy(() => import("./pages/SplittingTest.tsx"));
const ToxicShameTest = lazy(() => import("./pages/ToxicShameTest.tsx"));
const RSDTest = lazy(() => import("./pages/RsdScreenerTest.tsx"));
const DopamineBurnoutTest = lazy(() => import("./pages/DopamineBurnoutTest.tsx"));
const BetrayalTraumaTest = lazy(() => import("./pages/BetrayalTraumaTest.tsx"));
const PdaTest = lazy(() => import("./pages/PdaTest.tsx"));
const FunctionalFreezeTest = lazy(() => import("./pages/FunctionalFreezeTest.tsx"));
const SomaticArmoringTest = lazy(() => import("./pages/SomaticArmoringTest.tsx"));
const DpdrTest = lazy(() => import("./pages/DpdrTest.tsx"));
const FilialGuiltTest = lazy(() => import("./pages/FilialGuiltTest.tsx"));
const CatqTest = lazy(() => import("./pages/CatqTest.tsx"));
const PureOTest = lazy(() => import("./pages/PureOTest.tsx"));
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
                  <Route path="/quiz/mental-health" element={<MentalHealthTest />} />
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
                  <Route path="/tools/panic-sos" element={<PanicSosScreen />} />
                  <Route path="/panic-sos" element={<PanicSosScreen />} />
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
                  <Route path="/tes-hsp" element={<HspTest defaultLang="id" />} />
                  <Route path="/quiz/shadow-work" element={<ShadowWorkTest />} />
                  <Route path="/quiz/shadow-test" element={<ShadowWorkTest />} />
                  <Route path="/tes-shadow-work" element={<ShadowWorkTest defaultLang="id" />} />
                  <Route path="/tools/grounding" element={<SensoryGroundingLab />} />
                  <Route path="/tools/54321" element={<SensoryGroundingLab />} />
                  <Route path="/grounding" element={<SensoryGroundingLab />} />
                  <Route path="/quiz/dopamine-detox" element={<DopamineDetoxTest />} />
                  <Route path="/quiz/screen-addiction" element={<DopamineDetoxTest />} />
                  <Route path="/tes-dopamine" element={<DopamineDetoxTest defaultLang="id" />} />
                  <Route path="/quiz/nervous-system" element={<NervousSystemTest />} />
                  <Route path="/quiz/polyvagal" element={<NervousSystemTest />} />
                  <Route path="/tes-saraf" element={<NervousSystemTest defaultLang="id" />} />
                  <Route path="/tools/sleep" element={<SleepPacerLab />} />
                  <Route path="/tools/478" element={<SleepPacerLab />} />
                  <Route path="/sleep" element={<SleepPacerLab />} />
                   <Route path="/game/zen-pop" element={<ZenBubbleGame />} />
                  <Route path="/games/stress-pop" element={<ZenBubbleGame />} />
                  <Route path="/quiz/rsd" element={<RsdScreenerTest />} />
                  <Route path="/quiz/rsd-screener" element={<RsdScreenerTest />} />
                  <Route path="/tes-rsd" element={<RsdScreenerTest defaultLang="id" />} />
                  <Route path="/quiz/cognitive-distortions" element={<CognitiveDistortionsTest />} />
                  <Route path="/quiz/overthinking" element={<CognitiveDistortionsTest />} />
                  <Route path="/tes-distorsi-kognitif" element={<CognitiveDistortionsTest defaultLang="id" />} />
                  <Route path="/tes-overthinking" element={<CognitiveDistortionsTest defaultLang="id" />} />
                  <Route path="/tools/nsdr" element={<NsdrAudioLab />} />
                  <Route path="/nsdr" element={<NsdrAudioLab />} />
                  <Route path="/tools/yoga-nidra" element={<NsdrAudioLab />} />
                  <Route path="/quiz/dissociation" element={<DissociationScreenerTest />} />
                  <Route path="/quiz/dpdr" element={<DissociationScreenerTest />} />
                  <Route path="/tes-disosiasi" element={<DissociationScreenerTest defaultLang="id" />} />
                  <Route path="/quiz/imposter-syndrome" element={<ImposterSyndromeTest />} />
                  <Route path="/quiz/imposter-test" element={<ImposterSyndromeTest />} />
                  <Route path="/tes-imposter-syndrome" element={<ImposterSyndromeTest defaultLang="id" />} />
                  <Route path="/tes-imposter" element={<ImposterSyndromeTest defaultLang="id" />} />
                  <Route path="/tools/solfeggio" element={<SolfeggioHarmonicsLab />} />
                  <Route path="/tools/brainwaves" element={<SolfeggioHarmonicsLab />} />
                  <Route path="/solfeggio" element={<SolfeggioHarmonicsLab />} />
                  <Route path="/quiz/emotional-agility" element={<EmotionalAgilityTest />} />
                  <Route path="/quiz/agility" element={<EmotionalAgilityTest />} />
                  <Route path="/tes-emotional-agility" element={<EmotionalAgilityTest defaultLang="id" />} />
                  <Route path="/quiz/high-functioning-anxiety" element={<HighFunctioningAnxietyTest />} />
                  <Route path="/quiz/hfa" element={<HighFunctioningAnxietyTest />} />
                  <Route path="/tes-anxiety-tersembunyi" element={<HighFunctioningAnxietyTest defaultLang="id" />} />
                  <Route path="/tools/box-breathing" element={<BoxBreathingLab />} />
                  <Route path="/tools/square-breathing" element={<BoxBreathingLab />} />
                  <Route path="/box-breathing" element={<BoxBreathingLab />} />
                  <Route path="/quiz/parentification" element={<ParentificationTest />} />
                  <Route path="/quiz/eldest-daughter" element={<ParentificationTest />} />
                  <Route path="/tes-anak-pertama" element={<ParentificationTest defaultLang="id" />} />
                  <Route path="/quiz/alexithymia" element={<AlexithymiaTest />} />
                  <Route path="/quiz/tas-20" element={<AlexithymiaTest />} />
                  <Route path="/tes-mati-rasa" element={<AlexithymiaTest defaultLang="id" />} />
                  <Route path="/tools/vocal-toning" element={<VocalToningLab />} />
                  <Route path="/tools/vagal-humming" element={<VocalToningLab />} />
                  <Route path="/vocal-toning" element={<VocalToningLab />} />
                  <Route path="/quiz/limerence" element={<LimerenceTest />} />
                  <Route path="/quiz/obsessive-love" element={<LimerenceTest />} />
                  <Route path="/tes-limerence" element={<LimerenceTest defaultLang="id" />} />
                  <Route path="/quiz/sensory-overload" element={<SensoryTest />} />
                  <Route path="/quiz/empathy-burnout" element={<SensoryTest />} />
                  <Route path="/quiz/sensory-burnout" element={<SensoryTest />} />
                  <Route path="/tes-sensory-overload" element={<SensoryTest defaultLang="id" />} />
                  <Route path="/tools/physiological-sigh" element={<PhysiologicalSighLab />} />
                  <Route path="/tools/cyclic-sighing" element={<PhysiologicalSighLab />} />
                  <Route path="/cyclic-sighing" element={<PhysiologicalSighLab />} />
                  <Route path="/physiological-sigh" element={<PhysiologicalSighLab />} />
                  <Route path="/quiz/perfectionism" element={<PerfectionismTest />} />
                  <Route path="/quiz/fear-of-failure" element={<PerfectionismTest />} />
                  <Route path="/quiz/maladaptive-perfectionism" element={<PerfectionismTest />} />
                  <Route path="/tes-perfeksionisme" element={<PerfectionismTest defaultLang="id" />} />
                  <Route path="/quiz/social-battery" element={<SocialBatteryTest />} />
                  <Route path="/quiz/introvert-hangover" element={<SocialBatteryTest />} />
                  <Route path="/quiz/social-exhaustion" element={<SocialBatteryTest />} />
                  <Route path="/tes-baterai-sosial" element={<SocialBatteryTest defaultLang="id" />} />
                  <Route path="/quiz/gaslighting" element={<GaslightingTest />} />
                  <Route path="/quiz/emotional-manipulation" element={<GaslightingTest />} />
                  <Route path="/tes-gaslighting" element={<GaslightingTest defaultLang="id" />} />
                  <Route path="/quiz/cortisol-stress" element={<CortisolTest />} />
                  <Route path="/quiz/chronic-stress-body" element={<CortisolTest />} />
                  <Route path="/tes-stres-kortisol" element={<CortisolTest defaultLang="id" />} />
                  <Route path="/quiz/emotional-availability" element={<EmotionalAvailabilityTest />} />
                  <Route path="/quiz/vulnerability-test" element={<EmotionalAvailabilityTest />} />
                  <Route path="/tes-ketersediaan-emosional" element={<EmotionalAvailabilityTest defaultLang="id" />} />
                  <Route path="/quiz/revenge-bedtime-procrastination" element={<BedtimeProcrastinationTest />} />
                  <Route path="/quiz/sleep-procrastination" element={<BedtimeProcrastinationTest />} />
                  <Route path="/tes-prokrastinasi-tidur" element={<BedtimeProcrastinationTest defaultLang="id" />} />
                  <Route path="/quiz/chronic-guilt" element={<ChronicGuiltTest />} />
                  <Route path="/quiz/guilt-self-sabotage" element={<ChronicGuiltTest />} />
                  <Route path="/tes-rasa-bersalah" element={<ChronicGuiltTest defaultLang="id" />} />
                  <Route path="/quiz/hyper-independence" element={<HyperIndependenceTest />} />
                  <Route path="/quiz/trauma-independence" element={<HyperIndependenceTest />} />
                  <Route path="/tes-kemandirian-ekstrem" element={<HyperIndependenceTest defaultLang="id" />} />
                  <Route path="/quiz/emotional-enmeshment" element={<EnmeshmentTest />} />
                  <Route path="/quiz/family-boundaries" element={<EnmeshmentTest />} />
                  <Route path="/tes-enmeshment-keluarga" element={<EnmeshmentTest defaultLang="id" />} />
                  <Route path="/quiz/fear-of-being-perceived" element={<FearOfBeingPerceivedTest />} />
                  <Route path="/quiz/spotlight-effect" element={<FearOfBeingPerceivedTest />} />
                  <Route path="/tes-takut-dilihat" element={<FearOfBeingPerceivedTest defaultLang="id" />} />
                  <Route path="/quiz/decision-fatigue" element={<DecisionFatigueTest />} />
                  <Route path="/quiz/brain-fog" element={<DecisionFatigueTest />} />
                  <Route path="/tes-kelelahan-keputusan" element={<DecisionFatigueTest defaultLang="id" />} />
                  <Route path="/quiz/fomo" element={<FomoTest />} />
                  <Route path="/quiz/social-comparison" element={<FomoTest />} />
                  <Route path="/tes-fomo-dan-perbandingan" element={<FomoTest defaultLang="id" />} />
                  <Route path="/quiz/attachment-compatibility" element={<AttachmentCompatibilityTest />} />
                  <Route path="/quiz/relationship-attachment" element={<AttachmentCompatibilityTest />} />
                  <Route path="/tes-kompatibilitas-attachment" element={<AttachmentCompatibilityTest defaultLang="id" />} />
                  <Route path="/quiz/existential-dread" element={<ExistentialDreadTest />} />
                  <Route path="/quiz/quarter-life-crisis" element={<ExistentialDreadTest />} />
                  <Route path="/tes-krisis-eksistensial" element={<ExistentialDreadTest defaultLang="id" />} />
                  <Route path="/quiz/emotional-numbness" element={<EmotionalNumbnessTest />} />
                  <Route path="/quiz/dissociative-blunting" element={<EmotionalNumbnessTest />} />
                  <Route path="/tes-kebas-emosional" element={<EmotionalNumbnessTest defaultLang="id" />} />
                  <Route path="/quiz/toxic-independence" element={<ToxicIndependenceTest />} />
                  <Route path="/quiz/counter-dependency" element={<ToxicIndependenceTest />} />
                  <Route path="/tes-kemandirian-toksik" element={<ToxicIndependenceTest defaultLang="id" />} />
                  <Route path="/quiz/compassion-fatigue" element={<CompassionFatigueTest />} />
                  <Route path="/quiz/empathy-burnout" element={<CompassionFatigueTest />} />
                  <Route path="/tes-kelelahan-empati" element={<CompassionFatigueTest defaultLang="id" />} />
                  <Route path="/quiz/intimacy-avoidance" element={<IntimacyAvoidanceTest />} />
                  <Route path="/quiz/intimacy-anorexia" element={<IntimacyAvoidanceTest />} />
                  <Route path="/tes-penghindaran-keintiman" element={<IntimacyAvoidanceTest defaultLang="id" />} />
                  <Route path="/quiz/fawn-response" element={<FawnResponseTest />} />
                  <Route path="/quiz/people-pleasing-fawn" element={<FawnResponseTest />} />
                  <Route path="/tes-fawn-response" element={<FawnResponseTest defaultLang="id" />} />
                  <Route path="/quiz/financial-anxiety" element={<FinancialAnxietyTest />} />
                  <Route path="/quiz/scarcity-mindset" element={<FinancialAnxietyTest />} />
                  <Route path="/tes-scarcity-mindset" element={<FinancialAnxietyTest defaultLang="id" />} />
                  <Route path="/quiz/rsd-rejection-sensitivity" element={<RSDTest />} />
                  <Route path="/quiz/rejection-sensitive-dysphoria" element={<RSDTest />} />
                  <Route path="/tes-sensitivitas-penolakan" element={<RSDTest defaultLang="id" />} />
                  <Route path="/quiz/dopamine-burnout" element={<DopamineBurnoutTest />} />
                  <Route path="/quiz/digital-overstimulation" element={<DopamineBurnoutTest />} />
                  <Route path="/tes-kejenuhan-dopamin" element={<DopamineBurnoutTest defaultLang="id" />} />
                  <Route path="/quiz/splitting-polarization" element={<SplittingTest />} />
                  <Route path="/quiz/black-and-white-thinking" element={<SplittingTest />} />
                  <Route path="/tes-splitting-polarisasi" element={<SplittingTest defaultLang="id" />} />
                  <Route path="/quiz/toxic-shame" element={<ToxicShameTest />} />
                  <Route path="/quiz/internalized-shame" element={<ToxicShameTest />} />
                  <Route path="/tes-toxic-shame" element={<ToxicShameTest defaultLang="id" />} />
                  <Route path="/quiz/betrayal-trauma" element={<BetrayalTraumaTest />} />
                  <Route path="/quiz/betrayal-blindness" element={<BetrayalTraumaTest />} />
                  <Route path="/tes-trauma-pengkhianatan" element={<BetrayalTraumaTest defaultLang="id" />} />
                  <Route path="/quiz/pda-demand-avoidance" element={<PdaTest />} />
                  <Route path="/quiz/pathological-demand-avoidance" element={<PdaTest />} />
                  <Route path="/tes-pda-alergi-perintah" element={<PdaTest defaultLang="id" />} />
                  <Route path="/quiz/functional-freeze" element={<FunctionalFreezeTest />} />
                  <Route path="/quiz/somatic-freeze" element={<FunctionalFreezeTest />} />
                  <Route path="/tes-functional-freeze" element={<FunctionalFreezeTest />} />
                  <Route path="/quiz/somatic-armoring" element={<SomaticArmoringTest />} />
                  <Route path="/quiz/body-armoring" element={<SomaticArmoringTest />} />
                  <Route path="/tes-body-armoring" element={<SomaticArmoringTest />} />
                  <Route path="/quiz/dpdr" element={<DpdrTest />} />
                  <Route path="/quiz/depersonalization-derealization" element={<DpdrTest />} />
                  <Route path="/tes-dpdr" element={<DpdrTest />} />
                  <Route path="/quiz/filial-guilt" element={<FilialGuiltTest />} />
                  <Route path="/quiz/asian-family-enmeshment" element={<FilialGuiltTest />} />
                  <Route path="/tes-filial-guilt" element={<FilialGuiltTest />} />
                  <Route path="/quiz/cat-q" element={<CatqTest />} />
                  <Route path="/quiz/autism-masking" element={<CatqTest />} />
                  <Route path="/tes-cat-q" element={<CatqTest />} />
                  <Route path="/quiz/pure-o" element={<PureOTest />} />
                  <Route path="/quiz/intrusive-thoughts" element={<PureOTest />} />
                  <Route path="/tes-pure-o" element={<PureOTest />} />
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
