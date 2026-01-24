import { createSelector } from "@reduxjs/toolkit";

const selectTheme = createSelector(
  (state) => state.theme,
  (theme) => theme.selectedTheme
);

export { selectTheme };