import { Locale } from "./types";

export function localeField<T>(obj: T, field: string, locale: Locale): string {
  const localized = (obj as any)?.[`${field}_${locale}`];
  const fallback = (obj as any)?.[`${field}_hr`];
  return localized || fallback || "";
}

export function localePortableText<T>(obj: T, field: string, locale: Locale) {
  const localized = (obj as any)?.[`${field}_${locale}`];
  const fallback = (obj as any)?.[`${field}_hr`];
  return localized || fallback || null;
}
