import { getUserEventsStats } from "@/database/statisticsRpc";
import { selectUserUUID } from "@/features/users/store/selectors/userSelectors";
import * as React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { UserEventsStatisticsData } from "../UserEventsStatistics.types";

const initialUserData = {
  by_scale: {1:0, 2:0, 3:0, 4:0 },
  future_events: 0,
  past_events: 0,
  total_events: 0
}

const useUserEventsStatistics = (): [UserEventsStatisticsData, boolean] => {
  const uid = useSelector(selectUserUUID);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ data, setData ] = React.useState<UserEventsStatisticsData>(initialUserData); 

  React.useEffect(() => {
    const promise = getUserEventsStats(uid);

    setIsLoading(true);
    promise.then((data) => {
      setData(data);
      setIsLoading(false);
    }).catch((e: unknown) => {
      setIsLoading(false);
      toast.error((e as Error).message);
    });
  }, [uid]);

  return [ data, isLoading ];
}

export default useUserEventsStatistics;