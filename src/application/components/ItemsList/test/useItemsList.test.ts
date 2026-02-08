import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useItemsList from '../hooks/useItemsList';

const dispatchMock = vi.fn()

vi.mock('react-redux', () => ({
  useDispatch: () => dispatchMock,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSelector: (selector: any) => selector(),
}))

const selectMethods = {
  selectItems: () => [{ id: 1 }],
  selectIsLoading: () => false,
  selectPage: () => 1,
  selectTotalItems: () => 100,
  selectQuery: () => 'abc',
  selectOrderBy: () => 'name',
  selectOrderDir: () => 'ASC',
}

const setMethods = {
  setPage: (p: number) => ({ type: 'setPage', payload: p }),
  setOrderBy: (o: string) => ({ type: 'setOrderBy', payload: o }),
  setOrderDir: () => ({ type: 'setOrderDir' }),
  setQuery: (q: string) => ({ type: 'setQuery', payload: q }),
}

const thunkMock = vi.fn(() => ({ type: 'thunk' }))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('useItemsList hook', () => {
  it('dispatches thunk on mount', () => {
    renderHook(() =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useItemsList(thunkMock as any, setMethods as any, selectMethods as any)
    )

    expect(dispatchMock).toHaveBeenCalledWith(thunkMock())
  })

  it('onPageClick dispatches setPage + thunk', () => {
    const { result } = renderHook(() =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useItemsList(thunkMock as any, setMethods as any, selectMethods as any)
    )

    const onPageClick = result.current[7]

    act(() => onPageClick(3))

    expect(dispatchMock).toHaveBeenCalledWith(setMethods.setPage(3))
    expect(dispatchMock).toHaveBeenCalledWith(thunkMock())
  })

  it('onOrderByClick dispatches setOrderBy + thunk', () => {
    const { result } = renderHook(() =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useItemsList(thunkMock as any, setMethods as any, selectMethods as any)
    )

    act(() => result.current[8]('date'))

    expect(dispatchMock).toHaveBeenCalledWith(setMethods.setOrderBy('date'))
    expect(dispatchMock).toHaveBeenCalledWith(thunkMock())
  })

  it('onOrderDirClick dispatches setOrderDir + thunk', () => {
    const { result } = renderHook(() =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useItemsList(thunkMock as any, setMethods as any, selectMethods as any)
    )

    act(() => result.current[9]())

    expect(dispatchMock).toHaveBeenCalledWith(setMethods.setOrderDir())
    expect(dispatchMock).toHaveBeenCalledWith(thunkMock())
  })

  it('onQueryChange dispatches setQuery only', () => {
    const { result } = renderHook(() =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useItemsList(thunkMock as any, setMethods as any, selectMethods as any)
    )

    act(() => result.current[10]('hello'))

    expect(dispatchMock).toHaveBeenCalledWith(setMethods.setQuery('hello'))
  })

  it('onSearch dispatches thunk', () => {
    const { result } = renderHook(() =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useItemsList(thunkMock as any, setMethods as any, selectMethods as any)
    )

    act(() => result.current[11]())

    expect(dispatchMock).toHaveBeenCalledWith(thunkMock())
  })

  it('onSearch resets to page 0', () => {
    const { result } = renderHook(() =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useItemsList(thunkMock as any, setMethods as any, selectMethods as any)
    )

    act(() => result.current[11]())

    expect(dispatchMock).toHaveBeenCalledWith(setMethods.setPage(0))
  })
})
