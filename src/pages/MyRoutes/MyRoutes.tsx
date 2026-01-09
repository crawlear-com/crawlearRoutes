import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RoutesFromUser from "../../features/routes/RoutesFromUser/RoutesFromUser";
import LikesFromUser from "../../features/routes/LikesFromUser/LikesFromUser";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import SearchRoute from "../../features/maps/SearchRoute/SearchRoute";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

const MyRoutes = () => {
  const { t } = useTranslation(["myRoutes"]);
  return (<>
    <Header />
    <main>
      <NavLink to="/record" className="sm:mt-10 p-3 text-xl button-primary w-auto inline-block">{ t("main.create route") }</NavLink>
      <div className="flex mx-0 sm:mx-10 mt-10 sm:mt-20 mb-10 flex-col sm:flex-row gap-5">
        <SearchRoute />
        <div className="w-full sm:w-[50%] px-2 sm:px-0"><FullCalendar plugins={[ dayGridPlugin ]} initialView="dayGridMonth" /></div>
      </div>
      <div className="flex mx-5 sm:mx-10 sm:mt-30 mb-10 flex-col lg:flex-row gap-5">
        <RoutesFromUser />
        <LikesFromUser />
      </div>
    </main>
    <Footer />
  </>);
}

export default MyRoutes;