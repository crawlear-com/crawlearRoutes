import { useTranslation } from "react-i18next";
import FormFeedbackElement from "@/components/ui/FormFeedbackElement/FormFeedbackElement";
import useRouteEventsDataForm from "./hooks/useRouteEventsDataForm";
import { setAndValidate } from "@/helpers/formValidations";
import { descriptionSchema, nameSchema } from "./helpers/validation";
import type { RouteEvent } from "@/types/RouteEvent.types";
import Spinner from "@/components/ui/Spinner/Spinner";
import ScaleSelectOptions from "@/components/ui/ScaleSelectOptions/ScaleSelectOptions";
import { generateHoursOptions } from "./helpers/uiutils";

type EventsDataFormProps = {
  routeEvent?: RouteEvent,
  date: string
}

const RouteEventsDataForm = ({ routeEvent, date }: EventsDataFormProps) => {
  const { t } = useTranslation(["eventsCreation"]);
  const [ name, description, rid, isLoading, scale, hour, routeOptions,
    onSubmitEventsForm, setName, setDescription, onHourChange,
    onRouteChange, onScaleChange ] = useRouteEventsDataForm(date, routeEvent);

  return <div>
    <form className="space-y-4 text-left m-auto w-4/5 sm:w-1/2" action={ onSubmitEventsForm } noValidate>
      <label htmlFor="routeName" className="block font-bold">
        * { t("creation.event name")}:
      </label>
      <input type="text" name="routeName" id="routeName" 
        onChange={ () => { setAndValidate(setName, 'routeName', nameSchema) }}
        className="ml-1 mb-5 p-3 w-full rounded-xl" placeholder={`${t("creation.event name")}...`} 
        value={ name } /><br />
      <FormFeedbackElement className="routeName__feedback" />

      <label htmlFor="routeDescription" className="align-top block font-bold">
        * { t("creation.event description")}:
      </label>
      <textarea name="routeDescription" id="routeDescription"
        onChange={ () => { setAndValidate(setDescription, 'routeDescription', descriptionSchema) }}
        className="w-full h-80 ml-1 mb-5 p-3 rounded-xl" 
        placeholder={`${t("creation.event name")}...`} value={ description } /><br />
      <FormFeedbackElement className="routeDescription__feedback" />

      <label htmlFor="routeDate" className="align-top font-bold mr-2"> { t("creation.event date") }: </label>
      <span id="routeDate">{ new Date(date).toLocaleDateString() }</span><br />
      
      <label htmlFor="routeHour" className="font-bold mr-2"> { t("creation.event hour") } :</label>
      <select id="routeHour" name="routeHour" 
        className="border border-primary rounded-xl p-2 inline"
        value={hour} onChange={ onHourChange }>
        { generateHoursOptions() }
      </select><br />

      <label htmlFor="routeScale" className="font-bold mr-2"> { t("creation.scale") } :</label>
      <ScaleSelectOptions id="routeScale" value={ scale } 
        className="border border-primary rounded-xl p-2" onScaleChange={ onScaleChange } />

      <div className="font-bold">
        { t("creation.routes") } : 
        { isLoading ? <Spinner /> :
        <select className="border border-primary rounded-xl p-2 w-full" 
          value = { rid ? rid : '' } onChange={ onRouteChange }>
          { routeOptions }
        </select> }
      </div>

      <button type="submit" className="button-primary m-auto" disabled={ isLoading }>
        { routeEvent ? t("creation.event update") : t("creation.event creation") }
      </button>
    </form>
  </div>
}

export default RouteEventsDataForm;