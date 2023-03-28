import { Container, createStyles, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { SWRConfig } from 'swr';
import KeywordSearch from '../components/KeywordSearch';
import Portraits from '../components/Portraits';
import { loadByKeyword } from '../lib/loadIllustrations';
import { InferGetStaticPropsType } from 'next';

const useStyles = createStyles((theme) => ({
  section: {
    backgroundColor: theme.white,
    padding: '1rem 0',
    background: theme.colors.gray[0],
    boxShadow: '0px 0px 1px black',
    marginBottom: '1rem',
  },
}));

export default function Home({
  fallback,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { classes } = useStyles();
  const [keyword, setKeyword] = useState('college');

  return (
    <>
      <section className={classes.section}>
        <Container>
          <Title align="center" order={2} p="md">
            Search by Keyword
          </Title>
          <Text align="center" fs="italic" color="dimmed">
            Discover compelling human interest stories to illustrate your idea
          </Text>
          <KeywordSearch keyword={keyword} setKeyword={setKeyword} />
        </Container>
      </section>
      <SWRConfig value={{ fallback }}>
        <Portraits keyword={keyword} />
      </SWRConfig>
    </>
  );
}

// This function runs only on the server side
export async function getStaticProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const illustrations = await loadByKeyword(undefined, 'college', undefined);

  // Props returned will be passed to the page component
  // prop validation errors on any key set to undefined in data.
  // Must santize with JSON workaround: https://github.com/vercel/next.js/discussions/11209
  return {
    props: {
      fallback: {
        '/api/keywords/college': JSON.parse(JSON.stringify(illustrations)),
      },
    },
  };
}
