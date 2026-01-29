import { useTranslation } from "react-i18next";
import { getMyFavourites } from "../store/slices/routeListsSlice";
import useLikesFromUser from "./hooks/useLikesFromUser";
import ItemsList from "@/components/ItemsList/ItemsList";
import type { Route } from "@/types/Route.types";

const LikesFromUser = () => {
  const { t } = useTranslation(['myRoutes']);
  const [ myRoutesCard, setMethods, selectMethods ] = useLikesFromUser();

  return <div className="card flex-1 container text-right sm:p-10 self-start z-10">
    <ItemsList<Route> title={ t("main.favourite routes") } card={ myRoutesCard }
    getDataAsyncThunk={ getMyFavourites } setMethods={ setMethods }
    selectMethods={ selectMethods }/>
  </div>
}

export default LikesFromUser;