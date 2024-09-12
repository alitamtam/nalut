// path: frontend/client/src/store/reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import someReducer from "./someReducer";
import anotherReducer from "./anotherReducer";

const rootReducer = combineReducers({
  some: someReducer,
  another: anotherReducer,
});

export default rootReducer;
