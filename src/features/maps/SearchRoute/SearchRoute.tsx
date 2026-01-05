import MapPointPicker from "../MapPointPicker/MapPointPicker";
import Spinner from "../../../components/Spinner/Spinner";
import useSearchRoute from "./hooks/useSearchRoute";
import { useTranslation } from "react-i18next";
import SearchInput from "../../../components/SearchInput/SearchInput";

const SearchRoute = () => {
  const [ resultRoutes, points, isLoading, onMapClick, onQueryChange ] = useSearchRoute();
  const { t } = useTranslation(['map']);

  return (<div className="w-full sm:w-[50%]">
    <MapPointPicker onMapClick={ onMapClick } points={ points } className="w-full h-96 sm:h-full"></MapPointPicker>
    <label htmlFor="searchRouteInput" className="mt-56">
      { t('main.search route') }:
      <SearchInput className="border-primary border h-10 p-2 ml-2 rounded"
        onQueryChange={ onQueryChange } placeholder={ t('main.by title') } />
    </label>
    { isLoading ? <Spinner /> : <></>}
    { resultRoutes && resultRoutes.length ? <>{ t('main.total') }: { resultRoutes.length }</> : <></>}
  </div>);
}

export default SearchRoute;