import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as React from "react";
import { cleanSearchResultsAndQuery } from "@/features/maps/store/slices/routeSearchSlice";
import EventsCalendar from "@/features/events/EventsCalendar/EventsCalendar";
import EventsFromUser from "@/features/events/EventsFromUser/EventsFromUser";
import TodayEvents from "@/features/events/TodayEvents/TodayEvents";
import MainLayout from "@/layouts/MainLayout";
import UserEventsStatistics from "@/features/statistics/EventsStatistics/UserEventsStatistics";
import PageTitle from "@/components/ui/PageTitle/PageTitle";

import "./styles/myEvents.css";
import EventsNearYou from "@/features/events/EventsNearYou/EventsNearYou";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const MyRoutes = () => {
  const { t } = useTranslation(["myEvents"]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(cleanSearchResultsAndQuery());
  }, [dispatch]);

  return (<MainLayout><>
    <PageTitle background="myevents--backgroud p-10">
      <h1 className="sm:flex-5/6 text-right text-white w-full">{ t("main.my events") }</h1>
    </PageTitle>
    
    <div className="flex mx-5 sm:mx-10 flex-col lg:flex-row gap-5">
      <UserEventsStatistics />
      <Tabs className="z-10 container card self-start" selectedTabClassName="tab--selected">
        <TabList className="z-10 border-b border-primary mb-10">
          <Tab><b>{ t("main.today events") }</b></Tab>
          <Tab><b>{ t("main.events near you") }</b></Tab>
          <Tab><b>{ t("main.my events") }</b></Tab>
          <Tab><b>{ t("main.events calendary") }</b></Tab>
        </TabList>

        <TabPanel className="">
          <TodayEvents />
        </TabPanel>
        <TabPanel className="">
          <EventsNearYou />
        </TabPanel>
        <TabPanel className="">
          <EventsFromUser />
        </TabPanel>
        <TabPanel>
          <EventsCalendar />
        </TabPanel>
      </Tabs>
    </div>
    </>
  </MainLayout>);
}

export default MyRoutes;