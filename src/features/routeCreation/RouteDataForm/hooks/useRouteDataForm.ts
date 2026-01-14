import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCreationRoute } from "../../store/selectors/routeSelectors";
import type { CreationRoute, Route } from "../../../../types/Route.types";
import { routeFormValidates } from "../helpers/routeValidations";
import toast from "react-hot-toast";
import { setDifficult, setIsPublic, setScale, setName, setDescription, setYoutubeVideo } from "../../store/slices/routeSlice";

  const useRouteDataForm = (action: (name: string, description: string, isPublic: boolean,
  difficulty: number, lat: number, lon: number, scale: number, youtubeVideo: string,
  gpx: string, distance: number, duration: number, id: string) => Promise<Route>, id: string): [
    (formData: FormData) => void, CreationRoute, boolean,
    (event: React.ChangeEvent<HTMLInputElement>) => void,
    (event: React.ChangeEvent<HTMLSelectElement>) => void,
    (event: React.ChangeEvent<HTMLSelectElement>) => void,
    (value: string) => void, (value: string) => void, (value: string) => void
  ] => {
    const creationRoute = useSelector(selectCreationRoute);
    const [ isLoading, setIsLoading ] = React.useState(false);
    const dispatch = useDispatch();

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
        const promise = action(creationRoute.name, creationRoute.description, creationRoute.isPublic,
          creationRoute.difficulty, creationRoute.location.lat, creationRoute.location.lon, creationRoute.scale,
          creationRoute.youtubeVideo, creationRoute.gpx, creationRoute.distance, creationRoute.durationTime, id);

        promise.then((data) => {
          setIsLoading(false);
          toast.success("Created!" + data.id);
        }).catch((e: unknown) => {
          toast.error((e as Error).message);
          setIsLoading(false);
        });
      }
    }

    return [ onSubmitRouteForm, creationRoute, isLoading, onIsPublicChangeHandler,
      onDifficultyChange, onScaleChange, setRouteName, 
      setRouteDescription, setRouteYoutubeVideo ];
}

export default useRouteDataForm;
