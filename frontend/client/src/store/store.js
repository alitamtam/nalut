import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice"; // Assuming you need it
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
    // Add other reducers here
  },
});
