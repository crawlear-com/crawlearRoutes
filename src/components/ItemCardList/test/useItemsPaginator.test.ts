import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useItemsPaginator from '../hooks/useItemsPaginator';

describe('useItemsPaginator', () => {
  it('calculates totalPages correctly', () => {
    const { result } = renderHook(() =>
      useItemsPaginator(45, 10, 0, vi.fn())
    )

    const [, totalPages] = result.current;
    expect(totalPages).toBe(5);
  })

  it('returns correct number of page elements', () => {
    const { result } = renderHook(() =>
      useItemsPaginator(30, 10, 0, vi.fn())
    )

    const [pages] = result.current;
    expect(pages).toHaveLength(3);
  })

  it('marks current page with font-bold class', () => {
    const { result } = renderHook(() =>
      useItemsPaginator(30, 10, 1, vi.fn())
    )

    const [pages] = result.current;
    expect(pages[1].props.className).toContain('font-bold');
    expect(pages[0].props.className).toContain('cursor-pointer');
  })

  it('calls onPageClick when a valid different page is clicked', () => {
    const onPageClickMock = vi.fn()

    const { result } = renderHook(() =>
      useItemsPaginator(30, 10, 0, onPageClickMock)
    )

    const [, , handler] = result.current;

    const fakeEvent = {
      target: { dataset: { page: '2' } },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any

    act(() => {
      handler(fakeEvent);
    })

    expect(onPageClickMock).toHaveBeenCalledWith(2);
  })

  it('does NOT call onPageClick when clicking current page', () => {
    const onPageClickMock = vi.fn();

    const { result } = renderHook(() =>
      useItemsPaginator(30, 10, 1, onPageClickMock)
    )

    const [, , handler] = result.current;

    const fakeEvent = {
      target: { dataset: { page: '1' } },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any

    act(() => {
      handler(fakeEvent);
    })

    expect(onPageClickMock).not.toHaveBeenCalled();
  })

  it('does NOT call onPageClick for negative page', () => {
    const onPageClickMock = vi.fn();

    const { result } = renderHook(() =>
      useItemsPaginator(30, 10, 0, onPageClickMock)
    )

    const [, , handler] = result.current;

    const fakeEvent = {
      target: { dataset: { page: '-1' } },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any

    act(() => {
      handler(fakeEvent);
    })

    expect(onPageClickMock).not.toHaveBeenCalled();
  })

  it('does NOT call onPageClick for page >= totalPages', () => {
    const onPageClickMock = vi.fn()

    const { result } = renderHook(() =>
      useItemsPaginator(30, 10, 0, onPageClickMock)
    )

    const [, , handler] = result.current;

    const fakeEvent = {
      target: { dataset: { page: '3' } }, // totalPages = 3 → invalid
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any

    act(() => {
      handler(fakeEvent);
    })

    expect(onPageClickMock).not.toHaveBeenCalled();
  })
})
