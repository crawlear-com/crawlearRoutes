import PageTitle from "@/application/components/ui/PageTitle/PageTitle";
import SearchRouteMap from "@/application/features/maps/SearchRouteMap/SearchRouteMap";
import MainLayout from "@/application/pages/layouts/MainLayout";
import { useTranslation } from "react-i18next";

import "./styles/searchRoute.css";

const SearchRoute = () => {
  const { t } = useTranslation("myRoutes");
  return (
    <MainLayout>
      <><PageTitle background="search--backgroud p-10">
        <h1 className="flex-5/6 text-right text-white w-full">{ t("search.search routes") }</h1>
      </PageTitle>
      <SearchRouteMap />
      </>
    </MainLayout>);
}

export default SearchRoute;