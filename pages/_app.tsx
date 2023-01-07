import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import Head from 'next/head';
import LayoutDefault from '../components/LayoutDefault';

// enable to mock all api calls in development server
// if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
//   require('../mocks');
// }

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Illustration Finder</title>
        <meta
          name="description"
          content="Find quality human interest stories for powerful communication."
        />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
          headings: {
            fontWeight: 300,
          },
        }}
      >
        <LayoutDefault>
          <Component {...pageProps} />
        </LayoutDefault>
      </MantineProvider>
    </>
  );
}
