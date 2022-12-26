import { Container, createStyles, Title } from '@mantine/core';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import KeywordSearch from '../components/KeywordSearch';
import Portraits from '../components/Portraits';
import { SearchBar } from '../components/SearchBar';
import styles from '../styles/Home.module.css';

const useStyles = createStyles((theme) => ({
  section: {
    backgroundColor: theme.white,
    padding: '1rem 0',
    background: theme.colors.gray[0],
    // background: theme.fn.linearGradient(
    //   90,
    //   theme.colors.blue[3],
    //   theme.colors.green[3]
    // ),
    boxShadow: '0px 0px 1px black',
    marginBottom: '1rem',
  },
}));

export default function Home() {
  const { classes } = useStyles();
  const [keyword, setKeyword] = useState('college');

  return (
    <>
      <section className={classes.section}>
        <Title align="center" order={2} p="md" weight={300}>
          Search by Keyword
        </Title>
        <KeywordSearch keyword={keyword} setKeyword={setKeyword} />
      </section>
      <Portraits keyword={keyword} />
    </>
  );
}
