import { useTranslation } from "react-i18next";
import { getMyRoutes } from "../store/slices/routeListsSlice";
import useRoutesFromUser from "./hooks/useRoutesFromUser";
import ItemsList from "@/components/ItemsList/ItemsList";
import type { Route } from "@/types/Route.types";

const RoutesFromUser = () => {
  const { t } = useTranslation(['myRoutes']);
  const [ myRoutesCard, setMethods, selectMethods ] = useRoutesFromUser();

  return <div className="text-right px-0 pt-10 self-start">
    <ItemsList<Route> title={ t("main.my routes")} card={ myRoutesCard }
      getDataAsyncThunk={ getMyRoutes } setMethods={setMethods} selectMethods={selectMethods} />
  </div>
}

export default RoutesFromUser;