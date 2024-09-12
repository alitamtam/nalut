import { configureStore } from "@reduxjs/toolkit";
import someReducer from "./reducers/someReducer";

export const store = configureStore({
  reducer: {
    some: someReducer,
  },
});
