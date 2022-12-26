import { Container } from '@mantine/core';
import React from 'react';
import AppBar from './AppBar';
import Footer from './Footer';

export default function LayoutDefault({ children }: React.PropsWithChildren) {
  return (
    <>
      <AppBar />
      <Container fluid sx={{ padding: 0 }}>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
}
