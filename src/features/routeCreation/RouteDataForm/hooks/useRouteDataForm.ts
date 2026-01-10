import * as React from "react";
import { useSelector } from "react-redux";
import { selectUserUUID } from "../../../users/store/selectors/userSelectors";
import { selectGpx, selectQuadrant } from "../../store/selectors/routeSelectors";
import type { GeoPoint } from "../../../../types/Route.types";
import { routeFormValidates } from "../helpers/routeValidations";
import { createRoute } from "../../../../database/routesCreationRpc";
import toast from "react-hot-toast";

const useRouteDataForm = (): [(formData: FormData) => void, string, React.Dispatch<React.SetStateAction<string>>,
    string, React.Dispatch<React.SetStateAction<string>>, boolean, string, React.Dispatch<React.SetStateAction<string>>,
    boolean, (event: React.ChangeEvent<HTMLInputElement>) => void, (event: React.ChangeEvent<HTMLSelectElement>) => void,
    (event: React.ChangeEvent<HTMLSelectElement>) => void] => {
  const [ name, setName ] = React.useState('');
  const [ description, setDescription ] = React.useState('');
  const [ youtubeVideo, setYoutubeVideo ] = React.useState('');
  const [ isPublic, setIsPublic ] = React.useState(true);
  const [ difficulty, setDifficulty ] = React.useState(0);
  const [ scale, setScale ] = React.useState(0);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const routeGpx = useSelector(selectGpx);
  const routeQuadrant: GeoPoint = useSelector(selectQuadrant);
  const distance = 100;
  const duration = 100;
  const owner = useSelector(selectUserUUID);

  const onIsPublicChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    setIsPublic(isChecked);
  }

  const onDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const difficulty = Number(event.target.value);

    setDifficulty(difficulty);
  }

  const onScaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const scale = Number(event.target.value);

    setScale(scale);
  }

  const onSubmitRouteForm = async(formData: FormData) => {  
    if (routeFormValidates(formData)) {
      const promise = createRoute(name, description, isPublic, difficulty,
        routeQuadrant.lat, routeQuadrant.lon, scale, youtubeVideo, routeGpx,
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

  return [ onSubmitRouteForm, name, setName, description, setDescription, 
    isPublic, youtubeVideo, setYoutubeVideo, isLoading, onIsPublicChangeHandler,
    onDifficultyChange, onScaleChange ];
}

export default useRouteDataForm;