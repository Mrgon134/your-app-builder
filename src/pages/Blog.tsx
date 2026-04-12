import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { BLOG_POSTS } from "@/data/blog-posts";

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Nuju Blog – Journaling Tips, Mood Tracking & Emotional Wellness"
        description="Practical guides on journaling, mood tracking, and emotional wellness. Learn how to build a journaling habit, understand your emotions, and use AI to discover patterns in your mental health."
        canonical="https://nuju.app/blog"
        breadcrumbs={[
          { name: "Home", url: "https://nuju.app/" },
          { name: "Blog", url: "https://nuju.app/blog" },
        ]}
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/95">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-serif text-lg font-bold text-foreground">
            ← Nuju
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
        {/* Header */}
        <div className="mb-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Nuju Blog
          </p>
          <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
            Journaling, mood tracking &amp; emotional wellness
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Practical guides to help you build self-awareness, understand your emotional patterns, and get more from your journaling practice.
          </p>
        </div>

        {/* Article grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
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

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-10 text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
            Ready to start your journaling practice?
          </h2>
          <p className="text-muted-foreground mb-6">
            Nuju is the AI journal app that tracks your mood, reveals patterns, and gives you a personal AI coach — free to start.
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Start journaling free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/60 px-4 py-8 mt-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link to="/" className="font-serif font-bold text-foreground">Nuju</Link>
          <div className="flex flex-wrap gap-4">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/support" className="hover:text-foreground transition-colors">Support</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
          <p>© 2026 Nuju. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
