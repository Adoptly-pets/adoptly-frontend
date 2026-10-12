export type Region = { uk: string; en: string };

export const regionSlug = (region: Region): string =>
  region.en.toLowerCase().replace(/\s+/g, '-');
