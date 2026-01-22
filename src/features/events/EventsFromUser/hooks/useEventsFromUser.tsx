import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteRouteAndLikes } from "../../../../database/MyRoutesRpc";
import { deleteMyEvent, setMyEventsOrderBy, setMyEventsOrderDir, 
  setMyEventsPage, setMyEventsQuery } from "../../store/slices/eventListsSlice";
import toast from "react-hot-toast";
import { selectMyEvents, selectMyEventsIsLoading, selectMyEventsPage, selectMyEventsTotalRoutes } from "../../store/selectors/eventsListsSelectors";
import React from "react";
import type { SelectMethods, SetMethods } from "../../../../components/ItemsList/ItemsList.types";
import type { RouteEvent } from "../../../../types/RouteEvent.types";
import RouteEventCard from "../../RouteEventCard/RouteEventCard";

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

    event.stopPropagation();
    if (eid) {
      navigate(`/event/${eid}`);
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
  const eventExtras = (eid: string) => <>
    <div className="absolute top-3 right-6 mr-5 text-xl leading-6" data-eid={ eid } onClick={ onModifyClick }>✎</div>
    <div className="absolute top-3 right-3" data-eid={ eid } onClick={ onDeleteClick }>🗑</div>
  </>
  const myRouteEventsCard = (route: RouteEvent) => <RouteEventCard key={ route.id } routeEvent={ route } extras={ eventExtras(route.id) } />;
  const setMethods = {
    setPage: setMyEventsPage,
    setOrderBy: setMyEventsOrderBy,
    setOrderDir: setMyEventsOrderDir,
    setQuery: setMyEventsQuery
  };
  const selectMethods = {
    selectItems: selectMyEvents,
    selectIsLoading: selectMyEventsIsLoading,
    selectPage: selectMyEventsPage,
    selectTotalItems: selectMyEventsTotalRoutes
  };

  return [ myRouteEventsCard, setMethods, selectMethods ];
}

export default useEventRoutesFromUser;