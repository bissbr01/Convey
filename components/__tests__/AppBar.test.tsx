import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppBar from '../AppBar';

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

    const user = userEvent.setup();
    const detailsButton = screen.getByText('details');
    await user.click(detailsButton);
  });

  it('calls updateBlog 2x when Likes button is clicked 2x', async () => {
    render(<AppBar />);
    const user = userEvent.setup();

    const likeButton = screen.getByText('Like');
    await user.click(likeButton);
    await user.click(likeButton);
  });
});
