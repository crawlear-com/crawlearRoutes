import { useTranslation } from "react-i18next";
import { getMyRoutes } from "../store/slices/routeListsSlice";
import useRoutesFromUser from "./hooks/useRoutesFromUser";
import ItemsList from "@/components/ItemsList/ItemsList";
import type { Route } from "@/types/Route.types";

const RoutesFromUser = () => {
  const { t } = useTranslation(['myRoutes']);
  const [ myRoutesCard, setMethods, selectMethods ] = useRoutesFromUser();

  return <div className="container card flex-1 container text-right sm:p-10 self-start z-10">
    <ItemsList<Route> title={ t("main.my routes")} card={ myRoutesCard}
      getDataAsyncThunk={ getMyRoutes } setMethods={setMethods} selectMethods={selectMethods} />
  </div>
}


export default RoutesFromUser;