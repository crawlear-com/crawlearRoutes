import * as React from "react";
import { ASC, DESC } from "../types/ItemsListFilter.types";

const useItemsListFilter = (onOrderByClick: (order: string) => void,
  onOrderDirClick: (order: string) => void):
  [ string, boolean, (event: React.MouseEvent<HTMLDivElement>) => void, () => void, () => void, string ] => {
  
  const [ orderDir, setOrderDir ] = React.useState(ASC);
  const [ orderBy, setOrderBy ] = React.useState('name');
  const [ isCollapsed, setIsCollapsed ] = React.useState(false);
  const onOrderByClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const order = (event.target as HTMLDivElement).dataset.order;

    if (order) {
      onOrderByClick(order);
      setOrderBy(order);
    }
  }
  const onOrderDirClickHandler = () => {
    const order = orderDir === ASC ? DESC : ASC;

    onOrderDirClick(order);
    if (order !== orderDir) {
      setOrderDir(order);
    }
  }
  const onCollapseClick = () => {
    setIsCollapsed(!isCollapsed);
  }
  const orderDirIcon = (orderDir === ASC ? '⬆': '⬇');

  return [ orderBy, isCollapsed, onOrderByClickHandler, onOrderDirClickHandler, onCollapseClick, orderDirIcon ]
}

export default useItemsListFilter;