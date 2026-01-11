import { createSelector } from "@reduxjs/toolkit";

const selectGpx = createSelector(
  (state) => state.route,
  (route) => route ? route.gpx : null
);

const selectPoint = createSelector(
  (state) => state.route,
  (route) => route ? route.point : null
);

const selectStep1IsFinished = createSelector(
  (state) => state.route,
  (route) => route ? route.gpx !== null && route.point !== null : false
);

const selectStep2IsFinished = createSelector(
  (state) => state.route,
  (route) => route ? route.name.length > 0 && route.description.length > 0 &&
    route.youtubeVideo.length > 0 : false
);

const selectName = createSelector(
  (state) => state.route,
  (route) => route ? route.name : ""
);

const selectDescription = createSelector(
  (state) => state.route,
  (route) => route ? route.description : ""
);

const selectDifficulty = createSelector(
  (state) => state.route,
  (route) => route ? route.difficulty : 0
);

const selectScale = createSelector(
  (state) => state.route,
  (route) => route ? route.scale : 0
);

const selectYoutubeVideo = createSelector(
  (state) => state.route,
  (route) => route ? route.youtubeVideo : ""
);

const selectDistance = createSelector(
  (state) => state.route,
  (route) => route ? route.distance : 0
);

const selectDuration = createSelector(
  (state) => state.route,
  (route) => route ? route.duration : 0
);

const selectIsPublic = createSelector(
  (state) => state.route,
  (route) => route ? route.isPublic : true
);

export { selectGpx, selectPoint, selectStep1IsFinished, selectStep2IsFinished,
  selectName, selectDescription, selectDifficulty, selectScale, selectYoutubeVideo,
  selectDistance, selectDuration, selectIsPublic
 };