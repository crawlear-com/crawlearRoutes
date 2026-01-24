import { useSelector } from "react-redux";
import { selectUserUUID } from "@/features/users/store/selectors/userSelectors";
import * as React from "react";
import toast from "react-hot-toast";
import { getUserStats } from "@/database/MyRoutesRpc";
import type { UserData } from "../UserStatistics.types";
import { useDifficultyValues } from "@/helpers/utils";

const initialUserData = {
  by_difficulty: { 1:0, 2:0, 3:0 },
  by_scale: {1:0, 2:0, 3:0, 4:0 },
  total_distance: 0,
  total_duration_time: 0,
  total_routes: 0
}

const useUserStatistics = (): [ UserData, string, string, string, boolean ] => {
  const uid = useSelector(selectUserUUID);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ data, setData ] = React.useState<UserData>(initialUserData); 
  const [ easy, medium, difficult ] = useDifficultyValues();

  React.useEffect(() => {
    const promise = getUserStats(uid);

    setIsLoading(true);
    promise.then((data) => {
      setData(data);
      setIsLoading(false);
    }).catch((e: unknown) => {
      setIsLoading(false);
      toast.error((e as Error).message);
    });
  }, [uid]);

  return [ data, easy, medium, difficult, isLoading ];
}

export default useUserStatistics;