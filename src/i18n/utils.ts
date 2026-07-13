import { getRelativeLocaleUrl } from "astro:i18n";
import { defaultLang, ui, type Lang } from "./ui";

// Resolve a translation key for `lang`, falling back to the default locale.
export function useTranslations(lang: Lang) {
  const dict = ui[lang] as Record<string, string>;
  const fallback = ui[defaultLang] as Record<string, string>;
  return function t(key: string): string {
    return dict[key] ?? fallback[key] ?? key;
  };
}

// URL of the equivalent page in another locale (used by the switcher).
export function getLocalizedUrl(lang: Lang, path = "/"): string {
  return getRelativeLocaleUrl(lang, path);
}

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

// Convert Latin digits to Persian. Apply only when rendering the fa locale.
export function toFaDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

// Narrow Astro.currentLocale (string | undefined) to our Lang union.
export function asLang(locale: string | undefined): Lang {
  return locale === "fa" ? "fa" : "en";
}
