import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialState, type FormAction } from './state.types';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CreationRoute, GeoPoint } from '../../../../types/Route.types';
import { getRoute } from '../../../../database/routeRpc';

const loadRoute = createAsyncThunk(
  'route/getRoute',
  async (rid: string) => {
    const response = await getRoute(rid);

    if (!response.error) {
      return response;
    } else {
      throw new Error(`Error loading favorite routes: ${response.error.message}`);
    }
  }
);

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setRouteId: ((state, action: PayloadAction<string>) => {
      state.routeId = action.payload;
    }),
    setAction: ((state, action: PayloadAction<FormAction>) => {
      state.action = action.payload;
    }),
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
  },
    extraReducers: (builder) => {
      builder.addCase(loadRoute.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadRoute.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ? action.error.message : "Unknown Error";
      })
      .addCase(loadRoute.fulfilled, (state, action) => {
        state.route = action.payload;
        state.isLoading = false;
      })
    }
});

export { routeSlice, loadRoute };
export const { setRouteId, setAction, setRoute, cleanRoute, setGpx, cleanGpx, setLocation, setName,
  setDescription, setDifficult, setDistance, setDuration, setIsPublic, setScale,
  setYoutubeVideo } = routeSlice.actions;
export default routeSlice.reducer;