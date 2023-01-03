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
import keywordsReduced from '../public/keywords/keywords_w_weights_reduced.json';
import commonKeywords from '../public/keywords/keywords_w_weights_common.json';
import { KeywordAndWeight } from '../types/types';

interface KeywordProps {
  keyword: string;
  keywords: KeywordAndWeight[];
  setKeyword: Dispatch<SetStateAction<string>>;
}

export default function Keywords({
  keyword,
  keywords,
  setKeyword,
}: KeywordProps) {
  const [opened, setOpened] = useState(false);
  const spoilerControlRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    spoilerControlRef.current?.click();
  }, [opened]);

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const isKeywordSelection = () =>
    keywords &&
    keywords.length !== keywordsReduced.length &&
    keywords.length !== 0;

  const selectKeywords = (): KeywordAndWeight[] => {
    if (isKeywordSelection()) return keywords;
    return commonKeywords as KeywordAndWeight[];
  };

  return (
    <>
      <Spoiler
        controlRef={spoilerControlRef}
        maxHeight={90}
        showLabel=""
        hideLabel=""
      >
        <Chip.Group position="center" mt="md" sx={{ minHeight: 70 }}>
          {selectKeywords().map(([count, kWord]) => (
            <Chip
              key={`${kWord}${count}`}
              value={kWord}
              onClick={handleClick}
              checked={kWord === keyword}
              sx={(theme) => ({
                '.mantine-Chip-label': {
                  backgroundColor: theme.white,
                  border: isKeywordSelection()
                    ? `1px solid ${theme.colors.blue[3]}`
                    : `1px solid ${theme.colors.gray[4]}`,
                  '&[data-checked="true"]': {
                    backgroundColor: theme.colors.blue[4],
                    color: theme.white,
                  },
                  '.mantine-Chip-checkIcon': {
                    filter: 'brightness(.7) saturate(100%)',
                  },
                },
              })}
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
