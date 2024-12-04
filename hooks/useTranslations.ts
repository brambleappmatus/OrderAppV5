import { useStore } from '@/store/useStore';

export const useTranslations = () => {
  const { translations, language, setLanguage } = useStore();
  return { translations, language, setLanguage };
};