import StepProcess from "../../../components/StepProcess/StepProcess";
import GpxRecorder from "../GpxRecorder/GpxRecorder";
import RouteDataForm from "../RouteDataForm/RouteDataForm";
import { useTranslation } from "react-i18next";

import routeDescriptions from './stepDescriptions.json';
import { selectStep1IsFinished, selectStep2IsFinished } from "../store/selectors/routeSelectors";
import { createRoute, modifyRoute } from "../../../database/routesCreationRpc";
import { useSelector } from "react-redux";
import { selectUserUUID } from "../../users/store/selectors/userSelectors";

type StepRouteCreationProps = {
  rid?: string
}

const StepRouteCreation = ({ rid }: StepRouteCreationProps) => {
  const owner = useSelector(selectUserUUID);
  let action = modifyRoute;
  let id = rid;
  const { t } = useTranslation(["routeCreation"]);
  const steps = [
    <GpxRecorder />
    //,
  ];
  const stepsSelectors = [ selectStep1IsFinished ,selectStep2IsFinished ];
  const stepTitles = [ t("main.gpx creation"), t("main.route data")];

  if (!rid) {
    action = createRoute;
    id = owner;
  }

  steps.push(<RouteDataForm action={ action } id= { id! } />)

  return <>
    <StepProcess steps={ steps } stepsSelectors={ stepsSelectors }
      stepTitles={ stepTitles } stepDescriptions={ routeDescriptions } />
  </>
}

export default StepRouteCreation;