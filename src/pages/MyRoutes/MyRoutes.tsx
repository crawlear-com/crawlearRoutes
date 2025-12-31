import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useGuard from "../../hooks/useGuard";
import RoutesFromUser from "../../features/routes/RoutesFromUser/RoutesFromUser";
import LikesFromUser from "../../features/routes/LikesFromUser/LikesFromUser";

const MyRoutes = () => {
  useGuard();
  
  return (<main>
    <Header />
    <RoutesFromUser />
    <LikesFromUser />
    <Footer />
  </main>);
}

export default MyRoutes;