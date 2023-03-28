import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { cache, SWRConfig } from 'swr/_internal';
import { server } from '../mocks/server';
import Portraits from '../components/Portraits';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Portraits.tsx', () => {
  beforeEach(() => cache.clear());

  it('renders initial 20 portraits', async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
        <Portraits keyword="college" />
      </SWRConfig>
    );

    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));

    const links = screen.getAllByRole('link');
    console.log(links);
    expect(links.length).toBe(20);
  });
  it('returns error if given invalid keyword', async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
        <Portraits keyword="invalid" />
      </SWRConfig>
    );
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    expect(screen.getByText(/Failed to load/)).toBeInTheDocument();
  });
});
