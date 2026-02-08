import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import ItemsList from '../ItemsList'

const hookMock = vi.fn();

vi.mock('../hooks/useItemsList', () => ({
  default: () => hookMock(),
}))

vi.mock('@/application/componentsItemCardList/ItemCardList', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ items }: any) => <div data-testid="card-list">{items.length}</div>,
}));

vi.mock('@/application/componentsItemCardList/ItemsPaginator', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ currentPage }: any) => <div data-testid="paginator">{currentPage}</div>,
}));

vi.mock('@/application/componentsItemCardList/ItemsListFilter', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ query }: any) => <div data-testid="filter">{query}</div>,
}));

vi.mock('@/application/components/ui/Spinner/Spinner', () => ({
  default: () => <div data-testid="spinner" />,
}));

beforeEach(() => {
  vi.clearAllMocks();
  cleanup();
});

const baseHookState = [
  2,          // currentPage
  'abc',      // query
  'name',     // orderBy
  'ASC',      // orderDir
  50,         // totalItems
  [{ id: 1 }],// items
  false,      // isLoading
  vi.fn(),    // onPageClick
  vi.fn(),    // onOrderByClick
  vi.fn(),    // onOrderDirClick
  vi.fn(),    // onQueryChange
  vi.fn(),    // onSearch
];

const baseProps = {
  title: 'My List',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  card: (item: any) => <div>{item.id}</div>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDataAsyncThunk: vi.fn() as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMethods: {} as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectMethods: {} as any,
};

describe('ItemsList component', () => {
  it('renders title when provided', () => {
    hookMock.mockReturnValue(baseHookState);

    render(<ItemsList {...baseProps} />);

    expect(screen.getByText('My List')).toBeInTheDocument();
  })

  it('passes data to children correctly', () => {
    hookMock.mockReturnValue(baseHookState)

    render(<ItemsList {...baseProps} />);

    expect(screen.getByTestId('filter')).toHaveTextContent('abc');
    expect(screen.getByTestId('paginator')).toHaveTextContent('2');
    expect(screen.getByTestId('card-list')).toHaveTextContent('1');
  })

  it('shows spinner when loading', () => {
    hookMock.mockReturnValue([
      ...baseHookState.slice(0, 6),
      true, // isLoading
      ...baseHookState.slice(7),
    ]);

    render(<ItemsList {...baseProps} />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  })
})
