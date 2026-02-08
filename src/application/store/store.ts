import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './RootReducer';

export const store = configureStore({
  reducer: rootReducer
});

//For testing pourposes
const setupStore = () => {
  return store
}

export type AppState = ReturnType<AppStore["getState"]>
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export { setupStore }

