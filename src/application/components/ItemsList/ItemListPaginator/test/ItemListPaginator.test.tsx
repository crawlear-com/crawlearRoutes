// ItemsPaginator.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import React, { act } from 'react'
import ItemListPaginator from '../ItemListPaginator'

vi.mock('@/infrastructure/supabaseClient', () => ({
  ITEMS_PAGE: 10
}));

const onPageEventHandlerMock = vi.fn();

let pagesMock: React.ReactNode = null;
let totalPagesMock = 5;

vi.mock('../hooks/useItemListPaginator', () => ({
  default: () => [
    pagesMock,
    totalPagesMock,
    onPageEventHandlerMock
  ]
}));

const baseProps = {
  currentPage: 2,
  totalItems: 50,
  itemsPerPage: 10,
  onPageClick: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  cleanup();
  pagesMock = (<>
      <span data-page="0">1</span>
      <span data-page="1">2</span>
      <span data-page="2">3</span>
    </>);
  totalPagesMock = 5;
});

describe('ItemsPaginator', () => {
  it('shows total items when totalItems > 0', () => {
    render(<ItemListPaginator {...baseProps} />);
    expect(screen.getByText('Total: 50')).toBeInTheDocument();
  })

  it('hides total when totalItems is 0', () => {
    render(<ItemListPaginator {...baseProps} totalItems={0} />);
    expect(screen.queryByText(/Total:/)).not.toBeInTheDocument();
  })

  it('renders pages returned by hook', () => {
    render(<ItemListPaginator {...baseProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  })

  it('shows previous button when currentPage > 0', () => {
    render(<ItemListPaginator {...baseProps} currentPage={2} />);
    expect(screen.getByText('<')).toBeInTheDocument();
  })

  it('hides previous button when on first page', () => {
    render(<ItemListPaginator {...baseProps} currentPage={0} />);
    expect(screen.queryByText('<')).not.toBeInTheDocument();
  })

  it('shows next button when not on last page', () => {
    render(<ItemListPaginator {...baseProps} currentPage={2} />);
    expect(screen.getByText('>')).toBeInTheDocument();
  })

  it('hides next button when on last page', () => {
    totalPagesMock = 3;
    render(<ItemListPaginator {...baseProps} currentPage={2} />);
    expect(screen.queryByText('>')).not.toBeInTheDocument();
  })

  it('clicking previous calls onPageEventHandler', () => {
    render(<ItemListPaginator {...baseProps} currentPage={2} />);

    const prevButton = screen.getByText('<');

    expect(prevButton).toHaveAttribute('data-page', '1');
    act(() => {
      fireEvent.click(prevButton);
    })
    expect(onPageEventHandlerMock).toHaveBeenCalledTimes(1);
  });

  it('clicking next calls onPageEventHandler with dataset page', () => {
    render(<ItemListPaginator {...baseProps} currentPage={2} />);
    const nextButton = screen.getByText('>');

    expect(nextButton).toHaveAttribute('data-page', '3');
    act(() => {
      fireEvent.click(nextButton);
    })
    expect(onPageEventHandlerMock).toHaveBeenCalledTimes(1);
  })
})
