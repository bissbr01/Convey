import { Container } from '@mantine/core';
import React from 'react';
import AppBar from './AppBar';

export default function LayoutDefault({ children }: React.PropsWithChildren) {
  return (
    <>
      <AppBar />
      <Container fluid style={{ padding: 0 }}>
        <main>{children}</main>
      </Container>
    </>
  );
}
