'use client';

import { Toaster } from 'react-hot-toast';
import ThemeProvider from '@/components/Layout/ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
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