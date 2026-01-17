import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { RoutesSearchInitialState } from './state.types';
import { searchRoutesByGeo, searchPublicRoutes } from '../../../../database/searchRoutesRpc';
import type { MapPoint } from '../../SearchRouteMap/SearchRouteMap.types';
import { getPointsFromRoutes } from '../../../../helpers/utils';
import type { RootState } from '../../../../store/store';

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
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const query = state.routeSearch.query;
    const page = state.routeSearch.page + 1;
    const userId = state.user.session?.user.id;
    const response = await searchPublicRoutes(query, page, userId!);

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
      state.page = RoutesSearchInitialState.totalRoutes;
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
      const routes = [...action.payload.routes];
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

