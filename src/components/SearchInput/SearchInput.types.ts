type SearchInputProps = {
  value?: string,
  className: string,
  placeholder: string,
  onQueryChange: (query: string) => void,
  onSearch: () => void
}

export type { SearchInputProps };