import { HashRouter, Route, Routes } from "react-router";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { store } from "./store/store";
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Landing from "./pages/Landing/Landing";

import './App.css';
import { PrivateRoute } from "./features/routes/PrivateRoute/PrivateRoute";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MyRoutes from "./pages/MyRoutes/MyRoutes";
import NotFound404 from "./pages/NotFound404/NotFound404";

const App = () => {
  return (<ErrorBoundary fallback={ <p>There is a problem rendering the App. Please reload and try again.</p> }>
     <Provider store={store}>
      <div><Toaster /></div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<PrivateRoute />}>
            <Route path="/myroutes" element={<MyRoutes />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </HashRouter>
    </Provider>
  </ErrorBoundary>)
}

export default App
