import { combineReducers } from "@reduxjs/toolkit";
import { youtubeReducer } from "@store/index";

const rootReducer = combineReducers({
  youtube: youtubeReducer,
});

export type typeRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
