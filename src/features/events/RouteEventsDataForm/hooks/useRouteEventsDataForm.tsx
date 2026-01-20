import * as React from "react";
import { eventFormValidates } from "../helpers/eventValidations";
//import toast from "react-hot-toast";
//import { CREATE_ACTION } from "../../../routeCreation/store/slices/state.types";
//import { useTranslation } from "react-i18next";
import type { RouteEvent } from "../../../../types/RouteEvent.types";
import type { Route } from "../../../../types/Route.types";
import { useSelector } from "react-redux";
import { selectMyRoutes } from "../../../routes/store/selectors/routeListsSelectors";
import { useTranslation } from "react-i18next";

const useRouteEventsDataForm = (routeEvent?: RouteEvent): [ 
    string, string, boolean, Array<React.JSX.Element>,(formData: FormData) => void,
    (value: React.SetStateAction<string>) => void,
    (value: React.SetStateAction<string>) => void
  ] => {
  const { t } = useTranslation(["eventsCreation"]);
  const [name, setName] = React.useState(routeEvent && routeEvent.name || '');
  const [description, setDescription] = React.useState(routeEvent && routeEvent.description || '');
  //const [ routeId, setRouteId ] = React.useState<string | null>(null);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const routes: Array<Route> = useSelector(selectMyRoutes); 
  const [ routeOptions, setRouteOptions ] = React.useState<Array<React.JSX.Element>>([]);
  const generateRouteOptions = React.useCallback(() => {
    const routeOptions = routes.map((route) => (
      <option key={route.id}>{route.name}</option>
    ));

    return [<option key="noRoute">{ t("main.no route") }</option>, ...routeOptions];
  }, [routes, t]);

  React.useEffect(() => {
    setRouteOptions(generateRouteOptions());
  }, [routes, generateRouteOptions]);

  const onSubmitEventsForm = async(formData: FormData) => {  
    if (eventFormValidates(formData)) {
/*      const action = getActionFromActionType(actionType);
      const promise: Promise<RouteEvent> = action(createActionPayload());
      const successMessage = actionType === CREATE_ACTION ? t("messages.route creation ok") : t("messages.route modify ok");
      const errorMessage = (e: unknown) => `${actionType === CREATE_ACTION ? t("messages.route creation ko") : t("messages.route modify ko")}: ${(e as Error).message}`;

      promise.then(() => {
        setIsLoading(false);
        toast.success(successMessage);
      }).catch((e: unknown) => {
        toast.error(errorMessage(e));
        setIsLoading(false);
      });
*/
    }
  }

  return [ name, description, isLoading, routeOptions, onSubmitEventsForm, setName, setDescription ];
}

export default useRouteEventsDataForm;