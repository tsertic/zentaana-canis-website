export const locales = ["hr", "en"] as const;
export const defaultLocale = "hr" as const;
export type Locale = (typeof locales)[number];
