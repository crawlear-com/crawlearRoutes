import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialState } from './state.types';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/application/store/store';
import type { Route } from '@/domain/Route.types';
import { ASC, DESC } from '@/application/components/ItemCardList/types/ItemsListFilter.types';
import SupabaseRouteRepository from '@/infrastructure/Repository/RouteRepository/SupabaseRouteRepository';
import RouteDataProvider from '@/infrastructure/DataProvider/RouteDataProvider/RouteDataProvider';

const repository = new SupabaseRouteRepository();
const provider = new RouteDataProvider(repository);

const getMyRoutes = createAsyncThunk(
  'routes/getMyRoutes',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const myRoutes = state.routes.myRoutes;
    const owner = state.user.session?.user.id;
    const page = myRoutes.page;
    const orderBy = myRoutes.orderBy;
    const orderDir = myRoutes.orderDir;
    const query = myRoutes.query;
    
    return provider.getMyRoutesPaginated(owner!, page, orderBy, orderDir, query);
  }
);

const getMyFavourites = createAsyncThunk(
  'routes/getMyFavorites',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const myFavorites = state.routes.myFavorites;
    const owner = state.user.session?.user.id;
    const page = myFavorites.page;
    const orderBy = myFavorites.orderBy;
    const orderDir = myFavorites.orderDir;
    const query = myFavorites.query;

    return provider.getLikesFromUserPaginated(owner!, page, orderBy, orderDir, query);
  }
);

const deleteRoute = (routes: Array<Route>, rid: string) => {
  const index = routes.findIndex(element => element.id === rid);

  if (index !== -1) {
      routes.splice(index, 1);
  }

  return routes;
}

const routeListsSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setMyRoutesPage: (state, action: PayloadAction<number>) => {
      state.myRoutes.page = action.payload;
    },
    deleteMyRoutesRoute: (state, action: PayloadAction<string>) => {
      const rid = action.payload;
      const routes = state.myRoutes.routes;

      const newRoutes = deleteRoute(routes, rid);
      state.myRoutes.routes = [...newRoutes];
      state.myRoutes.totalRoutes = Math.max(0, state.myRoutes.totalRoutes-1);
    },
    setMyRoutesOrderBy: (state, action: PayloadAction<string>) => {
      state.myRoutes.orderBy = action.payload;
    },
    setMyRoutesOrderDir: (state) => {
      state.myRoutes.orderDir = state.myRoutes.orderDir === ASC ? DESC : ASC;
    },
    setMyRoutesQuery: (state, action: PayloadAction<string>) => {
      state.myRoutes.query = action.payload;
    },

    setMyFavouritesPage: (state, action: PayloadAction<number>) => {
      state.myFavorites.page = action.payload;
    },
    deleteMyFavoritesRoute: (state, action: PayloadAction<string>) => {
      const rid = action.payload;
      const routes = state.myFavorites.routes;

      const newRoutes = deleteRoute(routes, rid);
      state.myFavorites.routes = [...newRoutes];
      state.myFavorites.totalRoutes = Math.max(0, state.myFavorites.totalRoutes-1);
    },
    setMyFavouritesOrderBy: (state, action: PayloadAction<string>) => {
      state.myFavorites.orderBy = action.payload;
    },
    setMyFavouritesOrderDir: (state) => {
      state.myFavorites.orderDir = state.myFavorites.orderDir === ASC ? DESC : ASC;
    },
    setMyFavouritesQuery: (state, action: PayloadAction<string>) => {
      state.myFavorites.query = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMyRoutes.pending, (state) => {
      state.myRoutes.isLoading = true;
      state.myRoutes.error = null;
    })
    .addCase(getMyRoutes.rejected, (state, action) => {
      state.myRoutes.isLoading = false;
      state.myRoutes.error = action.error.message ? action.error.message : "Unknown Error";
    })
    .addCase(getMyRoutes.fulfilled, (state, action) => {
      state.myRoutes.routes = [...action.payload.data];
      state.myRoutes.totalRoutes = action.payload.total_count;
      state.myRoutes.isLoading = false;
    })

    builder.addCase(getMyFavourites.pending, (state) => {
      state.myFavorites.isLoading = true;
      state.myFavorites.error = null;
    })
    .addCase(getMyFavourites.rejected, (state, action) => {
      state.myFavorites.isLoading = false;
      state.myFavorites.error = action.error.message ? action.error.message : "Unknown Error";
    })
    .addCase(getMyFavourites.fulfilled, (state, action) => {
      state.myFavorites.routes = [...action.payload.data];
      state.myFavorites.totalRoutes = action.payload.total_count;
      state.myFavorites.isLoading = false;
    })
  }
});

export { routeListsSlice, getMyRoutes, getMyFavourites };
export const { setMyFavouritesOrderDir, setMyFavouritesPage, setMyFavouritesQuery, setMyFavouritesOrderBy, deleteMyFavoritesRoute,
  setMyRoutesOrderBy, setMyRoutesOrderDir, setMyRoutesPage, setMyRoutesQuery, deleteMyRoutesRoute } = routeListsSlice.actions;
export default routeListsSlice.reducer;