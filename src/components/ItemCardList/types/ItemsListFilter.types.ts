type ItemsListFilterProps = {
  onOrderByClick: (order: string) => void,
  onOrderDirClick: () => void,
  onQueryChange: (query: string) => void,
  onSearch: () => void,
  query: string,
  orderBy: string,
  orderDir: string
}

const ASC = 'asc';
const DESC = 'des';

export { type ItemsListFilterProps, ASC, DESC}