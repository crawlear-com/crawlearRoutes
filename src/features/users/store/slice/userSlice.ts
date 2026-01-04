import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Session } from '@supabase/supabase-js'
import { initialState } from './state.types';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session>) => {
      state.session = action.payload;
    },
    cleanSession: (state) => {
        state.session = null;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
})

export { userSlice };
export const { setSession, cleanSession,setIsLoading } = userSlice.actions
export default userSlice.reducer