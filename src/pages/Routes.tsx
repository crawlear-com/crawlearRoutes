import { createHashRouter } from "react-router";
import Landing from "./Landing/Landing";
import Login from "./Login/Login";
import Register from "./Register/Register";
import NotFound404 from "./NotFound404/NotFound404";
import MyRoutes from "./MyRoutes/MyRoutes";

const router = createHashRouter([{
  path: "/",
  element: <Landing />
},{
  path: "/login",
  element: <Login />
},{
  path: "/register",
  element: <Register />
},{
  path: "/myroutes",
  element: <MyRoutes />
},{
  path: "*",
  element: <NotFound404 />
}]);

export default router;