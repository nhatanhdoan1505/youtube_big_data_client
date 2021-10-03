import { combineReducers } from "@reduxjs/toolkit";
import channelReducer from "../features/channel/channelSlice";
import authReducer from "../features/auth/authSlice";
import serviceSlice from "../features/service/serviceSlice";

const rootReducer = combineReducers({
  channel: channelReducer,
  auth: authReducer,
  service: serviceSlice,
});

export type typeRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
