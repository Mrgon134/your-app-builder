import React, { useState, useEffect } from "react";
import { JU_STICKERS } from "@/lib/stickers";
import { Link } from "react-router-dom";
import { Download, Share, MoreVertical, Plus, Check } from "lucide-react";
import AppStoreCta from "@/components/AppStoreCta";
import SEOHead from "@/components/SEOHead";
import PublicNextSteps from "@/components/PublicNextSteps";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua));

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => setInstalled(true));

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <SEOHead
        title="Get Nuju Free: iPhone, Android, or Web in 30 Seconds"
        description="Install Nuju free on iPhone, Android, or web. 30 seconds, no signup wall, opens straight to the mood check-in. AI reflection ready on first entry."
        canonical="https://nuju.app/install"
        breadcrumbs={[
          { name: "Home", url: "https://nuju.app/" },
          { name: "Install", url: "https://nuju.app/install" },
        ]}
      />
      <img
        src={JU_STICKERS.love}
        alt="Ju mascot welcoming you to install the Nuju AI journal app"
        className="w-24 h-24 mb-6 animate-[ju-float_3s_ease-in-out_infinite]"
        width={96}
        height={96}
      />

      {installed ? (
        <div className="text-center animate-fade-up">
          <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
            <Check className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
            Installed!
          </h1>
          <p className="text-muted-foreground text-sm">
            Nuju is now on your home screen. Open it anytime.
          </p>
        </div>
      ) : (
        <div className="text-center animate-fade-up max-w-xs">
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
            Install Nuju
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Add Nuju to your home screen for the full app experience - works
            offline and opens instantly.
          </p>

          <AppStoreCta className="mb-6 w-full" />

          <div className="mb-8 rounded-3xl border border-border/50 bg-card p-6 text-left">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Why install Nuju?
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>
                Open Nuju like a real app instead of hunting for a browser tab when you want to check in quickly.
              </li>
              <li>
                Make journaling easier to revisit every day, especially if you want a shorter path back into mood logging or reflection.
              </li>
              <li>
                Keep the product one tap away on your phone or desktop so the reveal turns into an actual habit.
              </li>
            </ul>
          </div>

          {deferredPrompt ? (
            <button
              onClick={handleInstall}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97]"
            >
              <Download className="w-5 h-5" />
              Install App
            </button>
          ) : isIOS ? (
            <div className="bg-card rounded-3xl p-6 border border-border/50 text-left space-y-4">
              <p className="text-sm font-semibold text-foreground">
                To install on iPhone:
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Share className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Tap the <strong>Share</strong> button in Safari
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Plus className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Tap <strong>Add to Home Screen</strong>
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-3xl p-6 border border-border/50 text-left space-y-4">
              <p className="text-sm font-semibold text-foreground">
                To install on Android:
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MoreVertical className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Tap the <strong>browser menu</strong>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Tap <strong>Install app</strong> or{" "}
                  <strong>Add to Home Screen</strong>
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 rounded-3xl border border-border/50 bg-card p-6 text-left">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              If install does not appear
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Make sure you are using a supported browser and that you have opened Nuju directly, not inside another app&apos;s browser.
              </p>
              <p>
                On iPhone, installation only works through Safari. On Android, Chrome usually shows the strongest install prompt. On desktop, try opening the main site and look for the browser install option near the address bar.
              </p>
              <p>
                If you still cannot install it, go to{" "}
                <Link to="/support" className="text-primary hover:underline">
                  Support and FAQ
                </Link>{" "}
                or{" "}
                <Link to="/contact" className="text-primary hover:underline">
                  contact the team
                </Link>
                .
              </p>
            </div>
          </div>

          <PublicNextSteps
            title="Keep going after install"
            description="Use these pages if you want to start the reveal, understand the app better, or get help with setup."
            links={[
              {
                to: "/onboarding",
                title: "Start the Ju reveal",
                description: "Jump straight into the onboarding flow and get your first emotional read.",
                badge: "Reveal",
              },
              {
                to: "/",
                title: "Back to the homepage",
                description: "See the full product story, category positioning, and what Nuju unlocks over time.",
                badge: "Product",
              },
              {
                to: "/support",
                title: "Support and FAQ",
                description: "Get self-serve answers if install, billing, or product basics are still unclear.",
                badge: "Help",
              },
              {
                to: "/privacy",
                title: "Privacy Policy",
                description: "Review how journal data, AI processing, and account details are handled.",
                badge: "Trust",
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default Install;
