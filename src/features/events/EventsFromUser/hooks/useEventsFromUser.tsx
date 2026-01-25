import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteRouteAndLikes } from "@/database/MyRoutesRpc";
import { deleteMyEvent, setMyEventsOrderBy, setMyEventsOrderDir, 
  setMyEventsPage, setMyEventsQuery } from "@/features/events/store/slices/eventListsSlice";
import toast from "react-hot-toast";
import { selectMyEvents, selectMyEventsIsLoading, selectMyEventsOrderBy, selectMyEventsOrderDir, selectMyEventsPage, 
  selectMyEventsQuery, 
  selectMyEventsTotalRoutes } from "@/features/events/store/selectors/eventsListsSelectors";
import React from "react";
import type { SelectMethods, SetMethods } from "@/components/ItemsList/ItemsList.types";
import type { RouteEvent } from "@/types/RouteEvent.types";
import RouteEventCard from "@/features/events/RouteEventCard/RouteEventCard";

const useEventRoutesFromUser = (): [ (route: RouteEvent) => React.JSX.Element,
  SetMethods, SelectMethods<RouteEvent> ] => {
  const { t } = useTranslation(['myRoutes']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    if (window.confirm(t("main.want delete route"))) {
      const promise = deleteRouteAndLikes(id);

      promise.then(() => {
        dispatch(deleteMyEvent(id));
        toast.success("Route removed");
      }).catch((e: unknown) => {
        toast.error((e as Error).message);
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
  const setMethods: SetMethods = {
    setPage: setMyEventsPage,
    setOrderBy: setMyEventsOrderBy,
    setOrderDir: setMyEventsOrderDir,
    setQuery: setMyEventsQuery
  };
  const selectMethods = {
    selectItems: selectMyEvents,
    selectIsLoading: selectMyEventsIsLoading,
    selectPage: selectMyEventsPage,
    selectTotalItems: selectMyEventsTotalRoutes,
    selectOrderBy: selectMyEventsOrderBy,
    selectOrderDir: selectMyEventsOrderDir,
    selectQuery: selectMyEventsQuery,
  };

  return [ myRouteEventsCard, setMethods, selectMethods ];
}

export default useEventRoutesFromUser;