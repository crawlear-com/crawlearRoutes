import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import ItemsListFilter from '../ItemsListFilter';
import { ASC } from '../types/ItemsListFilter.types'


vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  }),
}))

const onOrderByClickHandlerMock = vi.fn();
const onOrderDirClickHandlerMock = vi.fn();
const onCollapseClickMock = vi.fn();

let isCollapsedMock = false

vi.mock('../hooks/useItemsListFilter', () => ({
  default: () => [
    isCollapsedMock,
    onOrderByClickHandlerMock,
    onOrderDirClickHandlerMock,
    onCollapseClickMock
  ],
}))

vi.mock('@/components/ui/SearchInput/SearchInput', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ labelTitle, placeholder, value }: any) => (
    <div data-testid="search-input">
      {labelTitle} | {placeholder} | {value}
    </div>
  ),
}))

const baseProps = {
  query: 'abc',
  orderDir: ASC,
  orderBy: 'name',
  onOrderByClick: vi.fn(),
  onOrderDirClick: vi.fn(),
  onQueryChange: vi.fn(),
  onSearch: vi.fn(),
}

beforeEach(() => {
  vi.clearAllMocks();
  isCollapsedMock = false;
  cleanup();
})

describe('ItemsListFilter', () => {
  it('renders search input with translated labels', () => {
    render(<ItemsListFilter {...baseProps} />);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByText(/main.filter/)).toBeInTheDocument();
    expect(screen.getByText(/main.filter routes/)).toBeInTheDocument();
  })

  it('shows ascending icon when orderDir is ASC', () => {
    render(<ItemsListFilter {...baseProps} orderDir={ASC} />);
    expect(screen.getByText('⬆')).toBeInTheDocument();
  })

  it('shows descending icon when orderDir is not ASC', () => {
    render(<ItemsListFilter {...baseProps} orderDir={'DESC'} />);
    expect(screen.getByText('⬇')).toBeInTheDocument();
  })

  it('calls onOrderDirClickHandler when direction icon clicked', () => {
    render(<ItemsListFilter {...baseProps} />);

    act(() => {
      fireEvent.click(screen.getByText('⬆'));
    });
    expect(onOrderDirClickHandlerMock).toHaveBeenCalled();
  })

  it('calls onOrderByClickHandler when an orderBy option is clicked', () => {
    render(<ItemsListFilter {...baseProps} />);

    act(() => {
      fireEvent.click(screen.getByText('main.name'));
      fireEvent.click(screen.getByText('main.date'));
      fireEvent.click(screen.getByText('main.likes'));
    })
    expect(onOrderByClickHandlerMock).toHaveBeenCalledTimes(3);
  })

  it('applies selected class to active orderBy', () => {
    render(<ItemsListFilter {...baseProps} orderBy="date" />);

    const dateButton = screen.getByText('main.date');
    expect(dateButton.className).toMatch(/selected/);
  })

  it('calls collapse handler when collapse button is clicked', () => {
    render(<ItemsListFilter {...baseProps} />);

    act(() => {
      fireEvent.click(screen.getByText('↦'));
    });
    expect(onCollapseClickMock).toHaveBeenCalled();
  })

  it('hides controls when collapsed', () => {
    isCollapsedMock = true;

    render(<ItemsListFilter {...baseProps} />);

    const nameBtn = screen.getByText('main.name');
    expect(nameBtn.className).toMatch(/hidden/);
  })
})
