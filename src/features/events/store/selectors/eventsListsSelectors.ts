import { createSelector } from "@reduxjs/toolkit";

const selectEventRoutes = createSelector(
  (state) => state.events,
  (events) => events.routes
);

const selectEventRouteEvents = createSelector(
  (state) => state.events,
  (events) => events.routeEvents
);

const selectEventStartDate = createSelector(
  (state) => state.events,
  (events) => events.startDate
);

const selectEventEndDate = createSelector(
  (state) => state.events,
  (events) => events.endDate
);

export { selectEventRoutes, selectEventStartDate, selectEventEndDate, selectEventRouteEvents };