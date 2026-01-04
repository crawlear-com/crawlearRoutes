import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RoutesFromUser from "../../features/routes/RoutesFromUser/RoutesFromUser";
import LikesFromUser from "../../features/routes/LikesFromUser/LikesFromUser";
//import SimpleMap from "../../features/maps/SimpleMap/SimpleMap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import GpxRouteMap from "../../features/maps/GpxRouteMap/GpxRouteMap";
import type { GeoPoint } from "../../types/Route.types";

//<SimpleMap id="Search" point={{lat: 0, lon: 0}} className="w-full sm:w-[50%]" height="h-96 sm:h-full" />

const MyRoutes = () => {
  const onFileLoaded = (fileContent: string, routePoint: GeoPoint) => {
    console.log(fileContent);
    console.log(routePoint);
  }

  return (<>
    <Header />
    <div className="flex mx-0 sm:mx-10 sm:mt-20 mb-10 flex-col sm:flex-row gap-5">
      <GpxRouteMap className="w-full h-96 sm:h-[80%]"
        onFileResolved={ onFileLoaded} 
        onRouteRecorded={onFileLoaded} />
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