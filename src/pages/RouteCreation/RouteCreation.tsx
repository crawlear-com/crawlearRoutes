import * as React from "react";
import { useTranslation } from "react-i18next";
import StepRouteCreation from "@/features/routeCreation/StepRouteCreation/StepRouteCreation";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadRoute, setAction, setEventId, setRouteId } from "@/features/routeCreation/store/slices/routeSlice";
import type { AppDispatch } from "@/store/store";
import { selectIsLoading } from "@/features/routeCreation/store/selectors/routeSelectors";
import Spinner from "@/components/ui/Spinner/Spinner";
import { CREATE_ACTION, UPDATE_ACTION } from "@/helpers/utils";
import MainLayout from "@/layouts/MainLayout";

const RouteCreation = () => {
  const { t } = useTranslation(["routeCreation"]);
  const rid = useParams().rid;
  const eid = useParams().eid;
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);

  React.useEffect(() => {
    if (eid) {
      dispatch(setEventId(eid));
      dispatch(setAction(CREATE_ACTION));
    }

    if (rid) {
      dispatch(setRouteId(rid));
      dispatch(setAction(UPDATE_ACTION))
      dispatch(loadRoute(rid));
    }
  }, [rid, eid, dispatch]);

  return (
    <MainLayout contentClassName="w-[90%] m-auto min-h-[80vh] mt-10"><>
      <h1 className="text-right mb-5">{ rid ? t("main.route update") : eid ? t("main.route creation for event") : t("main.route creation") }</h1>
      { isLoading ? <Spinner /> : <StepRouteCreation /> }</>
    </MainLayout>);
}

export default RouteCreation;