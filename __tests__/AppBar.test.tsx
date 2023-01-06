import { render, screen } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';
import AppBar from '../components/AppBar';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('AppBar component renders correctly', () => {
  const links = [
    { link: '/', label: 'Search' },
    // { link: '/explore', label: 'Explore' },
    { link: '/about', label: 'About' },
  ];

  it('displays title and author on render, but not other properties', () => {
    render(<AppBar />);
    links.map((link) => screen.getByText(link.label));
  });

  it('navigates to About page when link is clicked', async () => {
    render(<AppBar />);

    const searchNav = screen.getByText('Search');
    expect(searchNav.classList.contains('mantine-1q47gp')).toBe(true);

    const aboutNav = screen.getByText('About');
    const user = userEvent.setup();
    await user.click(aboutNav);
    expect(aboutNav.classList.contains('mantine-1q47gp')).toBe(true);
  });
});
