import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useGuard from "../../hooks/useGuard";
import RoutesList from "../../features/routes/RoutesList/RoutesList";
import type { Route } from "../../types/Route.types";
import RouteCard from "../../features/routes/RouteCard/RouteCard";
import useMyRoutes from "../../features/routes/RoutesList/hooks/useMyRoutes";

const MyRoutes = () => {
  const myRoutesCard = (route: Route) => <RouteCard route={ route } />;
  const [ totalMyRoutes, myRoutes ] = useMyRoutes();
  useGuard();
  
  return (<main>
    <Header />
    <h1 className="inline mr-3">Routes</h1><button className="text-xl button-primary w-auto p-2 inline">+</button>
    <RoutesList card={ myRoutesCard } totalRoutes={ totalMyRoutes} routes={ myRoutes } />
    <Footer />
  </main>);
}

export default MyRoutes;