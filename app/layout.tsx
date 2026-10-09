import '@mantine/core/styles.css';
import '../styles/globals.css';
import type { ReactNode } from 'react';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import LayoutDefault from '../components/LayoutDefault';
import Providers from '../components/Providers';

export const metadata = {
  title: 'Illustration Finder',
  description: 'Find quality human interest stories for powerful communication.',
  icons: { icon: '/favicon/favicon.ico' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <Providers>
          <LayoutDefault>{children}</LayoutDefault>
        </Providers>
      </body>
    </html>
  );
}
