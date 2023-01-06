import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import preview from 'jest-preview';
import Keywords from '../components/Keywords';

describe('Keywords component', () => {
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
    // jest.mock('use-resize-observer', () => ({
    //   __esModule: true,
    //   default: jest.fn().mockImplementation(() => ({
    //     observe: jest.fn(),
    //     unobserve: jest.fn(),
    //     disconnect: jest.fn(),
    //   })),
    // }));
    render(
      <Keywords keyword={keyword} keywords={keywords} setKeyword={setKeyword} />
    );
    preview.debug();
    screen.getByText(/work/);
  });
});
