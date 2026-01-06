import type { SearchInputProps } from "./SearchInput.types";
import useSearchInput from "./hooks/useSearchInput";

const SearchInput = ({ className, placeholder, onQueryChange  }: SearchInputProps) => {
  const [ onQueryChangeHandler ] = useSearchInput(onQueryChange);

  return <input className={ className } onChange={ onQueryChangeHandler }
        placeholder={ placeholder } type="text" />
}

export default SearchInput;