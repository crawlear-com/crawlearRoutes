import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as React from "react";
import { cleanSearchResultsAndQuery } from "@/features/maps/store/slices/routeSearchSlice";
import EventsCalendar from "@/features/events/EventsCalendar/EventsCalendar";
import EventsFromUser from "@/features/events/EventsFromUser/EventsFromUser";
import TodayEvents from "@/features/events/TodayEvents/TodayEvents";
import MainLayout from "@/layouts/MainLayout";
import UserEventsStatistics from "@/features/statistics/EventsStatistics/UserEventsStatistics";

const MyRoutes = () => {
  const { t } = useTranslation(["myEvents"]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(cleanSearchResultsAndQuery());
  }, [dispatch]);

  return (<MainLayout><>
    <h1 className="text-right mr-10 my-10">{ t("main.my events") }</h1>
    <div className="flex mx-5 sm:mx-10 mb-10 flex-col lg:flex-row gap-5">
      <div>
        <TodayEvents />
        <UserEventsStatistics />
      </div>
      <EventsFromUser />
      <EventsCalendar />
    </div>
    </>
  </MainLayout>);
}

export default MyRoutes;