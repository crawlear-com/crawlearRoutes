
type ItemListStatus = {
  isLoading: boolean,
  currentPage: number,
  totalItems: number,
  query: string,
  orderBy: string,
  orderDir: string
}

type ItemListEventHandlers = {
  onPageClick: (page: number) => void,
  onOrderDirClick: (direction: string) => void,
  onOrderByClick: (order: string) => void,
  onQueryChange: (query: string) => void,
  onSearch: () => void
}


export type InjectedItemsListProps<T> = {
  items: Array<T>,
  listStatus: ItemListStatus;
  eventHandlers: ItemListEventHandlers;
}

export type ItemsListOwnProps<T> = {
  children?: React.JSX.Element;
  card: (item: T) => React.JSX.Element;

}

type ItemsListProps<T> = ItemsListOwnProps<T> & Partial<InjectedItemsListProps<T>>;

export type { ItemsListProps, ItemListStatus, ItemListEventHandlers };