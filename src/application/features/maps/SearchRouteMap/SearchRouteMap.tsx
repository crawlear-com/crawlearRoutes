import MapPointPicker from "../MapPointPicker/MapPointPicker";
import Spinner from "@/application/components/ui/Spinner/Spinner";
import useSearchRoute from "./hooks/useSearchRoute";
import { useTranslation } from "react-i18next";
import SearchInput from "@/application/components/ui/SearchInput/SearchInput";
import ItemCardList from "@/application/components/ItemCardList/ItemCardList";
import ItemsPaginator from "@/application/components/ItemCardList/ItemsPaginator";
import type { Route, SearchResultRoute } from "@/domain/Route.types";

const SearchRouteMap = () => {
  const { t } = useTranslation(['map']);
  const [ resultRoutes, points, isLoading, query, page, totalRoutes, 
    onMapClick, onQueryChange, onSearch, onPageClick, routesCard] = useSearchRoute();

  return (<div className="container card flex gap-5 flex-col lg:flex-row z-10 relative lg:p-20">
    <MapPointPicker onMapClick={ onMapClick } points={ points } containerClassName="flex-1" className="container card h-96 sm:h-150" />

    <div className="self-start flex-1 z-10">
      <b><SearchInput isCollapsed={ false } value={ query } labelTitle={ t('main.search route') }
        className="border-primary border w-full h-10 p-2 mb-2 rounded"
        onQueryChange={ onQueryChange } onSearch={ onSearch }
        placeholder={ t('main.by title') } /></b>

      { isLoading ? <Spinner className="float-right mr-1 mt-2" /> : <></>}
      <ItemsPaginator currentPage={ page } totalItems={ totalRoutes } onPageClick={ onPageClick } />
      <ItemCardList<Route | SearchResultRoute> items={ resultRoutes } card={ routesCard } />
    </div>
  </div>);
}

export default SearchRouteMap;