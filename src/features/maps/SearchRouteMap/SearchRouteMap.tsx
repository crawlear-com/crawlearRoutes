import MapPointPicker from "../MapPointPicker/MapPointPicker";
import Spinner from "../../../components/Spinner/Spinner";
import useSearchRoute from "./hooks/useSearchRoute";
import { useTranslation } from "react-i18next";
import SearchInput from "../../../components/SearchInput/SearchInput";
import RoutesCardList from "../../routes/RoutesCardList/RoutesCardList";
import type { Route, SearchResultRoute } from "../../../types/Route.types";
import RouteCard from "../../routes/RouteCard/RouteCard";
import { useSelector } from "react-redux";
import { selectRouteSearchPage, selectRouteSearchQuery, selectRouteSearchTotalPages } from "../store/selectors/routeSearchSelectors";
import RoutesPaginator from "../../routes/RoutesCardList/RoutesPaginator";
import { selectUserUUID } from "../../users/store/selectors/userSelectors";

const SearchRouteMap = () => {
  const [ resultRoutes, points, isLoading, onMapClick, onQueryChange, onSearch, onPageClick, onLikeClick ] = useSearchRoute();
  const { t } = useTranslation(['map']);
  const query = useSelector(selectRouteSearchQuery);
  const page = useSelector(selectRouteSearchPage);
  const totalRoutes = useSelector(selectRouteSearchTotalPages);
  const uid = useSelector(selectUserUUID);

  const likeExtras = (uid: string, rid: string, liked: boolean) => <div data-uuid={ uid } data-rid={ rid }
    className="absolute top-3 right-3" onClick={ onLikeClick }>{ liked ? "♥️" : "♡" }</div>
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