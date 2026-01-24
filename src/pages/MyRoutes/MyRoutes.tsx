import RoutesFromUser from "@/features/routes/RoutesFromUser/RoutesFromUser";
import LikesFromUser from "@/features/routes/LikesFromUser/LikesFromUser";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as React from "react";
import { cleanSearchResultsAndQuery } from "@/features/maps/store/slices/routeSearchSlice";
import UserRouteStatistics from "@/features/statistics/RouteStatistics/UserRouteStatistics";
import MainLayout from "@/layouts/MainLayout";

const MyRoutes = () => {
  const { t } = useTranslation(["myRoutes"]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(cleanSearchResultsAndQuery());
  }, [dispatch]);

  return (<MainLayout><>
    <div className="text-right mr-10 mb-5 flex align-middle items-center h-15 my-0 gap-5">
      <h1 className="flex-5/6 text-right">Routes</h1>
      <NavLink to="/route" className="flex-1/6 p-3 text-xl button-primary text-center">
        { t("main.create route") }
      </NavLink>

    </div>
    <div className="flex mx-5 sm:mx-10 mb-10 flex-col lg:flex-row gap-5">
      <UserRouteStatistics />
      <RoutesFromUser />
      <LikesFromUser />
    </div>
    </>
  </MainLayout>);
}

export default MyRoutes;