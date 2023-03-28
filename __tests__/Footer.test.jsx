import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer.tsx', () => {
  it('renders content', () => {
    render(<Footer />);
    screen.getByText(/Brad Bissell/);
  });
});
