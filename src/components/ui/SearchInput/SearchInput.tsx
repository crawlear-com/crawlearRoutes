import type { SearchInputProps } from "./SearchInput.types";
import useSearchInput from "./hooks/useSearchInput";

const SearchInput = ({ value, className, placeholder, onQueryChange, onSearch  }: SearchInputProps) => {
  const [ onQueryChangeHandler ] = useSearchInput(onQueryChange, onSearch);

  return <input value={ value } className={ className } onChange={ onQueryChangeHandler }
        placeholder={ placeholder } type="text" />
}

export default SearchInput;