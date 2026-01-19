import { useTranslation } from "react-i18next";
import RoutesList from "../RoutesList/RoutesList";
import useRoutesProvider from "../hooks/useRoutesProvider";
import { getMyFavourites } from "../store/slices/routeListsSlice";
import useLikesFromUser from "./hooks/useLikesFromUser";

const LikesFromUser = () => {
  const { t } = useTranslation(['myRoutes']);
  const [ myRoutesCard, setMethods, selectMethods ] = useLikesFromUser();

  return <RoutesList title={ t("main.favourite routes") } card={ myRoutesCard }
    hook={ useRoutesProvider } thunk={ getMyFavourites } setMethods={ setMethods }
    selectMethods={ selectMethods }/>;
}

export default LikesFromUser;