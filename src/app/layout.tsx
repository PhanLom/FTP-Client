import React from 'react';
import './globals.scss';
import type { Metadata } from 'next';
import favicon from './favicon.ico';
import favicon16 from './favicon16.ico';
import favicon32 from './favicon32.ico';
import favicon48 from './favicon48.ico';
import favicon192 from './favicon192.ico';
import favicon256 from './favicon256.ico';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '#',
    description: '#',
    openGraph: {
      title: '#',
      description: '#',
      siteName: '#',
      locale: 'en_US',
      type: 'website',
    },
    icons: {
      icon: [
        { url: '#', sizes: 'any', type: 'image/x-icon' },
        { url: '#', sizes: '16x16', type: 'image/x-icon' },
        { url: '#', sizes: '32x32', type: 'image/x-icon' },
        { url: '#', sizes: '48x48', type: 'image/x-icon' },
        { url: '#', sizes: '192x192', type: 'image/x-icon' },
        { url: '#', sizes: '256x256', type: 'image/x-icon' },
      ],
      shortcut: '#',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
