import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialState } from './state.types';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CreationRoute, GeoPoint } from '@/domain/Route.types';
import SupabaseRouteRepository from '@/infrastructure/Repository/RouteRepository/SupabaseRouteRepository';
import RouteDataProvider from '@/infrastructure/DataProvider/RouteDataProvider/RouteDataProvider';

const repository = new SupabaseRouteRepository();
const provider = new RouteDataProvider(repository);

const loadRoute = createAsyncThunk(
  'route/getRoute',
  async (rid: string) => {
    return provider.getRoute(rid);
  }
);

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setRouteId: ((state, action: PayloadAction<string>) => {
      state.rid = action.payload;
    }),
    setAction: ((state, action: PayloadAction<string>) => {
      state.action = action.payload;
    }),
    setRoute: ((state, action: PayloadAction<CreationRoute>) => {
      state.route = action.payload;
    }),
    setEventId: ((state, action: PayloadAction<string>) => {
      state.eventId = action.payload;
    }),
    cleanRouteCreation: ((state) => {
      Object.assign(state, initialState);
    }),
    setGpx: (state, action: PayloadAction<string>) => {
      state.route.gpx = action.payload;
    },
    cleanGpx: (state) => {
        state.route.gpx = null;
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
    },
    setIsRecording: (state, action: PayloadAction<boolean>) => {
      state.isRecording = action.payload;
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
export const { setRouteId, setEventId, setAction, setRoute, cleanRouteCreation, setGpx, cleanGpx, 
  setLocation, setName, setDescription, setDifficult, setDistance, setDuration, setIsPublic, 
  setIsRecording, setScale, setYoutubeVideo } = routeSlice.actions;
export default routeSlice.reducer;