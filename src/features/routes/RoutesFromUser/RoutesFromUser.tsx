import useRoutesProvider from "../hooks/useRoutesProvider";
import { useTranslation } from "react-i18next";
import { getMyRoutes } from "../store/slices/routeListsSlice";
import useRoutesFromUser from "./hooks/useRoutesFromUser";
import ItemsList from "@/components/ItemsList/ItemsList";
import type { Route } from "@/types/Route.types";

const RoutesFromUser = () => {
  const { t } = useTranslation(['myRoutes']);
  const [ myRoutesCard, setMethods, selectMethods ] = useRoutesFromUser();

  return <div className="card flex-1 container text-right p-10 self-start">
    <ItemsList<Route> title={ t("main.my routes")} card={ myRoutesCard}
      thunk={ getMyRoutes } setMethods={setMethods} selectMethods={selectMethods} 
      hook={ useRoutesProvider } />
  </div>
}


export default RoutesFromUser;