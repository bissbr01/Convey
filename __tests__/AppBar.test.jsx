import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import preview from 'jest-preview';
import AppBar from '../components/AppBar';

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
    expect(searchNav).toHaveClass('mantine-1q47gp');

    const aboutNav = screen.getByText('About');
    const user = userEvent.setup();
    await user.click(aboutNav);
    expect(aboutNav).toHaveClass('mantine-1q47gp');
  });
});
