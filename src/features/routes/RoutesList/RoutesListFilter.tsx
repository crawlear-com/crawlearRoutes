import * as React from "react";

import './styles/routerListFilter.css';

type RoutesListFilterProps = {
  onOrderByClick: (order: string) => void,
  onOrderDirClick: (order: string) => void,
  onQueryChange: (query: string) => void
}

const ASC = 'asc';
const DESC = 'des';

const RoutesListFilter = ({ onOrderByClick, onOrderDirClick, onQueryChange }: RoutesListFilterProps) => {
  const [ orderDir, setOrderDir ] = React.useState(ASC);
  const [ orderBy, setOrderBy ] = React.useState('name');
  const [ isCollapsed, setIsCollapsed ] = React.useState(true);
  const onQueryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  const query = event.target.value;

    onQueryChange(query);
  }
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

  return (<div className="container flex justify-end items-center my-5 mx-auto">
      <div className="button-primary w-auto text-2xl" onClick={onCollapseClick}>{isCollapsed ? "↤" : "↦"}</div>
      <input className={`${isCollapsed ? "hidden" : "flex-2 justify-self-start border border-gray-500 shadow mx-2 p-1"}`} 
        onChange={ onQueryChangeHandler }
        placeholder="Filter routes..." type="text" />

      <span className={`${isCollapsed ? "hidden" : "button-primary w-8 mx-1 text-center"}`} onClick={onOrderDirClickHandler}>{orderDirIcon}</span>

      <div data-order="name" onClick={ onOrderByClickHandler } 
        className={`${isCollapsed ? "hidden" : "button-primary"} orderBy${orderBy==='name'? ' selected':''}`}>
        Name
      </div>
      <div data-order="date" onClick={onOrderByClickHandler} 
        className={`${isCollapsed ? "hidden" : "button-primary"} orderBy${orderBy==='date'? ' selected':''}`}>
        Date
      </div>
      <div data-order="likes" onClick={onOrderByClickHandler}
        className={`${isCollapsed ? "hidden" : "button-primary"} orderBy${orderBy==='likes'? ' selected':''}`}>
        Likes
      </div>
    </div>);
}

export default RoutesListFilter;