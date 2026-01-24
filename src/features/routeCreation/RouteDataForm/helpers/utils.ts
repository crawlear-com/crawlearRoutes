import { createRoute, modifyRoute } from "../../../../database/routesCreationRpc";
import { CREATE_ACTION } from "../../../../helpers/utils";
import type { FormAction } from "../../store/slices/state.types";


const getActionFromRpcType = (actionType: FormAction) => {
  if (actionType === CREATE_ACTION) {
    return createRoute;
  }

  return modifyRoute;
}

export { getActionFromRpcType };