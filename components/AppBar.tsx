import { useState } from 'react';
import {
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import ActiveLink from './ActiveLink';
import classes from './AppBar.module.css';

const HEADER_HEIGHT = 60;

export default function AppBar() {
  const links = [
    { link: '/', label: 'Search' },
    { link: '/explore', label: 'Explore' },
    { link: '/about', label: 'About' },
  ];
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const items = links.map((link) => (
    <ActiveLink
      key={link.label}
      href={link.link}
      className={classes.link}
      activeClassName={classes.linkActive}
    >
      {link.label}
    </ActiveLink>
  ));

  return (
    <header className={classes.root} style={{ height: HEADER_HEIGHT }}>
      <Container className={classes.header}>
        <Image src="/logo.png" alt="logo" height="45" width="45" />
        <Title>Convey</Title>
        <Group gap={5} className={classes.links}>
          {items}
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </header>
  );
}
