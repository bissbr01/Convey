import '@mantine/core/styles.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import LayoutDefault from '../components/LayoutDefault';
import Providers from '../components/Providers';

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
      <Providers>
        <LayoutDefault>
          <Component {...pageProps} />
        </LayoutDefault>
      </Providers>
    </>
  );
}
