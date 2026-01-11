import { useTranslation } from "react-i18next";
import FormFeedbackElement from "../../../components/FormFeedbackElement/FormFeedbackElement";
import { setAndValidate } from "../../../helpers/formValidations";
import { descriptionSchema, nameSchema, youtubeSchema } from "./helpers/validation";
import useRouteDataForm from "./hooks/useRouteDataForm";

const RouteDataForm = () => {
  const { t } = useTranslation(["routeCreation"]);
  const [ onSubmitRouteForm, name, description, 
    isPublic, youtubeVideo, isLoading, onIsPublicChangeHandler,
    onDifficultyChange, onScaleChange, setRouteName, 
    setRouteDescription, setRouteYoutubeVideo ] = useRouteDataForm();

  return (<div className="mt-10">
    <form className="space-y-4" action={ onSubmitRouteForm } noValidate>
      <label htmlFor="routeName">
        { t("main.route name")}:
      </label>
      <input type="text" name="routeName" id="routeName" 
        onChange={ () => { setAndValidate(setRouteName, 'routeName', nameSchema) }}
        className="ml-1 mb-5 p-3" placeholder="Route name..." value={ name } /> <br />
      <FormFeedbackElement className="routeName__feedback" />

      <label htmlFor="routeName" className="align-top">
        { t("main.route description")}:
      </label>
      <textarea name="routeDescription" id="routeDescription"
        onChange={ () => { setAndValidate(setRouteDescription, 'routeDescription', descriptionSchema) }}
        className="w-[90%] sm:w-96 h-80 ml-1 mb-5 p-3" placeholder="Route description..." value={ description } /> <br />
      <FormFeedbackElement className="routeDescription__feedback" />

      <label htmlFor="isPublic">
        { t("main.route is plublic")}:
      </label>
      <input type="checkbox" id="isPublic" onChange={ onIsPublicChangeHandler }
        className="ml-1 p-3" checked={ isPublic } /> <br />

      <label htmlFor="difficulty">
        { t("main.route difficulty")}:
      </label>
      <select className="ml-1 mb-5 p-3 input" id="difficulty" onChange={ onDifficultyChange }>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select> <br />

      <label htmlFor="scale">
        { t("main.route scale")}:
      </label>
      <select className="ml-1 mb-5 p-3 input" id="scale" onChange={ onScaleChange }>
        <option>1/10</option>
        <option>1/18</option>
        <option>1/24</option>
        <option>1/1</option>
      </select> <br />
      <label htmlFor="youtubeVideo">
        { t("main.route video")}:
      </label>
      <input type="text" name="youtubeVideo" id="youtubeVideo"
        onChange={ () => { setAndValidate(setRouteYoutubeVideo, 'youtubeVideo', youtubeSchema) }}
        className="ml-1 mb-5 p-3" placeholder="Youtube video url..." value={ youtubeVideo } /> <br />
      <FormFeedbackElement className="youtubeVideo__feedback" />

      <button type="submit" className="button-primary w-auto m-auto">  { isLoading ? "submiting" :  t("main.create route") } </button>
    </form>
  </div>);
}

export default RouteDataForm;