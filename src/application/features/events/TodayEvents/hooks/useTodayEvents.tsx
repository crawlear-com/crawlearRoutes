import RouteEventDataProvider from "@/infrastructure/DataProvider/RouteEventDataProvider/RouteEventDataProvider";
import SupabaseRouteEventRepository from "@/infrastructure/Repository/RouteEventRepository/SupabaseRouteEventRepository";
import { selectUserUUID } from "@/application/features/users/store/selectors/userSelectors";
import type { RouteEvent } from "@/domain/RouteEvent.types";
import * as React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const useTodayEvents = (): [ Array<RouteEvent>, (event: React.MouseEvent<HTMLDivElement>) => void ] => {
  const [ todayEvents, setTodayEvents ] = React.useState<Array<RouteEvent>>([]);
  const { t } = useTranslation("myEvents");
  const uid = useSelector(selectUserUUID);
  const navigate = useNavigate();
  const repository = React.useMemo(() => new SupabaseRouteEventRepository(), []);
  const provider = React.useMemo(() => new RouteEventDataProvider(repository), [repository]);

  React.useEffect(() => {
    const getEvents = async () => {
      const promise = provider.getTodayEvents(uid!);

      promise.then((events: Array<RouteEvent>) => {
        setTodayEvents(events);
      }).catch(() => {
          toast.error(t("errors.today events not load"));
      });
    }

    getEvents();
  }, [uid, t, provider]);

  const onEditRouteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const eid = (event.target as HTMLDivElement).dataset.eid;

    event.stopPropagation();
    navigate(`/routeforevent/${eid}`);
  }

  return [ todayEvents, onEditRouteClick ];
}

export default useTodayEvents;