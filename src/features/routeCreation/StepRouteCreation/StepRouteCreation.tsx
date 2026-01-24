import StepProcess from "@/components/StepProcess/StepProcess";
import GpxRecorder from "../GpxRecorder/GpxRecorder";
import RouteDataForm from "../RouteDataForm/RouteDataForm";
import { selectStep1IsFinished, selectStep2IsFinished } from "../store/selectors/routeSelectors";
import routeDescriptions from './stepDescriptions.json';
import routeTitles from './stepTitles.json';

const StepRouteCreation = () => {
  const steps = [
    <GpxRecorder />,
    <RouteDataForm />,
  ];
  const stepsSelectors = [ selectStep1IsFinished ,selectStep2IsFinished ];

  return <>
    <StepProcess steps={ steps } stepsSelectors={ stepsSelectors }
      stepTitles={ routeTitles } stepDescriptions={ routeDescriptions } />
  </>
}

export default StepRouteCreation;