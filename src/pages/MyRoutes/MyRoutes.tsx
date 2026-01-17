import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RoutesFromUser from "../../features/routes/RoutesFromUser/RoutesFromUser";
import LikesFromUser from "../../features/routes/LikesFromUser/LikesFromUser";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as React from "react";
import { cleanSearchResultsAndQuery } from "../../features/maps/store/slices/routeSearchSlice";
import UserStatistics from "../../features/statistics/UserStatistics/UserStatistics";

const MyRoutes = () => {
  const { t } = useTranslation(["myRoutes"]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(cleanSearchResultsAndQuery());
  }, [dispatch]);

  return (<>
    <Header />
    <main>
      <div className="mx-0 sm:mx-10 mt-10 sm:mt-20 mb-10">
        <div className="w-full px-2 sm:px-0">
          <FullCalendar plugins={[ dayGridPlugin ]} initialView="dayGridMonth" />
        </div>
      </div>
      <UserStatistics />
      <NavLink to="/record" className="mt-10 p-3 text-xl button-primary w-auto inline-block">{ t("main.create route") }</NavLink>
      <div className="flex mx-5 sm:mx-10 sm:mt-30 mb-10 flex-col lg:flex-row gap-5">
        <RoutesFromUser />
        <LikesFromUser />
      </div>
    </main>
    <Footer />
  </>);
}

export default MyRoutes;