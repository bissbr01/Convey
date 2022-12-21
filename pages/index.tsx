import { Container, Title } from '@mantine/core';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import KeywordSearch from '../components/KeywordSearch';
import { SearchBar } from '../components/SearchBar';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Title order={1} m="md" weight={300}>
        Discover Stories
      </Title>
      <KeywordSearch />
    </>
  );
}
