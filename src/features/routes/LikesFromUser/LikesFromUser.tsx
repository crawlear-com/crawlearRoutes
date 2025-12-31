import useGuard from "../../../hooks/useGuard";
import type { Route } from "../../../types/Route.types";
import RouteCard from "../RouteCard/RouteCard";
import RoutesList from "../RoutesList/RoutesList";
import useMyLikedRoutes from "./hooks/useMyLikedRoutes";

const LikesFromUser = () => {
  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } />;
  const [ likedRoutes ] = useMyLikedRoutes();
  useGuard();
  
  return (<>
    <h1 className="mr-3">Favourite routes</h1>
    <RoutesList card={ myRoutesCard } totalRoutes={ 0 } routes={ likedRoutes } />
    </>);
}

export default LikesFromUser;