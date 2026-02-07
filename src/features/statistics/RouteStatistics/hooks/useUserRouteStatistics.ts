import { useSelector } from "react-redux";
import { selectUserUUID } from "@/features/users/store/selectors/userSelectors";
import * as React from "react";
import toast from "react-hot-toast";
import type { UserRouteStatisticsData } from "../UserRouteStatistics.types";
import { useDifficultyValues } from "@/helpers/utils";
import { useTranslation } from "react-i18next";
import SupabaseRouteRepository from "@/infrastructure/Repository/RouteRepository/SupabaseRouteRepository";
import RouteDataProvider from "@/infrastructure/DataProvider/RouteDataProvider/RouteDataProvider";

const initialUserData = {
  by_difficulty: { 1:0, 2:0, 3:0 },
  by_scale: {1:0, 2:0, 3:0, 4:0 },
  total_distance: 0,
  total_duration_time: 0,
  total_routes: 0
}

const useUserRouteStatistics = (): [ UserRouteStatisticsData, string, string, string, boolean ] => {
  const uid = useSelector(selectUserUUID);
  const { t } = useTranslation(["myRoutes"]);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ data, setData ] = React.useState<UserRouteStatisticsData>(initialUserData); 
  const [ easy, medium, difficult ] = useDifficultyValues();

  React.useEffect(() => {
    const repository = new SupabaseRouteRepository();
    const provider = new RouteDataProvider(repository);

    const promise = provider.getUserRouteStats(uid);

    setIsLoading(true);
    promise.then((data) => {
      setData(data);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
      toast.error(t("errors.statistics not loaded"));
    });
  }, [uid, t]);

  return [ data, easy, medium, difficult, isLoading ];
}

export default useUserRouteStatistics;