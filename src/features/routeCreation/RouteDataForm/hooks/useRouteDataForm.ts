import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserUUID } from "../../../users/store/selectors/userSelectors";
import { selectDescription, selectDifficulty, selectDistance, selectDuration, selectGpx, selectIsPublic, selectName, 
  selectPoint, selectScale, selectYoutubeVideo } from "../../store/selectors/routeSelectors";
import type { GeoPoint } from "../../../../types/Route.types";
import { routeFormValidates } from "../helpers/routeValidations";
import { createRoute } from "../../../../database/routesCreationRpc";
import toast from "react-hot-toast";
import { setDifficult, setIsPublic, setScale, setName, setDescription, setYoutubeVideo } from "../../store/slices/routeSlice";

const useRouteDataForm = (): [(formData: FormData) => void, string,
    string, boolean, string, boolean, (event: React.ChangeEvent<HTMLInputElement>) => void,
    (event: React.ChangeEvent<HTMLSelectElement>) => void,
    (event: React.ChangeEvent<HTMLSelectElement>) => void,
    (value: string) => void, (value: string) => void, (value: string) => void] => {
  const name: string = useSelector(selectName);
  const description: string = useSelector(selectDescription);
  const youtubeVideo: string = useSelector(selectYoutubeVideo);
  const difficulty: number = useSelector(selectDifficulty);
  const scale: number = useSelector(selectScale);
  const isPublic: boolean = useSelector(selectIsPublic);
  const routeGpx: string = useSelector(selectGpx);
  const routePoint: GeoPoint = useSelector(selectPoint);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const dispatch = useDispatch();
  const distance = useSelector(selectDistance);
  const duration = useSelector(selectDuration);
  const owner = useSelector(selectUserUUID);

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
      const promise = createRoute(name, description, isPublic, difficulty,
        routePoint.lat, routePoint.lon, scale, youtubeVideo, routeGpx,
        distance, duration, owner);

      promise.then((data) => {
        setIsLoading(false);
        toast.success("Created!" + data.id);
      }).catch((e: unknown) => {
        toast.error((e as Error).message);
        setIsLoading(false);
      });
    }
  }

  return [ onSubmitRouteForm, name, description, 
    isPublic, youtubeVideo, isLoading, onIsPublicChangeHandler,
    onDifficultyChange, onScaleChange, setRouteName, 
    setRouteDescription, setRouteYoutubeVideo ];
}

export default useRouteDataForm;
