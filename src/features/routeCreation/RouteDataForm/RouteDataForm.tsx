import { useTranslation } from "react-i18next";
import FormFeedbackElement from "../../../components/FormFeedbackElement/FormFeedbackElement";
import { setAndValidate } from "../../../helpers/formValidations";
import { descriptionSchema, nameSchema, youtubeSchema } from "./helpers/validation";
import useRouteDataForm from "./hooks/useRouteDataForm";
import { getScaleValue, useDifficultyValues } from "../../../helpers/utils";
import type { Route } from "../../../types/Route.types";

type RouteDataFormProps = {
  action: (name: string, description: string, isPublic: boolean,
  difficulty: number, lat: number, lon: number, scale: number, youtubeVideo: string,
  gpx: string, distance: number, duration: number, id: string) => Promise<Route>,
  id: string
}

const RouteDataForm = ({ action, id }: RouteDataFormProps) => {
  const { t } = useTranslation(["routeCreation"]);
  const [ easy, moderate, difficult ] = useDifficultyValues();
  const [ onSubmitRouteForm, creationRoute, isLoading, onIsPublicChangeHandler,
    onDifficultyChange, onScaleChange, setRouteName, setRouteDescription,
    setRouteYoutubeVideo ] = useRouteDataForm(action, id);

  return (<div className="mt-10">
    <form className="space-y-4" action={ onSubmitRouteForm } noValidate>
      <label htmlFor="routeName">
        { t("main.route name")}:
      </label>
      <input type="text" name="routeName" id="routeName" 
        onChange={ () => { setAndValidate(setRouteName, 'routeName', nameSchema) }}
        className="ml-1 mb-5 p-3" placeholder="Route name..." value={ creationRoute.name } /> <br />
      <FormFeedbackElement className="routeName__feedback" />

      <label htmlFor="routeName" className="align-top">
        { t("main.route description")}:
      </label>
      <textarea name="routeDescription" id="routeDescription"
        onChange={ () => { setAndValidate(setRouteDescription, 'routeDescription', descriptionSchema) }}
        className="w-[90%] sm:w-96 h-80 ml-1 mb-5 p-3" placeholder="Route description..." value={ creationRoute.description } /> <br />
      <FormFeedbackElement className="routeDescription__feedback" />

      <label htmlFor="isPublic">
        { t("main.route is plublic")}:
      </label>
      <input type="checkbox" id="isPublic" onChange={ onIsPublicChangeHandler }
        className="ml-1 p-3" checked={ creationRoute.isPublic } /> <br />

      <label htmlFor="difficulty">
        { t("main.route difficulty")}:
      </label>
      <select className="ml-1 mb-5 p-3 input" id="difficulty" value={ creationRoute.difficulty }
        onChange={ onDifficultyChange }>
        <option value="1">{ easy }</option>
        <option value="2">{ moderate }</option>
        <option value="3">{ difficult}</option>
      </select> <br />

      <label htmlFor="scale">
        { t("main.route scale")}:
      </label>
      <select className="ml-1 mb-5 p-3 input" id="scale" value={ creationRoute.scale }
        onChange={ onScaleChange }>
        <option value={1}>{ getScaleValue(1) }</option>
        <option value={2}>{ getScaleValue(2) }</option>
        <option value={3}>{ getScaleValue(3) }</option>
        <option value={4}>{ getScaleValue(4) }</option>
      </select> <br />
      <label htmlFor="youtubeVideo">
        { t("main.route video")}:
      </label>
      <input type="text" name="youtubeVideo" id="youtubeVideo"
        onChange={ () => { setAndValidate(setRouteYoutubeVideo, 'youtubeVideo', youtubeSchema) }}
        className="ml-1 mb-5 p-3" placeholder="Youtube video url..." value={ creationRoute.youtubeVideo } /> <br />
      <FormFeedbackElement className="youtubeVideo__feedback" />

      <button type="submit" className="button-primary w-auto m-auto">  { isLoading ? "submiting" : t("main.create route") } </button>
    </form>
  </div>);
}

export default RouteDataForm;