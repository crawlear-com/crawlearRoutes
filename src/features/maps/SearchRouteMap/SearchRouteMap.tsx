import MapPointPicker from "../MapPointPicker/MapPointPicker";
import Spinner from "../../../components/Spinner/Spinner";
import useSearchRoute from "./hooks/useSearchRoute";
import { useTranslation } from "react-i18next";
import SearchInput from "../../../components/SearchInput/SearchInput";
import RoutesCardList from "../../routes/RoutesCardList/RoutesCardList";
import RouteCard from "../../routes/RouteCard/RouteCard";
import RoutesPaginator from "../../routes/RoutesCardList/RoutesPaginator";
import useLikeRoute from "./hooks/useLikeRoute";
import type { Route, SearchResultRoute } from "../../../types/Route.types";

const SearchRouteMap = () => {
  const [ resultRoutes, points, isLoading, query, page, totalRoutes, uid, 
    onMapClick, onQueryChange, onSearch, onPageClick] = useSearchRoute();
  const [likeExtras ] = useLikeRoute();
  const { t } = useTranslation(['map']);

  const routesCard = (route: Route | SearchResultRoute) => <RouteCard key={ route.id } route={ route } 
    extras={ likeExtras(uid, route.id, (route as SearchResultRoute).liked) } />;

  return (<div className="sm:max-w-[90%] lg:max-w-1/2 mx-auto mt-10">
    <MapPointPicker onMapClick={ onMapClick } points={ points } className="w-full h-96 sm:h-150" />

    <div className="max-w-[90%] m-auto sm:max-w-full sm:m-0">
      <label htmlFor="searchRouteInput" className="mt-56">
        { t('main.search route') }:
        <SearchInput value={ query } className="border-primary border h-10 p-2 ml-2 rounded"
          onQueryChange={ onQueryChange } onSearch={ onSearch } placeholder={ t('main.by title') } />
      </label>

      { isLoading ? <Spinner className="float-right mr-1 mt-2" /> : <></>}
      <RoutesPaginator currentPage={ page } totalItems={ totalRoutes } onPageClick={ onPageClick } />
      <RoutesCardList routes={ resultRoutes } card={ routesCard } />
    </div>
  </div>);
}

export default SearchRouteMap;