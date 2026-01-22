import type { ActionCreatorWithPayload, AsyncThunk, AsyncThunkConfig } from "@reduxjs/toolkit";

type SetMethods = {
  setPage: ActionCreatorWithPayload<number, string>,
  setOrderBy: ActionCreatorWithPayload<string, string>,
  setOrderDir: ActionCreatorWithPayload<string, string>,
  setQuery: ActionCreatorWithPayload<string, string>
}

type SelectMethods<T> = {
  selectItems: (state: unknown) => Array<T>,
  selectIsLoading: (state: unknown) => boolean,
  selectPage: (state: unknown) => number,
  selectTotalItems: (state: unknown) => number
}

type ItemsListProps<T> = {
  title?: string,
  card: (item: T) => React.ReactElement,
  setMethods: SetMethods,
  selectMethods: SelectMethods<T>,
  thunk: AsyncThunk<Array<T>, void, AsyncThunkConfig>,
  hook: (thunk: AsyncThunk<Array<T>, void, AsyncThunkConfig>,
  setMethods: SetMethods,
  selectMethods: SelectMethods<T>) => [
      number, number, Array<T>, boolean, (page: number) => void,
      (order: string) => void, (order: string) => void, (query: string) => void, () => void
    ]
}

export type { ItemsListProps, SetMethods, SelectMethods };