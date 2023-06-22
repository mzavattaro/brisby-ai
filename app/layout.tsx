import React from 'react';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter as createInter } from 'next/font/google';
import type { FC, ReactNode } from 'react';

const inter = createInter({ subsets: ['latin'] });

export const metadata = {
  title: 'BrisbyAI',
  description: 'Your personal AI assistant for your Strata notices.',
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <ClerkProvider>
    <html className="h-full bg-white" lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
