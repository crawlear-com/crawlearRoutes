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
    }
  }
})

export { userSlice };
export const { setSession, cleanSession } = userSlice.actions
export default userSlice.reducer