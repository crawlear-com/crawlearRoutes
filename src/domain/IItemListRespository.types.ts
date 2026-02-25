import type { RootState } from "@/application/store/RootReducer";
import type { ItemListDTO } from "@/infrastructure/ItemListDTO.types";
import type { ActionCreatorWithoutPayload, ActionCreatorWithPayload, AsyncThunk, AsyncThunkConfig } from "@reduxjs/toolkit";

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

type IItemListRespository<T> = {
  search: AsyncThunk<ItemListDTO<T>, void, AsyncThunkConfig>
  setMethods: SetMethods,
  selectMethods: SelectMethods<T>
}

export type { IItemListRespository };