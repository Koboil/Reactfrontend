import English from '@/flags/us.png';
import French from '@/flags/fr.png';

export type Language = {
   nativeName: string;
   image: string;
};
export const lngs = {
   en: {
      nativeName: 'English',
      image: English,
   },
   fr: {
      nativeName: 'Français',
      image: French,
   },
};
export const defaultLocale = 'fr';
export type Locale = 'fr' | 'en';
export const availableLocales = ['en', 'fr'];
