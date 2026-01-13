import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { RoutesSearchInitialState } from './state.types';
import { searchRoutesByGeo, searchPublicRoutes } from '../../../../database/MyRoutesRpc';
import type { MapPoint } from '../../SearchRouteMap/SearchRouteMap.types';
import { getPointsFromRoutes } from '../../../../helpers/utils';

const searchByGeo = createAsyncThunk(
  'routeSearch/searchByGeo',
  async (searchBounds: L.LatLngBounds) => {
    const response = await searchRoutesByGeo(searchBounds);

    if (!response.error) {
      return response.data;
    } else {
      throw new Error(`Error searching routes: ${response.error.message}`);
    }
  }
);

const searchByQuery = createAsyncThunk(
  'routeSearch/searchByQuery',
  async (query: string) => {
    const response = await searchPublicRoutes(query);

    if (!response.error) {
      return response.data;
    } else {
      throw new Error(`Error searching routes: ${response.error.message}`);
    }
  }
);

const routeSearchSlice = createSlice({
  name: 'routeSearch',
  initialState: RoutesSearchInitialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    cleanSearchResultsAndQuery: (state) => {
      state.query = RoutesSearchInitialState.query;
      state.error = RoutesSearchInitialState.error;
      state.isLoading = RoutesSearchInitialState.isLoading;
      state.points = RoutesSearchInitialState.points;
      state.routes = RoutesSearchInitialState.routes;
      state.totalRoutes = RoutesSearchInitialState.totalRoutes;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchByGeo.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(searchByGeo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ? action.error.message : "Unknown Error";
    })
    .addCase(searchByGeo.fulfilled, (state, action) => {
      const routes = [...action.payload];
      state.routes = routes;
      state.totalRoutes = action.payload.total_count;
      state.points = getPointsFromRoutes(routes) as Array<MapPoint>;
      state.isLoading = false;
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
      const routes = [...action.payload];
      state.routes = routes;
      state.totalRoutes = action.payload.total_count;
      state.points = getPointsFromRoutes(routes) as Array<MapPoint>;
      state.isLoading = false;
    });
  }
});

export { routeSearchSlice, searchByGeo, searchByQuery };
export const { setQuery, cleanSearchResultsAndQuery } = routeSearchSlice.actions;
export default routeSearchSlice.reducer;

