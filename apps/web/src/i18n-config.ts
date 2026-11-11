export const locales = ["en", "pt", "fr"] as const;
export const defaultLocale = "en";
export const localeCookie = "NEXT_LOCALE";

export type Locale = (typeof locales)[number];

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const htmlLang: Record<Locale, string> = {
  en: "en",
  pt: "pt-BR",
  fr: "fr",
};

export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  pt: "pt_BR",
  fr: "fr_FR",
};

export const localeMeta: Record<Locale, { name: string; flag: string }> = {
  en: { name: "English", flag: "/flags/gb.svg" },
  pt: { name: "Português", flag: "/flags/br.svg" },
  fr: { name: "Français", flag: "/flags/fr.svg" },
};
