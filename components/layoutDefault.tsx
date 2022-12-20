import { Container } from '@mantine/core';
import React from 'react';
import AppBar from './appBar';
import Footer from './footer';

export default function LayoutDefault({ children }: React.PropsWithChildren) {
  return (
    <>
      <AppBar />
      <Container>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
}
