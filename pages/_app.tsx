import '@mantine/core/styles.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, MantineProvider } from '@mantine/core';
import Head from 'next/head';
import LayoutDefault from '../components/LayoutDefault';

// enable by running npm run start:msw
if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks');
}

const theme = createTheme({
  headings: {
    fontWeight: '300',
  },
  defaultRadius: 'sm',
});

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
      <MantineProvider theme={theme} defaultColorScheme="light">
        <LayoutDefault>
          <Component {...pageProps} />
        </LayoutDefault>
      </MantineProvider>
    </>
  );
}
