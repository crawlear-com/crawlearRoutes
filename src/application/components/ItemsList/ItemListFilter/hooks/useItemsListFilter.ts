import * as React from "react";

const useItemsListFilter = (onOrderByClick: (order: string) => void,
  onOrderDirClick: () => void):
  [ boolean, (event: React.MouseEvent<HTMLDivElement>) => void, () => void, () => void ] => {
  
  const [ isCollapsed, setIsCollapsed ] = React.useState(false);
  const onOrderByClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const order = (event.target as HTMLDivElement).dataset.order;

    if (order) {
      onOrderByClick(order);
    }
  }
  const onOrderDirClickHandler = () => {
    onOrderDirClick();
  }
  const onCollapseClick = () => {
    setIsCollapsed(prev => !prev);
  }

  return [ isCollapsed, onOrderByClickHandler, onOrderDirClickHandler, onCollapseClick ]
}

export default useItemsListFilter;