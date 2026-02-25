import type { ItemsListOwnProps } from "@/application/components/ItemsList/ItemsList.types";
import React from "react";

type ItemListRoutesContainerProps2<T> = {
  children: React.ReactElement<ItemsListOwnProps<T>>,
  owner: string,
  getItems: (owner: string, currentPage: number, orderBy: string, orderDir: string, query: string) => Promise<{ data: Array<T>, total_count: number }>,
}

export type { ItemListRoutesContainerProps2 };