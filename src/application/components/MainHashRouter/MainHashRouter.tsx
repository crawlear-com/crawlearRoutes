import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from "react-router";

const MyRoutes = lazy(() => import("@/application/pages/MyRoutes/MyRoutes"));
import { PrivateRoute } from "@/application/components/PrivateRoute/PrivateRoute";
import Spinner from '../ui/Spinner/Spinner';
const Login = lazy(() => import("@/application/pages/Login/Login"));
const Register = lazy(() => import("@/application/pages/Register/Register"));
const NotFound404 = lazy(() => import("@/application/pages/NotFound404/NotFound404"));
const RouteCreation = lazy(() => import("@/application/pages/RouteCreation/RouteCreation"));
const RoutePage = lazy(() => import("@/application/pages/Route/Route"));
const SearchRoute = lazy(() => import("@/application/pages/SearchRoute/SearchRoute"));
const EventPage = lazy(() => import("@/application/pages/Event/Event"));
const RouteEventCreation = lazy(() => import("@/application/pages/RouteEventCreation/RouteEventCreation"));
const MyEvents = lazy(() => import("@/application/pages/MyEvents/MyEvents"));

const Landing = lazy(() => import ("@/application/pages/Landing/Landing"));

const MainHashRouter = () => {
  return <HashRouter>
        <Routes>
          <Route path="/" element={<Suspense fallback={<Spinner />}><Landing /></Suspense>} />
          <Route element={<PrivateRoute />}>
            <Route path="/myroutes" element={<Suspense fallback={<Spinner />}><MyRoutes /></Suspense>} />
            <Route path="/myevents" element={<Suspense fallback={<Spinner />}><MyEvents /></Suspense>} />
            <Route path="/route" element={<Suspense fallback={<Spinner />}><RouteCreation /></Suspense>} />
            <Route path="/route/:rid" element={<Suspense fallback={<Spinner />}><RouteCreation /></Suspense>} />
            <Route path="/routeforevent/:eid" element={<Suspense fallback={<Spinner />}><RouteCreation /></Suspense>} />
            <Route path="/search" element={<Suspense fallback={<Spinner />}><SearchRoute /></Suspense>} />
            <Route path="/event/:date/:id" element={<Suspense fallback={<Spinner />}><RouteEventCreation /></Suspense>} />
            <Route path="/event/:date" element={<Suspense fallback={<Spinner />}><RouteEventCreation /></Suspense>} />
            <Route path="/showevent/:id" element={<Suspense fallback={<Spinner />}><EventPage /></Suspense>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/showroute/:id" element={<RoutePage />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </HashRouter>
}

export default MainHashRouter;