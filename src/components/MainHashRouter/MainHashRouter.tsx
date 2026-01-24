import { HashRouter, Route, Routes } from "react-router";
import Landing from "../../pages/Landing/Landing";
import MyRoutes from "../../pages/MyRoutes/MyRoutes";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import NotFound404 from "../../pages/NotFound404/NotFound404";
import RouteCreation from "../../pages/RouteCreation/RouteCreation";
import RoutePage from "../../pages/Route/Route";
import SearchRoute from "../../pages/SearchRoute/SearchRoute";
import EventPage from "../../pages/Event/Event";
import RouteEventCreation from "../../pages/RouteEventCreation/RouteEventCreation";
import ToydayEventRouteRecorder from "../../pages/ToydayEventRouteRecorder/ToydayEventRouteRecorder";

const MainHashRouter = () => {
  return <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<PrivateRoute />}>
            <Route path="/myroutes" element={<MyRoutes />} />
            <Route path="/route" element={ <RouteCreation />} />
            <Route path="/route/:id" element={ <RouteCreation />} />
            <Route path="/search" element={ <SearchRoute />} />
            <Route path="/event/:date/:id" element={ <RouteEventCreation />} />
            <Route path="/event/:date" element={ <RouteEventCreation />} />
            <Route path="/showevent/:id" element={<EventPage />} />
            <Route path="/todayevent/:id" element={ <ToydayEventRouteRecorder />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/showroute/:id" element={<RoutePage />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </HashRouter>
}

export default MainHashRouter;