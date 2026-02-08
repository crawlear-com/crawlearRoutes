import { HashRouter, Route, Routes } from "react-router";
import Landing from "@/application/pages/Landing/Landing";
import MyRoutes from "@/application/pages/MyRoutes/MyRoutes";
import { PrivateRoute } from "@/application/components/PrivateRoute/PrivateRoute";
import Login from "@/application/pages/Login/Login";
import Register from "@/application/pages/Register/Register";
import NotFound404 from "@/application/pages/NotFound404/NotFound404";
import RouteCreation from "@/application/pages/RouteCreation/RouteCreation";
import RoutePage from "@/application/pages/Route/Route";
import SearchRoute from "@/application/pages/SearchRoute/SearchRoute";
import EventPage from "@/application/pages/Event/Event";
import RouteEventCreation from "@/application/pages/RouteEventCreation/RouteEventCreation";
import MyEvents from "@/application/pages/MyEvents/MyEvents";

const MainHashRouter = () => {
  return <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<PrivateRoute />}>
            <Route path="/myroutes" element={<MyRoutes />} />
            <Route path="/myevents" element={<MyEvents />} />
            <Route path="/route" element={ <RouteCreation />} />
            <Route path="/route/:rid" element={ <RouteCreation />} />
            <Route path="/routeforevent/:eid" element={ <RouteCreation />} />
            <Route path="/search" element={ <SearchRoute />} />
            <Route path="/event/:date/:id" element={ <RouteEventCreation />} />
            <Route path="/event/:date" element={ <RouteEventCreation />} />
            <Route path="/showevent/:id" element={<EventPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/showroute/:id" element={<RoutePage />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </HashRouter>
}

export default MainHashRouter;