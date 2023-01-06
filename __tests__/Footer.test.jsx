import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';
import Footer from '../components/Footer';

describe('Footer component renders correctly', () => {
  it('renders content', () => {
    render(<Footer />);
    screen.getByText(/Brad Bissell/);
  });
});
