import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "@/application/features/users/store/slice/userSlice";
import themeReducer from "@/application/features/theme/ToggleTheme/store/slice/themeSlice";
import routeReducer from "@/application/features/routeCreation/store/slices/routeSlice";
import routesReducer from "@/application/features/routes/store/slices/routeListsSlice";
import routeSearchReducer from "@/application/features/maps/store/slices/routeSearchSlice";
import eventsListReducer from "@/application/features/events/store/slices/eventListsSlice";
import offlineReducer from "@/application/features/offline/store/slice/offlineSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  routeCreation: routeReducer,
  routes: routesReducer,
  routeSearch: routeSearchReducer,
  events: eventsListReducer,
  offline: offlineReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;