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
    setQuadrant: (state, action: PayloadAction<GeoPoint>) => {
      state.quadrant = action.payload;
    }
  }
});

export { routeSlice };
export const { setGpx, cleanGpx, setQuadrant } = routeSlice.actions;
export default routeSlice.reducer;