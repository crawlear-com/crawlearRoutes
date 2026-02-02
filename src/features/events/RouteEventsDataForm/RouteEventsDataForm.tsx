import { useTranslation } from "react-i18next";
import FormFeedbackElement from "@/components/ui/FormFeedbackElement/FormFeedbackElement";
import useRouteEventsDataForm from "./hooks/useRouteEventsDataForm";
import { setAndValidate } from "@/helpers/formValidations";
import { descriptionSchema, nameSchema } from "./helpers/validation";
import Spinner from "@/components/ui/Spinner/Spinner";
import ScaleSelectOptions from "@/components/ui/ScaleSelectOptions/ScaleSelectOptions";
import { generateHoursOptions } from "./helpers/uiutils";
import type { EventsDataFormProps } from "./RouteEventsDataForm.types";
import MapPointPicker from "@/features/maps/MapPointPicker";
import { createMapPointFromGeoPoint } from "./helpers/utils";

const RouteEventsDataForm = ({ routeEvent, date }: EventsDataFormProps) => {
  const { t } = useTranslation(["eventsCreation"]);
  const [ name, description, rid, isLoading, scale, hour, routeOptions, point,
    onSubmitEventsForm, setName, setDescription, onHourChange,
    onRouteChange, onScaleChange, onMapClick ] = useRouteEventsDataForm(date, routeEvent);
  const mapPoint = point ? [createMapPointFromGeoPoint(point, t("main.location"))] : undefined;

  return <div className="container card z-10 relative max-w-[90%] m-auto text-center card pt-5 sm:p-5">
    <form className="space-y-4 text-left m-auto w-4/5" action={ onSubmitEventsForm } noValidate>
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
        className="w-full h-40 ml-1 mb-5 p-3 rounded-xl" 
        placeholder={`${t("creation.event name")}...`} value={ description } /><br />
      <FormFeedbackElement className="routeDescription__feedback" />

      <div className="font-bold">{t("main.location")}:</div>
      { isLoading ? <Spinner /> : <MapPointPicker onMapClick={ onMapClick } points={ mapPoint }
          className="h-100" /> }

      <div className="flex flex-wrap justify-center items-center w-full">
        <span className="mb-2 mr-2">
          <label htmlFor="routeDate" className="align-top font-bold mr-2"> { t("creation.event date") }: </label>
          <span className="mr-4" id="routeDate">{ new Date(date).toLocaleDateString() }</span>
          </span>
        <span className="mb-2 mr-2">
          <label htmlFor="routeHour" className="font-bold mr-2"> { t("creation.event hour") } :</label>
          <select id="routeHour" name="routeHour" 
            className="border border-primary rounded-xl p-2 inline"
            value={hour} onChange={ onHourChange }>
            { generateHoursOptions() }
          </select>
        </span>
        <span className="mb-2">
          <label htmlFor="routeScale" className="font-bold mr-2"> { t("creation.scale") } :</label>
          <ScaleSelectOptions id="routeScale" value={ scale } 
            className="border border-primary rounded-xl p-2" onScaleChange={ onScaleChange } />
        </span>
      </div>


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