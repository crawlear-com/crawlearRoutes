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
  
  return (<main className="">
    <Header />
    <div className="flex w-full mx-10 mt-20 mb-10">
      <SimpleMap id="Search" point={{lat: 0, lon: 0}} className="mx-5" width="w-sm" height="h-96" />
      <div className="w-sm"><FullCalendar plugins={[ dayGridPlugin ]} initialView="dayGridMonth" /></div>
    </div>
    <RoutesFromUser />
    <LikesFromUser />
    <Footer />
  </main>);
}

export default MyRoutes;