import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAction, selectCreationRoute, selectRouteId } from "../../store/selectors/routeSelectors";
import { routeFormValidates } from "../helpers/routeValidations";
import { setDifficult, setIsPublic, setScale, setName, setDescription, setYoutubeVideo } from "../../store/slices/routeSlice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import type { CreationRoute, Route } from "../../../../types/Route.types";
import { selectUserUUID } from "../../../users/store/selectors/userSelectors";
import { getActionFromActionType } from "../helpers/utils";
import { CREATE_ACTION, type RouteAction } from "../../store/slices/state.types";

const useRouteDataForm = (): [
  (formData: FormData) => void, CreationRoute, boolean, RouteAction,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  (event: React.ChangeEvent<HTMLSelectElement>) => void,
  (event: React.ChangeEvent<HTMLSelectElement>) => void,
  (value: string) => void, (value: string) => void, (value: string) => void
] => {
  const { t } = useTranslation(["routeCreation"]);
  const navigate = useNavigate();
  const routeId = useSelector(selectRouteId);
  const actionType = useSelector(selectAction);
  const owner = useSelector(selectUserUUID);
  const creationRoute = useSelector(selectCreationRoute);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const dispatch = useDispatch();
  const createActionPayload = () => {
    return {
      routeId: routeId,
      name: creationRoute.name,
      description: creationRoute.description,
      isPublic: creationRoute.isPublic,
      difficulty: creationRoute.difficulty,
      location: creationRoute.location,
      scale: creationRoute.scale,
      youtubeVideo: creationRoute.youtubeVideo,
      gpx: creationRoute.gpx,
      distance: creationRoute.distance,
      durationTime: creationRoute.durationTime,
      owner: owner
    }
  }

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
      const action = getActionFromActionType(actionType);
      const promise: Promise<Route> = action(createActionPayload());
      const successMessage = actionType === CREATE_ACTION ? t("messages.route creation ok") : t("messages.route modify ok");
      const errorMessage = (e: unknown) => `${actionType === CREATE_ACTION ? t("messages.route creation ko") : t("messages.route modify ko")}: ${(e as Error).message}`;

      promise.then(() => {
        setIsLoading(false);
        toast.success(successMessage);
        navigate(-1);
      }).catch((e: unknown) => {
        toast.error(errorMessage(e));
        setIsLoading(false);
      });
    }
  }

  return [ onSubmitRouteForm, creationRoute, isLoading, actionType, onIsPublicChangeHandler,
    onDifficultyChange, onScaleChange, setRouteName, 
    setRouteDescription, setRouteYoutubeVideo ];
}

export default useRouteDataForm;
