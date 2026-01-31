import * as React from "react";
import { eventFormValidates } from "../helpers/eventValidations";
import type { RouteEvent } from "@/types/RouteEvent.types";
import type { GeoPoint, Route } from "@/types/Route.types";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { selectUserUUID } from "@/features/users/store/selectors/userSelectors";
import { getMyRoutesFull } from "@/database/MyRoutesRpc";
import { CREATE_ACTION, UPDATE_ACTION } from "@/helpers/utils";
import toast from "react-hot-toast";
import type { FormAction } from "@/types/Generic.types";
import { getActionFromActionRpcType } from "../helpers/utils";
import { LatLngBounds } from "leaflet";

const getHourString = (date: string) => {
  const dateObject = new Date(date);
  const hoursValue = dateObject.getHours().toString().padStart(2, '0');
  const minutesValue = dateObject.getMinutes() === 0 ? '00h' : '30h';

  return `${hoursValue}:${minutesValue}`;
}

const createActionPayload = (routeEvent: RouteEvent & { hour: string }) => {
  const newDate = new Date(routeEvent.date);
  
  newDate.setHours(routeEvent.hour ? Number(routeEvent.hour.split(':')[0]) : 0);
  newDate.setMinutes(routeEvent.hour ? Number(routeEvent.hour.split(':')[1].replace('h', '')) : 0);
    return {
      id: routeEvent.id || null,
      name: routeEvent.name,
      description: routeEvent.description,
      location: routeEvent.location,
      date: newDate,
      scale: routeEvent.scale,
      rid: routeEvent.rid,
      owner: routeEvent.owner
    }
}

const useRouteEventsDataForm = (eventDate: string, routeEvent?: RouteEvent): [ 
    string, string, string | null, boolean, number, string, Array<React.JSX.Element>,
    GeoPoint | null, (formData: FormData) => void,
    (value: React.SetStateAction<string>) => void,
    (value: React.SetStateAction<string>) => void,
    (event: React.ChangeEvent<HTMLSelectElement>) => void,
    (event: React.ChangeEvent<HTMLSelectElement>) => void,
    (event: React.ChangeEvent<HTMLSelectElement>) => void,
    (searchBounds: LatLngBounds) => void
  ] => {
  const actionType: FormAction = routeEvent ? UPDATE_ACTION : CREATE_ACTION;
  const { t } = useTranslation(["eventsCreation"]);  
  const [name, setName] = React.useState(routeEvent && routeEvent.name || '');
  const [ description, setDescription ] = React.useState(routeEvent && routeEvent.description || '');
  const [ hour, setHour ] = React.useState(getHourString(routeEvent ? routeEvent.date : eventDate));
  const [ scale, setScale ] = React.useState(routeEvent ? routeEvent.scale : 1);
  const [ rid, setRid ] = React.useState(routeEvent?.rid || null);
  const [ point, setPoint ] = React.useState<GeoPoint | null>(routeEvent?.location || null);
  const [ isLoading, setIsLoading ] = React.useState(true);
  const [ routeOptions, setRouteOptions ] = React.useState<Array<React.JSX.Element>>([]);
  const userId = useSelector(selectUserUUID);
  const generateRouteOptions = React.useCallback((routes: Array<Route>) => {
    const routeOptions = routes.map((route) => (
      <option key={route.id} value={ route.id }>{route.name}</option>
    ));

    return [<option key="noRoute" value="">{ t("creation.no route") }</option>, ...routeOptions];
  }, [t]);

  React.useEffect(() => {
    const getRoutes = async () => {
      setIsLoading(true);
      const response = await getMyRoutesFull(userId!);

      if (!response.error) {
        setIsLoading(false);
        return response.data;
      } else {
        setIsLoading(false);
        throw new Error(`Error loading routes: ${response.error.message}`);
      }
    }

    getRoutes().then((routes) => {
      setRouteOptions(generateRouteOptions(routes));
    }).catch((e: unknown) => {
      toast.error((e as Error).message);
    });
  }, [userId, generateRouteOptions]);

  const onHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHour(event.target.value);
  }

  const onRouteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const rid = event.target.value;

    setRid(rid.length ? rid : null);
  }

  const onScaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setScale(Number(event.target.value));
  }

  const onMapClick = (searchBounds: LatLngBounds) => {
    const center = searchBounds.getCenter()
    setPoint({
      lat: center.lat,
      lon: center.lng
     });
  }

  const onSubmitEventsForm = async(formData: FormData) => {  
    if (eventFormValidates(formData)) {
      const action = getActionFromActionRpcType(actionType);
      const payload = createActionPayload({ name: name, description: description, location: point, date: eventDate, scale: scale, rid: rid, owner: userId!, id: routeEvent?.id, hour: hour } as RouteEvent & { hour: string } );
      const promise: Promise<RouteEvent> = action(payload.name, payload.description, payload.location, payload.date, payload.scale, payload.rid, payload.id || payload.owner);
      const successMessage = actionType === CREATE_ACTION ? t("messages.route creation ok") : t("messages.route modify ok");
      const errorMessage = (e: unknown) => `${actionType === CREATE_ACTION ? t("messages.route creation ko") : t("messages.route modify ko")}: ${(e as Error).message}`;

      promise.then(() => {
        setIsLoading(false);
        toast.success(successMessage);
      }).catch((e: unknown) => {
        toast.error(errorMessage(e));
        setIsLoading(false);
      });
    }
  }

  return [ name, description, rid, isLoading, scale, hour, routeOptions, point,
    onSubmitEventsForm, setName, setDescription, onHourChange, onRouteChange,
    onScaleChange, onMapClick ];
}

export default useRouteEventsDataForm;