import MapPointPicker from "../MapPointPicker/MapPointPicker";
import Spinner from "../../../components/Spinner/Spinner";
import useSearchRoute from "./hooks/useSearchRoute";
import { useTranslation } from "react-i18next";
import SearchInput from "../../../components/SearchInput/SearchInput";
import RoutesCardList from "../../routes/RoutesCardList/RoutesCardList";
import type { Route } from "../../../types/Route.types";
import RouteCard from "../../routes/RouteCard/RouteCard";

const SearchRouteMap = () => {
  const [ resultRoutes, points, isLoading, onMapClick, onQueryChange ] = useSearchRoute();
  const { t } = useTranslation(['map']);

  const routesCard = (route: Route) => <RouteCard key={ route.id } route={ route } />;

  return (<div className="w-full mt-10">
    <MapPointPicker onMapClick={ onMapClick } points={ points } className="w-full h-96 sm:h-150" />

    <label htmlFor="searchRouteInput" className="mt-56">
      { t('main.search route') }:
      <SearchInput className="border-primary border h-10 p-2 ml-2 rounded"
        onQueryChange={ onQueryChange } placeholder={ t('main.by title') } />
    </label>

    { isLoading ? <Spinner className="float-right mr-1 mt-2" /> : <></>}
    <span className="ml-2">
      { resultRoutes && resultRoutes.length ? <>{ t('main.total') }: { resultRoutes.length }</> : <></>}
    </span>
    <RoutesCardList routes={ resultRoutes } card={ routesCard } />
  </div>);
}

export default SearchRouteMap;