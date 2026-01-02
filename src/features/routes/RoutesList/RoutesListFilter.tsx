import useRoutesListFilter from "./hooks/useRoutesListFilter";
import type { RoutesListFilterProps } from "./types/RoutesListFilter.types";

import './styles/routerListFilter.css';

const RoutesListFilter = ({ onOrderByClick, onOrderDirClick, onQueryChange }: RoutesListFilterProps) => {
  const [orderBy, isCollapsed, onOrderByClickHandler, onOrderDirClickHandler, onQueryChangeHandler,
    onCollapseClick, orderDirIcon] = useRoutesListFilter(onOrderByClick, onOrderDirClick, onQueryChange);

  return (<div className="container flex justify-end items-center mx-auto mb-2">
      <div className="button-primary w-auto text-2xl" onClick={onCollapseClick}>{isCollapsed ? "↤" : "↦"}</div>
      <input className={`${isCollapsed ? "hidden" : "flex-2 justify-self-start border border-gray-500 shadow mx-2 p-1 w-full"}`} 
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