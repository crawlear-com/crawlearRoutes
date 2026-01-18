import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialState } from './state.types';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../../store/store';
import { getEventRoutes } from '../../../../database/eventsRpc';


const getMyEventRoutes = createAsyncThunk(
  'events/getMyEventRoutes',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const startDate = state.events.startDate;
    const endDate = state.events.endDate;
    const uid = state.user.session?.user.id;
    const response = await getEventRoutes(uid!, startDate, endDate);

    if (!response.error) {
      return response;
    } else {
      throw new Error(`Error loading routes: ${response.error.message}`);
    }
  }
);

const eventRoutesListsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMyEventRoutes.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getMyEventRoutes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ? action.error.message : "Unknown Error";
    })
    .addCase(getMyEventRoutes.fulfilled, (state, action) => {
      state.routes = [...action.payload];
      state.isLoading = false;
    })
  }
});

export { eventRoutesListsSlice, getMyEventRoutes };
export const { setStartDate, setEndDate } = eventRoutesListsSlice.actions;
export default eventRoutesListsSlice.reducer;