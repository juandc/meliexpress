import type { AllowedDictionaries, Dictionary } from '@/types';

const dictionaries: Record<AllowedDictionaries, () => Promise<Dictionary>> = {
  es: () => import('./es').then((module) => module.default),
};

export const getDictionary = async (lang: AllowedDictionaries = "es") => {
  if (dictionaries[lang]) {
    const dictionary = await dictionaries[lang]();
    return dictionary;
  }
  throw new Error(`Dictionary not found for language: ${lang}`);
};

/* This is just a default system to get copy / texts and share it
 * between components, tests... In case a real i18n library or flow is
 * implemented, it will require to separate server-side and client-side logic
 * (reading cookies, parsing urls...), so although its the same logic now,
 * its already separated to help with a future implementation
*/
export {
  getDictionary as getDictionaryFromServer,
  getDictionary as getDictionaryFromClient,
};
