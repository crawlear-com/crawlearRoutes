import { useTranslation } from "react-i18next";
import FormFeedbackElement from "@/application/components/ui/FormFeedbackElement/FormFeedbackElement";
import { setAndValidate } from "@/application/helpers/formValidations";
import { descriptionSchema, nameSchema, youtubeSchema } from "./helpers/validation";
import useRouteDataForm from "./hooks/useRouteDataForm";
import { CREATE_ACTION } from "@/application/helpers/utils";
import DifficultySelectOptions from "@/application/components/ui/DifficultySelectOptions/DifficultySelectOptions";
import ScaleSelectOptions from "@/application/components/ui/ScaleSelectOptions/ScaleSelectOptions";

const RouteDataForm = () => {
  const { t } = useTranslation(["routeCreation"]);
  const [ onSubmitRouteForm, creationRoute, isLoading, eventId, actionType, onIsPublicChangeHandler,
    onDifficultyChange, onScaleChange, setRouteName, setRouteDescription,
    setRouteYoutubeVideo ] = useRouteDataForm();

  return (<div className="mt-10">
    { eventId ? <>Ruta para el evento de hoy</> : <></> }
    <form className="space-y-4 text-left m-auto w-3/4" action={ onSubmitRouteForm } noValidate>
      <label htmlFor="routeName" className="block font-bold">
        * { t("main.route name")}:
      </label>
      <input type="text" name="routeName" id="routeName" 
        onChange={ () => { setAndValidate(setRouteName, 'routeName', nameSchema) }}
        className="ml-1 mb-5 p-3 w-full rounded-xl" placeholder={`${t("main.route name")}...`} value={ creationRoute.name } /> <br />
      <FormFeedbackElement className="routeName__feedback" />

      <label htmlFor="routeDescription" className="align-top block font-bold">
        * { t("main.route description")}:
      </label>
      <textarea name="routeDescription" id="routeDescription"
        onChange={ () => { setAndValidate(setRouteDescription, 'routeDescription', descriptionSchema) }}
        className="w-full h-20 ml-1 mb-5 p-3 rounded-xl" placeholder={`${t("main.route description")}...`} value={ creationRoute.description } /> <br />
      <FormFeedbackElement className="routeDescription__feedback" />

      <div className="flex flex-wrap justify-center items-center w-full">
        <span className="mb-2">
          <label htmlFor="isPublic" className="font-bold">
            { t("main.route is plublic")}:
          </label>
          <input type="checkbox" id="isPublic" onChange={ onIsPublicChangeHandler }
            className="ml-1 p-3 rounded-xl mr-4" checked={ creationRoute.isPublic } />
        </span>
        <span className="mb-2">
          <label htmlFor="difficulty" className="font-bold">
            { t("main.route difficulty")}:
          </label>
          <DifficultySelectOptions id="difficulty" value={ creationRoute.difficulty }
            className="ml-1 p-3 input mr-4" onDifficultyChange={ onDifficultyChange } />
        </span>
        <span className="mb-2">
          <label htmlFor="scale" className="font-bold">
            { t("main.route scale")}:
          </label>
          <ScaleSelectOptions id="scale" value= { creationRoute.scale }
            className="ml-1 p-3 input" onScaleChange={ onScaleChange } /><br />
        </span>
      </div>
      <label htmlFor="youtubeVideo" className="block font-bold">
        { t("main.route video")}:
      </label>
      <input type="text" name="youtubeVideo" id="youtubeVideo"
        onChange={ () => { setAndValidate(setRouteYoutubeVideo, 'youtubeVideo', youtubeSchema) }}
        className="ml-1 mb-5 p-3 w-full rounded-xl" placeholder={ t("main.youtube video url") } value={ creationRoute.youtubeVideo ? creationRoute.youtubeVideo : '' } /> <br />
      <FormFeedbackElement className="youtubeVideo__feedback" />

      <button type="submit" className="button-primary w-auto m-auto p-3">
        { isLoading ? "submiting" : actionType === CREATE_ACTION ? t("main.create route") : t("main.modify route") }
      </button>
    </form>
  </div>);
}

export default RouteDataForm;