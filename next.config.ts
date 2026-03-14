import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https" as const,
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https" as const,
        hostname: "**.fbcdn.net",
      },
      {
        protocol: "https" as const,
        hostname: "feeds.behold.so",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
