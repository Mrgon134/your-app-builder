/**
 * Deterministically prerenders public routes after the Vite build.
 *
 * This avoids browser-based prerendering so Vercel builds do not depend on
 * Playwright, Chromium, or Linux desktop libraries such as libnspr4.so.
 */
import { build } from "esbuild";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const BASE_URL = "https://nuju.app";
const HELMET_ATTRIBUTE = 'data-rh="true"';
const OG_IMAGE =
  "https://sxgmlnlqmdjjfmcypivi.supabase.co/functions/v1/og-image";
const OG_IMAGE_ALT = "Nuju AI journal companion app screenshot";

const PRERENDER_STYLE = `
<style data-prerender>
  .nuju-prerender {
    margin: 0 auto;
    max-width: 860px;
    padding: 40px 20px 72px;
    color: #1f1730;
    font-family: "DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    line-height: 1.7;
  }
  .nuju-prerender a {
    color: #6f5fe8;
    text-decoration: none;
  }
  .nuju-prerender a:hover {
    text-decoration: underline;
  }
  .nuju-card {
    border: 1px solid rgba(124, 110, 219, 0.14);
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 32px 80px -52px rgba(30, 23, 48, 0.35);
    padding: 32px;
  }
  .nuju-eyebrow {
    margin: 0 0 12px;
    color: #6f5fe8;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }
  .nuju-title {
    margin: 0;
    font-family: "Lora", Georgia, serif;
    font-size: clamp(2.2rem, 4vw, 3.35rem);
    line-height: 1.12;
    color: #1f1730;
  }
  .nuju-meta {
    margin: 16px 0 0;
    color: #6f6578;
    font-size: 0.95rem;
  }
  .nuju-lead {
    margin: 18px 0 0;
    font-size: 1.08rem;
    color: #3f3750;
  }
  .nuju-section {
    margin-top: 32px;
  }
  .nuju-section h2 {
    margin: 0 0 12px;
    font-family: "Lora", Georgia, serif;
    font-size: 1.65rem;
    line-height: 1.25;
    color: #1f1730;
  }
  .nuju-section h3 {
    margin: 18px 0 8px;
    font-size: 1.05rem;
    line-height: 1.35;
    color: #1f1730;
  }
  .nuju-section p {
    margin: 0 0 14px;
    color: #3f3750;
  }
  .nuju-callout {
    margin: 18px 0;
    border-left: 4px solid #7c6edb;
    border-radius: 18px;
    background: rgba(124, 110, 219, 0.08);
    padding: 16px 18px;
    color: #2d2550;
    font-style: italic;
  }
  .nuju-list,
  .nuju-ordered {
    margin: 0 0 14px;
    padding-left: 1.25rem;
    color: #3f3750;
  }
  .nuju-list li,
  .nuju-ordered li {
    margin-bottom: 8px;
  }
  .nuju-grid {
    display: grid;
    gap: 16px;
    margin-top: 18px;
  }
  .nuju-card-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    margin-top: 18px;
  }
  .nuju-mini-card {
    border: 1px solid rgba(124, 110, 219, 0.14);
    border-radius: 20px;
    background: rgba(124, 110, 219, 0.04);
    padding: 18px;
  }
  .nuju-mini-card h3,
  .nuju-mini-card h4 {
    margin: 0 0 8px;
    color: #1f1730;
  }
  .nuju-mini-card p {
    margin: 0;
    color: #4f4762;
    font-size: 0.95rem;
  }
  .nuju-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }
  .nuju-chip {
    border-radius: 999px;
    background: rgba(124, 110, 219, 0.12);
    color: #5c4fbc;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 6px 10px;
  }
  .nuju-faq {
    margin-top: 16px;
  }
  .nuju-faq details {
    border: 1px solid rgba(124, 110, 219, 0.12);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.94);
    margin-bottom: 12px;
    padding: 14px 16px;
  }
  .nuju-faq summary {
    cursor: pointer;
    color: #1f1730;
    font-weight: 700;
    list-style: none;
  }
  .nuju-faq p {
    margin: 12px 0 0;
  }
  .nuju-divider {
    height: 1px;
    margin: 28px 0;
    background: rgba(124, 110, 219, 0.12);
  }
  .nuju-cta {
    margin-top: 34px;
    border: 1px solid rgba(124, 110, 219, 0.18);
    border-radius: 24px;
    background: linear-gradient(135deg, rgba(245, 243, 255, 0.96), rgba(238, 249, 247, 0.96));
    padding: 22px;
  }
  .nuju-cta h2 {
    margin: 0 0 10px;
  }
  .nuju-cta p {
    margin: 0 0 14px;
  }
  .nuju-cta a {
    font-weight: 700;
  }
  .nuju-article-header {
    margin-bottom: 26px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(124, 110, 219, 0.12);
  }
  .nuju-article-header h1 {
    margin: 0 0 12px;
    font-family: "Lora", Georgia, serif;
    font-size: clamp(2rem, 3vw, 3rem);
    line-height: 1.16;
    color: #1f1730;
  }
  .nuju-article-header p {
    margin: 0;
    color: #4f4762;
    font-size: 1.05rem;
  }
  .nuju-article-kicker {
    margin-bottom: 10px;
    color: #6f5fe8;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }
  @media (max-width: 640px) {
    .nuju-card {
      padding: 24px 20px;
    }
  }
</style>
`;

const LANDING_FAQS = [
  {
    question: "Do I need to pay before I can use Nuju?",
    answer:
      "No. You start with the Ju Gets You reveal first. If the fit feels real after that, you can keep Ju close with weekly, 3-month, or lifetime access.",
  },
  {
    question: "What exactly happens in the reveal?",
    answer:
      "You answer a few quick prompts, then Ju reflects back the emotional pattern it notices, why that read fits, and what kind of support would help first.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. Nuju is built around privacy. Your journal data is stored securely, protected with row-level access controls, and we do not sell your personal data.",
  },
  {
    question: "Why does Nuju ask for my name and email so early?",
    answer:
      "Because the reveal is meant to feel personal. Your name helps the read feel like it belongs to you, and your email keeps that support attached to the same account if you decide to continue.",
  },
  {
    question: "What plans are available if I want Ju to stay with me?",
    answer:
      "You can continue weekly, choose a 3-month subscription, or unlock lifetime access with one payment.",
  },
];

const SUPPORT_FAQS = [
  {
    question: "What is Nuju?",
    answer:
      "Nuju is an AI journal companion that helps you capture emotions quickly, discover patterns, and get personalized support from Ju.",
  },
  {
    question: "How do I get started?",
    answer:
      "Start with the Ju Gets You reveal. You answer a few quick prompts, get a first emotional read, and then decide whether you want to keep going with a full account and ongoing support.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes. Your journal entries are stored securely, and we do not sell your data or use your private entries to train general-purpose AI models.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Yes. Go to Settings -> Export Data to download your journal. You can also request help through the contact page.",
  },
  {
    question: "What does paid access unlock?",
    answer:
      "Paid access keeps the full Ju experience open, including deeper reflection, longer history, and more ongoing support after your reveal.",
  },
  {
    question: "What is the difference between subscriptions and lifetime?",
    answer:
      "Weekly and 3-month subscriptions renew unless you cancel before renewal. Lifetime is a one-time purchase that keeps Ju unlocked without renewal.",
  },
  {
    question: "Can I use voice journaling?",
    answer:
      "Yes. On supported plans, you can record your thoughts instead of typing. Ju can transcribe what you say and reflect it back in a more structured way.",
  },
  {
    question: "How often should I journal?",
    answer:
      "There is no pressure to journal every day. Even a few honest check-ins can start showing patterns. The more consistently you use Nuju, the clearer the insights usually become.",
  },
];

function escapeHtml(value) {
  return normalizeText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function normalizeText(value) {
  return String(value)
    .replace(/—|–/g, "-")
    .replace(/…/g, "...")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/â€”/g, "-")
    .replace(/â€“/g, "-")
    .replace(/â€¦/g, "...")
    .replace(/â€˜|â€™/g, "'")
    .replace(/â€œ|â€�/g, '"')
    .replace(/â†’/g, "->")
    .replace(/â†/g, "<-")
    .replace(/Â©/g, "©")
    .replace(/Â/g, "");
}

function normalizeBlogPost(post) {
  return {
    ...post,
    title: normalizeText(post.title),
    description: normalizeText(post.description),
    category: normalizeText(post.category),
    sections: post.sections.map((section) => ({
      ...section,
      content: Array.isArray(section.content)
        ? section.content.map((item) => normalizeText(item))
        : normalizeText(section.content),
    })),
    faq: post.faq?.map((item) => ({
      question: normalizeText(item.question),
      answer: normalizeText(item.answer),
    })),
  };
}

function formatDate(dateString, locale = "en-US") {
  return new Date(`${dateString}T12:00:00Z`).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function buildBreadcrumbSchema(breadcrumbs) {
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function renderList(items) {
  return `<ul class="nuju-list">${items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ul>`;
}

function renderOrdered(items) {
  return `<ol class="nuju-ordered">${items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ol>`;
}

function renderFaq(faqs) {
  return `<div class="nuju-faq">${faqs
    .map(
      (item) => `
        <details>
          <summary>${escapeHtml(item.question)}</summary>
          <p>${escapeHtml(item.answer)}</p>
        </details>
      `,
    )
    .join("")}</div>`;
}

function renderSection(title, content) {
  return `
    <section class="nuju-section">
      <h2>${escapeHtml(title)}</h2>
      ${content}
    </section>
  `;
}

function renderLinkCardGrid(items) {
  return `
    <div class="nuju-card-grid">
      ${items
        .map(
          (item) => `
            <article class="nuju-mini-card">
              ${item.badge ? `<p class="nuju-eyebrow">${escapeHtml(item.badge)}</p>` : ""}
              <h3><a href="${escapeAttribute(item.href)}">${escapeHtml(item.title)}</a></h3>
              <p>${escapeHtml(item.description)}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderPageShell({ eyebrow, title, description, meta, sections, cta }) {
  return `
    <main class="nuju-prerender">
      <article class="nuju-card">
        ${eyebrow ? `<p class="nuju-eyebrow">${escapeHtml(eyebrow)}</p>` : ""}
        <h1 class="nuju-title">${escapeHtml(title)}</h1>
        ${meta ? `<p class="nuju-meta">${escapeHtml(meta)}</p>` : ""}
        <p class="nuju-lead">${escapeHtml(description)}</p>
        ${sections.join("")}
        ${cta ?? ""}
      </article>
    </main>
  `;
}

function renderCta({ title, body, href, label }) {
  return `
    <section class="nuju-cta">
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(body)}</p>
      <a href="${escapeAttribute(href)}">${escapeHtml(label)}</a>
    </section>
  `;
}

function renderLandingBody() {
  const sections = [
    renderSection(
      "What you get",
      `
        <div class="nuju-card-grid">
          <div class="nuju-mini-card">
            <h3>Free reveal entry</h3>
            <p>Start with the Ju Gets You reveal and decide later whether you want Ju to stay close.</p>
          </div>
          <div class="nuju-mini-card">
            <h3>One readable emotional pattern</h3>
            <p>Nuju reflects what it notices in plain language that clicks fast, even when your thoughts feel messy.</p>
          </div>
          <div class="nuju-mini-card">
            <h3>A next-step direction</h3>
            <p>The reveal points you toward the kind of support that fits the moment instead of leaving you with a vague summary.</p>
          </div>
        </div>
      `,
    ),
    renderSection(
      "Why people choose Nuju",
      `
        <p>Nuju is built for low-energy moments. You can start with voice or text, get a warm emotional read, and keep the support private by default.</p>
        ${renderList([
          "Fast enough for hard days",
          "Private by default",
          "Voice or text check-ins",
          "Mood-aware AI reflection",
          "Installable on iOS, Android, and desktop",
        ])}
      `,
    ),
    renderSection(
      "How it works",
      `
        ${renderOrdered([
          "Answer a few gentle prompts so Ju can understand what has been heavy.",
          "See the Ju Gets You reveal with one clear emotional pattern and why it fits.",
          "Choose whether you want Ju to stay with you weekly, for 3 months, or with a lifetime unlock.",
        ])}
      `,
    ),
    renderSection(
      "Frequently asked questions",
      renderFaq(LANDING_FAQS),
    ),
  ];

  return renderPageShell({
    eyebrow: "AI Journal App",
    title: "AI journaling for mood tracking and emotional clarity",
    description:
      "Nuju is an AI journaling app and mood tracker for private self-reflection, emotional clarity, and fast daily check-ins.",
    meta: "Start free. Installable PWA. Built for low-friction emotional wellness.",
    sections,
    cta: renderCta({
      title: "Start the Ju Gets You reveal",
      body: "Open Nuju when your thoughts feel crowded, answer a few quick prompts, and see what Ju notices in under a minute.",
      href: "/onboarding?source=prerender_landing",
      label: "Start free",
    }),
  });
}

function renderAboutBody() {
  return renderPageShell({
    eyebrow: "About Nuju",
    title: "A softer way to feel understood",
    description:
      "Nuju was built for people who want emotional clarity without turning reflection into homework.",
    meta: "Mission, values, privacy stance, and what makes the product different.",
    sections: [
      renderSection(
        "Our mission",
        `
          <p>Nuju helps you capture emotions quickly, discover patterns you would never notice on your own, and get supportive reflections from Ju, your AI companion.</p>
          <p>We believe mental wellness does not require perfection. It requires showing up for yourself, 30 seconds at a time.</p>
        `,
      ),
      renderSection(
        "Why we built this",
        `
          <p>Traditional journaling apps can feel like homework. Therapy is valuable but not always accessible. Nuju sits in the middle: fast enough for real life, safe enough to be honest in, and smart enough to help you understand yourself better.</p>
        `,
      ),
      renderSection(
        "What matters here",
        renderList([
          "Privacy first - your journal is yours alone.",
          "Clarity over noise - one better read matters more than more content.",
          "Wellness-focused - Nuju supports reflection and self-awareness, not clinical care.",
          "Built to become a habit by feeling useful, not manipulative.",
        ]),
      ),
      renderSection(
        "Built with care",
        renderList([
          "React and TypeScript for a fast web experience",
          "Supabase for secure storage and sync",
          "A private AI workflow for supportive reflections and pattern discovery",
          "Progressive web app support for phone and desktop install",
        ]),
      ),
      renderSection(
        "See how Nuju works in practice",
        renderLinkCardGrid([
          {
            href: "/",
            title: "Nuju homepage",
            description:
              "See the main product story, who Nuju is for, and how the reveal starts.",
            badge: "Product",
          },
          {
            href: "/install",
            title: "Install Nuju",
            description:
              "Add Nuju to your home screen or desktop for faster daily check-ins.",
            badge: "Setup",
          },
          {
            href: "/guides/journaling",
            title: "Read the journaling guide",
            description:
              "Go deeper on methods, science, prompts, and mood tracking.",
            badge: "Guide",
          },
          {
            href: "/support",
            title: "Support and FAQ",
            description:
              "Get help with billing, exporting, account questions, and product basics.",
            badge: "Help",
          },
        ]),
      ),
    ],
    cta: renderCta({
      title: "Want to ask something directly?",
      body: "Questions, ideas, or feedback are always welcome.",
      href: "/contact",
      label: "Contact the Nuju team",
    }),
  });
}

function renderSupportBody() {
  return renderPageShell({
    eyebrow: "Support",
    title: "Support and frequently asked questions",
    description:
      "Help with getting started, subscriptions, privacy, journaling habits, and how the Nuju experience works.",
    meta: "Answers for setup, plans, exports, voice journaling, and product boundaries.",
    sections: [
      renderSection("Quick answers", renderFaq(SUPPORT_FAQS)),
      renderSection(
        "Still need help?",
        `
          <p>We usually respond to support requests within 24 to 48 hours. If you need help with billing, exports, or account access, the contact page is the fastest path.</p>
        `,
      ),
      renderSection(
        "Important safety note",
        `
          <p>Nuju is not a medical service. If you are in crisis or need immediate mental health support, contact emergency services or a qualified mental health professional.</p>
        `,
      ),
      renderSection(
        "Not the answer you needed?",
        renderLinkCardGrid([
          {
            href: "/contact",
            title: "Contact Nuju",
            description:
              "Send billing questions, bug reports, or account issues directly to the team.",
            badge: "Support",
          },
          {
            href: "/install",
            title: "Install help",
            description:
              "Follow platform-specific install steps and troubleshooting tips.",
            badge: "Setup",
          },
          {
            href: "/about",
            title: "About Nuju",
            description:
              "Read the mission, product values, and what makes Nuju different.",
            badge: "Product",
          },
          {
            href: "/medical-disclaimer",
            title: "Medical disclaimer",
            description:
              "Review the safety boundary if your concern is mental-health related.",
            badge: "Safety",
          },
        ]),
      ),
    ],
    cta: renderCta({
      title: "Reach the team",
      body: "Use the contact page for questions, bug reports, or feedback.",
      href: "/contact",
      label: "Open contact page",
    }),
  });
}

function renderContactBody() {
  return renderPageShell({
    eyebrow: "Contact",
    title: "Contact the Nuju team",
    description:
      "Reach out for support, billing questions, bug reports, or anything blocking your journaling experience.",
    meta: "Email: hello@nuju.app",
    sections: [
      renderSection(
        "Email us directly",
        `
          <p><a href="mailto:hello@nuju.app">hello@nuju.app</a></p>
          <p>We typically respond within 24 to 48 hours.</p>
        `,
      ),
      renderSection(
        "What we can help with",
        renderLinkCardGrid([
          {
            href: "/contact",
            title: "Billing and paid access",
            description:
              "Questions about subscription access, lifetime purchases, renewals, or checkout problems.",
            badge: "Billing",
          },
          {
            href: "/contact",
            title: "Account and login issues",
            description:
              "Trouble signing in, changing your email, recovering access, or exporting your journal.",
            badge: "Access",
          },
          {
            href: "/contact",
            title: "Bug reports",
            description:
              "Anything broken in journaling, install flow, coaching, pricing, or navigation.",
            badge: "Product",
          },
          {
            href: "/contact",
            title: "Product feedback",
            description:
              "Suggestions, clarity issues, or ideas that would make Nuju more useful in real life.",
            badge: "Feedback",
          },
        ]) +
          `<p>The fastest way to help us reply well is to include what happened, what screen you were on, and the email tied to your account if the issue is billing or access related.</p>`,
      ),
      renderSection(
        "Before you send a message",
        renderLinkCardGrid([
          {
            href: "/support",
            title: "Support and FAQ",
            description:
              "Best for account questions, export help, billing basics, and feature answers.",
            badge: "Help",
          },
          {
            href: "/install",
            title: "Install Nuju",
            description:
              "Best if you need help adding Nuju to your phone or desktop.",
            badge: "Setup",
          },
          {
            href: "/privacy",
            title: "Privacy Policy",
            description:
              "Best for questions about journal data, AI processing, or account deletion.",
            badge: "Trust",
          },
        ]),
      ),
      renderSection(
        "Keep moving without waiting on email",
        renderLinkCardGrid([
          {
            href: "/support",
            title: "Support and FAQ",
            description:
              "Find quick answers about billing, export, entries, and account access.",
            badge: "Help",
          },
          {
            href: "/about",
            title: "About Nuju",
            description:
              "Read the mission, product values, and how Nuju is designed to feel useful fast.",
            badge: "Product",
          },
          {
            href: "/privacy",
            title: "Privacy Policy",
            description:
              "See how journal data, AI processing, and account deletion are handled.",
            badge: "Trust",
          },
          {
            href: "/terms",
            title: "Terms of Service",
            description:
              "Review account rules, payment terms, and access basics.",
            badge: "Policy",
          },
        ]),
      ),
    ],
  });
}

function renderInstallBody() {
  return renderPageShell({
    eyebrow: "Install Nuju",
    title: "Install Nuju on iPhone, Android, or desktop",
    description:
      "Add Nuju to your home screen for faster journaling, easier re-entry, and a smoother daily check-in flow.",
    meta: "Progressive web app install guide",
    sections: [
      renderSection(
        "Why install Nuju?",
        renderList([
          "Open Nuju like a real app instead of hunting for a browser tab when you want to check in quickly.",
          "Make journaling easier to revisit every day, especially if you want a shorter path back into mood logging or reflection.",
          "Keep the product one tap away on your phone or desktop so the reveal turns into an actual habit.",
        ]),
      ),
      renderSection(
        "Install on iPhone",
        renderOrdered([
          "Open Nuju in Safari.",
          "Tap the Share button.",
          "Choose Add to Home Screen.",
        ]),
      ),
      renderSection(
        "Install on Android or desktop",
        renderOrdered([
          "Open Nuju in your browser.",
          "Use the browser menu or install prompt.",
          "Choose Install app or Add to Home Screen.",
        ]),
      ),
      renderSection(
        "If install does not appear",
        `
          <p>Make sure you are using a supported browser and that you have opened Nuju directly, not inside another app's browser.</p>
          <p>On iPhone, installation only works through Safari. On Android, Chrome usually shows the strongest install prompt. On desktop, try opening the main site and look for the browser install option near the address bar.</p>
          <p>If you still cannot install it, go to <a href="/support">Support and FAQ</a> or <a href="/contact">contact the team</a>.</p>
        `,
      ),
      renderSection(
        "Keep going after install",
        renderLinkCardGrid([
          {
            href: "/onboarding",
            title: "Start the Ju reveal",
            description:
              "Jump straight into the onboarding flow and get your first emotional read.",
            badge: "Reveal",
          },
          {
            href: "/",
            title: "Back to the homepage",
            description:
              "See the full product story, category positioning, and what Nuju unlocks over time.",
            badge: "Product",
          },
          {
            href: "/support",
            title: "Support and FAQ",
            description:
              "Get self-serve answers if install, billing, or product basics are still unclear.",
            badge: "Help",
          },
          {
            href: "/privacy",
            title: "Privacy Policy",
            description:
              "Review how journal data, AI processing, and account details are handled.",
            badge: "Trust",
          },
        ]),
      ),
    ],
    cta: renderCta({
      title: "Open the app first",
      body: "Installation works best after you have visited the live Nuju app in your browser.",
      href: "/",
      label: "Open Nuju",
    }),
  });
}

function renderPrivacyBody() {
  return renderPageShell({
    eyebrow: "Privacy Policy",
    title: "How Nuju handles your data",
    description:
      "Your privacy is a core part of the product. This page covers what we collect, why we collect it, and how we protect it.",
    meta: "Last updated April 20, 2026",
    sections: [
      renderSection(
        "Information we collect",
        renderList([
          "Account information such as email address and display name",
          "Journal entries including mood ratings, text, and voice notes when applicable",
          "Preferences such as language, theme, and coach persona",
          "Usage and device information needed to operate the app securely",
          "AI-generated insights like patterns and summaries derived from your entries",
        ]),
      ),
      renderSection(
        "How we use it",
        renderList([
          "Provide journaling, mood tracking, and AI companion features",
          "Generate personalized insights, trends, and summaries",
          "Maintain account history, streaks, and progress statistics",
          "Process payments for paid access plans",
          "Protect the product against abuse and security issues",
        ]),
      ),
      renderSection(
        "AI processing and sharing",
        `
          <p>Your journal entries are processed to deliver supportive responses and pattern recognition. AI-generated insights stay attached to your account. We do not use your personal journal content to train general-purpose AI models.</p>
          <p>We do not sell personal data. Limited information may be shared with service providers for hosting, authentication, payments, analytics, and AI operations.</p>
        `,
      ),
      renderSection(
        "Retention and your rights",
        `
          <p>You can request access, correction, export, or deletion of your data. Account deletion removes associated data within 30 days unless a longer retention window is required by law.</p>
        `,
      ),
      renderSection(
        "Questions about privacy",
        `
          <p>Email <a href="mailto:hello@nuju.app">hello@nuju.app</a> if you need help with privacy requests or data concerns.</p>
        `,
      ),
      renderSection(
        "Explore the trust pages around this policy",
        renderLinkCardGrid([
          {
            href: "/terms",
            title: "Terms of Service",
            description:
              "Review account rules, paid access terms, and how Nuju should be used.",
            badge: "Policy",
          },
          {
            href: "/support",
            title: "Support and FAQ",
            description:
              "Find help with export, billing, account access, and everyday questions.",
            badge: "Help",
          },
          {
            href: "/contact",
            title: "Contact Nuju",
            description:
              "Reach the team if you need help with data, account requests, or feedback.",
            badge: "Support",
          },
          {
            href: "/medical-disclaimer",
            title: "Medical Disclaimer",
            description:
              "See the safety boundary between journaling support and professional mental health care.",
            badge: "Safety",
          },
        ]),
      ),
    ],
  });
}

function renderTermsBody() {
  return renderPageShell({
    eyebrow: "Terms of Service",
    title: "Rules and product boundaries for using Nuju",
    description:
      "These terms explain account responsibilities, user content, payments, AI feature boundaries, and acceptable use.",
    meta: "Last updated April 20, 2026",
    sections: [
      renderSection(
        "Service overview",
        `
          <p>Nuju is an AI-powered journaling web application that helps users track moods, write journal entries, receive AI-generated insights, and interact with an AI companion named Ju.</p>
        `,
      ),
      renderSection(
        "Accounts and user content",
        `
          <p>You are responsible for maintaining your account credentials and providing accurate registration information. You keep ownership of your journal entries and other content, while granting Nuju a limited license to process that content solely to provide the service.</p>
        `,
      ),
      renderSection(
        "AI features and payments",
        `
          <p>AI-generated content is for informational and wellness purposes only and should not be treated as medical, psychological, or therapeutic advice.</p>
          <p>Nuju offers a free reveal entry and paid access plans. Weekly and 3-month subscriptions renew automatically unless cancelled before renewal. Lifetime access is a one-time purchase.</p>
        `,
      ),
      renderSection(
        "Prohibited conduct",
        renderList([
          "Using the app for unlawful purposes",
          "Attempting to gain unauthorized access",
          "Disrupting functionality or scraping the service",
          "Impersonating another person or entity",
        ]),
      ),
      renderSection(
        "Third-party services and liability",
        `
          <p>Nuju may rely on third-party services such as Google authentication, analytics vendors, infrastructure vendors, and payment processors. The app is provided as is without warranties to the maximum extent permitted by law.</p>
        `,
      ),
      renderSection(
        "Need the practical side too?",
        renderLinkCardGrid([
          {
            href: "/privacy",
            title: "Privacy Policy",
            description:
              "See how Nuju handles journal data, account information, and AI processing.",
            badge: "Trust",
          },
          {
            href: "/support",
            title: "Support and FAQ",
            description:
              "Get answers about billing, export, journaling features, and account access.",
            badge: "Help",
          },
          {
            href: "/contact",
            title: "Contact Nuju",
            description:
              "Reach the team for billing questions, bug reports, or account help.",
            badge: "Support",
          },
          {
            href: "/install",
            title: "Install Nuju",
            description:
              "Add Nuju to your phone or desktop and keep the app easy to reopen.",
            badge: "Setup",
          },
        ]),
      ),
    ],
  });
}

function renderMedicalDisclaimerBody() {
  return renderPageShell({
    eyebrow: "Medical Disclaimer",
    title: "Nuju is reflection support, not medical care",
    description:
      "Nuju is not a substitute for therapy, counseling, crisis intervention, diagnosis, or medical treatment.",
    meta: "Last updated April 7, 2026",
    sections: [
      renderSection(
        "What Nuju is",
        renderList([
          "A personal journaling tool to capture and reflect on emotions",
          "An AI companion that provides supportive responses",
          "A mood tracker that helps identify patterns over time",
          "A wellness app designed to complement, not replace, care",
        ]),
      ),
      renderSection(
        "What Nuju is not",
        renderList([
          "A medical diagnosis tool",
          "Mental health treatment or therapy",
          "A crisis intervention service",
          "A replacement for professional medical or mental health care",
        ]),
      ),
      renderSection(
        "If you are in crisis",
        `
          <p>Contact emergency services immediately, call 988 in the United States, or reach a qualified crisis line in your country. Go to the nearest emergency room if you need urgent help.</p>
        `,
      ),
      renderSection(
        "Use of AI responses",
        `
          <p>AI responses are supportive and reflective. They are not clinical evaluations, prescriptions, or diagnoses.</p>
        `,
      ),
      renderSection(
        "Your responsibility",
        renderList([
          "Seek professional help when you need clinical care",
          "Use Nuju as a supplement to, not a replacement for, professional support",
          "Contact a qualified professional or crisis service if you are in immediate danger",
        ]),
      ),
      renderSection(
        "Use Nuju with the right safety context",
        renderLinkCardGrid([
          {
            href: "/support",
            title: "Support and FAQ",
            description:
              "Get product help and common answers without losing the safety context.",
            badge: "Help",
          },
          {
            href: "/contact",
            title: "Contact Nuju",
            description:
              "Ask the team questions about safe product use, billing, or account access.",
            badge: "Support",
          },
          {
            href: "/privacy",
            title: "Privacy Policy",
            description:
              "See how journal data, account details, and AI processing are handled.",
            badge: "Trust",
          },
          {
            href: "/terms",
            title: "Terms of Service",
            description:
              "Review the rules, payment terms, and product boundaries in one place.",
            badge: "Policy",
          },
        ]),
      ),
    ],
    cta: renderCta({
      title: "Questions about safe use?",
      body: "If you are unsure about how Nuju fits into your support system, reach out to the team.",
      href: "/contact",
      label: "Contact Nuju",
    }),
  });
}

function renderBlogIndexBody(posts) {
  const recommendationOrder = new Set([
    "best-ai-journaling-apps",
    "best-mood-tracker-apps",
    "best-journaling-apps-2026",
    "daylio-alternatives",
    "reflectly-alternatives",
    "ai-journal-vs-traditional",
    "mood-tracking-for-anxiety",
    "ai-journal-for-overthinking",
    "mood-tracker-for-self-awareness",
    "journaling-for-adhd",
  ]);

  const recommendationPosts = posts.filter((post) => recommendationOrder.has(post.slug));
  const remainingPosts = posts.filter((post) => !recommendationOrder.has(post.slug));

  const renderPostCards = (items, label) => `
    <div class="nuju-card-grid">
      ${items
        .map(
          (post) => `
            <article class="nuju-mini-card">
              <h3><a href="/blog/${escapeAttribute(post.slug)}">${escapeHtml(post.title)}</a></h3>
              <p>${escapeHtml(post.description)}</p>
              <div class="nuju-chip-row">
                <span class="nuju-chip">${escapeHtml(post.category)}</span>
                <span class="nuju-chip">${escapeHtml(`${post.readingTime} min read`)}</span>
                <span class="nuju-chip">${escapeHtml(label)}</span>
              </div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;

  return renderPageShell({
    eyebrow: "Nuju Blog",
    title: "Best journaling apps, mood trackers, and emotional wellness guides",
    description:
      "Recommendation pages, honest app comparisons, and practical guides for journaling, mood tracking, emotional clarity, and building a reflection habit that sticks.",
    meta: `${posts.length} published articles`,
    sections: [
      renderSection(
        "Start here",
        `
          <p>The Nuju blog combines comparison pages, recommendation hubs, science-backed mood tracking explainers, and practical journaling guides. If you are deciding which app fits you, start with the recommendation set below.</p>
        `,
      ),
      renderSection(
        "Recommendation hub",
        recommendationPosts.length > 0
          ? renderPostCards(recommendationPosts, "Recommendation page")
          : "<p>No recommendation pages are published yet.</p>",
      ),
      renderSection(
        "Guides and practice",
        remainingPosts.length > 0
          ? renderPostCards(remainingPosts, "Guide")
          : "<p>No supporting guides are published yet.</p>",
      ),
    ],
    cta: renderCta({
      title: "Ready to move from reading to reflection?",
      body: "Nuju pairs low-friction mood tracking with AI reflection so you can go from discovery page to first insight without a heavy setup.",
      href: "/onboarding?source=prerender_blog",
      label: "Start the free reveal",
    }),
  });
}

function renderGuideBody() {
  return renderPageShell({
    eyebrow: "The Complete Guide",
    title: "Journaling: methods, science, and tools",
    description:
      "Everything you need to start a journaling practice that actually sticks, backed by research and updated for 2026.",
    meta: "18 min read · 9 chapters · Updated April 2026",
    sections: [
      renderSection(
        "What is in this guide",
        renderOrdered([
          "What journaling is and why it works",
          "How to start a journaling habit in 30 seconds",
          "What to write when you feel stuck",
          "How paper, digital, voice, and AI journaling differ",
          "How mood tracking reveals patterns over time",
          "Which journaling tools and apps fit different goals",
        ]),
      ),
      renderSection(
        "Why the science matters",
        `
          <p>Research on expressive writing, affect labeling, and sleep preparation all points in the same direction: writing down what you feel can reduce cognitive load, improve emotional clarity, and make patterns easier to notice.</p>
          <p>The goal is not perfect prose. The goal is noticing what keeps repeating in your emotional life.</p>
        `,
      ),
      renderSection(
        "How to start in 30 seconds",
        renderOrdered([
          "Attach journaling to something you already do every day.",
          "Rate your mood from 1 to 5.",
          "Write one sentence about what felt heavy, clear, or unexpectedly good.",
          "Repeat tomorrow with no pressure to write more than that.",
        ]),
      ),
      renderSection(
        "Where to go next",
        `
          <p>Use the <a href="/blog">Nuju blog</a> for deeper dives on prompts, mood tracking, AI journaling, anxiety, ADHD, and app comparisons. This guide is the map. The linked articles are the deep dives.</p>
        `,
      ),
      renderSection(
        "Continue with a more specific path",
        renderLinkCardGrid([
          {
            href: "/blog/how-to-start-journaling",
            title: "How to start journaling",
            description:
              "Use the simplest starting framework if you want a lower-pressure first habit.",
            badge: "Beginner",
          },
          {
            href: "/blog/voice-journaling-guide",
            title: "Voice journaling guide",
            description:
              "See when voice notes beat typing and how to make voice reflection easier to sustain.",
            badge: "Feature",
          },
          {
            href: "/blog/mood-tracker-for-self-awareness",
            title: "Mood tracking for self-awareness",
            description:
              "Learn how tracking patterns can reveal what is actually shaping your days.",
            badge: "Use case",
          },
          {
            href: "/onboarding",
            title: "Start the Ju reveal",
            description:
              "Move from reading about journaling to trying a low-friction reflection flow.",
            badge: "Product",
          },
        ]),
      ),
    ],
    cta: renderCta({
      title: "Try the low-friction version",
      body: "Nuju turns the habit-building ideas in this guide into one installable app with mood tracking, prompts, voice entries, and AI pattern discovery.",
      href: "/onboarding?source=prerender_guide",
      label: "Start journaling free",
    }),
  });
}

function renderBlogSection(section, index, slugifyHeading) {
  const key = `${section.type}-${index}`;

  switch (section.type) {
    case "h2":
      return `<h2 id="${escapeAttribute(slugifyHeading(String(section.content)))}">${escapeHtml(section.content)}</h2>`;
    case "h3":
      return `<h3>${escapeHtml(section.content)}</h3>`;
    case "p":
      return `<p>${escapeHtml(section.content)}</p>`;
    case "ul":
      return `<ul class="nuju-list">${section.content
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ul>`;
    case "ol":
      return `<ol class="nuju-ordered">${section.content
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ol>`;
    case "callout":
      return `<blockquote class="nuju-callout">${escapeHtml(section.content)}</blockquote>`;
    default:
      return `<!-- skipped ${escapeAttribute(key)} -->`;
  }
}

function renderBlogPostBody(post, relatedPosts, helpers) {
  const { getPostLanguage, slugifyHeading } = helpers;
  const language = getPostLanguage(post);
  const locale = language === "id" ? "id-ID" : "en-US";
  const formattedDate = formatDate(post.publishedAt, locale);

  const relatedHtml =
    relatedPosts.length > 0
      ? `
        <section class="nuju-section">
          <h2>${language === "id" ? "Baca juga" : "Keep reading"}</h2>
          <div class="nuju-card-grid">
            ${relatedPosts
              .map(
                (related) => `
                  <article class="nuju-mini-card">
                    <h3><a href="/blog/${escapeAttribute(related.slug)}">${escapeHtml(related.title)}</a></h3>
                    <p>${escapeHtml(related.description)}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>
      `
      : "";

  const faqHtml =
    post.faq && post.faq.length > 0
      ? renderSection(
          language === "id"
            ? "Pertanyaan yang sering ditanyakan"
            : "Frequently asked questions",
          renderFaq(post.faq),
        )
      : "";

  const ctaCopy =
    language === "id"
      ? {
          title: "Mulai entry jurnal pertamamu hari ini",
          body: "Nuju cuma butuh 30 detik sehari. Pilih mood, tulis satu kalimat, lalu mulai lihat pola emosimu dengan lebih jelas.",
          label: "Mulai journaling gratis",
        }
      : {
          title: "Start your first journal entry today",
          body: "Nuju takes 30 seconds a day. Track your mood, get AI insights, and understand your emotional patterns with less friction.",
          label: "Start journaling free",
        };

  return `
    <main class="nuju-prerender">
      <article class="nuju-card">
        <header class="nuju-article-header">
          <p class="nuju-article-kicker">${escapeHtml(post.category)}</p>
          <h1>${escapeHtml(post.title)}</h1>
          <p>${escapeHtml(post.description)}</p>
          <div class="nuju-chip-row">
            <span class="nuju-chip">${escapeHtml(formattedDate)}</span>
            <span class="nuju-chip">${escapeHtml(`${post.readingTime} min read`)}</span>
            <span class="nuju-chip">${escapeHtml(language === "id" ? "Bahasa Indonesia" : "English")}</span>
          </div>
        </header>
        <div class="nuju-grid">
          ${post.sections
            .map((section, index) => renderBlogSection(section, index, slugifyHeading))
            .join("")}
        </div>
        ${faqHtml}
        ${renderCta({
          title: ctaCopy.title,
          body: ctaCopy.body,
          href: `/onboarding?source=prerender_blog_${post.slug}`,
          label: ctaCopy.label,
        })}
        ${relatedHtml}
      </article>
    </main>
  `;
}

function writeRouteHtml(route, html) {
  const outPath =
    route === "/" ? join(DIST, "index.html") : join(DIST, route.slice(1), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  return outPath;
}

function stripExistingSeo(headHtml) {
  return headHtml
    .replace(/\s*<title>[\s\S]*?<\/title>\s*/gi, "\n")
    .replace(/\s*<meta[^>]+name="description"[^>]*>\s*/gi, "\n")
    .replace(/\s*<meta[^>]+name="keywords"[^>]*>\s*/gi, "\n")
    .replace(/\s*<meta[^>]+name="robots"[^>]*>\s*/gi, "\n")
    .replace(/\s*<meta[^>]+property="og:[^"]+"[^>]*>\s*/gi, "\n")
    .replace(/\s*<meta[^>]+name="twitter:[^"]+"[^>]*>\s*/gi, "\n")
    .replace(/\s*<link[^>]+rel="canonical"[^>]*>\s*/gi, "\n")
    .replace(/\s*<link[^>]+rel="alternate"[^>]+hrefLang="[^"]+"[^>]*>\s*/gi, "\n")
    .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "\n")
    .replace(/\s*<style data-prerender>[\s\S]*?<\/style>\s*/gi, "\n");
}

function buildSeoBlock(page) {
  const fullTitle = `${page.title} | Nuju`;
  const ogType = page.ogType ?? "website";
  const locale = page.locale ?? "en_US";
  const robots = page.noindex
    ? `<meta ${HELMET_ATTRIBUTE} name="robots" content="noindex, nofollow" />`
    : "";
  const alternateLinks = [
    ...(page.alternates ?? []),
    { lang: "x-default", url: page.canonical },
  ]
    .map(
      (alternate) =>
        `<link ${HELMET_ATTRIBUTE} rel="alternate" hrefLang="${escapeAttribute(alternate.lang)}" href="${escapeAttribute(alternate.url)}" />`,
    )
    .join("\n");

  const schemas = [
    buildBreadcrumbSchema(page.breadcrumbs),
    ...(page.schemas ?? []),
  ]
    .filter(Boolean)
    .map(
      (schema) =>
        `<script ${HELMET_ATTRIBUTE} type="application/ld+json">${JSON.stringify(schema)}</script>`,
    )
    .join("\n");

  return `
    <title ${HELMET_ATTRIBUTE}>${escapeHtml(fullTitle)}</title>
    <meta ${HELMET_ATTRIBUTE} name="description" content="${escapeAttribute(page.description)}" />
    ${robots}
    <link ${HELMET_ATTRIBUTE} rel="canonical" href="${escapeAttribute(page.canonical)}" />
    <meta ${HELMET_ATTRIBUTE} property="og:type" content="${escapeAttribute(ogType)}" />
    <meta ${HELMET_ATTRIBUTE} property="og:title" content="${escapeAttribute(fullTitle)}" />
    <meta ${HELMET_ATTRIBUTE} property="og:description" content="${escapeAttribute(page.description)}" />
    <meta ${HELMET_ATTRIBUTE} property="og:image" content="${escapeAttribute(OG_IMAGE)}" />
    <meta ${HELMET_ATTRIBUTE} property="og:image:alt" content="${escapeAttribute(OG_IMAGE_ALT)}" />
    <meta ${HELMET_ATTRIBUTE} property="og:image:width" content="1200" />
    <meta ${HELMET_ATTRIBUTE} property="og:image:height" content="630" />
    <meta ${HELMET_ATTRIBUTE} property="og:url" content="${escapeAttribute(page.canonical)}" />
    <meta ${HELMET_ATTRIBUTE} property="og:locale" content="${escapeAttribute(locale)}" />
    <meta ${HELMET_ATTRIBUTE} property="og:site_name" content="Nuju" />
    <meta ${HELMET_ATTRIBUTE} name="twitter:card" content="summary_large_image" />
    <meta ${HELMET_ATTRIBUTE} name="twitter:title" content="${escapeAttribute(fullTitle)}" />
    <meta ${HELMET_ATTRIBUTE} name="twitter:description" content="${escapeAttribute(page.description)}" />
    <meta ${HELMET_ATTRIBUTE} name="twitter:image" content="${escapeAttribute(OG_IMAGE)}" />
    <meta ${HELMET_ATTRIBUTE} name="twitter:image:alt" content="${escapeAttribute(OG_IMAGE_ALT)}" />
    <meta ${HELMET_ATTRIBUTE} name="twitter:site" content="@nujuapp" />
    <meta ${HELMET_ATTRIBUTE} name="twitter:creator" content="@nujuapp" />
    ${alternateLinks}
    ${schemas}
    ${PRERENDER_STYLE}
  `;
}

function applyPageToHtml(baseHtml, page) {
  const lang = page.lang ?? "en";
  const [fullMatch, headHtml] = baseHtml.match(/<head>([\s\S]*?)<\/head>/i) ?? [];
  if (!fullMatch) {
    throw new Error("Unable to locate <head> in dist/index.html");
  }

  const cleanedHead = stripExistingSeo(headHtml).trim();
  const seoBlock = buildSeoBlock(page).trim();
  const nextHead = `<head>\n${cleanedHead}\n${seoBlock}\n  </head>`;

  let html = baseHtml.replace(fullMatch, nextHead);
  html = html.replace(/<html[^>]*lang="[^"]*"[^>]*>/i, `<html lang="${escapeAttribute(lang)}">`);
  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>/i,
    `<div id="root">${page.bodyHtml}</div>`,
  );

  return html;
}

async function loadBlogModule() {
  const result = await build({
    entryPoints: [join(ROOT, "src/data/blog-posts.ts")],
    bundle: true,
    format: "esm",
    platform: "node",
    target: "node20",
    write: false,
  });
  const cacheDir = join(ROOT, "node_modules/.cache/nuju-prerender");
  mkdirSync(cacheDir, { recursive: true });
  const tmpFile = join(cacheDir, "blog-posts.mjs");
  writeFileSync(tmpFile, result.outputFiles[0].text);
  return import(`${pathToFileURL(tmpFile).href}?t=${Date.now()}`);
}

function buildStaticPages(posts) {
  const landingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: LANDING_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to start with Nuju",
    description: "Learn how Nuju helps you feel understood in three simple steps.",
    step: [
      {
        "@type": "HowToStep",
        name: "Share what feels heavy",
        text: "Answer a few gentle prompts so Ju can understand what has been hard to hold alone.",
      },
      {
        "@type": "HowToStep",
        name: "See the Ju Gets You reveal",
        text: "Get one personal read on what Ju notices, why it fits, and what support would help first.",
      },
      {
        "@type": "HowToStep",
        name: "Choose whether Ju stays close",
        text: "Keep the support going only if the reveal feels like a genuine fit for you.",
      },
    ],
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Nuju",
    alternateName: "Nuju AI Journal",
    applicationCategory: "HealthApplication",
    applicationSubCategory: "Emotional Wellness",
    operatingSystem: "Web browser, iOS, Android",
    url: BASE_URL,
    description:
      "Nuju is the AI journal app that helps you track moods, understand emotional patterns, and keep a gentle AI companion close after a free reveal.",
    screenshot: OG_IMAGE,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "49.99",
      priceCurrency: "USD",
      offerCount: "4",
    },
    featureList: [
      "Ju Gets You reveal",
      "AI mood tracking",
      "Voice or text journaling",
      "Emotional pattern detection",
      "30-day mood trends",
      "AI companion support",
      "Installable progressive web app",
    ],
    inLanguage: ["en", "id"],
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Nuju",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    url: BASE_URL,
    browserRequirements: "Requires JavaScript. Installable as a progressive web app.",
    description:
      "A reveal-first AI journal for mood tracking, reflection, and emotional clarity on web, phone, and desktop.",
    screenshot: OG_IMAGE,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nuju",
    url: BASE_URL,
    logo: `${BASE_URL}/pwa-192x192.png`,
    description: "Building AI tools for emotional wellness and self-awareness.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${BASE_URL}/support`,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nuju",
    alternateName: "Nuju AI Journal",
    url: BASE_URL,
    description:
      "The AI journal app for mood tracking, emotional clarity, and gentle reflection.",
    publisher: {
      "@type": "Organization",
      name: "Nuju",
      url: BASE_URL,
    },
  };

  const supportFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SUPPORT_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const guideArticleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Complete Guide to Journaling: Science, Methods, Tools (2026)",
    description:
      "Learn how to start journaling, build a habit that lasts, track moods, and choose the right prompts, methods, and tools for 2026.",
    datePublished: "2026-04-18",
    dateModified: "2026-04-18",
    inLanguage: "en",
    articleSection: "Journaling Guide",
    author: { "@type": "Organization", name: "Nuju", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "Nuju",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/pwa-192x192.png` },
    },
    image: OG_IMAGE,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/guides/journaling` },
  };

  return [
    {
      route: "/",
      title: "AI Journaling App and Mood Tracker",
      description:
        "Nuju is an AI journaling app and mood tracker for emotional clarity, private reflection, and fast daily check-ins. Start the Ju Gets You reveal free.",
      canonical: `${BASE_URL}/`,
      breadcrumbs: [{ name: "Home", url: `${BASE_URL}/` }],
      schemas: [
        softwareApplicationSchema,
        webApplicationSchema,
        organizationSchema,
        websiteSchema,
        howToSchema,
        landingFaqSchema,
      ],
      bodyHtml: renderLandingBody(),
    },
    {
      route: "/about",
      title: "About Nuju - AI Journaling App for Emotional Wellness",
      description:
        "Learn how Nuju was built - an AI journaling app with mood tracking, private reflection, and a personal AI companion for emotional clarity.",
      canonical: `${BASE_URL}/about`,
      breadcrumbs: [
        { name: "Home", url: `${BASE_URL}/` },
        { name: "About", url: `${BASE_URL}/about` },
      ],
      bodyHtml: renderAboutBody(),
    },
    {
      route: "/support",
      title: "Support and FAQ for Journaling, Billing, and Access",
      description:
        "Get help with Nuju journaling features, account access, billing, export questions, and the safest next step if you need more support.",
      canonical: `${BASE_URL}/support`,
      breadcrumbs: [
        { name: "Home", url: `${BASE_URL}/` },
        { name: "Support", url: `${BASE_URL}/support` },
      ],
      schemas: [supportFaqSchema],
      bodyHtml: renderSupportBody(),
    },
    {
      route: "/contact",
      title: "Contact Nuju for Support, Billing, and Feedback",
      description:
        "Contact Nuju for account help, billing questions, bug reports, product feedback, or anything blocking your journaling experience.",
      canonical: `${BASE_URL}/contact`,
      breadcrumbs: [
        { name: "Home", url: `${BASE_URL}/` },
        { name: "Contact", url: `${BASE_URL}/contact` },
      ],
      bodyHtml: renderContactBody(),
    },
    {
      route: "/install",
      title: "Install Nuju on iPhone, Android, and Desktop",
      description:
        "Install Nuju on iPhone, Android, or desktop for faster journaling, easier re-entry, and a smoother daily check-in flow.",
      canonical: `${BASE_URL}/install`,
      breadcrumbs: [
        { name: "Home", url: `${BASE_URL}/` },
        { name: "Install", url: `${BASE_URL}/install` },
      ],
      bodyHtml: renderInstallBody(),
    },
    {
      route: "/privacy",
      title: "Privacy Policy and Data Handling",
      description:
        "Learn how Nuju collects, stores, and protects journal data, account details, and AI-generated insights, plus what happens if you export or delete your account.",
      canonical: `${BASE_URL}/privacy`,
      breadcrumbs: [
        { name: "Home", url: `${BASE_URL}/` },
        { name: "Privacy Policy", url: `${BASE_URL}/privacy` },
      ],
      bodyHtml: renderPrivacyBody(),
    },
    {
      route: "/terms",
      title: "Terms of Service and Paid Access Rules",
      description:
        "Read Nuju's terms of service, account rules, payment terms, and the boundaries of the AI journaling experience before you keep using the app.",
      canonical: `${BASE_URL}/terms`,
      breadcrumbs: [
        { name: "Home", url: `${BASE_URL}/` },
        { name: "Terms of Service", url: `${BASE_URL}/terms` },
      ],
      bodyHtml: renderTermsBody(),
    },
    {
      route: "/medical-disclaimer",
      title: "Medical Disclaimer",
      description:
        "Important medical disclaimer for Nuju - the app is not a medical service and should not replace professional mental health support.",
      canonical: `${BASE_URL}/medical-disclaimer`,
      breadcrumbs: [
        { name: "Home", url: `${BASE_URL}/` },
        { name: "Medical Disclaimer", url: `${BASE_URL}/medical-disclaimer` },
      ],
      bodyHtml: renderMedicalDisclaimerBody(),
    },
    {
      route: "/blog",
      title: "Blog: Journaling, Mood Tracking, and Wellness Guides",
      description:
        "Read recommendation pages, honest app comparisons, and practical guides for journaling, mood tracking, emotional clarity, and building a reflection habit that sticks.",
      canonical: `${BASE_URL}/blog`,
      breadcrumbs: [
        { name: "Home", url: `${BASE_URL}/` },
        { name: "Blog", url: `${BASE_URL}/blog` },
      ],
      bodyHtml: renderBlogIndexBody(posts),
    },
    {
      route: "/guides/journaling",
      title: "Complete Guide to Journaling: Science, Methods, Tools",
      description:
        "Learn how to start journaling, build a habit that lasts, track moods, and choose the right prompts, methods, and tools for 2026.",
      canonical: `${BASE_URL}/guides/journaling`,
      breadcrumbs: [
        { name: "Home", url: `${BASE_URL}/` },
        { name: "Guides", url: `${BASE_URL}/guides/journaling` },
        { name: "Journaling", url: `${BASE_URL}/guides/journaling` },
      ],
      ogType: "article",
      schemas: [guideArticleSchema],
      bodyHtml: renderGuideBody(),
    },
  ];
}

function buildBlogPages(helpers) {
  const {
    getPublishedBlogPosts,
    getRelatedPosts,
    getPostLanguage,
    LANGUAGE_ALTERNATES,
    slugifyHeading,
  } = helpers;

  const posts = getPublishedBlogPosts(new Date()).map(normalizeBlogPost);

  return posts.map((post) => {
    const language = getPostLanguage(post);
    const locale = language === "id" ? "id_ID" : "en_US";
    const canonical = `${BASE_URL}/blog/${post.slug}`;
    const alternateMapping = LANGUAGE_ALTERNATES[post.slug];
    const alternates = alternateMapping
      ? [
          {
            lang: alternateMapping.language === "en" ? "id" : "en",
            url: `${BASE_URL}/blog/${alternateMapping.alternateSlug}`,
          },
          { lang: language, url: canonical },
        ]
      : [{ lang: language, url: canonical }];

    const wordCount = post.sections.reduce((total, section) => {
      const text = Array.isArray(section.content)
        ? section.content.join(" ")
        : String(section.content);
      return total + text.split(/\s+/).filter(Boolean).length;
    }, 0);

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      inLanguage: language,
      wordCount,
      articleSection: post.category,
      author: {
        "@type": "Organization",
        name: "Nuju",
        url: BASE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "Nuju",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/pwa-192x192.png`,
        },
      },
      image: OG_IMAGE,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical,
      },
    };

    const faqSchema =
      post.faq && post.faq.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }
        : null;

    return {
      route: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      canonical,
      lang: language,
      locale,
      ogType: "article",
      alternates,
      breadcrumbs: [
        { name: "Home", url: `${BASE_URL}/` },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: post.title, url: canonical },
      ],
      schemas: [articleSchema, faqSchema].filter(Boolean),
      bodyHtml: renderBlogPostBody(post, getRelatedPosts(post.slug, 3, new Date()), {
        getPostLanguage,
        slugifyHeading,
      }),
    };
  });
}

async function prerender() {
  const baseHtml = readFileSync(join(DIST, "index.html"), "utf8");
  const blogModule = await loadBlogModule();
  const helpers = {
    getPublishedBlogPosts: blogModule.getPublishedBlogPosts,
    getRelatedPosts: blogModule.getRelatedPosts,
    getPostLanguage: blogModule.getPostLanguage,
    LANGUAGE_ALTERNATES: blogModule.LANGUAGE_ALTERNATES,
    slugifyHeading: blogModule.slugifyHeading,
  };

  const publishedPosts = helpers.getPublishedBlogPosts(new Date()).map(normalizeBlogPost);
  const staticPages = buildStaticPages(publishedPosts);
  const blogPages = buildBlogPages(helpers);
  const allPages = [...staticPages, ...blogPages];

  console.log(`Prerendering ${allPages.length} public routes without a browser...`);

  for (const page of allPages) {
    const html = applyPageToHtml(baseHtml, page);
    const outPath = writeRouteHtml(page.route, html);
    console.log(`  ok ${page.route} -> ${outPath.replace(DIST, "dist")}`);
  }

  console.log("Static prerender complete.");
}

prerender().catch((error) => {
  console.error(
    "Prerender failed:",
    error instanceof Error ? error.stack || error.message : String(error),
  );
  process.exit(1);
});
