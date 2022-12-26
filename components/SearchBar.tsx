import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  input: {
    width: '100%',
    padding: theme.spacing.md,
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      width: 500,
    },
  },
}));

export function SearchBar(props: TextInputProps) {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      radius="xl"
      size="md"
      className={classes.input}
      placeholder="Filter keywords"
      rightSectionWidth={42}
      {...props}
    />
  );
}
