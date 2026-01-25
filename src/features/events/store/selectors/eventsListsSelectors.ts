import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

const selectMyEvents = createSelector(
  (state: RootState) => state.events,
  (events) => events.events
);

const selectMyEventsIsLoading = createSelector(
  (state: RootState) => state.events,
  (events) => events.isLoading
);

const selectMyEventsPage = createSelector(
  (state: RootState) => state.events,
  (events) => events.page
);

const selectMyEventsTotalRoutes = createSelector(
  (state: RootState) => state.events,
  (events) => events.totalEvents
);


const selectMyEventsOrderBy = createSelector(
  (state: RootState) => state.events,
  (events) => events.orderBy
);

const selectMyEventsOrderDir = createSelector(
  (state: RootState) => state.events,
  (events) => events.orderDir
);

const selectMyEventsQuery = createSelector(
  (state: RootState) => state.events,
  (events) => events.query
);

export { selectMyEvents, selectMyEventsIsLoading, selectMyEventsPage, 
  selectMyEventsTotalRoutes, selectMyEventsOrderBy, selectMyEventsOrderDir, selectMyEventsQuery };