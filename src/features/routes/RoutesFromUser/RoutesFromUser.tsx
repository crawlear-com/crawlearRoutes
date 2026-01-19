import RoutesList from "../RoutesList/RoutesList";
import useRoutesProvider from "../hooks/useRoutesProvider";
import { useTranslation } from "react-i18next";
import { getMyRoutes } from "../store/slices/routeListsSlice";
import useRoutesFromUser from "./hooks/useRoutesFromUser";

const RoutesFromUser = () => {
  const { t } = useTranslation(['myRoutes']);
  const [ myRoutesCard, setMethods, selectMethods ] = useRoutesFromUser();

  return <RoutesList title={ t("main.my routes") } card={ myRoutesCard }
    hook={ useRoutesProvider } thunk={ getMyRoutes } setMethods={ setMethods }
    selectMethods={ selectMethods }/>;
}

export default RoutesFromUser;