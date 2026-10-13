import { MantineProvider } from '@mantine/core';
import {
  act,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { cache, SWRConfig } from 'swr/_internal';
import { server } from '../mocks/server';
import { collegeKeyword } from '../mocks/collegeKeyword';
import Portraits from '../components/Portraits';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

function row(pk, link) {
  return {
    PK: pk,
    SK: 'Keyword#college',
    text: pk,
    image: 'thumbnail.jpg',
    date: 'Jan 1, 2020',
    link,
    keywords: new Set(),
    entities: new Set(),
  };
}

let intersect = () => {};
let releaseInFlight = () => {};

describe('Portraits.tsx', () => {
  beforeEach(() => {
    cache.clear();
    releaseInFlight = () => {};
    global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
      intersect = () => {
        callback([
          {
            isIntersecting: true,
            intersectionRatio: 1,
            boundingClientRect: { y: 0 },
          },
        ]);
      };
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    });
  });

  afterEach(() => {
    releaseInFlight();
  });

  function renderPortraits(props) {
    return render(
      <MantineProvider>
        <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
          <Portraits keyword="college" {...props} />
        </SWRConfig>
      </MantineProvider>
    );
  }

  it('renders initial 20 portraits', async () => {
    render(
      <MantineProvider>
        <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
          <Portraits keyword="college" />
        </SWRConfig>
      </MantineProvider>
    );

    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(20);
  });
  it('returns error if given invalid keyword', async () => {
    render(
      <MantineProvider>
        <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
          <Portraits keyword="invalid" />
        </SWRConfig>
      </MantineProvider>
    );
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    expect(screen.getByText(/Failed to load/)).toBeInTheDocument();
  });

  it('does not fetch page 0 on mount when the first page is seeded', async () => {
    const urls = [];
    server.use(
      rest.get('/api/keywords/:keyword', (req, res, ctx) => {
        urls.push(req.url.toString());
        return res(ctx.status(500), ctx.json({ error: 'unexpected' }));
      })
    );

    renderPortraits({ firstPage: collegeKeyword });

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(20);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    expect(urls).toEqual([]);
  });

  it('setSize(2) requests page 1 with the seeded lastItem and does not refetch page 0', async () => {
    const urls = [];
    server.use(
      rest.get('/api/keywords/:keyword', (req, res, ctx) => {
        urls.push(req.url.toString());
        return res(
          ctx.status(200),
          ctx.json({
            items: [row('Illustration#next', 'https://example.com/next')],
            lastItem: null,
          })
        );
      })
    );

    renderPortraits({ firstPage: collegeKeyword });
    expect(urls).toEqual([]);

    act(() => {
      intersect();
    });

    await waitFor(() => expect(urls).toHaveLength(1));
    const cursor = encodeURIComponent(JSON.stringify(collegeKeyword.lastItem));
    expect(urls[0]).toContain(`/api/keywords/college?pageSize=20&lastItem=${cursor}`);
    expect(urls.some((url) => !url.includes('lastItem='))).toBe(false);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    expect(urls).toHaveLength(1);
  });

  it('a second load while isValidating does not fire, and the retry after it clears does', async () => {
    const urls = [];
    const page1Cursor = { PK: 'Illustration#page-one', SK: 'Keyword#college' };
    server.use(
      rest.get('/api/keywords/:keyword', async (req, res, ctx) => {
        urls.push(req.url.toString());
        if (urls.length === 1) {
          await new Promise((resolve) => {
            releaseInFlight = resolve;
          });
          return res(
            ctx.status(200),
            ctx.json({
              items: [row('Illustration#page-one', 'https://example.com/one')],
              lastItem: page1Cursor,
            })
          );
        }
        return res(
          ctx.status(200),
          ctx.json({
            items: [row('Illustration#page-two', 'https://example.com/two')],
            lastItem: null,
          })
        );
      })
    );

    renderPortraits({ firstPage: collegeKeyword });

    act(() => {
      intersect();
    });
    await waitFor(() => expect(urls).toHaveLength(1));

    act(() => {
      intersect();
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 30));
    });
    expect(urls).toHaveLength(1);

    await act(async () => {
      releaseInFlight();
    });
    await waitFor(() => expect(urls).toHaveLength(2));

    const seeded = encodeURIComponent(JSON.stringify(collegeKeyword.lastItem));
    const next = encodeURIComponent(JSON.stringify(page1Cursor));
    expect(urls[0]).toContain(`lastItem=${seeded}`);
    expect(urls[1]).toContain(`lastItem=${next}`);
    expect(urls.every((url) => url.includes('lastItem='))).toBe(true);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 30));
    });
    expect(urls).toHaveLength(2);
  });

  it('keeps rows when a later page fails', async () => {
    const firstPage = {
      items: [
        row('Illustration#kept', 'https://example.com/kept'),
        row('Illustration#also', 'https://example.com/also'),
      ],
      lastItem: { PK: 'Illustration#also', SK: 'Keyword#college' },
    };
    server.use(
      rest.get('/api/keywords/:keyword', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Failed to load illustrations' }));
      })
    );

    renderPortraits({ firstPage });
    act(() => {
      intersect();
    });

    await waitFor(() => expect(screen.getByText(/Failed to load/)).toBeInTheDocument());
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(decodeURIComponent(links[0].getAttribute('href'))).toContain(
      'example.com/kept'
    );
    expect(decodeURIComponent(links[1].getAttribute('href'))).toContain(
      'example.com/also'
    );
  });

  it('renders an empty page without Failed to load', async () => {
    const urls = [];
    server.use(
      rest.get('/api/keywords/:keyword', (req, res, ctx) => {
        urls.push(req.url.toString());
        return res(ctx.status(500), ctx.json({ error: 'unexpected' }));
      })
    );

    renderPortraits({ firstPage: { items: [], lastItem: null } });

    expect(screen.queryByText(/Failed to load/)).not.toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('link')).toHaveLength(0);
    expect(screen.getByTestId('portraits')).toBeInTheDocument();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 30));
    });
    expect(urls).toEqual([]);
  });

  it('updates a duplicate PK in place and keeps the first position', async () => {
    const firstPage = {
      items: [
        row('Illustration#one', 'https://old.example/one'),
        row('Illustration#two', 'https://example.com/two'),
      ],
      lastItem: { PK: 'Illustration#two', SK: 'Keyword#college' },
    };
    server.use(
      rest.get('/api/keywords/:keyword', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            items: [
              row('Illustration#one', 'https://new.example/one'),
              row('Illustration#three', 'https://example.com/three'),
            ],
            lastItem: null,
          })
        );
      })
    );

    renderPortraits({ firstPage });
    act(() => {
      intersect();
    });

    await waitFor(() => expect(screen.getAllByRole('link')).toHaveLength(3));
    const links = screen.getAllByRole('link');
    const hrefs = links.map((link) => decodeURIComponent(link.getAttribute('href')));
    expect(hrefs[0]).toContain('new.example/one');
    expect(hrefs[1]).toContain('example.com/two');
    expect(hrefs[2]).toContain('example.com/three');
    expect(hrefs.join(' ')).not.toContain('old.example');
  });

  it('does not request another page when lastItem is null', async () => {
    const urls = [];
    server.use(
      rest.get('/api/keywords/:keyword', (req, res, ctx) => {
        urls.push(req.url.toString());
        return res(ctx.status(500), ctx.json({ error: 'unexpected' }));
      })
    );

    renderPortraits({
      firstPage: {
        items: [row('Illustration#hope', 'https://example.com/hope')],
        lastItem: null,
      },
    });

    act(() => {
      intersect();
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    expect(urls).toEqual([]);
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.queryByText(/Failed to load/)).not.toBeInTheDocument();
  });
});
