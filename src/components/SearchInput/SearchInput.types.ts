type SearchInputProps = {
  value?: string,
  className: string,
  placeholder: string,
  onQueryChange: (query: string) => void,
  onSearch: (query: string) => void
}

export type { SearchInputProps };