'use client';

import { createTheme, MantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';

// enable by running npm run start:msw
if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks');
}

const theme = createTheme({
  headings: {
    fontWeight: '300',
  },
  defaultRadius: 'sm',
});

export default function Providers({ children }: PropsWithChildren) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
}
