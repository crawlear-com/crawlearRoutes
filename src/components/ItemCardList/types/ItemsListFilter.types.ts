type ItemsListFilterProps = {
  onOrderByClick: (order: string) => void,
  onOrderDirClick: (order: string) => void,
  onQueryChange: (query: string) => void,
  onSearch: () => void
}

const ASC = 'asc';
const DESC = 'des';

export { type ItemsListFilterProps, ASC, DESC}