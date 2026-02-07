import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { RoutesSearchInitialState } from './state.types';
import type { MapPoint } from '@/features/maps/SearchRouteMap/SearchRouteMap.types';
import { getPointsFromRoutes } from '@/helpers/utils';
import type { RootState } from '@/store/store';
import SupabaseRouteRepository from '@/infrastructure/Repository/RouteRepository/SupabaseRouteRepository';
import RouteDataProvider from '@/infrastructure/DataProvider/RouteDataProvider/RouteDataProvider';

const repository = new SupabaseRouteRepository();
const provider = new RouteDataProvider(repository);

const searchByGeo = createAsyncThunk(
  'routeSearch/searchByGeo',
  async (searchBounds: L.LatLngBounds) => {
    return await provider.searchRoutesByGeo(searchBounds);
  }
);

const searchByQuery = createAsyncThunk(
  'routeSearch/searchByQuery',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const query = state.routeSearch.query;
    const page = state.routeSearch.page + 1;
    const userId = state.user.session?.user.id;

    if (query.length > 0) {
      return await provider.searchPublicRoutes(query, page, userId!);
    } else {
      return { data: [], total_count: 0};
    }
  }
);

const routeSearchSlice = createSlice({
  name: 'routeSearch',
  initialState: RoutesSearchInitialState,
  reducers: {
    setRouteSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setRouteSearchPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    cleanSearchResultsAndQuery: (state) => {
      state.query = RoutesSearchInitialState.query;
      state.error = RoutesSearchInitialState.error;
      state.isLoading = RoutesSearchInitialState.isLoading;
      state.points = RoutesSearchInitialState.points;
      state.routes = RoutesSearchInitialState.routes;
      state.totalRoutes = RoutesSearchInitialState.totalRoutes;
      state.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchByGeo.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.points = [];
    })
    .addCase(searchByGeo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ? action.error.message : "Unknown Error";
    })
    .addCase(searchByGeo.fulfilled, (state, action) => {
      const routes = [...action.payload.data];
      state.routes = routes;
      state.totalRoutes = 0;
      state.points = getPointsFromRoutes(routes) as Array<MapPoint>;
      state.isLoading = false;
      state.query = "";
      state.page = 0;
    })

    .addCase(searchByQuery.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(searchByQuery.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ? action.error.message : "Unknown Error";
    })
    .addCase(searchByQuery.fulfilled, (state, action) => {
      const routes = [...action.payload.data];
      state.routes = routes;
      state.totalRoutes = action.payload.total_count;
      state.points = getPointsFromRoutes(routes) as Array<MapPoint>;
      state.isLoading = false;
    });
  }
});

export { routeSearchSlice, searchByGeo, searchByQuery };
export const { setRouteSearchQuery, setRouteSearchPage, cleanSearchResultsAndQuery } = routeSearchSlice.actions;
export default routeSearchSlice.reducer;

