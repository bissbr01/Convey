import { Title } from '@mantine/core';
import { DisplayGraph } from '../components/SigmaGraph';

export default function Explore() {
  return (
    <>
      <Title order={1}>Explore</Title>
      <DisplayGraph />
    </>
  );
}
