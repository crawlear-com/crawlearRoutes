import { useTranslation } from "react-i18next";
import useLikesFromUser from "./hooks/useLikesFromUser";
import ItemsList from "@/application/components/ItemsList/ItemsList";
import type { Route } from "@/domain/Route.types";
import ItemListFavoriteRoutesReduxRespository from "@/infrastructure/Repository/ItemListFavoriteRoutesReduxRespository/ItemListFavoriteRoutesReduxRespository";
import ItemListContainer from "@/application/components/ItemsList/ItemListContainer";

const LikesFromUser = () => {
  const { t } = useTranslation(['myRoutes']);
  const [ myRoutesCard ] = useLikesFromUser();

  return <div className="text-right px-0 pt-10 self-start">
    <ItemListContainer<Route> repository={ ItemListFavoriteRoutesReduxRespository }>
      <ItemsList<Route>  card={ myRoutesCard }>
        <h1 className="mr-3 inline-block mb-4">{ t("main.favourite routes") }</h1>
      </ItemsList>
    </ItemListContainer>
  </div>
}

export default LikesFromUser;