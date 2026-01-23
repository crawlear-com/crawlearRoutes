import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../../store/store";

const selectStep1IsFinished = createSelector(
  (state: RootState) => state.routeCreation,
  (routeCreation) => routeCreation ? routeCreation.route.gpx !== null && routeCreation.route.location !== null : false
);

const selectStep2IsFinished = createSelector(
  (state: RootState) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.name.length > 0 && routeCreation.route.description.length > 0 : false
);

const selectCreationRoute = createSelector(
  (state: RootState) => state.routeCreation,
  (routeCreation) => routeCreation.route
);

const selectIsLoading = createSelector(
  (state: RootState) => state.routeCreation,
  (routeCreation) => routeCreation.isLoading
);

const selectGpx = createSelector(
  (state: RootState) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.gpx : null
);

const selectPoint = createSelector(
  (state: RootState) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.location : null
);

const selectName = createSelector(
  (state: RootState) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.name : ""
);

const selectDescription = createSelector(
  (state: RootState) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.description : ""
);

const selectDifficulty = createSelector(
  (state: RootState) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.difficulty : 0
);

const selectScale = createSelector(
  (state: RootState) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.scale : 0
);

const selectYoutubeVideo = createSelector(
  (state: RootState) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.youtubeVideo : ""
);

const selectDistance = createSelector(
  (state: RootState) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.distance : 0
);

const selectDuration = createSelector(
  (state: RootState) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.durationTime : 0
);

const selectIsPublic = createSelector(
  (state: RootState) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.isPublic : true
);

const selectRouteId = createSelector(
  (state: RootState) => state.routeCreation,
  (routeCreation) => routeCreation.routeId
);

const selectAction = createSelector(
  (state: RootState) => state.routeCreation,
  (routeCreation) => routeCreation.action
);


export { selectCreationRoute, selectGpx, selectPoint, selectStep1IsFinished, selectStep2IsFinished,
  selectName, selectDescription, selectDifficulty, selectScale, selectYoutubeVideo,
  selectDistance, selectDuration, selectIsPublic, selectIsLoading, selectRouteId, selectAction
 };