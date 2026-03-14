import { Locale } from "./types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zentaanacanis.com";

export function getBaseUrl() {
  return siteUrl;
}

export function getCanonicalUrl(pathname: string, locale: Locale) {
  const prefix = locale === "hr" ? "" : `/${locale}`;
  return `${siteUrl}${prefix}${pathname}`;
}

export type JsonLdBreadcrumb = {
  name: string;
  href: string;
};

export function generateBreadcrumbJsonLd(
  items: JsonLdBreadcrumb[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: getCanonicalUrl(item.href, locale),
    })),
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zentaana Canis",
    url: siteUrl,
    logo: `${siteUrl}/images/zc_logo2.svg`,
    description: "FCI registered dog breeding kennel",
    address: {
      "@type": "PostalAddress",
      addressCountry: "HR",
    },
    sameAs: [] as string[],
  };
}

export function generateLocalBusinessJsonLd(settings: any) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Zentaana Canis",
    url: siteUrl,
    logo: `${siteUrl}/images/zc_logo2.svg`,
    image: `${siteUrl}/images/zc_logo2.svg`,
    description: "FCI registered dog breeding kennel",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.address || "",
      addressLocality: settings?.city || "Zagreb",
      addressCountry: settings?.country || "Croatia",
    },
    email: settings?.email || "",
    telephone: settings?.phone || "",
    geo: settings?.mapCoordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: settings.mapCoordinates.lat,
          longitude: settings.mapCoordinates.lng,
        }
      : undefined,
    sameAs: [
      settings?.instagram,
      settings?.facebook,
      settings?.youtube,
      settings?.tiktok,
    ].filter(Boolean),
  };
}
