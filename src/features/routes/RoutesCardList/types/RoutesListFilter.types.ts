type RoutesListFilterProps = {
  onOrderByClick: (order: string) => void,
  onOrderDirClick: (order: string) => void,
  onQueryChange: (query: string) => void,
  onSearch: (query: string) => void
}

const ASC = 'asc';
const DESC = 'des';

export { type RoutesListFilterProps, ASC, DESC}