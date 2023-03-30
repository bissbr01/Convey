import { Container, Group, Kbd, Stack, Text, Title } from '@mantine/core';
import dynamic from 'next/dynamic';
import '@react-sigma/core/lib/react-sigma.min.css';
import Link from 'next/link';

export default function Explore() {
  const inBrowser = () => typeof window !== 'undefined';

  if (!inBrowser) return <p>Not Available</p>;

  const DisplayGraph = dynamic(
    () => import('../components/GraphController').then((mod) => mod),
    {
      ssr: false,
    }
  );
  return (
    <>
      <DisplayGraph />
      <Container>
        <Title order={2} my={'md'}>
          Explore
        </Title>
        <Text>
          Use this{' '}
          <Link href="https://en.wikipedia.org/wiki/Force-directed_graph_drawing">
            Force Atlas graph
          </Link>{' '}
          to explore the stories in a new way.{' '}
        </Text>
        <Group my={'md'}>
          <Stack>
            <Text>
              <Kbd>hover</Kbd> on a node to highlight connected stories
            </Text>
            <Text>
              <Kbd>double click</Kbd> an{' '}
              <span style={{ color: 'blue' }}>illustration</span> to link to the
              full story.
            </Text>
          </Stack>
          <Stack>
            <Text>
              <Kbd>
                <span style={{ color: 'blue' }}>blue</span>
              </Kbd>
              : illustrations
            </Text>
            <Text>
              <Kbd>
                <span style={{ color: 'green' }}>green</span>
              </Kbd>
              : Keywords
            </Text>
          </Stack>
        </Group>
      </Container>
    </>
  );
}
