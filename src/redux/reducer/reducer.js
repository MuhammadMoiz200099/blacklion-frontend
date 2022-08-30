import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slice/auth";
import artistReducer from "../slice/artist";

const rootReducer = combineReducers({
  auth: authReducer,
  artist: artistReducer
});

export default rootReducer;