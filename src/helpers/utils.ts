import { useTranslation } from "react-i18next";
import type { Route } from "../types/Route.types";

const SCALE11 = "1/1";
const SCALE110 = "1/10";
const SCALE118 = "1/18";
const SCALE124 = "1/24";

const getScaleValue = (scale: number) => {
  let value = SCALE11;

  switch(scale) {
    case 1: value = SCALE124; break;
    case 2: value = SCALE118; break;
    case 3: value = SCALE110; break;
    case 4: value = SCALE11; break;
  }

  return value;
}

const useDifficultyValues = () => {
  const { t } = useTranslation(["routeCreation"]);

  return [ t("main.easy"), t("main.moderate"), t("main.difficult")];
}

const getPointsFromRoutes = (routes: Array<Route>) => {
  return routes.map((route: Route) => {
    return {
        point: route.location,
        content: route.name
    }
  })
}


export { getScaleValue, useDifficultyValues, getPointsFromRoutes };