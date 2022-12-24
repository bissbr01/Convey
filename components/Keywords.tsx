import { ActionIcon, Chip, Spoiler, Stack } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import commonKeywords from '../public/keywords/keywords_w_weights_common.json';

interface KeywordProps {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}

export default function Keywords({ keyword, setKeyword }: KeywordProps) {
  const [opened, setOpened] = useState(false);
  const spoilerControlRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    spoilerControlRef.current?.click();
  }, [opened]);

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  return (
    <>
      <Spoiler
        controlRef={spoilerControlRef}
        maxHeight={90}
        showLabel=""
        hideLabel=""
      >
        <Chip.Group position="center" mt="md">
          {commonKeywords.map(([count, kWord]) => (
            <Chip
              key={`${kWord}${count}`}
              value={kWord}
              onClick={handleClick}
              checked={kWord === keyword}
            >
              {kWord}: {count}
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
