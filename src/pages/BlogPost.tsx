import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, Clock, Tag, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";
import { getBlogPost, BlogSection } from "@/data/blog-posts";

const renderSection = (section: BlogSection, index: number) => {
  switch (section.type) {
    case "h2":
      return (
        <h2 key={index} className="font-serif text-2xl font-bold text-foreground mt-10 mb-4">
          {section.content as string}
        </h2>
      );
    case "h3":
      return (
        <h3 key={index} className="font-serif text-xl font-semibold text-foreground mt-8 mb-3">
          {section.content as string}
        </h3>
      );
    case "p":
      return (
        <p key={index} className="text-foreground/85 leading-relaxed mb-4">
          {section.content as string}
        </p>
      );
    case "ul":
      return (
        <ul key={index} className="mb-4 space-y-2 pl-4">
          {(section.content as string[]).map((item, i) => (
            <li key={i} className="flex gap-2 text-foreground/85 leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="mb-4 space-y-2 pl-4">
          {(section.content as string[]).map((item, i) => (
            <li key={i} className="flex gap-3 text-foreground/85 leading-relaxed">
              <span className="flex-shrink-0 font-semibold text-primary">{i + 1}.</span>
              {item}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <blockquote
          key={index}
          className="my-6 rounded-xl border-l-4 border-primary bg-primary/5 px-5 py-4 italic text-foreground/90 leading-relaxed"
        >
          {section.content as string}
        </blockquote>
      );
    default:
      return null;
  }
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug ?? "");

  if (!post) return <Navigate to="/blog" replace />;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Nuju",
      url: "https://nuju.app",
    },
    publisher: {
      "@type": "Organization",
      name: "Nuju",
      url: "https://nuju.app",
      logo: {
        "@type": "ImageObject",
        url: "https://nuju.app/pwa-192x192.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://nuju.app/blog/${post.slug}`,
    },
  };

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={post.title}
        description={post.description}
        canonical={`https://nuju.app/blog/${post.slug}`}
        breadcrumbs={[
          { name: "Home", url: "https://nuju.app/" },
          { name: "Blog", url: "https://nuju.app/blog" },
          { name: post.title, url: `https://nuju.app/blog/${post.slug}` },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/95">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link to="/blog" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
          <Link
            to="/onboarding"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Try Nuju free
          </Link>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-4 py-12">
        {/* Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
            <Tag className="h-3 w-3" />
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime} min read
          </span>
          <time dateTime={post.publishedAt}>{formattedDate}</time>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl font-bold text-foreground leading-tight mb-6 sm:text-4xl">
          {post.title}
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-10 border-b border-border/40 pb-10">
          {post.description}
        </p>

        {/* Body */}
        <div className="prose-nuju">
          {post.sections.map((section, index) => renderSection(section, index))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            Try it yourself
          </p>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
            Start your first journal entry today
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Nuju takes 30 seconds a day. Track your mood, get AI insights, and start understanding your emotional patterns — free to start.
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Start journaling free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Back to blog */}
        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border/60 px-4 py-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link to="/" className="font-serif font-bold text-foreground">Nuju</Link>
          <div className="flex flex-wrap gap-4">
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
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

export default BlogPost;
