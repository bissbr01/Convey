import { render, screen, waitFor } from '@testing-library/react';
import Portrait from '../components/Portrait';
import userEvent from '@testing-library/user-event';

describe('Portrait.tsx', () => {
  const meta = {
    PK: 'Illustration#A story about someone with an interesting life  It will really fascinate you to read this',
    SK: 'meta#link-to-photo',
    text: 'A story about someone with an interesting life.',
    image:
      '../public/portraits/thumbnail_0a1dcc5277f4f4583d12b748ec4ed243dd7eabfc.jpg',
    date: '02/12/2021',
    link: 'https://www.humansofnewyork.com/',
    keywords: new Set('1', '2', '3'),
    entities: new Set('1', '2', '3'),
  };

  it('renders content', async () => {
    render(<Portrait meta={meta} />);
    const user = userEvent.setup();

    const imgDiv = screen.getByRole('link');
    await user.hover(imgDiv);

    const overlayText = new RegExp('...');
    await waitFor(() => screen.getByText(overlayText));
  });
});
