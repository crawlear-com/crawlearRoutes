import type { ActionCreatorWithPayload, AsyncThunk, AsyncThunkConfig } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

type SetMethods = {
  setPage: ActionCreatorWithPayload<number, string>,
  setOrderBy: ActionCreatorWithPayload<string, string>,
  setOrderDir: ActionCreatorWithPayload<string, string>,
  setQuery: ActionCreatorWithPayload<string, string>
}

type SelectMethods<T> = {
  selectItems: (state: RootState) => Array<T>,
  selectIsLoading: (state: RootState) => boolean,
  selectPage: (state: RootState) => number,
  selectTotalItems: (state: RootState) => number
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