'use client';

import { Container, Text, Title } from '@mantine/core';
import type { KeywordPage } from '../types/types';
import KeywordSearch from './KeywordSearch';
import Portraits from './Portraits';
import classes from './HomeClient.module.css';

export default function HomeClient({
  keyword,
  firstPage,
}: {
  keyword: string;
  firstPage: KeywordPage;
}) {
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
          <KeywordSearch keyword={keyword} />
        </Container>
      </section>
      <Portraits key={keyword} keyword={keyword} firstPage={firstPage} />
    </>
  );
}
