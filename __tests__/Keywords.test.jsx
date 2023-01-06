import { render, screen } from '@testing-library/react';
import Keywords from '../components/Keywords';

describe('Keywords.tsx', () => {
  const keyword = 'college';
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
  const setKeyword = jest.fn();

  it('renders content', () => {
    render(
      <Keywords keyword={keyword} keywords={keywords} setKeyword={setKeyword} />
    );
    keywords.map((keyword) => {
      const rxKeyword = new RegExp(keyword[1] + ': ' + keyword[0]);
      return screen.getByText(rxKeyword);
    });
  });
});
