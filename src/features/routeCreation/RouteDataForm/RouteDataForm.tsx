import * as React from "react";
import { useTranslation } from "react-i18next";

const RouteDataForm = () => {
  const { t } = useTranslation(["routeCreation"]);
  const [ name, setName ] = React.useState('');
  const [ description, setDescription ] = React.useState('');
  const [ isPublic, setIsPublic ] = React.useState(true);
  const onNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;

    setName(name);
  }
  const onDescriptionChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target.value;

    setDescription(description);
  }
  const onIsPublicChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    setIsPublic(isChecked);
  }

  return (<div className="">
  <label htmlFor="routeName">
    { t("main.route name")}:
  </label>
  <input type="text" name="routeName" id="routeName" onChange={ onNameChangeHandler }
    className="ml-1 mb-5 p-3" placeholder="Route name..." value={ name } /> <br />

  <label htmlFor="routeName" className="align-top">
    { t("main.route description")}:
  </label>
  <textarea name="routeDescription" id="routeDescription" onChange={ onDescriptionChangeHandler }
    className="w-[90%] sm:w-96 h-80 ml-1 mb-5 p-3" placeholder="Route description..." value={ description } /> <br />

  <label htmlFor="isPublic">
    { t("main.route is plublic")}:
  </label>
  <input type="checkbox" id="isPublic" onChange={ onIsPublicChangeHandler }
    className="ml-1 p-3" checked={ isPublic } /> <br />
  
  <label htmlFor="difficulty">
    { t("main.route difficulty")}:
  </label>
  <select className="ml-1 mb-5 p-3 input" id="difficulty">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </select> <br />

  <label htmlFor="scale">
    { t("main.route scale")}:
  </label>
  <select className="ml-1 mb-5 p-3 input" id="scale">
    <option>1/10</option>
    <option>1/18</option>
    <option>1/24</option>
    <option>1/1</option>
  </select> <br />
  </div>);
}

export default RouteDataForm;