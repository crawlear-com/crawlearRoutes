import MapPointPicker from "../MapPointPicker/MapPointPicker";
import Spinner from "../../../components/Spinner/Spinner";
import useSearchRoute from "./hooks/useSearchRoute";
import { useTranslation } from "react-i18next";
import SearchInput from "../../../components/SearchInput/SearchInput";
import RoutesCardList from "../../routes/RoutesCardList/RoutesCardList";
import type { Route } from "../../../types/Route.types";
import RouteCard from "../../routes/RouteCard/RouteCard";
import { useSelector } from "react-redux";
import { selectRouteSearchPage, selectRouteSearchQuery, selectRouteSearchTotalPages } from "../store/selectors/routeSearchSelectors";
import RoutesPaginator from "../../routes/RoutesCardList/RoutesPaginator";

const SearchRouteMap = () => {
  const [ resultRoutes, points, isLoading, onMapClick, onQueryChange, onSearch, onPageClick ] = useSearchRoute();
  const { t } = useTranslation(['map']);
  const query = useSelector(selectRouteSearchQuery);
  const page = useSelector(selectRouteSearchPage);
  const totalRoutes = useSelector(selectRouteSearchTotalPages);

  const routesCard = (route: Route) => <RouteCard key={ route.id } route={ route } />;

  return (<div className="w-full mt-10">
    <MapPointPicker onMapClick={ onMapClick } points={ points } className="w-full h-96 sm:h-150" />

    <label htmlFor="searchRouteInput" className="mt-56">
      { t('main.search route') }:
      <SearchInput value={ query } className="border-primary border h-10 p-2 ml-2 rounded"
        onQueryChange={ onQueryChange } onSearch={ onSearch } placeholder={ t('main.by title') } />
    </label>

    { isLoading ? <Spinner className="float-right mr-1 mt-2" /> : <></>}
    <RoutesPaginator currentPage={ page } totalItems={ totalRoutes } onPageClick={ onPageClick } />
    <RoutesCardList routes={ resultRoutes } card={ routesCard } />
    
  </div>);
}

export default SearchRouteMap;