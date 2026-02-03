import type { SearchInputProps } from "./SearchInput.types";
import useSearchInput from "./hooks/useSearchInput";

const SearchInput = ({ value, labelTitle, className, placeholder, onQueryChange, onSearch  }: SearchInputProps) => {
  const [ onQueryChangeHandler ] = useSearchInput(onQueryChange, onSearch);

  return <>
    <label htmlFor="searchInput">{labelTitle}: </label>
    <input value={ value } className={ className } onChange={ onQueryChangeHandler }
        placeholder={ placeholder } type="text" id="searchInput" name="searchInput"  />
  </>
}

export default SearchInput;