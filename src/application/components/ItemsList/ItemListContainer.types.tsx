import type { ItemsListOwnProps } from "@/application/components/ItemsList/ItemsList.types";
import type { IItemListRespository } from "@/domain/IItemListRespository.types";
import React from "react";

type ItemListRoutesContainerProps<T> = {
  children: React.ReactElement<ItemsListOwnProps<T>>,
  repository: IItemListRespository<T>
}

export type { ItemListRoutesContainerProps };