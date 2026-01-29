import * as React from "react";
import { getTodayEvents } from "@/database/eventsRpc";
import { selectUserUUID } from "@/features/users/store/selectors/userSelectors";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { RouteEvent } from "@/types/RouteEvent.types";
import { useTranslation } from "react-i18next";
import RouteEventCard from "@/features/events/RouteEventCard/RouteEventCard";
import { useNavigate } from "react-router";

const TodayEvents = () => {
  const [ todayEvents, setTodayEvents ] = React.useState<Array<RouteEvent>>([]);
  const uid = useSelector(selectUserUUID);
  const { t } = useTranslation(["eventsCreation"]);
  let extras = <></>;
  const navigate = useNavigate();

  React.useEffect(() => {
    const getEvents = async () => {
      const promise = getTodayEvents(uid!);

      promise.then((events: Array<RouteEvent>) => {
        setTodayEvents(events);
      }).catch((e: unknown) => {
          toast.error((e as Error).message);
      });
    }

    getEvents();
  }, [uid]);

  const onEditRouteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const eid = (event.target as HTMLDivElement).dataset.eid;

    event.stopPropagation();
    navigate(`/routeforevent/${eid}`);
  }

  return <div className="self-start card flex-1 container text-right p-10">
    <h1 className="mb-4">{ t("main.today events") }</h1>
    {
      todayEvents.length === 0 ? <div className="my-5">{ t("creation.no events for today") }</div> :
      todayEvents.map((event) => {
        if (!event.rid) {
          extras = <span data-eid={ event.id } onClick={ onEditRouteClick } className="font-bold absolute top-3 right-3"> { t("creation.create route for event") } </span>;
        }
        return <RouteEventCard routeEvent={ event } extras={ extras } />;
      })
  }</div>;
}

export default TodayEvents;