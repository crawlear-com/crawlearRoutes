import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAction, selectCreationRoute, selectEventId, selectRouteId } from "@/features/routeCreation/store/selectors/routeSelectors";
import { routeFormValidates } from "../helpers/routeValidations";
import { setDifficult, setIsPublic, setScale, setName, setDescription, setYoutubeVideo, cleanRouteCreation, setAction, cleanGpx } from "../../store/slices/routeSlice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import type { CreationRoute } from "@/domain/Route.types";
import { selectUserUUID } from "@/features/users/store/selectors/userSelectors";
import { createActionPayload, getActionFromRpcType } from "../helpers/utils";
import { CREATE_ACTION } from "@/helpers/utils";
import SupabaseRouteRepository from "@/infrastructure/Repository/RouteRepository/SupabaseRouteRepository";
import RouteDataProvider from "@/infrastructure/DataProvider/RouteDataProvider/RouteDataProvider";
import SupabaseRouteEventRepository from "@/infrastructure/Repository/RouteEventRepository/SupabaseRouteEventRepository";
import RouteEventDataProvider from "@/infrastructure/DataProvider/RouteEventDataProvider/RouteEventDataProvider";

const useRouteDataForm = (): [
  (formData: FormData) => void, CreationRoute, boolean, string | null, string,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  (event: React.ChangeEvent<HTMLSelectElement>) => void,
  (event: React.ChangeEvent<HTMLSelectElement>) => void,
  (value: string) => void, (value: string) => void, (value: string) => void
] => {
  const { t } = useTranslation(["routeCreation"]);
  const navigate = useNavigate();
  const rid = useSelector(selectRouteId);
  const eventId = useSelector(selectEventId);
  const actionType = useSelector(selectAction);
  const owner = useSelector(selectUserUUID);
  const creationRoute = useSelector(selectCreationRoute);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const dispatch = useDispatch();
  const routeRepository = React.useMemo(() => new SupabaseRouteRepository(), []);
  const routeProvider = React.useMemo(() => new RouteDataProvider(routeRepository), [routeRepository]);
  const routeEventRepository = React.useMemo(() => new SupabaseRouteEventRepository(), []);
  const routeEventProvider = React.useMemo(() => new RouteEventDataProvider(routeEventRepository), [routeEventRepository]);  

  const onIsPublicChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    dispatch(setIsPublic(isChecked));
  }

  const onDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const difficulty = Number(event.target.value);

    dispatch(setDifficult(difficulty));
  }

  const onScaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const scale = Number(event.target.value);

    dispatch(setScale(scale));
  }

  const setRouteName = (value: string) => {
    dispatch(setName(value))
  }

  const setRouteDescription = (value: string) => {
    dispatch(setDescription(value))
  }

  const setRouteYoutubeVideo = (value: string) => {
    dispatch(setYoutubeVideo(value))
  }

  const onSubmitRouteForm = async(formData: FormData) => {  
    if (routeFormValidates(formData)) {
      const action = getActionFromRpcType(actionType, routeProvider);
      const promise: Promise<string> = action(createActionPayload(rid, creationRoute, owner));
      const successMessage = actionType === CREATE_ACTION ? t("messages.route creation ok") : t("messages.route modify ok");
      const errorMessage = () => `${actionType === CREATE_ACTION ? t("messages.route creation ko") : t("messages.route modify ko")}`;

      promise.then((newRouteId) => {
        setIsLoading(false);
        toast.success(successMessage);
        if (eventId && newRouteId) {
          routeEventProvider.assignRouteToEvent(eventId, newRouteId, owner).then(() => {
            setIsLoading(false);
            toast.success(successMessage);
            navigate(-1);
          }).catch(() => {
            toast.error(errorMessage());
            setIsLoading(false);
          });
        }
        dispatch(cleanRouteCreation());
        dispatch(cleanGpx());
        dispatch(setAction(CREATE_ACTION));
      }).catch(() => {
        toast.error(errorMessage());
        setIsLoading(false);
      });
    }
  }

  return [ onSubmitRouteForm, creationRoute, isLoading, eventId, actionType, onIsPublicChangeHandler,
    onDifficultyChange, onScaleChange, setRouteName, 
    setRouteDescription, setRouteYoutubeVideo ];
}

export default useRouteDataForm;
