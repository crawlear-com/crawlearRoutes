import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useGuard from "../../hooks/useGuard";
import RoutesFromUser from "../../features/routes/RoutesFromUser/RoutesFromUser";
import LikesFromUser from "../../features/routes/LikesFromUser/LikesFromUser";
import SimpleMap from "../../features/maps/SimpleMap/SimpleMap";

const MyRoutes = () => {
  useGuard();
  
  return (<main className="">
    <Header />
    <SimpleMap id="Search" point={{lat: 0, lon: 0}} className="mx-5" width="w-full" height="h-96" />
    <RoutesFromUser />
    <LikesFromUser />
    <Footer />
  </main>);
}

export default MyRoutes;