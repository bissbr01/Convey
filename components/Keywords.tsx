import {
  ActionIcon,
  Button,
  Chip,
  Collapse,
  Group,
  Spoiler,
  Stack,
} from '@mantine/core';
import {
  IconArrowBadgeDown,
  IconArrowBadgeUp,
  IconArrowBigDown,
  IconArrowBigTop,
  IconChevronDown,
  IconChevronUp,
} from '@tabler/icons';
import { useEffect, useRef, useState } from 'react';
import commonKeywords from '../public/keywords/keywords_w_weights_common.json';

export default function Keywords() {
  const [opened, setOpened] = useState(false);
  const spoilerControlRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    spoilerControlRef.current?.click();
  }, [opened]);

  return (
    <>
      <Spoiler
        controlRef={spoilerControlRef}
        maxHeight={90}
        showLabel=""
        hideLabel=""
      >
        <Chip.Group position="center" mt="md">
          {commonKeywords.map(([count, keyword], i) => (
            <Chip key={`${keyword}${count}`} value={i}>
              {keyword}: {count}
            </Chip>
          ))}
        </Chip.Group>
      </Spoiler>
      <Stack align="center">
        <ActionIcon
          mt="-15px"
          size="sm"
          variant="outline"
          onClick={() => setOpened((o) => !o)}
        >
          {opened ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
        </ActionIcon>
      </Stack>
    </>
  );
}
