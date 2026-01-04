import { createSelector } from "@reduxjs/toolkit";

const selectUserSession = createSelector(
  (state) => state.user,
  (user) => user.session
);

const selectUserUUID = createSelector(
  (state) => state.user,
  (user) => user.session?.user?.id
);

const selectUserDisplayName = createSelector(
  (state) => state.user,
  (user) => user.session?.user.user_metadata.displayName
);

const selectIsLoading = createSelector(
  (state) => state.user,
  (user) => user.isLoading
);

export { selectUserSession, selectUserUUID, selectUserDisplayName, selectIsLoading };