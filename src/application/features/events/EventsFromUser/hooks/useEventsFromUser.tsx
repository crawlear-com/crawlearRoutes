import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteMyEvent } from "@/application/features/events/store/slices/eventListsSlice";
import toast from "react-hot-toast";
import React from "react";
import type { RouteEvent } from "@/domain/RouteEvent.types";
import RouteEventCard from "@/application/features/events/RouteEventCard/RouteEventCard";
import SupabaseRouteEventRepository from "@/infrastructure/Repository/RouteEventRepository/SupabaseRouteEventRepository";
import RouteEventDataProvider from "@/infrastructure/DataProvider/RouteEventDataProvider/RouteEventDataProvider";

const useEventRoutesFromUser = (): [ (route: RouteEvent) => React.JSX.Element ] => {
  const { t } = useTranslation(['myEvents']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const repository = React.useMemo(() => new SupabaseRouteEventRepository(), []);
  const provider = React.useMemo(() => new RouteEventDataProvider(repository), [repository]);

  const onDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;
    const eid = element.dataset.eid;

    event.stopPropagation();
    if (eid) {
      deleteEventById(eid);
    }
  }

  const onModifyClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;
    const eid = element.dataset.eid;
    const date = (element.dataset.date ? new Date(element.dataset.date) : new Date()).getTime();

    event.stopPropagation();
    if (eid) {
      navigate(`/event/${date}/${eid}`);
    }
  }

  const deleteEventById = (id: string) => {
    if (window.confirm(t("main.want delete event"))) {
      const promise = provider.deleteEventRoute(id);

      promise.then(() => {
        dispatch(deleteMyEvent(id));
        toast.success(t("errors.event deleted"));
      }).catch(() => {
        toast.error(t("errors.event not deleted"));
      });
    }
  }
  const eventExtras = (eid: string, eventDate: string) => <>
    <div className="absolute top-3 right-6 mr-5 text-xl leading-6" 
      data-eid={ eid } data-date={ eventDate } onClick={ onModifyClick }>✎</div>
    <div className="absolute top-3 right-3" data-eid={ eid } onClick={ onDeleteClick }>🗑</div>
  </>

  const myRouteEventsCard = (event: RouteEvent) => {
    return <RouteEventCard key={ event.id } routeEvent={ event } 
      extras={ eventExtras(event.id, event.date.toString()) } />;
  }

  return [ myRouteEventsCard ];
}

export default useEventRoutesFromUser;