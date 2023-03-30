import { Container, Group, Image, Text } from '@mantine/core';
import { IllustrationMeta } from '../types/types';
import useSWR from 'swr';
import LoadingCircle from '../components/LoadingCircle';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Story({
  text,
  image,
  date,
  link,
  keywords,
  entities,
}: IllustrationMeta) {
  const snippet = text.slice(0, 40);
  const { data, error } = useSWR(`/api/illustrations/${snippet}`, fetcher);

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
          src={image}
          alt="Highlight image"
        />
        <Group>
          <Text>{date}</Text>
          <Text>{link}</Text>
        </Group>
        <Text>{text}</Text>
      </Container>
    </>
  );
}
