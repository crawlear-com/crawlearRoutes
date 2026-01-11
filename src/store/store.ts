import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/store/slice/userSlice';
import themeReducer from '../components/ToggleTheme/store/slice/themeSlice';
import routeReducer from '../features/routeCreation/store/slices/routeSlice';
import routesReducer from '../features/routes/store/slices/routeListsSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    routeCreation: routeReducer,
    routes: routesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
