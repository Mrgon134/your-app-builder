import React from "react";
import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
}

const BASE_TITLE = "Nuju";
const OG_IMAGE = "https://sxgmlnlqmdjjfmcypivi.supabase.co/functions/v1/og-image";

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, canonical, noindex, breadcrumbs }) => {
  const fullTitle = `${title} | ${BASE_TITLE}`;

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
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:site" content="@nujuapp" />
      <meta name="twitter:creator" content="@nujuapp" />
      {canonical && <link rel="alternate" hrefLang="en" href={canonical} />}
      {canonical && <link rel="alternate" hrefLang="x-default" href={canonical} />}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
