import { useTranslation } from "react-i18next";
import FormFeedbackElement from "../../../components/FormFeedbackElement/FormFeedbackElement";
import useRouteEventsDataForm from "./hooks/useRouteEventsDataForm";
import { setAndValidate } from "../../../helpers/formValidations";
import { descriptionSchema, nameSchema } from "./helpers/validation";
import type { RouteEvent } from "../../../types/RouteEvent.types";
import Spinner from "../../../components/Spinner/Spinner";

type EventsDataFormProps = {
  routeEvent?: RouteEvent,
  date: Date
}


const generateHoursOptions = () => {
  const options = [];

  for (let hour = 0; hour < 24; hour++) {
    const hourString = hour.toString().padStart(2, '0') + ':00h';
    const halfString = hour.toString().padStart(2, '0') + ':30h';
    options.push(<option key={ hourString } value={ hourString }>{ hourString }</option>);
    options.push(<option key={ halfString } value={ halfString }>{ halfString }</option>);
  }

  return options;
}

const RouteEventsDataForm = ({ routeEvent, date }: EventsDataFormProps) => {
  const { t } = useTranslation(["eventsCreation"]);
  const [ name, description, isLoading, hour, routeOptions,
    onSubmitEventsForm, setName, setDescription, onHourChange ] = useRouteEventsDataForm(date, routeEvent);

  return <div>
    <form className="space-y-4 text-left m-auto w-4/5 sm:w-1/2" action={ onSubmitEventsForm } noValidate>
      <label htmlFor="routeName" className="block font-bold">
        * { t("main.event name")}:
      </label>
      <input type="text" name="routeName" id="routeName" 
        onChange={ () => { setAndValidate(setName, 'routeName', nameSchema) }}
        className="ml-1 mb-5 p-3 w-full" placeholder={`${t("main.event name")}...`} 
        value={ name } /><br />
      <FormFeedbackElement className="routeName__feedback" />

      <label htmlFor="routeDescription" className="align-top block font-bold">
        * { t("main.event description")}:
      </label>
      <textarea name="routeDescription" id="routeDescription"
        onChange={ () => { setAndValidate(setDescription, 'routeDescription', descriptionSchema) }}
        className="w-full sm:w-96 h-80 ml-1 mb-5 p-3" 
        placeholder={`${t("main.event name")}...`} value={ description } /><br />
      <FormFeedbackElement className="routeDescription__feedback" />

      <label className="align-top font-bold"> { t("main.event date") }: </label>
      <span>{ date.toLocaleDateString() }</span>
      <div className="font-bold">
        { t("main.event hour") } : 
        <select className="border border-primary rounded-xl p-2" 
          value={hour} onChange={ onHourChange }>
          { generateHoursOptions() }
        </select>
      </div>

      <div className="font-bold">
        { t("main.routes") } : 
        { isLoading ? <Spinner /> :
        <select className="border border-primary rounded-xl p-2">
          { routeOptions }
        </select> }
      </div>

      <button type="submit" className="button-primary m-auto" disabled={ isLoading }>
        { routeEvent ? t("main.event update") : t("main.event creation") }
      </button>
    </form>
  </div>
}

export default RouteEventsDataForm;