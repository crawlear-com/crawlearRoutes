import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useGuard from "../../hooks/useGuard";
import RoutesList from "../../features/routes/RoutesList/RoutesList";
import type { Route } from "../../types/Route.types";
import RouteCard from "../../features/routes/RouteCard/RouteCard";
import useMyRoutes from "../../features/routes/RoutesList/hooks/useMyRoutes";
import useMyLikedRoutes from "../../features/routes/RoutesList/hooks/useMyLikedRoutes";

const MyRoutes = () => {
  const myRoutesCard = (route: Route) => <RouteCard route={ route } />;
  const [ totalMyRoutes, myRoutes ] = useMyRoutes();
  const [ likedRoutes ] = useMyLikedRoutes();
  useGuard();
  
  return (<main>
    <Header />
    <h1 className="mr-3 mt-15 inline">My routes</h1><button className="text-xl button-primary w-auto px-2 inline">+</button>
    <RoutesList card={ myRoutesCard } totalRoutes={ totalMyRoutes} routes={ myRoutes } />
    
    <h1 className="mr-3">Favourite routes</h1>
    <RoutesList card={ myRoutesCard } totalRoutes={ 0 } routes={ likedRoutes } />
    <Footer />
  </main>);
}

export default MyRoutes;