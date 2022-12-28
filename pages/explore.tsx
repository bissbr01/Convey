import { Title } from '@mantine/core';
import dynamic from 'next/dynamic';

const DisplayGraph = dynamic(
  () => import('../components/SigmaGraph').then((mod) => mod.DisplayGraph),
  {
    ssr: false,
  }
);

export default function Explore() {
  return (
    <>
      <Title order={1}>Explore</Title>
      <DisplayGraph />
    </>
  );
}
