import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ItemCardList from '../ItemCardList';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  }),
}))

describe('ItemCardList', () => {
  it('renders cards when items are provided', () => {
    const items = ['Route A', 'Route B'];

    const cardMock = vi.fn((item: string) => (
      <div key={ item } data-testid="card">
        { item }
      </div>
    ))

    render(<ItemCardList items={ items } card={ cardMock } />);

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('Route A')).toBeInTheDocument();
    expect(screen.getByText('Route B')).toBeInTheDocument();

    expect(cardMock).toHaveBeenCalledTimes(2);
    expect(cardMock).toHaveBeenCalledWith('Route A');
    expect(cardMock).toHaveBeenCalledWith('Route B');

    expect(screen.queryByText('main.no routes')).not.toBeInTheDocument();
  })

it('renders empty state when no items', () => {
    const cardMock = vi.fn();

    render(<ItemCardList items={ [] } card={ cardMock } />);

    expect(cardMock).not.toHaveBeenCalled();
    expect(screen.getByText('main.no routes')).toBeInTheDocument();
  })
});