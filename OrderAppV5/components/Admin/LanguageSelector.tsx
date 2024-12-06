'use client';

import React from 'react';
import { useStore } from '@/store/useStore';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'sk', name: 'Slovenčina' },
  { code: 'de', name: 'Deutsch' }
] as const;

export default function LanguageSelector() {
  const { language, setLanguage } = useStore();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as typeof language)}
      className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-700/50 border border-gray-200 dark:border-zinc-600 rounded-lg text-gray-700 dark:text-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-zinc-600"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}