import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { getPublishedBlogPosts } from "@/data/blog-posts";

const RECOMMENDATION_HUB_ORDER = [
  "best-ai-journaling-apps",
  "best-mood-tracker-apps",
  "daylio-alternatives",
  "ai-journal-vs-traditional",
  "mood-tracking-for-anxiety",
];

const RECOMMENDATION_HUB_LABELS: Record<string, string> = {
  "best-ai-journaling-apps": "Category query",
  "best-mood-tracker-apps": "Category query",
  "daylio-alternatives": "Alternative query",
  "ai-journal-vs-traditional": "Comparison query",
  "mood-tracking-for-anxiety": "Use-case query",
};

const Blog: React.FC = () => {
  const posts = getPublishedBlogPosts();
  const recommendationPosts = RECOMMENDATION_HUB_ORDER
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post): post is (typeof posts)[number] => Boolean(post));
  const recommendationSlugs = new Set(recommendationPosts.map((post) => post.slug));
  const remainingPosts = posts.filter((post) => !recommendationSlugs.has(post.slug));

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Nuju Blog - Best Journaling Apps, Mood Trackers, and Emotional Wellness Guides"
        description="Recommendation pages, honest app comparisons, and practical guides on journaling, mood tracking, and emotional clarity."
        canonical="https://nuju.app/blog"
        breadcrumbs={[
          { name: "Home", url: "https://nuju.app/" },
          { name: "Blog", url: "https://nuju.app/blog" },
        ]}
      />

      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/95">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-serif text-lg font-bold text-foreground"
          >
            Nuju
          </Link>
          <Link
            to="/onboarding"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Try free
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Nuju Blog
          </p>
          <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
            Journaling, mood tracking, and emotional wellness
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Practical guides to help you build self-awareness, understand your
            emotional patterns, and get more from your journaling practice.
          </p>
        </div>

        <Link
          to="/guides/journaling"
          className="group mb-10 flex flex-col gap-3 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-6 transition-all hover:border-primary/60 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                The complete guide
              </p>
              <h2 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                Journaling: Methods, Science &amp; Tools
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Everything we know about journaling, distilled into one 18-minute read.
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-primary whitespace-nowrap">
            Read guide <ArrowRight className="h-4 w-4" />
          </span>
        </Link>

        {recommendationPosts.length > 0 && (
          <section
            data-testid="blog-recommendation-hub"
            className="mb-12 rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:p-8"
          >
            <div className="mb-6 max-w-2xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Recommendation Hub
              </p>
              <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                Start with the pages built for discovery and comparison intent
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                These are the pages designed to win recommendation-style queries, answer
                who Nuju is for, and send high-intent readers into the reveal or install path.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {recommendationPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-primary/15 bg-background/90 p-5 transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                    <span className="rounded-full border border-border/60 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      {RECOMMENDATION_HUB_LABELS[post.slug] ?? "Recommendation page"}
                    </span>
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime} min read
                    </span>
                    <span className="flex items-center gap-1 font-medium text-primary">
                      Read page <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/onboarding?source=blog_recommendation_hub"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                Start the free reveal <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/install"
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                See how Nuju works
              </Link>
            </div>
          </section>
        )}

        {remainingPosts.length > 0 && (
          <>
            <div className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Guides and Practice
              </p>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Science, prompts, and habit-building articles
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Supporting content that builds emotional literacy, journaling consistency,
                and stronger internal links into Nuju&apos;s recommendation pages.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                  </div>
                  <h2 className="mb-2 font-serif text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime} min read
                    </span>
                    <span className="flex items-center gap-1 font-medium text-primary">
                      Read article <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-10 text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
            Ready to move from reading to reflection?
          </h2>
          <p className="text-muted-foreground mb-6">
            Nuju pairs low-friction mood tracking with AI reflection, so you can go
            from discovery page to first insight without a heavy setup.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/onboarding?source=blog_footer_cta"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Start the free reveal <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/install"
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              See install options
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-border/60 px-4 py-8 mt-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link to="/" className="font-serif font-bold text-foreground">
            Nuju
          </Link>
          <div className="flex flex-wrap gap-4">
            <Link to="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/support" className="hover:text-foreground transition-colors">
              Support
            </Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
          <p>&copy; 2026 Nuju. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
