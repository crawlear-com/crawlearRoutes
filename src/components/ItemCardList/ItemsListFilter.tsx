import useItemsListFilter from "./hooks/useItemsListFilter";
import SearchInput from "@/components/ui/SearchInput/SearchInput";
import { ASC, type ItemsListFilterProps } from "./types/ItemsListFilter.types";
import { useTranslation } from "react-i18next";

import './styles/routerListFilter.css';

const ItemsListFilter = ({ query, orderDir, orderBy, onOrderByClick, onOrderDirClick, onQueryChange, onSearch }: ItemsListFilterProps) => {
  const [isCollapsed, onOrderByClickHandler, onOrderDirClickHandler,
    onCollapseClick] = useItemsListFilter(onOrderByClick, onOrderDirClick);
  const { t } = useTranslation(["routeCreation"]);
  const orderDirIcon = (orderDir === ASC ? '⬆': '⬇');


  return (<div className="container flex justify-center items-center mx-auto mb-2 flex-wrap sm:flex-nowrap">
      <div className="button-primary w-auto text-2xl hidden sm:block" onClick={onCollapseClick}>{isCollapsed ? "↤" : "↦"}</div>
      <SearchInput value={ query } className={`${isCollapsed ? "hidden" : "mb-5 sm:mb-0 basis-full justify-self-start border border-gray-500 shadow mx-2 p-1 w-full"}`}
        placeholder="Filter routes..." onQueryChange={ onQueryChange } onSearch={ onSearch } />

      <span className={`${isCollapsed ? "hidden" : "button-primary w-8 mx-1 text-center"}`} onClick={onOrderDirClickHandler}>{orderDirIcon}</span>

      <div data-order="name" onClick={ onOrderByClickHandler } 
        className={`${isCollapsed ? "hidden" : "button-primary"} orderBy${orderBy==='name'? ' selected':''}`}>
        { t("main.name") }
      </div>
      <div data-order="date" onClick={ onOrderByClickHandler } 
        className={`${isCollapsed ? "hidden" : "button-primary"} orderBy${orderBy==='date'? ' selected':''}`}>
        { t("main.date") }
      </div>
      <div data-order="likes" onClick={ onOrderByClickHandler }
        className={`${isCollapsed ? "hidden" : "button-primary"} orderBy${orderBy==='likes'? ' selected':''}`}>
        { t("main.likes") }
      </div>
    </div>);
}

export default ItemsListFilter;