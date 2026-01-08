import StepProcess from "../../../components/StepProcess/StepProcess";
import GpxRecorder from "../GpxRecorder/GpxRecorder";
import RouteDataForm from "../RouteDataForm/RouteDataForm";
import { useTranslation } from "react-i18next";

import routeDescriptions from './stepDescriptions.json';

const StepRouteCreation = () => {
  const { t } = useTranslation(["routeCreation"]);
  const steps = [
    <GpxRecorder />,
    <RouteDataForm />,
  ];

  return <>
    { t("main.route creation description") }
    <StepProcess steps={ steps } stepDescriptions={ routeDescriptions } />
  </>
}

export default StepRouteCreation;