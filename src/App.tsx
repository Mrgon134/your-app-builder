import React, { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

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
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
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
