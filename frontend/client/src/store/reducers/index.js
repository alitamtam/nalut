import { combineReducers } from "@reduxjs/toolkit";
import someReducer from "./someReducer";
import anotherReducer from "./anotherReducer";

const rootReducer = combineReducers({
  some: someReducer,
  another: anotherReducer,
});

export default rootReducer;
