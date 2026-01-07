import { HashRouter, Route, Routes } from "react-router";
import Landing from "../../pages/Landing/Landing";
import MyRoutes from "../../pages/MyRoutes/MyRoutes";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import NotFound404 from "../../pages/NotFound404/NotFound404";
import RecordRoute from "../../pages/RecordRoute/RecordRoute";

const MainHashRouter = () => {
  return <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<PrivateRoute />}>
            <Route path="/myroutes" element={<MyRoutes />} />
            <Route path="/record" element={ <RecordRoute />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </HashRouter>
}

export default MainHashRouter;