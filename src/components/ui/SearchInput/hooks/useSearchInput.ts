import React from "react";

const BOUNCING_TIMEOUT = 1000;

const useSearchInput = (onQueryChange: (query: string) => void, onSearch: () => void):
[ (event: React.ChangeEvent<HTMLInputElement>) => void ] => {
  const bouncingTimeout = React.useRef<number | null>(null);
  const onQueryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    onQueryChange(query);
    if (bouncingTimeout.current && bouncingTimeout.current !== 0) {
      clearTimeout(bouncingTimeout.current);
    }
    bouncingTimeout.current = setTimeout(() => {
      onSearch();

    }, BOUNCING_TIMEOUT);
  }

  return [ onQueryChangeHandler ];
}

export default useSearchInput;