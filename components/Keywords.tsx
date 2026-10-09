import { ActionIcon, Chip, Group, Spoiler, Stack } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import keywordsReduced from '../public/keywords/keywords_w_weights_reduced.json';
import commonKeywords from '../public/keywords/keywords_w_weights_common.json';
import { KeywordAndWeight } from '../types/types';
import classes from './Keywords.module.css';

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

  const isKeywordSelection = () =>
    keywords &&
    keywords.length !== keywordsReduced.length &&
    keywords.length !== 0;

  const selectKeywords = (): KeywordAndWeight[] => {
    if (isKeywordSelection()) return keywords;
    return commonKeywords as KeywordAndWeight[];
  };

  const labelClass = isKeywordSelection()
    ? `${classes.label} ${classes.labelFiltered}`
    : classes.label;

  return (
    <>
      <Spoiler
        controlRef={spoilerControlRef}
        maxHeight={90}
        showLabel=""
        hideLabel=""
      >
        <Chip.Group value={keyword} onChange={setKeyword}>
          <Group justify="center" mt="md" style={{ minHeight: 70 }}>
            {selectKeywords().map(([count, kWord]) => (
              <Chip
                key={`${kWord}${count}`}
                value={kWord}
                variant="outline"
                classNames={{ label: labelClass, checkIcon: classes.checkIcon }}
              >
                {kWord}: {count}
              </Chip>
            ))}
          </Group>
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
