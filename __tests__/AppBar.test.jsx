import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import AppBar from '../components/AppBar';

// ActiveLink (rendered inside AppBar) calls useRouter() from next/compat/router.
// Mock that module so the component renders under jsdom.
jest.mock('next/compat/router', () => require('next-router-mock'));

describe('AppBar.tsx', () => {
  const links = [
    { link: '/', label: 'Search' },
    // { link: '/explore', label: 'Explore' },
    { link: '/about', label: 'About' },
  ];

  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });

  it('renders a nav link for each destination', () => {
    render(
      <MantineProvider>
        <AppBar />
      </MantineProvider>
    );
    links.forEach(({ link, label }) => {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute(
        'href',
        link
      );
    });
  });

  it('marks only the link for the current route as active', () => {
    mockRouter.setCurrentUrl('/about');
    render(
      <MantineProvider>
        <AppBar />
      </MantineProvider>
    );

    // ActiveLink appends activeClassName to the matching route's link, so the
    // active link's className differs from a non-matching one.
    const about = screen.getByRole('link', { name: 'About' });
    const search = screen.getByRole('link', { name: 'Search' });
    expect(about.className).not.toEqual(search.className);
  });
});
