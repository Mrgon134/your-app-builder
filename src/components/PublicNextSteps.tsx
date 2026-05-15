import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { siApple } from "simple-icons";

import { APP_STORE_URL } from "@/lib/constants";

interface NextStepLink {
  title: string;
  description: string;
  to?: string;
  href?: string;
  badge?: string;
}

interface PublicNextStepsProps {
  title?: string;
  description?: string;
  links: NextStepLink[];
  includeAppStore?: boolean;
  state?: unknown;
}

const PublicNextSteps: React.FC<PublicNextStepsProps> = ({
  title = "Continue exploring Nuju",
  description = "Choose the next page that helps you move forward faster.",
  includeAppStore = true,
  links,
  state,
}) => {
  const displayLinks: NextStepLink[] = includeAppStore
    ? [
        ...links,
        {
          href: APP_STORE_URL,
          title: "Download in App Store",
          description: "Open Nuju on the iPhone App Store and install the native app.",
          badge: "iOS App",
        },
      ]
    : links;

  if (displayLinks.length === 0) return null;

  return (
    <section className="mt-10 rounded-2xl border border-border/40 bg-card p-6">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Next Steps
        </p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {displayLinks.map((link) => {
          const isAppStoreLink = link.href === APP_STORE_URL;
          const content = (
            <div className="flex items-start justify-between gap-3">
              <div>
                {isAppStoreLink ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-black">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3" fill="currentColor">
                      <path d={siApple.path} />
                    </svg>
                    {link.badge}
                  </span>
                ) : (
                  link.badge && (
                    <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {link.badge}
                    </span>
                  )
                )}
                <p className={`mt-2 text-sm font-semibold ${isAppStoreLink ? "text-white" : "text-foreground"}`}>
                  {link.title}
                </p>
                <p className={`mt-1 text-sm leading-relaxed ${isAppStoreLink ? "text-white/74" : "text-muted-foreground"}`}>
                  {link.description}
                </p>
              </div>
              <ArrowRight className={`mt-0.5 h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5 ${isAppStoreLink ? "text-white" : "text-primary"}`} />
            </div>
          );

          const className = isAppStoreLink
            ? "group rounded-xl border border-black bg-black p-4 shadow-[0_14px_34px_-22px_rgba(0,0,0,0.68)] transition-all hover:-translate-y-0.5 hover:bg-neutral-900"
            : "group rounded-xl border border-border/50 bg-background/80 p-4 transition-all hover:border-primary/30 hover:bg-primary/[0.04]";

          return link.href ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {content}
            </a>
          ) : (
            <Link
              key={link.to}
              to={link.to ?? "/"}
              state={state}
              className={className}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PublicNextSteps;
