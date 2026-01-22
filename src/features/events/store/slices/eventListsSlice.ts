import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialState } from './state.types';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../../store/store';
import { getEventRouteEventsByMonth, getEventRoutesByMonth, getEventRouteEventsPaginated } from '../../../../database/eventsRpc';
import type { RouteEvent } from '../../../../types/RouteEvent.types';

const getMyEventRouteEventsPaginated = createAsyncThunk(
  'events/getMyEventRouteEventsPaginated',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const uid = state.user.session?.user.id;
    const page = state.events.myEvents.page;
    const orderBy = state.events.myEvents.orderBy;
    const orderDir = state.events.myEvents.orderDir;
    const query = state.events.myEvents.query;
    const response = await getEventRouteEventsPaginated(uid!, page, orderBy, orderDir, query);

    if (!response.error) {
      return response.data;
    } else {
      throw new Error(`Error loading routes: ${response.error.message}`);
    }
  }
);

const getMyEventRoutesByMonth = createAsyncThunk(
  'events/getMyEventRoutesByMonth',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const startDate = state.events.calendarEvents.startDate;
    const endDate = state.events.calendarEvents.endDate;
    const uid = state.user.session?.user.id;
    const response = await getEventRoutesByMonth(uid!, startDate, endDate);

    if (!response.error) {
      return response;
    } else {
      throw new Error(`Error loading routes: ${response.error.message}`);
    }
  }
);

const getMyEventRouteEventsByMonth = createAsyncThunk(
  'events/getMyEventRouteEventsByMonth',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const startDate = state.events.calendarEvents.startDate;
    const endDate = state.events.calendarEvents.endDate;
    const uid = state.user.session?.user.id;
    const response = await getEventRouteEventsByMonth(uid!, startDate, endDate);

    if (!response.error) {
      return response;
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
    setStartDate: (state, action: PayloadAction<string>) => {
      state.calendarEvents.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.calendarEvents.endDate = action.payload;
    },

    setMyEventsPage: (state, action: PayloadAction<number>) => {
      state.myEvents.page = action.payload;
    },
    deleteMyEvent: (state, action: PayloadAction<string>) => {
      const eventId = action.payload;
      const allEventRoutes = state.myEvents.allEventRoutes;

      const newRoutes = deleteEventRoute(allEventRoutes, eventId);
      state.myEvents.allEventRoutes = [...newRoutes];
      state.myEvents.totalEvents = Math.max(0, state.myEvents.totalEvents-1);
    },
    setMyEventsOrderBy: (state, action: PayloadAction<string>) => {
      state.myEvents.orderBy = action.payload;
    },
    setMyEventsOrderDir: (state, action: PayloadAction<string>) => {
      state.myEvents.orderDir = action.payload;
    },
    setMyEventsQuery: (state, action: PayloadAction<string>) => {
      state.myEvents.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyEventRouteEventsPaginated.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getMyEventRouteEventsPaginated.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ? action.error.message : "Unknown Error";
    })
    .addCase(getMyEventRouteEventsPaginated.fulfilled, (state, action) => {
      state.myEvents.allEventRoutes = [...action.payload.data];
      state.isLoading = false;
    })

    .addCase(getMyEventRoutesByMonth.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getMyEventRoutesByMonth.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ? action.error.message : "Unknown Error";
    })
    .addCase(getMyEventRoutesByMonth.fulfilled, (state, action) => {
      state.calendarEvents.routes = [...action.payload];
      state.isLoading = false;
    })

    .addCase(getMyEventRouteEventsByMonth.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getMyEventRouteEventsByMonth.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ? action.error.message : "Unknown Error";
    })
    .addCase(getMyEventRouteEventsByMonth.fulfilled, (state, action) => {
      state.calendarEvents.routeEvents = [...action.payload];
      state.isLoading = false;
    })
  }
});

export { eventRoutesListsSlice, getMyEventRoutesByMonth, getMyEventRouteEventsByMonth, getMyEventRouteEventsPaginated };
export const { setStartDate, setEndDate, setMyEventsPage, deleteMyEvent, setMyEventsOrderBy, setMyEventsOrderDir, setMyEventsQuery } = eventRoutesListsSlice.actions;
export default eventRoutesListsSlice.reducer;