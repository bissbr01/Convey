import { Title } from '@mantine/core';
import dynamic from 'next/dynamic';
import '@react-sigma/core/lib/react-sigma.min.css';

const DisplayGraph = dynamic(
  () => import('../components/SigmaGraph').then((mod) => mod.DisplayGraph),
  {
    ssr: false,
  }
);

export default function Explore() {
  const inBrowser = () => typeof window !== 'undefined';

  if (!inBrowser) return <p>Not Available</p>;

  const SigmaContainer = dynamic(
    import('@react-sigma/core').then((mod) => mod.SigmaContainer),
    { ssr: false }
  );
  // const MyGraph = dynamic(
  //   import('../components/graph').then((mod) => mod.NetworkGraph),
  //   { ssr: false }
  // );

  return (
    <>
      <Title order={1}>Explore</Title>
      <DisplayGraph />
    </>
  );
}
