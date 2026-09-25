import React from "react";
import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface AlternateLink {
  lang: string;
  url: string;
}

export type SupportedLanguage = "en" | "id" | "de" | "ja" | "fr" | "ko" | "es";

export const LOCALE_MAP: Record<SupportedLanguage, string> = {
  en: "en_US",
  id: "id_ID",
  de: "de_DE",
  ja: "ja_JP",
  fr: "fr_FR",
  ko: "ko_KR",
  es: "es_ES",
};

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[] | string;
  canonical?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  alternates?: AlternateLink[];
  noSuffix?: boolean;
  language?: SupportedLanguage;
  image?: string;
  imageAlt?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const BASE_TITLE = "Nuju";
const OG_IMAGE =
  "https://sxgmlnlqmdjjfmcypivi.supabase.co/functions/v1/og-image";
const OG_IMAGE_ALT = "Nuju AI journal companion app screenshot";

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonical,
  canonicalUrl,
  noindex,
  breadcrumbs,
  alternates,
  noSuffix,
  language = "en",
  image,
  imageAlt,
  schema,
}) => {
  const fullTitle = noSuffix ? title : `${title} | ${BASE_TITLE}`;
  const ogLocale = LOCALE_MAP[language] ?? "en_US";
  const rawCanonical = canonical || canonicalUrl;
  const resolvedCanonical = rawCanonical
    ? rawCanonical.startsWith("http")
      ? rawCanonical
      : `https://nuju.app${rawCanonical.startsWith("/") ? "" : "/"}${rawCanonical}`
    : undefined;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `https://nuju.app${image.startsWith("/") ? "" : "/"}${image}`
    : OG_IMAGE;
  const ogImageAlt = imageAlt || (image ? title : OG_IMAGE_ALT);

  const breadcrumbSchema = breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && (
        <meta
          name="keywords"
          content={Array.isArray(keywords) ? keywords.join(", ") : keywords}
        />
      )}
      {resolvedCanonical && <link rel="canonical" href={resolvedCanonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {resolvedCanonical && <meta property="og:url" content={resolvedCanonical} />}
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:site_name" content="Nuju" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
      <meta name="twitter:site" content="@nujuapp" />
      <meta name="twitter:creator" content="@nujuapp" />

      {resolvedCanonical && !alternates && (
        <link rel="alternate" hrefLang={language} href={resolvedCanonical} />
      )}
      {resolvedCanonical && <link rel="alternate" hrefLang="x-default" href={resolvedCanonical} />}
      {alternates?.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
