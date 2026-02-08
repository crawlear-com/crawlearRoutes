import { selectUserUUID } from "@/application/features/users/store/selectors/userSelectors";
import * as React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { UserEventsStatisticsData } from "../UserEventsStatistics.types";
import { useTranslation } from "react-i18next";
import SupabaseRouteEventRepository from "@/infrastructure/Repository/RouteEventRepository/SupabaseRouteEventRepository";
import RouteEventDataProvider from "@/infrastructure/DataProvider/RouteEventDataProvider/RouteEventDataProvider";

const initialUserData = {
  by_scale: {1:0, 2:0, 3:0, 4:0 },
  future_events: 0,
  past_events: 0,
  total_events: 0,
  events_with_route: 0,
  events_without_route: 0
}

const useUserEventsStatistics = (): [UserEventsStatisticsData, boolean] => {
  const uid = useSelector(selectUserUUID);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ data, setData ] = React.useState<UserEventsStatisticsData>(initialUserData); 
  const { t } = useTranslation(["myEvents"]);

  React.useEffect(() => {
    const repository = new SupabaseRouteEventRepository();
    const provider = new RouteEventDataProvider(repository);

    const promise = provider.getUserEventsStats(uid);

    setIsLoading(true);
    promise.then((data) => {
      setData(data);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
      toast.error(t("errors.statistics not loaded"));
    });
  }, [uid, t]);

  return [ data, isLoading ];
}

export default useUserEventsStatistics;