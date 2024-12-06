'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface LoginFormProps {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { translations } = useStore();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      onLogin();
      setError('');
    } else {
      setError(translations.admin.login.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
      <div className="w-full max-w-md p-8 bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-md relative">
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
          aria-label={translations.shop.close}
        >
          <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-zinc-400" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-zinc-100">
          {translations.admin.login.title}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              {translations.admin.login.password}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-100"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 dark:text-red-400 text-sm mb-4">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="flex-1 py-2 px-4 border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
            >
              {translations.shop.backToShop}
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
            >
              {translations.admin.login.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}