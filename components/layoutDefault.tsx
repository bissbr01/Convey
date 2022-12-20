import React from 'react';
import AppBar from './appBar';

export default function LayoutDefault({ children }: React.PropsWithChildren) {
  return (
    <>
      <AppBar />
      <main>{children}</main>
      {/* footer */}
    </>
  );
}
