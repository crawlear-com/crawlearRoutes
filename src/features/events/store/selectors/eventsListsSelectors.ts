import { createSelector } from "@reduxjs/toolkit";

const selectEventRoutes = createSelector(
  (state) => state.events,
  (events) => events.routes
);

const selectEventStartDate = createSelector(
  (state) => state.events,
  (events) => events.startDate
);

const selectEventEndDate = createSelector(
  (state) => state.events,
  (events) => events.endDate
);

export { selectEventRoutes, selectEventStartDate, selectEventEndDate };