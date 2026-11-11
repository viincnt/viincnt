import type { MetadataRoute } from "next";
import { locales } from "@/i18n-config";

const base = "https://viincnt.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const homePages = locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}`])),
    },
  }));

  const legalPages = [
    { path: "terms", priority: 0.3 },
    { path: "privacy", priority: 0.3 },
  ].map(({ path, priority }) => ({
    url: `${base}/en/${path}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority,
  }));

  return [...homePages, ...legalPages];
}
