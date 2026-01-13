import * as React from "react";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useTranslation } from "react-i18next";
import StepRouteCreation from "../../features/routeCreation/StepRouteCreation/StepRouteCreation";
import { useDispatch } from "react-redux";
import { cleanRoute } from "../../features/routeCreation/store/slices/routeSlice";

const RouteCreation = () => {
  const { t } = useTranslation(["routeCreation"])
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => { 
      dispatch(cleanRoute());
    }
  }, [dispatch]);

  return (<>
    <Header />
    <main className="sm:w-[90%] m-auto min-h-[80vh]">
      <h1>{ t("main.live route creation") }</h1>
      <StepRouteCreation />      
    </main>
    <Footer />
  </>);
}

export default RouteCreation;