import { notFound } from "next/navigation";
import fr from "./dictionaries/fr.json";
import en from "./dictionaries/en.json";

const dictionaries = { fr, en };

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof fr;

export const locales = Object.keys(dictionaries) as Locale[];

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export function getDictionary(locale: string): Dictionary {
  if (!hasLocale(locale)) notFound();
  return dictionaries[locale];
}
