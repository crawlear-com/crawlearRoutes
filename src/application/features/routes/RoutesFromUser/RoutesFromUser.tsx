import { useTranslation } from "react-i18next";
import useRoutesFromUser from "./hooks/useRoutesFromUser";
import ItemsList from "@/application/components/ItemsList/ItemsList";
import type { Route } from "@/domain/Route.types";
import ItemListContainer2 from "@/application/components/ItemsList/ItemListContainer2";
import SupabaseRouteRepository from "@/infrastructure/Repository/RouteRepository/SupabaseRouteRepository";
import RouteDataProvider from "@/infrastructure/DataProvider/RouteDataProvider/RouteDataProvider";
import { selectUserUUID } from "../../users/store/selectors/userSelectors";
import { useSelector } from "react-redux";

const repository = new SupabaseRouteRepository();
const provider = new RouteDataProvider(repository);

const RoutesFromUser = () => {
  const { t } = useTranslation(['myRoutes']);
  const [ myRoutesCard ] = useRoutesFromUser();
  const owner = useSelector(selectUserUUID);

  return <div className="text-right px-0 pt-10 self-start">
    <ItemListContainer2<Route> owner={ owner } getItems={ provider.getMyRoutesPaginated.bind(provider) }>
      <ItemsList<Route> card={ myRoutesCard }>
        <h1 className="mr-3 inline-block mb-4">{ t("main.my routes")}</h1>
      </ItemsList> 
    </ItemListContainer2>
  </div>
}

export default RoutesFromUser;