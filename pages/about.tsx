import {
  Anchor,
  Blockquote,
  Container,
  createStyles,
  Text,
  Title,
} from '@mantine/core';
import { NextLink } from '@mantine/next';

const useStyles = createStyles((theme) => ({
  text: {
    paddingTop: '1rem',
  },
  quote: {
    paddingTop: '1rem',
    fontSize: theme.fontSizes.md,
    fontStyle: 'italic',
  },
}));

export default function About() {
  const { classes } = useStyles();
  return (
    <>
      <Container>
        <Title order={1} my="lg">
          About
        </Title>
        <Text className={classes.text}>
          Convey seeks to help communicators discover compelling human interest
          stories to enhance their speaking and writing.
        </Text>
        <Title order={2} mt="lg">
          The Problem:
        </Title>
        <Text className={classes.text}>
          If you&apos;ve ever sought to publically communicate an idea, whether
          spoken or written, you&apos;ve likely wrestled with the challenge of
          finding powerful stories to help you communicate your message.
        </Text>
        <Text className={classes.text}>
          Some of the most effective stories for communication are human
          interest stories. They sharpen and clarify your argument while at the
          same time engaging your audience and drawing in their attention.
        </Text>
        <Blockquote cite="- Dr. Brian Chappell">
          <Text className={classes.quote}>
            [In communication] you want to take an experience of some sort to
            relate to a principle. You begin to understand why human-interest
            accounts are usually the best illustrations. Human-interest accounts
            are ordinary or extraordinary people in ordinary or extraordinary
            situations with which ordinary people can identify.
          </Text>
          <Text className={classes.quote}>
            Tell me about something ordinary or extraordinary that I can
            identify with. That principle that you want to make clear is now
            going to connect to my life. That is what we are trying to do.
          </Text>{' '}
        </Blockquote>
        <Title order={2}>The Solution</Title>
        <Text className={classes.text}>
          In my experience as a communicator, the chief challenge of using
          powerful illustrations in communication is finding quality human
          interest accounts that pertain to your principle or idea. Convey seeks
          to facilitate this discovery and speed up your research process.
        </Text>
        <Text className={classes.text}>
          To that end, Convey allows you to search by thousands of different
          keywords to find human interest stories on that topic. At present
          Convey includes the 7,000+ fanastic human interest stories collected
          by{' '}
          <Anchor href="https://www.humansofnewyork.com/">
            Humans of New York.
          </Anchor>
          {'  '}
          All rights belong to Brandon Stanton, it&apos;s creator. To help
          support his project, please note that Convey drives traffic to His
          site once you click on a story thumbnail.
        </Text>
      </Container>
    </>
  );
}
