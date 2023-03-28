import { Title } from '@mantine/core';
import dynamic from 'next/dynamic';
import '@react-sigma/core/lib/react-sigma.min.css';

export default function Explore() {
  const inBrowser = () => typeof window !== 'undefined';

  if (!inBrowser) return <p>Not Available</p>;

  const DisplayGraph = dynamic(
    () => import('../components/ForceAtlasGraph').then((mod) => mod),
    {
      ssr: false,
    }
  );
  return (
    <>
      <Title order={1}>Explore</Title>
      <DisplayGraph />
    </>
  );
}
