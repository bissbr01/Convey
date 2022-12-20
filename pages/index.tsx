import { Container } from '@mantine/core';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { SearchBar } from '../components/searchBar';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <SearchBar />
    </>
  );
}
