import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, Clock, Tag, ArrowLeft, List } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";
import {
  getPublishedBlogPost,
  getRelatedPosts,
  getPostLanguage,
  LANGUAGE_ALTERNATES,
  slugifyHeading,
  BlogSection,
  BlogPost as BlogPostData,
} from "@/data/blog-posts";

const renderSection = (section: BlogSection, index: number) => {
  switch (section.type) {
    case "h2":
      return (
        <h2
          key={index}
          id={slugifyHeading(section.content as string)}
          className="font-serif text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-20"
        >
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
  const post = getPublishedBlogPost(slug ?? "");

  if (!post) return <Navigate to="/blog" replace />;

  const language = getPostLanguage(post);
  const locale = language === "id" ? "id-ID" : "en-US";
  const canonical = `https://nuju.app/blog/${post.slug}`;

  const alternateMapping = LANGUAGE_ALTERNATES[post.slug];
  const alternates = alternateMapping
    ? [
        {
          lang: alternateMapping.language === "en" ? "id" : "en",
          url: `https://nuju.app/blog/${alternateMapping.alternateSlug}`,
        },
        { lang: language, url: canonical },
      ]
    : undefined;

  const tocItems = post.sections
    .filter((s): s is BlogSection & { type: "h2"; content: string } => s.type === "h2")
    .map((s) => ({ id: slugifyHeading(s.content), label: s.content }));

  const wordCount = post.sections.reduce((total, s) => {
    const text = Array.isArray(s.content) ? s.content.join(" ") : s.content;
    return total + text.split(/\s+/).length;
  }, 0);

  const relatedPosts = getRelatedPosts(post.slug, 3);

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
    image: "https://sxgmlnlqmdjjfmcypivi.supabase.co/functions/v1/og-image",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };

  const faqSchema = post.faq && post.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      }
    : null;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const copy = language === "id"
    ? {
        allArticles: "Semua artikel",
        tryFree: "Coba Nuju gratis",
        minRead: "menit baca",
        onThisPage: "Isi artikel",
        faqTitle: "Pertanyaan yang sering ditanyakan",
        relatedTitle: "Baca juga",
        ctaEyebrow: "Coba sendiri",
        ctaTitle: "Mulai entry jurnal pertamamu hari ini",
        ctaBody: "Nuju cuma butuh 30 detik sehari. Pilih mood, tulis satu kalimat, dan mulai lihat pola emosimu — gratis untuk mulai.",
        ctaButton: "Mulai journaling gratis",
        backToBlog: "Kembali ke semua artikel",
        footerAbout: "Tentang",
        footerSupport: "Bantuan",
        footerPrivacy: "Privasi",
      }
    : {
        allArticles: "All articles",
        tryFree: "Try Nuju free",
        minRead: "min read",
        onThisPage: "On this page",
        faqTitle: "Frequently asked questions",
        relatedTitle: "Keep reading",
        ctaEyebrow: "Try it yourself",
        ctaTitle: "Start your first journal entry today",
        ctaBody: "Nuju takes 30 seconds a day. Track your mood, get AI insights, and start understanding your emotional patterns — free to start.",
        ctaButton: "Start journaling free",
        backToBlog: "Back to all articles",
        footerAbout: "About",
        footerSupport: "Support",
        footerPrivacy: "Privacy",
      };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={post.title}
        description={post.description}
        canonical={canonical}
        alternates={alternates}
        breadcrumbs={[
          { name: "Home", url: "https://nuju.app/" },
          { name: "Blog", url: "https://nuju.app/blog" },
          { name: post.title, url: canonical },
        ]}
      />
      <Helmet>
        <html lang={language} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/95">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link to="/blog" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> {copy.allArticles}
          </Link>
          <Link
            to="/onboarding"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            {copy.tryFree}
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
            {post.readingTime} {copy.minRead}
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

        {/* Table of contents */}
        {tocItems.length >= 3 && (
          <nav
            aria-label={copy.onThisPage}
            className="mb-10 rounded-2xl border border-border/50 bg-card/60 px-5 py-4"
          >
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <List className="h-4 w-4" />
              {copy.onThisPage}
            </p>
            <ol className="space-y-1.5 text-sm">
              {tocItems.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-foreground/80 hover:text-primary transition-colors"
                  >
                    {i + 1}. {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Body */}
        <div className="prose-nuju">
          {post.sections.map((section, index) => renderSection(section, index))}
        </div>

        {/* FAQ */}
        {post.faq && post.faq.length > 0 && (
          <section
            aria-labelledby="faq-heading"
            className="mt-14 border-t border-border/40 pt-10"
          >
            <h2
              id="faq-heading"
              className="font-serif text-2xl font-bold text-foreground mb-6"
            >
              {copy.faqTitle}
            </h2>
            <div className="space-y-4">
              {post.faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border/50 bg-card/40 px-5 py-4 transition-colors hover:border-primary/30"
                >
                  <summary className="cursor-pointer list-none font-serif text-lg font-semibold text-foreground marker:hidden">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-foreground/85 leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            {copy.ctaEyebrow}
          </p>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
            {copy.ctaTitle}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {copy.ctaBody}
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            {copy.ctaButton} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section
            aria-labelledby="related-heading"
            className="mt-16 border-t border-border/40 pt-10"
          >
            <h2
              id="related-heading"
              className="font-serif text-2xl font-bold text-foreground mb-6"
            >
              {copy.relatedTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related: BlogPostData) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="group flex flex-col rounded-2xl border border-border/50 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    <Tag className="h-3 w-3" />
                    {related.category}
                  </span>
                  <h3 className="mb-2 font-serif text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {related.title}
                  </h3>
                  <span className="mt-auto flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {related.readingTime} {copy.minRead}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to blog */}
        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> {copy.backToBlog}
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border/60 px-4 py-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link to="/" className="font-serif font-bold text-foreground">Nuju</Link>
          <div className="flex flex-wrap gap-4">
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">{copy.footerAbout}</Link>
            <Link to="/support" className="hover:text-foreground transition-colors">{copy.footerSupport}</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">{copy.footerPrivacy}</Link>
          </div>
          <p>© 2026 Nuju. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
