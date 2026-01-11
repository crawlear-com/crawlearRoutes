import { createSelector } from "@reduxjs/toolkit";

const selectCreationRoute = createSelector(
  (state) => state.routeCreation,
  (routeCreation) => routeCreation.route
);

const selectGpx = createSelector(
  (state) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.gpx : null
);

const selectPoint = createSelector(
  (state) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.point : null
);

const selectStep1IsFinished = createSelector(
  (state) => state.routeCreation,
  (routeCreation) => routeCreation ? routeCreation.route.gpx !== null && routeCreation.route.location !== null : false
);

const selectStep2IsFinished = createSelector(
  (state) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.name.length > 0 && routeCreation.route.description.length > 0 &&
    routeCreation.route.youtubeVideo.length > 0 : false
);

const selectName = createSelector(
  (state) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.name : ""
);

const selectDescription = createSelector(
  (state) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.description : ""
);

const selectDifficulty = createSelector(
  (state) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.difficulty : 0
);

const selectScale = createSelector(
  (state) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.scale : 0
);

const selectYoutubeVideo = createSelector(
  (state) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.youtubeVideo : ""
);

const selectDistance = createSelector(
  (state) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.distance : 0
);

const selectDuration = createSelector(
  (state) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.duration : 0
);

const selectIsPublic = createSelector(
  (state) => state.routeCreation,
  (routeCreation) => routeCreation.route ? routeCreation.route.isPublic : true
);

export { selectCreationRoute, selectGpx, selectPoint, selectStep1IsFinished, selectStep2IsFinished,
  selectName, selectDescription, selectDifficulty, selectScale, selectYoutubeVideo,
  selectDistance, selectDuration, selectIsPublic
 };