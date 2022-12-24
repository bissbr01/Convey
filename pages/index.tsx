import { Container, Title } from '@mantine/core';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import KeywordSearch from '../components/KeywordSearch';
import Portraits from '../components/Portraits';
import { SearchBar } from '../components/SearchBar';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [keyword, setKeyword] = useState('college');

  return (
    <>
      <Title order={1} m="md" weight={300}>
        Discover Stories
      </Title>
      <KeywordSearch keyword={keyword} setKeyword={setKeyword} />
      <Portraits keyword={keyword} />
    </>
  );
}
