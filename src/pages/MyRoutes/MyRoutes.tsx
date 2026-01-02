import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useGuard from "../../hooks/useGuard";
import RoutesFromUser from "../../features/routes/RoutesFromUser/RoutesFromUser";
import LikesFromUser from "../../features/routes/LikesFromUser/LikesFromUser";
import SimpleMap from "../../features/maps/SimpleMap/SimpleMap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const MyRoutes = () => {
  useGuard();
  
  return (<>
    <Header />
    <div className="flex mx-0 sm:mx-10 sm:mt-20 mb-10 flex-col sm:flex-row gap-5">
      <SimpleMap id="Search" point={{lat: 0, lon: 0}} className="w-full sm:w-[50%]" height="h-96 sm:h-full" />
      <div className="w-full sm:w-[50%] px-2 sm:px-0"><FullCalendar plugins={[ dayGridPlugin ]} initialView="dayGridMonth" /></div>
    </div>
    <div className="flex mx-5 sm:mx-10 sm:mt-20 mb-10 flex-col lg:flex-row gap-5">
      <RoutesFromUser />
      <LikesFromUser />
    </div>
    <Footer />
  </>);
}

export default MyRoutes;