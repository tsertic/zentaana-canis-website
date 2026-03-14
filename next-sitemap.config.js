/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://zentaanacanis.com",
  generateRobotsTxt: true,
  exclude: ["/studio/*", "/api/*"],
  alternateRefs: [
    {
      href: process.env.NEXT_PUBLIC_SITE_URL || "https://zentaanacanis.com",
      hreflang: "hr",
    },
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || "https://zentaanacanis.com"}/en`,
      hreflang: "en",
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api"],
      },
    ],
  },
};
