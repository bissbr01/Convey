import { BackgroundImage, Box, Center, Text } from '@mantine/core';
import Link from 'next/link';
import { IllustrationMeta } from '../types/types';
import { portraitSrc } from '../lib/imageUrl';
import classes from './Portrait.module.css';

interface PortraitProps {
  meta: IllustrationMeta;
}

export default function Portrait({ meta }: PortraitProps) {
  // PK is `Illustration#<snippet>` (13-char prefix); SK is `Meta#<sourceUrl>`,
  // and meta.link is that same source url. The /story VDP looks the record up by
  // these two values. Next's Link query object handles URL-encoding.
  const snippetKey = meta.PK.slice(13);
  const snippet = snippetKey + '...';
  return (
    <Box className={classes.tile}>
      <Link
        href={{
          pathname: '/story',
          query: { snippet: snippetKey, source: meta.link },
        }}
        style={{ textDecoration: 'none' }}
      >
        <BackgroundImage
          src={portraitSrc(meta.image)}
          className={classes.background}
        >
          <Box className={classes.frame}>
            <Center p="md" className={classes.text}>
              <Text className={classes.overlay}>{snippet}</Text>
            </Center>
          </Box>
        </BackgroundImage>
      </Link>
    </Box>
  );
}
