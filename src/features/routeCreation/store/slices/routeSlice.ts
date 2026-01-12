import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './state.types';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CreationRoute, GeoPoint } from '../../../../types/Route.types';

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setRoute: ((state, action: PayloadAction<CreationRoute>) => {
      state.route = action.payload;
    }),
    cleanRoute: ((state) => {
      state.route = initialState.route;
    }),
    setGpx: (state, action: PayloadAction<string>) => {
      state.route.gpx = action.payload;
    },
    cleanGpx: (state) => {
        state.route.gpx = "";
    },
    setLocation: (state, action: PayloadAction<GeoPoint>) => {
      state.route.location = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.route.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.route.description = action.payload;
    },
    setDifficult: (state, action: PayloadAction<number>) => {
      state.route.difficulty = action.payload;
    },
    setScale: (state, action: PayloadAction<number>) => {
      state.route.scale = action.payload;
    },
    setYoutubeVideo: (state, action: PayloadAction<string>) => {
      state.route.youtubeVideo = action.payload;
    },
    setDistance: (state, action: PayloadAction<number>) => {
      state.route.distance = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.route.durationTime = action.payload;
    },
    setIsPublic: (state, action: PayloadAction<boolean>) => {
      state.route.isPublic = action.payload;
    }
  }
});

export { routeSlice };
export const { setGpx, cleanGpx, setLocation, setName, setDescription, setDifficult, setDistance,
  setDuration, setIsPublic, setScale, setYoutubeVideo } = routeSlice.actions;
export default routeSlice.reducer;