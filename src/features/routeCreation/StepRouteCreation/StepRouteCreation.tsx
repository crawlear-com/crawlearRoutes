import StepProcess from "../../../components/StepProcess/StepProcess";
import GpxRecorder from "../GpxRecorder/GpxRecorder";
import RouteDataForm from "../RouteDataForm/RouteDataForm";
import { useTranslation } from "react-i18next";

import routeDescriptions from './stepDescriptions.json';
import { selectStep1IsFinished, selectStep2IsFinished } from "../store/selectors/routeSelectors";

const StepRouteCreation = () => {
  const { t } = useTranslation(["routeCreation"]);
  const steps = [
    <GpxRecorder />,
    <RouteDataForm />,
  ];
  const stepsSelectors = [ selectStep1IsFinished ,selectStep2IsFinished ];
  const stepTitles = [ t("main.gpx creation"), t("main.route data")];

  return <>
    <StepProcess steps={ steps } stepsSelectors={ stepsSelectors }
      stepTitles={ stepTitles } stepDescriptions={ routeDescriptions } />
  </>
}

export default StepRouteCreation;