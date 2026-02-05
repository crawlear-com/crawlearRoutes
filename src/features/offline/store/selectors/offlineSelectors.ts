import { createSelector } from "@reduxjs/toolkit";

const selectIsOffline = createSelector(
  (state) => state.offline,
  (offline) => offline.isOffline
);

export { selectIsOffline };