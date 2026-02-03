import MapPointPicker from "../MapPointPicker/MapPointPicker";
import Spinner from "@/components/ui/Spinner/Spinner";
import useSearchRoute from "./hooks/useSearchRoute";
import { useTranslation } from "react-i18next";
import SearchInput from "@/components/ui/SearchInput/SearchInput";
import ItemCardList from "@/components/ItemCardList/ItemCardList";
import ItemsPaginator from "@/components/ItemCardList/ItemsPaginator";
import type { Route, SearchResultRoute } from "@/types/Route.types";

const SearchRouteMap = () => {
  const { t } = useTranslation(['map']);
  const [ resultRoutes, points, isLoading, query, page, totalRoutes, 
    onMapClick, onQueryChange, onSearch, onPageClick, routesCard] = useSearchRoute();

  return (<div className="container card flex gap-5 flex-col lg:flex-row z-10 relative lg:p-20">
    <MapPointPicker onMapClick={ onMapClick } points={ points } containerClassName="flex-1" className="container card h-96 sm:h-150" />

    <div className="self-start flex-1 z-10">
      <label htmlFor="searchRouteInput" className="mr-2">
        { t('main.search route') }:
      </label>
      <SearchInput value={ query } className="border-primary border w-full h-10 p-2 mb-2 rounded"
        onQueryChange={ onQueryChange } onSearch={ onSearch } placeholder={ t('main.by title') } />

      { isLoading ? <Spinner className="float-right mr-1 mt-2" /> : <></>}
      <ItemsPaginator currentPage={ page } totalItems={ totalRoutes } onPageClick={ onPageClick } />
      <ItemCardList<Route | SearchResultRoute> items={ resultRoutes } card={ routesCard } />
    </div>
  </div>);
}

export default SearchRouteMap;