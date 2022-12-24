import {
  BackgroundImage,
  Box,
  Center,
  createStyles,
  Text,
} from '@mantine/core';
import { IllustrationMeta } from '../types/types';

const IMG_SIZE = 250;

const useStyles = createStyles((theme) => ({
  background: {
    width: IMG_SIZE,
    height: IMG_SIZE,
    '&:hover > div': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      '.mantine-Text-root': {
        display: 'block',
        color: theme.white,
      },
    },
  },
  text: {
    width: IMG_SIZE,
    height: IMG_SIZE,
    '& .mantine-Text-root': {
      display: 'none',
    },
  },
}));

interface PortraitProps {
  meta: IllustrationMeta;
}

export default function Portrait({ meta }: PortraitProps) {
  const { classes } = useStyles();

  const snippet = meta.PK.slice(13) + '...';
  return (
    <Box sx={{ width: IMG_SIZE }}>
      <BackgroundImage
        src={`/portraits/${meta.image}`}
        component="a"
        href={meta.link}
        className={classes.background}
      >
        <Box sx={{ width: IMG_SIZE, height: IMG_SIZE }}>
          <Center p="md" className={classes.text}>
            <Text>{snippet}</Text>
          </Center>
        </Box>
      </BackgroundImage>
    </Box>
  );
}
