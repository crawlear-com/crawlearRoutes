import React from "react";

const BOUNCING_TIMEOUT = 1000;

const useSearchInput = (onQueryChange: (query: string) => void): 
[ (event: React.ChangeEvent<HTMLInputElement>) => void ] => {
  const [ bouncingTimeout, setBouncingTimeout ] = React.useState(0);
  const onQueryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    if (bouncingTimeout !== 0) {
      clearTimeout(bouncingTimeout);
    }
    setBouncingTimeout(setTimeout(() => {
      onQueryChange(query);
    }, BOUNCING_TIMEOUT));
  }

  return [ onQueryChangeHandler ];
}

export default useSearchInput;