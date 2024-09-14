// selectors/userSelectors.js
import { createSelector } from "reselect";

const selectUser = (state) => state.auth.user; // Adjust path to auth slice

export const selectUserId = createSelector(
  [selectUser],
  (user) => user?.id // Access the user ID dynamically
);

export const selectUserRole = createSelector(
  [selectUser],
  (user) => user?.role // Ensure role is available
);
