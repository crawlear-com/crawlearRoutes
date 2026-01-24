import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialState } from './state.types';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store';
import { getEventRouteEventsPaginated } from '@/database/eventsRpc';
import type { RouteEvent } from '@/types/RouteEvent.types';

const getMyRouteEventsPaginated = createAsyncThunk(
  'events/getMyRouteEventsPaginated',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const uid = state.user.session?.user.id;
    const page = state.events.page;
    const orderBy = state.events.orderBy;
    const orderDir = state.events.orderDir;
    const query = state.events.query;
    const response = await getEventRouteEventsPaginated(uid!, page, orderBy, orderDir, query);

    if (!response.error) {
      return response.data;
    } else {
      throw new Error(`Error loading routes: ${response.error.message}`);
    }
  }
);

const deleteEventRoute = (routes: Array<RouteEvent>, eventId: string) => {
  const index = routes.findIndex(element => element.id === eventId);

  if (index !== -1) {
      routes.splice(index, 1);
  }

  return routes;
}

const eventRoutesListsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setMyEventsPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    deleteMyEvent: (state, action: PayloadAction<string>) => {
      const eventId = action.payload;
      const allEventRoutes = state.events;

      const newRoutes = deleteEventRoute(allEventRoutes, eventId);
      state.events = [...newRoutes];
      state.totalEvents = Math.max(0, state.totalEvents - 1);
    },
    setMyEventsOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload;
    },
    setMyEventsOrderDir: (state, action: PayloadAction<string>) => {
      state.orderDir = action.payload;
    },
    setMyEventsQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyRouteEventsPaginated.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getMyRouteEventsPaginated.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ? action.error.message : "Unknown Error";
    })
    .addCase(getMyRouteEventsPaginated.fulfilled, (state, action) => {
      state.events = [...action.payload.data];
      state.isLoading = false;
    })
  }
});

export { eventRoutesListsSlice, getMyRouteEventsPaginated };
export const { setMyEventsPage, deleteMyEvent, setMyEventsOrderBy, setMyEventsOrderDir,
  setMyEventsQuery } = eventRoutesListsSlice.actions;
export default eventRoutesListsSlice.reducer;