import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { initialState } from './state.types';

const offlineSlice = createSlice({
  name: 'offline',
  initialState,
  reducers: {
    setIsOffline: (state, action: PayloadAction<boolean>) => {
      state.isOffline = action.payload;
    }
  }
})

export { offlineSlice };
export const { setIsOffline } = offlineSlice.actions
export default offlineSlice.reducer