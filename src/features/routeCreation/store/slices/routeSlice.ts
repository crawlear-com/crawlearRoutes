import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './state.types';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { GeoPoint } from '../../../../types/Route.types';

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setGpx: (state, action: PayloadAction<string>) => {
      state.gpx = action.payload;
    },
    cleanGpx: (state) => {
        state.gpx = null;
    },
    setPoint: (state, action: PayloadAction<GeoPoint>) => {
      state.point = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setDifficult: (state, action: PayloadAction<number>) => {
      state.difficulty = action.payload;
    },
    setScale: (state, action: PayloadAction<number>) => {
      state.scale = action.payload;
    },
    setYoutubeVideo: (state, action: PayloadAction<string>) => {
      state.youtubeVideo = action.payload;
    },
    setDistance: (state, action: PayloadAction<number>) => {
      state.distance = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setIsPublic: (state, action: PayloadAction<boolean>) => {
      state.isPublic = action.payload;
    }
  }
});

export { routeSlice };
export const { setGpx, cleanGpx, setPoint, setName, setDescription, setDifficult, setDistance,
  setDuration, setIsPublic, setScale, setYoutubeVideo } = routeSlice.actions;
export default routeSlice.reducer;