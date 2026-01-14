import React from "react";

const BOUNCING_TIMEOUT = 1000;

const useSearchInput = (onQueryChange: (query: string) => void, onSearch: () => void):
[ (event: React.ChangeEvent<HTMLInputElement>) => void ] => {
  const [ bouncingTimeout, setBouncingTimeout ] = React.useState(0);
  const onQueryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    onQueryChange(query);
    if (bouncingTimeout !== 0) {
      clearTimeout(bouncingTimeout);
    }
    setBouncingTimeout(setTimeout(() => {
      onSearch();
    }, BOUNCING_TIMEOUT));
  }

  return [ onQueryChangeHandler ];
}

export default useSearchInput;