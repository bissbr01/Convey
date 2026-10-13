import {
  Button,
  Card,
  Container,
  Group,
  Image,
  Text,
  Title,
} from '@mantine/core';
import { IllustrationMeta } from '../types/types';
import useSWR from 'swr';
import LoadingCircle from '../components/LoadingCircle';
import { useRouter } from 'next/router';
import { IllustrationGetResponse } from '../types/types';
import { portraitSrc } from '../lib/imageUrl';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface StoryQuery {
  snippet: string;
  source: string;
}

export default function Story() {
  const router = useRouter();
  const { snippet, source } = router.query;

  // Only fetch once the router has parsed the query params, and encode them so
  // snippets containing &, #, % etc. resolve to the correct DynamoDB key.
  const key =
    typeof snippet === 'string' && typeof source === 'string'
      ? `/api/illustrations/get?snippet=${encodeURIComponent(
          snippet
        )}&source=${encodeURIComponent(source)}`
      : null;
  const { data, error } = useSWR<IllustrationGetResponse>(key, fetcher);

  if (error) {
    return (
      <Container size="md" mt="md">
        <Text>Sorry, we couldn&apos;t load this story.</Text>
      </Container>
    );
  }
  if (!data) {
    return <LoadingCircle />;
  }

  return (
    <>
      <Container size="md" mt="md">
        <Card shadow="sm" radius="md" withBorder>
          <Card.Section>
            <Image
              maw={240}
              mx="auto"
              radius="md"
              src={portraitSrc(data.image)}
              alt="Highlight image"
              m="lg"
            />
          </Card.Section>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{data.date}</Text>
          </Group>
          <Text size="md">{data.text}</Text>
          <Button
            component="a"
            href={'https://' + data.SK.slice(13)}
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
          >
            Source
          </Button>
        </Card>
      </Container>
    </>
  );
}
