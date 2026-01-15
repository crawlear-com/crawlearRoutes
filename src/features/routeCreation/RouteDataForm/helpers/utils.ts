import { createRoute, modifyRoute } from "../../../../database/routesCreationRpc";
import { CREATE_ACTION, type RouteAction } from "../../store/slices/state.types";

const getActionFromActionType = (actionType: RouteAction) => {
  if (actionType === CREATE_ACTION) {
    return createRoute;
  }

  return modifyRoute;
}

export { getActionFromActionType };