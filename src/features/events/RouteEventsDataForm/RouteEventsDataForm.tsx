import { useTranslation } from "react-i18next";
import FormFeedbackElement from "../../../components/FormFeedbackElement/FormFeedbackElement";
import useRouteEventsDataForm from "./hooks/useRouteEventsDataForm";
import { setAndValidate } from "../../../helpers/formValidations";
import { descriptionSchema, nameSchema } from "./helpers/validation";
import type { RouteEvent } from "../../../types/RouteEvent.types";

type EventsDataFormProps = {
  routeEvent?: RouteEvent,
  date: Date
}

const RouteEventsDataForm = ({ routeEvent, date }: EventsDataFormProps) => {
  const { t } = useTranslation(["eventsCreation"]);
  const [ name, description, isLoading, routeOptions, onSubmitEventsForm, setName, setDescription ] = useRouteEventsDataForm(routeEvent);

  return <div>
    <form className="space-y-4 text-left m-auto w-4/5 sm:w-1/2" action={ onSubmitEventsForm } noValidate>
      <label htmlFor="routeName" className="block font-bold">
        * { t("main.event name")}:
      </label>
      <input type="text" name="routeName" id="routeName" 
        onChange={ () => { setAndValidate(setName, 'routeName', nameSchema) }}
        className="ml-1 mb-5 p-3 w-full" placeholder={`${t("main.event name")}...`} value={ name } /> <br />
      <FormFeedbackElement className="routeName__feedback" />

      <label htmlFor="routeDescription" className="align-top block font-bold">
        * { t("main.event description")}:
      </label>
      <textarea name="routeDescription" id="routeDescription"
        onChange={ () => { setAndValidate(setDescription, 'routeDescription', descriptionSchema) }}
        className="w-full sm:w-96 h-80 ml-1 mb-5 p-3" placeholder={`${t("main.event name")}...`} value={ description } /> <br />
      <FormFeedbackElement className="routeDescription__feedback" />

      <label className="align-top font-bold"> { t("main.event date") }: </label>
      <span>{ date.toLocaleDateString() }</span>
      <div className="font-bold">
        { t("main.event hour") } : <select className="border border-primary rounded-xl p-2">
          <option> 08:00h </option>
          <option> 09:00h </option>
        </select>
      </div>

      <div className="font-bold">
        { t("main.routes") } : <select className="border border-primary rounded-xl p-2">
          { routeOptions }
        </select>
      </div>

      <button type="submit" className="button-primary m-auto" disabled={ isLoading }> submit </button>
    </form>
  </div>
}

export default RouteEventsDataForm;