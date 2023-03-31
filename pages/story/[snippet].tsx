import { Container, Group, Image, Text } from '@mantine/core';
import { IllustrationMeta } from '../../types/types';
import useSWR from 'swr';
import LoadingCircle from '../../components/LoadingCircle';
import { useRouter } from 'next/router';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface StoryQuery {
  snippet: string;
  link: string;
}

export default function Story() {
  const router = useRouter();
  const { snippet, link } = router.query;
  const { data, error } = useSWR<IllustrationMeta>(
    `/api/illustrations/get?snippet=${snippet}&source=${link}`,
    fetcher
  );

  if (error) console.log(error);
  if (!data) {
    return <LoadingCircle />;
  }

  console.log(data);
  return (
    <>
      <Container>
        <Image
          maw={240}
          mx="auto"
          radius="md"
          src={data.image}
          alt="Highlight image"
        />
        <Group>
          <Text>{data.date}</Text>
          <Text>{data.link}</Text>
        </Group>
        <Text>{data.text}</Text>
      </Container>
    </>
  );
}
