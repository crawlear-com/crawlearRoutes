import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/store/slice/userSlice';
import themeReducer from '../components/ToggleTheme/store/slice/themeSlice';

export const store = configureStore({
  reducer: {
    themeSlice: themeReducer,
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
