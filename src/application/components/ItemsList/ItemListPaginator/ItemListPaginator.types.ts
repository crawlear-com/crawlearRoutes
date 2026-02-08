type ItemListPaginatorProps = {
  currentPage: number,
  totalItems: number,
  itemsPerPage?: number,
  onPageClick: (page: number) => void
}

export type { ItemListPaginatorProps };