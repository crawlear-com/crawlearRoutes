import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { initialState } from './state.types';

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.selectedTheme = action.payload;
    }
  }
})

export { themeSlice };
export const { setTheme } = themeSlice.actions
export default themeSlice.reducer