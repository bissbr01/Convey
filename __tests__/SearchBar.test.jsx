import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

describe('SearchBar.tsx', () => {
  const keywords = [
    [640, 'people'],
    [378, 'things'],
    [284, 'school'],
    [242, 'first'],
    [213, 'time'],
    [203, 'money'],
    [198, 'New York'],
    [187, 'work'],
    [185, 'life'],
  ];
  const setKeywords = jest.fn();

  it('renders content', () => {
    render(<SearchBar keywords={keywords} setKeywords={setKeywords} />);
    screen.getByPlaceholderText('Filter keywords');
  });

  it('filters keywords on input', async () => {
    render(<SearchBar keywords={keywords} setKeywords={setKeywords} />);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText('Filter keywords');
    const keywordInput = 'schools';

    await user.type(input, keywordInput);

    expect(setKeywords).toHaveBeenCalled();
    expect(setKeywords.mock.calls[5][0]).toEqual([
      [3, 'school fees'],
      [6, 'schools'],
      [284, 'school'],
    ]);
    expect(setKeywords.mock.calls[6][0]).toEqual([[6, 'schools']]);
  });
});
