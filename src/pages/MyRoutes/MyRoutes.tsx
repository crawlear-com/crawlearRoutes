import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RoutesFromUser from "../../features/routes/RoutesFromUser/RoutesFromUser";
import LikesFromUser from "../../features/routes/LikesFromUser/LikesFromUser";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import MapPointPicker from "../../features/maps/MapPointPicker";

const MyRoutes = () => {
  return (<>
    <Header />
    <div className="flex mx-0 sm:mx-10 sm:mt-20 mb-10 flex-col sm:flex-row gap-5">
      <MapPointPicker className="w-full h-96 sm:h-full"></MapPointPicker>
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