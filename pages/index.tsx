import { Container, Text, Title } from '@mantine/core';
import { useState } from 'react';
import KeywordSearch from '../components/KeywordSearch';
import Portraits from '../components/Portraits';
import classes from './index.module.css';

// Rendered as a fully static page (no getStaticProps). Portraits fetches the
// initial results client-side via SWR. Previously this used getStaticProps to
// seed an SWR fallback, but that produced an SSG "prerender variant" that Vercel
// served as a raw multipart/RSC body for `/` only. Keeping the page static
// (like /about) avoids that, and removes a build-time DynamoDB dependency.
export default function Home() {
  const [keyword, setKeyword] = useState('college');

  return (
    <>
      <section className={classes.section}>
        <Container>
          <Title ta="center" order={2} p="md">
            Search by Keyword
          </Title>
          <Text ta="center" fs="italic" c="dimmed">
            Discover compelling human interest stories to illustrate your idea
          </Text>
          <KeywordSearch keyword={keyword} setKeyword={setKeyword} />
        </Container>
      </section>
      <Portraits keyword={keyword} />
    </>
  );
}
