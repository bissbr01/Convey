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
import { IllustrationGetResponse } from './api/illustrations/get';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface StoryQuery {
  snippet: string;
  source: string;
}

export default function Story() {
  const router = useRouter();
  const { snippet, source } = router.query;
  const { data, error } = useSWR<IllustrationGetResponse>(
    `/api/illustrations/get?snippet=${snippet}&source=${source}`,
    fetcher
  );

  if (error) console.log(error);
  if (!data) {
    return <LoadingCircle />;
  }

  console.log(data.SK.slice(13));

  return (
    <>
      <Container size="md" mt="md">
        <Card shadow="sm" radius="md" withBorder>
          <Card.Section>
            <Image
              maw={240}
              mx="auto"
              radius="md"
              src={`portraits/${data.image}`}
              alt="Highlight image"
              m="lg"
            />
          </Card.Section>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{data.date}</Text>
          </Group>
          <Text size="sm">{data.text}</Text>
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
