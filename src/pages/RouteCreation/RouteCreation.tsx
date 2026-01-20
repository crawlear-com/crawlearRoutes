import * as React from "react";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useTranslation } from "react-i18next";
import StepRouteCreation from "../../features/routeCreation/StepRouteCreation/StepRouteCreation";
import { useDispatch, useSelector } from "react-redux";
//import { cleanRoute } from "../../features/routeCreation/store/slices/routeSlice";
import { useParams } from "react-router";
import { cleanRoute, loadRoute, setAction, setRouteId } from "../../features/routeCreation/store/slices/routeSlice";
import type { AppDispatch } from "../../store/store";
import { selectIsLoading } from "../../features/routeCreation/store/selectors/routeSelectors";
import Spinner from "../../components/Spinner/Spinner";
import { CREATE_ACTION, UPDATE_ACTION } from "../../helpers/utils";


const RouteCreation = () => {
  const { t } = useTranslation(["routeCreation"]);
  const rid = useParams().id;
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);

  React.useEffect(() => {
    if (rid) {
      dispatch(setRouteId(rid));
      dispatch(setAction(UPDATE_ACTION))
      dispatch(loadRoute(rid));
    } else {
      dispatch(cleanRoute());
      dispatch(setAction(CREATE_ACTION))
    }
  }, [rid, dispatch]);

  return (<>
    <Header />
    <main className="sm:w-[90%] m-auto min-h-[80vh] mt-10">
      <h1>{ rid ? t("main.route update") : t("main.live route creation") }</h1>
      { isLoading ? <Spinner /> : <StepRouteCreation /> }
    </main>
    <Footer />
  </>);
}

export default RouteCreation;