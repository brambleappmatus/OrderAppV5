'use client';

import { Toaster } from 'react-hot-toast';
import ThemeProvider from '@/components/Layout/ThemeProvider';
import { useSupabase } from '@/hooks/useSupabase';
import { useEffect } from 'react';
import { scheduleCartCleanup, stopCartCleanup } from '@/lib/cartCleanup';

export function Providers({ children }: { children: React.ReactNode }) {
  const { isInitialized, error } = useSupabase();

  useEffect(() => {
    const interval = scheduleCartCleanup(15); // Run every 15 minutes
    
    return () => {
      stopCartCleanup();
      clearInterval(interval);
    };
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900 p-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
            Connection Error
          </h1>
          <p className="text-gray-600 dark:text-zinc-400">
            Failed to connect to the database. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 dark:border-white" />
      </div>
    );
  }

  return (
    <ThemeProvider>
      {children}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
          }
        }}
      />
    </ThemeProvider>
  );
}