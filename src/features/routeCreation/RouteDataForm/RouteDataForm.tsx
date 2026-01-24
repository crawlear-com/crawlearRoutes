import { useTranslation } from "react-i18next";
import FormFeedbackElement from "../../../components/FormFeedbackElement/FormFeedbackElement";
import { setAndValidate } from "../../../helpers/formValidations";
import { descriptionSchema, nameSchema, youtubeSchema } from "./helpers/validation";
import useRouteDataForm from "./hooks/useRouteDataForm";
import { CREATE_ACTION } from "../../../helpers/utils";
import DifficultySelectOptions from "../../../components/DifficultySelectOptions/DifficultySelectOptions";
import ScaleSelectOptions from "../../../components/ScaleSelectOptions/ScaleSelectOptions";

const RouteDataForm = () => {
  const { t } = useTranslation(["routeCreation"]);
  const [ onSubmitRouteForm, creationRoute, isLoading, eventId, actionType, onIsPublicChangeHandler,
    onDifficultyChange, onScaleChange, setRouteName, setRouteDescription,
    setRouteYoutubeVideo ] = useRouteDataForm();

  return (<div className="mt-10">
    { eventId ? <>Ruta para el evento de hoy</> : <></> }
    <form className="space-y-4 text-left m-auto w-4/5 sm:w-1/2" action={ onSubmitRouteForm } noValidate>
      <label htmlFor="routeName" className="block font-bold">
        * { t("main.route name")}:
      </label>
      <input type="text" name="routeName" id="routeName" 
        onChange={ () => { setAndValidate(setRouteName, 'routeName', nameSchema) }}
        className="ml-1 mb-5 p-3 w-full" placeholder="Route name..." value={ creationRoute.name } /> <br />
      <FormFeedbackElement className="routeName__feedback" />

      <label htmlFor="routeDescription" className="align-top block font-bold">
        * { t("main.route description")}:
      </label>
      <textarea name="routeDescription" id="routeDescription"
        onChange={ () => { setAndValidate(setRouteDescription, 'routeDescription', descriptionSchema) }}
        className="w-full sm:w-96 h-80 ml-1 mb-5 p-3" placeholder="Route description..." value={ creationRoute.description } /> <br />
      <FormFeedbackElement className="routeDescription__feedback" />

      <label htmlFor="isPublic" className="font-bold">
        { t("main.route is plublic")}:
      </label>
      <input type="checkbox" id="isPublic" onChange={ onIsPublicChangeHandler }
        className="ml-1 p-3" checked={ creationRoute.isPublic } /> <br />

      <label htmlFor="difficulty" className="font-bold">
        { t("main.route difficulty")}:
      </label>
      <DifficultySelectOptions id="difficulty" value={ creationRoute.difficulty }
        className="ml-1 mb-5 p-3 input" onDifficultyChange={ onDifficultyChange } /><br />

      <label htmlFor="scale" className="font-bold">
        { t("main.route scale")}:
      </label>
      <ScaleSelectOptions id="scale" value= { creationRoute.scale }
        className="ml-1 mb-5 p-3 input" onScaleChange={ onScaleChange } /><br />
      <label htmlFor="youtubeVideo" className="block font-bold">
        { t("main.route video")}:
      </label>
      <input type="text" name="youtubeVideo" id="youtubeVideo"
        onChange={ () => { setAndValidate(setRouteYoutubeVideo, 'youtubeVideo', youtubeSchema) }}
        className="ml-1 mb-5 p-3 w-full" placeholder="Youtube video url..." value={ creationRoute.youtubeVideo ? creationRoute.youtubeVideo : '' } /> <br />
      <FormFeedbackElement className="youtubeVideo__feedback" />

      <button type="submit" className="button-primary w-auto m-auto p-3">
        { isLoading ? "submiting" : actionType === CREATE_ACTION ? t("main.create route") : t("main.modify route") }
      </button>
    </form>
  </div>);
}

export default RouteDataForm;