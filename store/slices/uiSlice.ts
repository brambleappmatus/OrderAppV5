import { StateCreator } from 'zustand';
import { en } from '@/translations/en';
import { sk } from '@/translations/sk';
import { de } from '@/translations/de';

type Language = 'en' | 'sk' | 'de';
const translations = { en, sk, de };

export interface UIState {
  isDarkMode: boolean;
  isSideMenuExpanded: boolean;
  isAdminAuthenticated: boolean;
  language: Language;
  translations: typeof en;
  toggleDarkMode: () => void;
  toggleSideMenu: () => void;
  setAdminAuthenticated: (value: boolean) => void;
  setLanguage: (lang: Language) => void;
}

export const uiReducer: StateCreator<UIState, [], [], UIState> = (set, get, api) => ({
  isDarkMode: false,
  isSideMenuExpanded: true,
  isAdminAuthenticated: false,
  language: 'en' as Language,
  translations: en,

  toggleDarkMode: () =>
    set((state) => ({ isDarkMode: !state.isDarkMode })),

  toggleSideMenu: () =>
    set((state) => ({ isSideMenuExpanded: !state.isSideMenuExpanded })),

  setAdminAuthenticated: (value: boolean) =>
    set({ isAdminAuthenticated: value }),

  setLanguage: (lang: Language) =>
    set({ language: lang, translations: translations[lang] }),
});