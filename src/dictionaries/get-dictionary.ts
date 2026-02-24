// src/dictionaries/get-dictionary.ts
import 'server-only'; // Sécurité pour s'assurer que ce code ne tourne que sur le serveur

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  fr: () => import('./fr.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'fr') => {
  // On s'assure de tomber sur 'fr' par défaut si la locale est inconnue
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.fr();
};