import RoutesFromUser from "@/features/routes/RoutesFromUser/RoutesFromUser";
import LikesFromUser from "@/features/routes/LikesFromUser/LikesFromUser";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as React from "react";
import { cleanSearchResultsAndQuery } from "@/features/maps/store/slices/routeSearchSlice";
import UserRouteStatistics from "@/features/statistics/RouteStatistics/UserRouteStatistics";
import PageTitle from "@/components/ui/PageTitle/PageTitle";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MainLayout from "@/layouts/MainLayout";

import "./styles/myRoutes.css";
import 'react-tabs/style/react-tabs.css';

const MyRoutes = () => {
  const { t } = useTranslation(["myRoutes"]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(cleanSearchResultsAndQuery());
  }, [dispatch]);

  return (<MainLayout><>
    <PageTitle background="myroutes--backgroud p-5">
      <>
        <h1 className="lg:flex-5/6 sm:flex-4/6 text-right text-white mr-5">{ t("main.my routes") }</h1>
        <NavLink to="/route" className="max-w-40 flex-1/2 sm:flex-2/6 lg:flex-1/6 p-3 text-xl button-primary text-center my-auto">
          { t("main.create route") }
        </NavLink>
      </>
    </PageTitle>

    <div className="flex mx-5 sm:mx-10 mb-10 flex-col lg:flex-row gap-5">
      <UserRouteStatistics />
      <Tabs className="z-10 container card">
        <TabList className="z-10 border-b border-primary">
          <Tab><b>{ t("main.my routes") }</b></Tab>
          <Tab><b>{ t("main.favourite routes") }</b></Tab>
        </TabList>

        <TabPanel className="">
          <RoutesFromUser />
        </TabPanel>
        <TabPanel className="">
          <LikesFromUser />
        </TabPanel>
      </Tabs>
    </div>
    </>
  </MainLayout>);
}

export default MyRoutes;