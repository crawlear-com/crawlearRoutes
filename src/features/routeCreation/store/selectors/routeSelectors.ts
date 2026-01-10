import { createSelector } from "@reduxjs/toolkit";

const selectGpx = createSelector(
  (state) => state.route,
  (route) => route ? route.gpx : null
);

const selectQuadrant = createSelector(
  (state) => state.route,
  (route) => route ? route.quadrant : null
);

const selectStep1IsFinished = createSelector(
  (state) => state.route,
  (route) => route ? route.gpx !== null && route.quadrant !== null : false
);

const selectStep2IsFinished = createSelector(
  (state) => state.route,
  (route) => route ? true : false
);

export { selectGpx, selectQuadrant, selectStep1IsFinished, selectStep2IsFinished };