import useItemsListFilter from "./hooks/useItemsListFilter";
import SearchInput from "@/components/ui/SearchInput/SearchInput";
import type { ItemsListFilterProps } from "./types/ItemsListFilter.types";
import { useTranslation } from "react-i18next";

import './styles/routerListFilter.css';

const ItemsListFilter = ({ onOrderByClick, onOrderDirClick, onQueryChange, onSearch }: ItemsListFilterProps) => {
  const [orderBy, isCollapsed, onOrderByClickHandler, onOrderDirClickHandler,
    onCollapseClick, orderDirIcon] = useItemsListFilter(onOrderByClick, onOrderDirClick);
  const { t } = useTranslation(["routeCreation"]);

  return (<div className="container flex justify-end items-center mx-auto mb-2">
      <div className="button-primary w-auto text-2xl" onClick={onCollapseClick}>{isCollapsed ? "↤" : "↦"}</div>
      <SearchInput className={`${isCollapsed ? "hidden" : "flex-2 justify-self-start border border-gray-500 shadow mx-2 p-1 w-full"}`}
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