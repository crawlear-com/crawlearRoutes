import { createSelector } from "@reduxjs/toolkit";

const selectGpx = createSelector(
  (state) => state.route,
  (route) => route ? route.gpx : null
);

export { selectGpx };