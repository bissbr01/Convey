import { BackgroundImage, Text } from '@mantine/core';
import { IllustrationMeta } from '../types/types';

interface PortraitProps {
  meta: IllustrationMeta;
}

export default function Portrait({ meta }: PortraitProps) {
  return (
    <BackgroundImage src={meta.image} component="a" href={meta.SK}>
      <Text>{meta.PK}</Text>
    </BackgroundImage>
  );
}
