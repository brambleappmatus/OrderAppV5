import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import ClientLayout from '@/components/Layout/ClientLayout';
import CartTimeoutWarning from '@/components/Cart/CartTimeoutWarning';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SnackShack',
  description: 'Treats with Purpose - Your favorite snack shop',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ClientLayout inter={inter}>
            {children}
            <CartTimeoutWarning />
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}