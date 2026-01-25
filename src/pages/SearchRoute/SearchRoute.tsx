import PageTitle from "@/components/ui/PageTitle/PageTitle";
import SearchRouteMap from "@/features/maps/SearchRouteMap/SearchRouteMap";
import MainLayout from "@/layouts/MainLayout";
import { useTranslation } from "react-i18next";

import "./styles/searchRoute.css";

const SearchRoute = () => {
  const { t } = useTranslation("myRoutes");
  return (
    <MainLayout contentClassName="">
      <><PageTitle background="search--backgroud p-10">
        <h1 className="sm:flex-5/6 text-right text-secondary w-full sm:mr-5">{ t("search.search routes") }</h1>
      </PageTitle>
      <SearchRouteMap />
      </>
    </MainLayout>);
}

export default SearchRoute;