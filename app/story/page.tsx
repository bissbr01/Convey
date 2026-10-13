import {
  Button,
  Card,
  Container,
  Group,
  Image,
  Text,
} from '@mantine/core';
import { portraitSrc } from '../../lib/imageUrl';
import { loadStoryCard } from '../../lib/storyCard';

export const instant = false;

const SENTENCE = "Sorry, we couldn't load this story.";

function missingStory() {
  return (
    <Container size="md" mt="md">
      <Text>{SENTENCE}</Text>
    </Container>
  );
}

export default async function Page(props: PageProps<'/story'>) {
  const sp = await props.searchParams;
  const snippet = typeof sp.snippet === 'string' ? sp.snippet : null;
  const source = typeof sp.source === 'string' ? sp.source : null;
  if (!snippet || !source) {
    return missingStory();
  }
  const card = await loadStoryCard(snippet, source);
  if (!card) {
    return missingStory();
  }
  return (
    <Container size="md" mt="md">
      <Card shadow="sm" radius="md" withBorder>
        <Card.Section>
          <Image
            maw={240}
            mx="auto"
            radius="md"
            src={portraitSrc(card.image)}
            alt="Highlight image"
            m="lg"
          />
        </Card.Section>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{card.date}</Text>
        </Group>
        <Text size="md">{card.text}</Text>
        <Button
          component="a"
          href={card.sourceHref}
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
  );
}
