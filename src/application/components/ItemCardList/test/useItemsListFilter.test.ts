import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useItemsListFilter from '../hooks/useItemsListFilter';

describe('useItemsListFilter', () => {
  it('initializes with isCollapsed = false', () => {
    const { result } = renderHook(() =>
      useItemsListFilter(vi.fn(), vi.fn())
    )

    const [isCollapsed] = result.current;
    expect(isCollapsed).toBe(false);
  })

  it('toggles collapse state when onCollapseClick is called', () => {
    const { result } = renderHook(() =>
      useItemsListFilter(vi.fn(), vi.fn())
    )

    const [, , , onCollapseClick] = result.current;

    act(() => {
      onCollapseClick();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      onCollapseClick();
    });
    expect(result.current[0]).toBe(false);
  })

  it('calls onOrderByClick with dataset.order', () => {
    const onOrderByClickMock = vi.fn();

    const { result } = renderHook(() =>
      useItemsListFilter(onOrderByClickMock, vi.fn())
    )

    const [, onOrderByClickHandler] = result.current;

    const fakeEvent = {
      target: { dataset: { order: 'name' } },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any

    act(() => {
      onOrderByClickHandler(fakeEvent);
    })

    expect(onOrderByClickMock).toHaveBeenCalledWith('name');
  })

  it('does not call onOrderByClick if dataset.order is missing', () => {
    const onOrderByClickMock = vi.fn();

    const { result } = renderHook(() =>
      useItemsListFilter(onOrderByClickMock, vi.fn())
    )

    const [, onOrderByClickHandler] = result.current;

    const fakeEvent = {
      target: { dataset: {} },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any

    act(() => {
      onOrderByClickHandler(fakeEvent);
    })

    expect(onOrderByClickMock).not.toHaveBeenCalled();
  })

  it('calls onOrderDirClick when handler is invoked', () => {
    const onOrderDirClickMock = vi.fn();

    const { result } = renderHook(() =>
      useItemsListFilter(vi.fn(), onOrderDirClickMock)
    )

    const [, , onOrderDirClickHandler] = result.current;

    act(() => {
      onOrderDirClickHandler();
    })

    expect(onOrderDirClickMock).toHaveBeenCalledTimes(1);
  })
})
