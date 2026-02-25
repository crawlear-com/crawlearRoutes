
import type { IItemListRespository } from "@/domain/IItemListRespository.types";
import { getMyRouteEventsPaginated, setMyEventsOrderBy, setMyEventsOrderDir, setMyEventsPage, setMyEventsQuery } from "@/application/features/events/store/slices/eventListsSlice";
import { selectMyEvents, selectMyEventsIsLoading, selectMyEventsOrderBy, selectMyEventsOrderDir, selectMyEventsPage, selectMyEventsQuery, selectMyEventsTotalRoutes } from "@/application/features/events/store/selectors/eventsListsSelectors";
import type { RouteEvent } from "@/domain/RouteEvent.types";

const ItemListRouteEventsReduxRespository: IItemListRespository<RouteEvent> = {
  search: getMyRouteEventsPaginated,
  setMethods: {
    setPage: setMyEventsPage,
    setOrderBy: setMyEventsOrderBy,
    setOrderDir: setMyEventsOrderDir,
    setQuery: setMyEventsQuery
  },
  selectMethods: {
    selectItems: selectMyEvents,
    selectIsLoading: selectMyEventsIsLoading,
    selectPage: selectMyEventsPage,
    selectTotalItems: selectMyEventsTotalRoutes,
    selectOrderBy: selectMyEventsOrderBy,
    selectOrderDir: selectMyEventsOrderDir,
    selectQuery: selectMyEventsQuery,
  }
}

export default ItemListRouteEventsReduxRespository;