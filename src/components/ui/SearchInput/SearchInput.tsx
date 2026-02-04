import type { SearchInputProps } from "./SearchInput.types";
import useSearchInput from "./hooks/useSearchInput";

const SearchInput = ({ value, labelTitle, isCollapsed, className, placeholder, onQueryChange, onSearch  }: SearchInputProps) => {
  const [ onQueryChangeHandler ] = useSearchInput(onQueryChange, onSearch);
  const isCollapsedClass = isCollapsed ? 'hidden' : '';

  return <>
    <label className={ isCollapsedClass } htmlFor="searchInput">{ labelTitle }: </label>
    <input value={ value } className={ `${className} ${isCollapsedClass} font-normal` } onChange={ onQueryChangeHandler }
        placeholder={ placeholder } type="text" id="searchInput" name="searchInput"  />
  </>
}

export default SearchInput;