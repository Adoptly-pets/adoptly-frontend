export const useTranslation = () => ({
  t: (key: string) => {
    const translations: Record<string, string> = {
      'hero.title': 'Знайди друга врятуй життя',
      'hero.findPet': 'Знайти улюбленця',
      'hero.donate': 'Задонатити',
      'hero.subtitle': 'Свайпай, знайомся, допомагай',
    };
    return translations[key] || key;
  },
  i18n: {
    language: 'uk',
    changeLanguage: () => new Promise(() => {}),
  },
});

export const Trans = ({ i18nKey }: { i18nKey: string }) => {
  const translations: Record<string, string> = {
    'hero.title': 'Знайди друга врятуй життя',
    'hero.subtitle': 'Свайпай, знайомся, допомагай',
  };
  return translations[i18nKey] || i18nKey;
};
