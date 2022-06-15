import { combineReducers } from "@reduxjs/toolkit";
import { youtubeReducer, adminReducer, userReducer } from "@store/index";

const rootReducer = combineReducers({
  youtube: youtubeReducer,
  admin: adminReducer,
  user: userReducer,
});

export type typeRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
