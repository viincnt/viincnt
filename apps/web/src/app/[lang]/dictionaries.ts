import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, type Locale } from "@/i18n-config";
import type en from "./dictionaries/en.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  pt: () => import("./dictionaries/pt.json").then((module) => module.default),
  fr: () => import("./dictionaries/fr.json").then((module) => module.default),
};

export const getLocale = async (): Promise<Locale> => {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return locale;
};

export const getDictionary = async (): Promise<Dictionary> => dictionaries[await getLocale()]();
