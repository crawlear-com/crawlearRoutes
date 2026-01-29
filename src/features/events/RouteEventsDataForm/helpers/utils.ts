import { createEventRoute, modifyEventRoute } from "@/database/eventsCreationRpc";
import { CREATE_ACTION } from "@/helpers/utils";
import type { FormAction } from "@/types/Generic.types";

const getActionFromActionRpcType = (actionType: FormAction) => {
  if (actionType === CREATE_ACTION) {
    return createEventRoute;
  }

  return modifyEventRoute;
}

export { getActionFromActionRpcType };