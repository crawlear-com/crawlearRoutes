import type { ActionCreatorWithoutPayload, ActionCreatorWithPayload, AsyncThunk, AsyncThunkConfig } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

type SetMethods = {
  setPage: ActionCreatorWithPayload<number, string>,
  setOrderBy: ActionCreatorWithPayload<string, string>,
  setOrderDir: ActionCreatorWithoutPayload<string>,
  setQuery: ActionCreatorWithPayload<string, string>
}

type SelectMethods<T> = {
  selectItems: (state: RootState) => Array<T>,
  selectIsLoading: (state: RootState) => boolean,
  selectPage: (state: RootState) => number,
  selectTotalItems: (state: RootState) => number,
  selectQuery: (state: RootState) => string,
  selectOrderBy: (state: RootState) => string,
  selectOrderDir: (state: RootState) => string,
}

type ItemsListProps<T> = {
  title?: string,
  card: (item: T) => React.ReactElement,
  setMethods: SetMethods,
  selectMethods: SelectMethods<T>,
  thunk: AsyncThunk<Array<T>, void, AsyncThunkConfig>,
  hook: (thunk: AsyncThunk<Array<T>, void, AsyncThunkConfig>,
  setMethods: SetMethods,
  selectMethods: SelectMethods<T>) => [ number, string, string, string, number,
    Array<T>, boolean, (page: number) => void, (order: string) =>  void,
    () =>  void, (query: string) =>  void, () =>  void ]
}

export type { ItemsListProps, SetMethods, SelectMethods };