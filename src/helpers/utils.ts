import { useTranslation } from "react-i18next";
import type { Route } from "../types/Route.types";
import type { MapPoint } from "../features/maps/SearchRouteMap/SearchRouteMap.types";

const SCALE11 = 1;
const SCALE110 = 2;
const SCALE118 = 3;
const SCALE124 = 4;

const YOTUBE_PATTERN = /^.*(youtube.com|youtu.be)\/(watch\?v=|embed\/|v\/|shorts\/|)(.*?((?=[&#?])|$))/;

const getScaleValue = (scale: number) => {
  let value = "1/1";

  switch(scale) {
    case SCALE11: value = "4x4"; break;
    case SCALE110: value = "1/10"; break;
    case SCALE118: value = "1/18"; break;
    case SCALE124: value = "1/24"; break;
  }

  return value;
}

const useDifficultyValues = () => {
  const { t } = useTranslation(["routeCreation"]);

  return [ t("main.easy"), t("main.moderate"), t("main.difficult")];
}

const getPointsFromRoutes = (routes: Array<Route>) => {
  return routes.map((route: Route): MapPoint => {
    return {
        point: route.location,
        content: {
          name: route.name,
          rid: route.id,
          scale: route.scale,
          difficulty: route.difficulty
        }
    }
  })
}

const toHours = (time: number) => (time / 3600 / 1000).toFixed(2);
const toKm = (distance: number) => (distance / 1000).toFixed(2);

export { SCALE11, SCALE110, SCALE118, SCALE124, YOTUBE_PATTERN, 
  getScaleValue, useDifficultyValues, getPointsFromRoutes, toHours, toKm };